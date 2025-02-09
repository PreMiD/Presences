import process from 'node:process'
import * as core from '@actions/core'
import * as github from '@actions/github'
import isCI from 'is-ci'
import { AssetsManager } from '../classes/AssetsManager.js'
import { getChangedActivities } from '../util/getActivities.js'
import { exit, MESSAGES, success } from '../util/log.js'

const NAME = 'pmd/assets-updater'

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

  //* If we have less than 2 approvals, return success (but pending)
  const reviews = await octokit.rest.pulls.listReviews({
    ...context.repo,
    pull_number: pullRequest.number,
  })

  core.info(`Found ${reviews.data.length} reviews for PR #${pullRequest.number}`)

  //* Count only approved reviews from reviewers with write access (excluding PR author)
  const uniqueApprovers = new Set(
    reviews.data
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
    for (const activity of changed) {
      const assetsManager = new AssetsManager(activity.folder, activity.metadata, activity.versionized)

      const assets = await assetsManager.getAssets()
      for (const asset of assets) {
        if (!(await assetsManager.validateImage({ asset, kill: false }))) {
          valid = false
        }
      }
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
    for (const activity of deleted) {
      const assetsManager = new AssetsManager(activity.folder, activity.metadata, activity.versionized)

      count += await assetsManager.deleteCdnAssets()
    }

    //* Update assets for each activity
    for (const activity of changed) {
      const assetsManager = new AssetsManager(activity.folder, activity.metadata, activity.versionized)

      count += await assetsManager.updateCdnAssets()
    }

    core.info(`Updated ${count} assets`)

    await octokit.rest.repos.createCommitStatus({
      ...context.repo,
      sha: pullRequest.head.sha,
      state: 'success',
      description: MESSAGES.assetsUpdatedCount(count),
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
