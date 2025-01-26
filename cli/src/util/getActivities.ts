import type { ActivityMetadata } from '../classes/ActivityCompiler.js'
import { execSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { context, getOctokit } from '@actions/github'
import { globby } from 'globby'
import isCI from 'is-ci'
import multimatch from 'multimatch'
import { exit } from './log.js'

export interface ActivityMetadataAndFolder {
  metadata: ActivityMetadata
  folder: string
}

export async function getActivities(): Promise<ActivityMetadataAndFolder[]> {
  return (await Promise.all(
    (
      await globby([`${process.cwd()}/websites/*/*/metadata.json`, `${process.cwd()}/websites/*/*/v*/metadata.json`])
    ).map(async (file): Promise<ActivityMetadataAndFolder> => ({
      metadata: JSON.parse(await readFile(file, 'utf-8')),
      folder: dirname(file),
    })),
  )).sort(({ metadata: a }, { metadata: b }) => {
    if (a.service !== b.service)
      return a.service.localeCompare(b.service)
    return a.apiVersion - b.apiVersion
  })
}

export async function getChangedActivities() {
  const changedFiles = (isCI ? await getChangedFilesCi() : await getChangedFilesLocal()).map(file => resolve(process.cwd(), file))
  const activityPaths = new Set<string>(multimatch(changedFiles, [`${process.cwd()}/websites/*/*/metadata.json`, `${process.cwd()}/websites/*/*/v*/metadata.json`]))
  return [...activityPaths]
}

async function getChangedFilesCi() {
  if (!process.env.GITHUB_TOKEN) {
    exit('GITHUB_TOKEN is not set')
  }

  let base: string | undefined
  let head: string | undefined

  switch (context.eventName) {
    case 'pull_request':
      base = context.payload.pull_request?.base?.sha
      head = context.payload.pull_request?.head?.sha
      break
    case 'push':
      base = context.payload.before
      head = context.payload.after
      break
  }

  if (!base || !head) {
    exit('No base or head found')
  }

  const client = getOctokit(process.env.GITHUB_TOKEN)
  const allFiles: string[] = []
  let page = 1

  //* Keep fetching pages until we get a response with fewer items than the per_page limit
  while (true) {
    const response = await client.rest.repos.compareCommits({
      base,
      head,
      owner: context.repo.owner,
      repo: context.repo.repo,
      per_page: 100,
      page,
    })

    if (response.status !== 200) {
      exit(`Failed to get changed files, status: ${response.status}`)
    }

    if (response.data.status !== 'ahead') {
      exit('The head commit is not ahead of the base commit, rebase and try again')
    }

    const files = response.data.files ?? []
    allFiles.push(...files.map(file => file.filename))

    if (files.length < 100)
      break
    page++
  }

  return allFiles
}

async function getChangedFilesLocal() {
  const base = execSync('git merge-base main HEAD').toString().trim()
  const head = execSync('git rev-parse HEAD').toString().trim()
  const changedFiles = execSync(`git diff --name-only ${base} ${head}`).toString().trim().split('\n')
  return changedFiles
}
