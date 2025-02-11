import { execSync } from 'node:child_process'
import process from 'node:process'
import * as core from '@actions/core'
import * as github from '@actions/github'
import isCI from 'is-ci'
import { AssetsManager } from '../classes/AssetsManager.js'
import { getChangedActivities } from '../util/getActivities.js'
import { exit, MESSAGES, success } from '../util/log.js'

const NAME = 'Assets updater / pmd'

//* Checks if there are any git changes in the working directory
function hasGitChanges(): boolean {
  const output = execSync('git status --porcelain').toString()
  return output.length > 0
}

//* Command to update assets and manage GitHub status checks in PRs
export async function updateAssets() {
  if (!isCI) {
    return exit(MESSAGES.ciOnly)
  }

  const pullRequest = github.context.payload.pull_request
  if (!pullRequest) {
    return exit(MESSAGES.noPullRequest)
  }

  //* Only run for PreMiD/Presences repository
  if (github.context.repo.owner !== 'PreMiD' || github.context.repo.repo !== 'Presences') {
    return success(MESSAGES.wrongRepository)
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return exit(MESSAGES.noToken)
  }

  if (!process.env.CDN_TOKEN) {
    return exit(MESSAGES.noCdnToken)
  }

  const headRef = process.env.HEAD_REF
  if (!headRef) {
    return exit(MESSAGES.noHeadRef)
  }

  const octokit = github.getOctokit(token)
  const context = github.context

  const { changed, deleted } = await getChangedActivities()

  core.info(`Found ${changed.length} changed activities, ${deleted.length} deleted activities`)

  //* If no activities changed, return success
  if (changed.length === 0 && deleted.length === 0) {
    await octokit.rest.repos.createCommitStatus({
      ...context.repo,
      sha: pullRequest.head.sha,
      state: 'success',
      description: MESSAGES.noActivities,
      context: NAME,
    })

    return success(MESSAGES.noActivities)
  }

  //* Fetch all pages of reviews
  const reviews = await octokit.paginate(octokit.rest.pulls.listReviews, {
    ...context.repo,
    pull_number: pullRequest.number,
  })

  core.info(`Found ${reviews.length} reviews for PR #${pullRequest.number}`)

  //* Count only approved reviews from reviewers with write access (excluding PR author)
  const uniqueApprovers = new Set(
    reviews
      .filter(review =>
        review.state === 'APPROVED'
        && review.user?.login !== pullRequest.user.login,
      )
      .map(review => review.user?.login)
      .filter((login): login is string => login !== undefined),
  )

  core.debug(`Found ${uniqueApprovers.size} unique approvers`)

  let approvalCount = 0
  for (const reviewer of uniqueApprovers) {
    try {
      const { data: permission } = await octokit.rest.repos.getCollaboratorPermissionLevel({
        ...context.repo,
        username: reviewer,
      })

      if (['admin', 'write'].includes(permission.permission)) {
        approvalCount++
      }
    }
    catch {
      //* Skip if we can't get permissions (user no longer has access, etc.)
      continue
    }
  }

  core.info(`Approval count: ${approvalCount}`)

  if (approvalCount < 2) {
    await octokit.rest.repos.createCommitStatus({
      ...context.repo,
      sha: pullRequest.head.sha,
      state: 'pending',
      description: MESSAGES.waitingForApprovals,
      context: NAME,
    })

    return success(MESSAGES.waitingForApprovals)
  }

  core.info('Approvals found, checking and updating assets...')

  try {
    //* Create pending status while we process
    await octokit.rest.repos.createCommitStatus({
      ...context.repo,
      sha: pullRequest.head.sha,
      state: 'pending',
      description: MESSAGES.checkingAndUpdatingAssets,
      context: NAME,
    })

    let valid = true
    for (const [index, activity] of changed.entries()) {
      const assetsManager = new AssetsManager(activity.folder, activity.metadata, activity.versionized)

      const assets = await assetsManager.getAssets()
      for (const asset of assets) {
        if (!(await assetsManager.validateImage({ asset, kill: false }))) {
          valid = false
        }
      }

      core.info(`Validated ${assets.length} assets for ${activity.metadata.service} (${index + 1}/${changed.length})`)
    }

    if (!valid) {
      await octokit.rest.repos.createCommitStatus({
        ...context.repo,
        sha: pullRequest.head.sha,
        state: 'failure',
        description: MESSAGES.someInvalidAssets,
        context: NAME,
      })

      return exit(MESSAGES.someInvalidAssets)
    }

    core.info('Assets validated, updating assets...')

    let count = 0

    //* Delete assets for each deleted activity
    for (const [index, activity] of deleted.entries()) {
      const assetsManager = new AssetsManager(activity.folder, activity.metadata, activity.versionized)

      const deletedCount = await assetsManager.deleteCdnAssets()
      count += deletedCount

      core.info(`Deleted ${deletedCount} assets for ${activity.metadata.service} (${index + 1}/${deleted.length})`)
    }

    //* Update assets for each activity
    for (const [index, activity] of changed.entries()) {
      const assetsManager = new AssetsManager(activity.folder, activity.metadata, activity.versionized)

      const updatedCount = await assetsManager.updateCdnAssets()
      count += updatedCount

      core.info(`Updated ${updatedCount} assets for ${activity.metadata.service} (${index + 1}/${changed.length})`)
    }

    core.info(`Updated ${count} assets`)

    //* Check if there are any changes to commit
    if (!hasGitChanges()) {
      core.info('No changes to commit')
      await octokit.rest.repos.createCommitStatus({
        ...context.repo,
        sha: pullRequest.head.sha,
        state: 'success',
        description: MESSAGES.assetsUpdatedCount(count),
        context: NAME,
      })
      return
    }

    //* Run ESLint on changed files
    const changedFiles = execSync('git diff --name-only HEAD').toString().trim()
    const tsAndJsonFiles = changedFiles.split('\n').filter(file => file.endsWith('.ts') || file.endsWith('.json'))

    if (tsAndJsonFiles.length > 0) {
      core.info('Running ESLint on changed files')
      execSync(`npx eslint --fix ${tsAndJsonFiles.map(file => `"${file}"`).join(' ')}`)
    }

    //* Eslint may have changed the files back to the original state, so we need to check again
    if (!hasGitChanges()) {
      core.info('No changes to commit')
      await octokit.rest.repos.createCommitStatus({
        ...context.repo,
        sha: pullRequest.head.sha,
        state: 'success',
        description: MESSAGES.assetsUpdatedCount(count),
        context: NAME,
      })
      return
    }

    //* Commit and push changes
    core.info('Committing and pushing changes')
    execSync('git add .')
    execSync('git commit -m "chore: update assets"')
    execSync(`git push origin HEAD:"${headRef}"`)

    await octokit.rest.repos.createCommitStatus({
      ...context.repo,
      sha: pullRequest.head.sha,
      state: 'pending',
      description: MESSAGES.assetsUpdatedCount(count, true),
      context: NAME,
    })
  }
  catch (error) {
    //* Update status to failure if something goes wrong
    await octokit.rest.repos.createCommitStatus({
      ...context.repo,
      sha: pullRequest.head.sha,
      state: 'failure',
      description: error instanceof Error ? error.message : MESSAGES.error,
      context: NAME,
    })

    throw error
  }
}
