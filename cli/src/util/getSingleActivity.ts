import type { ActivityMetadata } from '../classes/ActivityCompiler.js'
import { resolve } from 'node:path'
import process from 'node:process'
import autocomplete from 'inquirer-autocomplete-standalone'
import { getFolderLetter } from '../util/getFolderLetter.js'
import { exit } from '../util/log.js'
import { mapActivityToChoice } from '../util/mapActivityToChoice.js'
import { sanitazeFolderName } from '../util/sanitazeFolderName.js'
import { type ActivityMetadataAndFolder, getActivities } from './getActivities.js'

export async function getSingleActivity(searchMessage: string, service?: string): Promise<ActivityMetadataAndFolder & { versionized: boolean }> {
  const activities = (await getActivities()).map(({ metadata }) => metadata)
  let activity: ActivityMetadata
  let versionized: boolean
  if (!service) {
    ({ activity, versionized } = await autocomplete<{ activity: ActivityMetadata, versionized: boolean }>({
      message: searchMessage,
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
        message: searchMessage,
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

  return {
    metadata: activity,
    folder: path,
    versionized,
  }
}
