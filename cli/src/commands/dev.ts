import { existsSync } from 'node:fs'
import { cp, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { globby } from 'globby'
import autocomplete, { type ChoiceOrSeparatorArray } from 'inquirer-autocomplete-standalone'
import { ActivityCompiler, type ActivityMetadata } from '../classes/ActivityCompiler.js'
import { getFolderLetter } from '../util/getFolderLetter.js'
import { exit } from '../util/log.js'
import { sanitazeFolderName } from '../util/sanitazeFolderName.js'

export async function devActivity(service?: string) {
  const activities = await getActivities()

  let activity: ActivityMetadata
  let versionized: boolean
  if (!service) {
    ({ activity, versionized } = await autocomplete<{ activity: ActivityMetadata, versionized: boolean }>({
      message: 'Select or search for an activity to develop',
      source: async (input) => {
        if (!input) {
          return activities.map(activity => mapActivityToChoice(activity, activities))
        }
        return activities
          .filter(activity => activity.service.toLowerCase().includes(input.toLowerCase()))
          .map(activity => mapActivityToChoice(activity, activities))
      },
    }))
  }
  else {
    const sameServiceActivities = activities.filter(activity => activity.service.toLowerCase() === service.toLowerCase())

    if (sameServiceActivities.length === 0) {
      exit(`No activities found for service ${service}`)
    }

    if (sameServiceActivities.length > 1) {
      ({ activity, versionized } = await autocomplete<{ activity: ActivityMetadata, versionized: boolean }>({
        message: 'Select or search for an activity to develop',
        source: async () => {
          return sameServiceActivities.map(activity => mapActivityToChoice(activity, activities))
        },
      }))
    }
    else {
      activity = sameServiceActivities[0]
      versionized = false
    }
  }

  const folderLetter = getFolderLetter(activity.service)
  const sanitazedActivity = sanitazeFolderName(activity.service)
  const path = resolve(process.cwd(), 'websites', folderLetter, sanitazedActivity, versionized ? `v${activity.apiVersion}` : '')

  if (!existsSync(path)) {
    exit(`Activity ${activity.service} not found`)
  }

  // Check if tsconfig.json exists, if not, create it
  if (!existsSync(resolve(path, 'tsconfig.json'))) {
    await cp(
      resolve(fileURLToPath(import.meta.url), `../../../templates/tsconfig${versionized ? '.versionized' : ''}.json`),
      resolve(path, 'tsconfig.json'),
    )
  }

  const compiler = new ActivityCompiler(path, activity)
  await compiler.watch()
}

async function getActivities(): Promise<ActivityMetadata[]> {
  return (await Promise.all(
    (
      await globby([`${process.cwd()}/websites/*/*/metadata.json`, `${process.cwd()}/websites/*/*/v*/metadata.json`])
    ).map(async (file): Promise<ActivityMetadata> => JSON.parse(await readFile(file, 'utf-8'))),
  )).sort((a, b) => {
    if (a.service !== b.service)
      return a.service.localeCompare(b.service)
    return a.apiVersion - b.apiVersion
  })
}

function mapActivityToChoice(activity: ActivityMetadata, activities: ActivityMetadata[]): ChoiceOrSeparatorArray<{
  activity: ActivityMetadata
  versionized: boolean
}>[number] {
  const isVersionized = activities.filter(a => a.service === activity.service).length > 1
  return {
    value: { activity, versionized: isVersionized },
    name: `${activity.service}${isVersionized ? ` (APIv${activity.apiVersion})` : ''}`,
  }
}
