import type { ActivityMetadata } from '../classes/ActivityCompiler.js'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import * as core from '@actions/core'
import * as github from '@actions/github'
import isCI from 'is-ci'
import { MongoClient } from 'mongodb'
import { getChangedActivities } from '../util/getActivities.js'
import { getFolderLetter } from '../util/getFolderLetter.js'
import { exit, MESSAGES, success } from '../util/log.js'
import { sanitazeFolderName } from '../util/sanitazeFolderName.js'
import { buildActivity } from './build/buildActivity.js'

const NAME = 'pmd/release'

interface DbData {
  name: string
  apiVersion?: number
  githubUrl: string
  folderName: string
  url: string
  metadata: ActivityMetadata
  presenceJs: string
  iframeJs?: string
}

//* Command to release new versions of activities
export async function release() {
  if (!isCI) {
    return exit(MESSAGES.ciOnly)
  }

  //* Only run for PreMiD/Presences repository
  if (github.context.repo.owner !== 'PreMiD' || github.context.repo.repo !== 'Presences') {
    return success(MESSAGES.wrongRepository)
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return exit(MESSAGES.noToken)
  }

  const mongoUrl = process.env.MONGO_URL
  if (!mongoUrl) {
    return exit(MESSAGES.noMongoUrl)
  }

  const { changed, deleted } = await getChangedActivities()

  core.info(`Found ${changed.length} changed activities, ${deleted.length} deleted activities`)

  //* If no activities changed, return success
  if (changed.length === 0 && deleted.length === 0) {
    return success(MESSAGES.noActivities)
  }

  const client = new MongoClient(mongoUrl, { appName: NAME })

  try {
    await client.connect()

    core.info('Connected to MongoDB')
  }
  catch (error) {
    core.debug(error as string)
    exit(MESSAGES.noMongoConnection)
  }

  const connectToDev = process.env.CONNECT_TO_DEV === 'true'
  const database = client.db(connectToDev ? 'PreMiD-DEV' : 'PreMiD')
  const collection = database.collection<DbData>('presences')

  if (deleted.length) {
    await collection.deleteMany({
      $or: deleted.map(activity => ({
        folderName: sanitazeFolderName(activity.metadata.service),
        apiVersion: activity.versionized ? activity.metadata.apiVersion : undefined,
      })),
    })

    core.info(`Deleted ${deleted.length} activities`)
  }

  const dbData: DbData[] = []

  for (const activity of changed) {
    await buildActivity({
      activity: activity.metadata,
      path: activity.folder,
      versionized: activity.versionized,
      kill: true,
      validate: false,
      watch: false,
      zip: false,
    })

    const folderLetter = encodeURIComponent(getFolderLetter(activity.metadata.service))
    const folderName = sanitazeFolderName(activity.metadata.service)
    const folderNameEncoded = encodeURIComponent(folderName)
    const apiVersion = activity.versionized ? `/v${activity.metadata.apiVersion}` : ''

    dbData.push({
      name: activity.metadata.service,
      apiVersion: activity.versionized ? activity.metadata.apiVersion : undefined,
      metadata: activity.metadata,
      folderName,
      githubUrl: `https://github.com/PreMiD/Presences/tree/main/websites/${folderLetter}/${folderNameEncoded}${apiVersion}`,
      url: `https://api.premid.app/v6/activities${apiVersion}/${folderNameEncoded}`,
      presenceJs: await readFile(resolve(activity.folder, 'dist', 'presence.js'), 'utf8'),
      ...(existsSync(resolve(activity.folder, 'dist', 'iframe.js')) && {
        iframeJs: await readFile(resolve(activity.folder, 'dist', 'iframe.js'), 'utf8'),
      }),
    })
  }

  if (dbData.length) {
    await collection.bulkWrite(
      dbData.map(data => ({
        updateOne: {
          filter: { name: data.name, apiVersion: data.apiVersion },
          update: {
            $set: data,
          },
          upsert: true,
        },
      })),
    )

    core.info(`Updated ${dbData.length} activities`)
  }

  await client.close()
}
