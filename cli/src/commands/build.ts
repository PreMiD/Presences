import { existsSync } from 'node:fs'
import { cp } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import autocomplete from 'inquirer-autocomplete-standalone'
import { ActivityCompiler, type ActivityMetadata } from '../classes/ActivityCompiler.js'
import { getActivities } from '../util/getActivities.js'
import { getFolderLetter } from '../util/getFolderLetter.js'
import { exit } from '../util/log.js'
import { mapActivityToChoice } from '../util/mapActivityToChoice.js'
import { sanitazeFolderName } from '../util/sanitazeFolderName.js'

export async function buildActivity(service?: string, watch: boolean = false) {
  const activities = await getActivities()

  let activity: ActivityMetadata
  let versionized: boolean
  if (!service) {
    ({ activity, versionized } = await autocomplete<{ activity: ActivityMetadata, versionized: boolean }>({
      message: `Select or search for an activity to ${watch ? 'develop' : 'build'}`,
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
        message: `Select or search for an activity to ${watch ? 'develop' : 'build'}`,
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
  if (watch) {
    await compiler.watch()
  }
  else {
    await compiler.compile()
  }
}
