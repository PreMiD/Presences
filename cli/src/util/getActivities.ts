import type { ActivityMetadata } from '../classes/ActivityCompiler.js'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { context } from '@actions/github'
import gitDiffParser from 'gitdiff-parser'
import { globby } from 'globby'
import isCI from 'is-ci'
import { exit, info } from './log.js'

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

export async function getChangedActivities(): Promise<ActivityMetadataAndFolder[]> {
  const changedFiles = (isCI ? await getChangedFilesCi() : await getChangedFilesLocal()).map(file => resolve(process.cwd(), decodeUtf8Escapes(file)))
  const activityPaths = new Set<string>()

  const endAt = [
    '/',
    process.cwd(),
    `${process.cwd()}/websites`,
  ]

  for (const file of changedFiles) {
    let path = file
    while (!existsSync(resolve(path, 'metadata.json'))) {
      path = dirname(path)
      if (endAt.includes(path)) {
        break
      }
    }

    if (endAt.includes(path)) {
      continue
    }

    activityPaths.add(path)
  }

  return (await Promise.all(Array.from(activityPaths).map(async (folder): Promise<ActivityMetadataAndFolder> => ({
    metadata: JSON.parse(await readFile(resolve(folder, 'metadata.json'), 'utf-8')),
    folder,
  }))))
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

  info(`Getting changed files from ${base} to ${head}`)

  const response = await fetch(`https://github.com/${context.repo.owner}/${context.repo.repo}/compare/${base}...${head}.diff`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })

  const files = gitDiffParser.parse(await response.text())
  return files.map(file => file.newPath)
}

async function getChangedFilesLocal() {
  const base = execSync('git merge-base main HEAD').toString().trim()
  const head = execSync('git rev-parse HEAD').toString().trim()
  const changedFiles = execSync(`git diff --name-only ${base} ${head}`).toString().trim().split('\n')
  return changedFiles
}

function decodeUtf8Escapes(filePath: string) {
  filePath = filePath
    .replace(/"$/, '')
    .replace(/^"/, '')
    .replace(/^\//, '')

  const decodedPath = filePath.replace(/\\(\d{3})/g, (_, octalCode) =>
    String.fromCharCode(Number.parseInt(octalCode, 8)))

  const bytes = new Uint8Array([...decodedPath].map(char => char.charCodeAt(0)))
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(bytes)
}
