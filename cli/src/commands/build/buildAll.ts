import type { ActivityMetadataAndFolder } from '../../util/getActivities'
import { resolve } from 'node:path'
import process from 'node:process'
import { getFolderLetter } from '../../util/getFolderLetter.js'
import { sanitazeFolderName } from '../../util/sanitazeFolderName.js'
import { writeSarifLog } from '../../util/sarif.js'
import { buildActivity } from './buildActivity.js'

export async function buildAll(activities: ActivityMetadataAndFolder[], {
  kill,
  checkMetadata,
  sarif,
}: {
  kill: boolean
  checkMetadata: boolean
  sarif: boolean
}) {
  let success = true
  for (const activity of activities) {
    const folderLetter = getFolderLetter(activity.metadata.service)
    const sanitazedActivity = sanitazeFolderName(activity.metadata.service)
    const path = resolve(process.cwd(), 'websites', folderLetter, sanitazedActivity)
    const versionized = path !== activity.folder

    const isSuccess = await buildActivity({ path: activity.folder, activity: activity.metadata, versionized, watch: false, kill, checkMetadata })
    success = success && isSuccess
  }

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(success ? 0 : 1)
}
