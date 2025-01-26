import { resolve } from 'node:path'
import process from 'node:process'
import { getChangedActivities } from '../../util/getActivities.js'
import { getFolderLetter } from '../../util/getFolderLetter.js'
import { info, success } from '../../util/log.js'
import { sanitazeFolderName } from '../../util/sanitazeFolderName.js'
import { writeSarifLog } from '../../util/sarif.js'
import { buildActivity } from './buildActivity.js'

export async function buildChanged({
  kill,
  checkMetadata,
  sarif,
}: {
  kill: boolean
  checkMetadata: boolean
  sarif: boolean
}) {
  const changedActivities = await getChangedActivities()
  if (changedActivities.length === 0) {
    success('No changed activities found')
  }

  info(`Building ${changedActivities.length} activities...`)

  let successful = true
  for (const activity of changedActivities) {
    const folderLetter = getFolderLetter(activity.metadata.service)
    const sanitazedActivity = sanitazeFolderName(activity.metadata.service)
    const path = resolve(process.cwd(), 'websites', folderLetter, sanitazedActivity)
    const versionized = path !== activity.folder

    const isSuccess = await buildActivity({ path: activity.folder, activity: activity.metadata, versionized, kill, checkMetadata, watch: false })
    successful = successful && isSuccess
  }

  info(`${changedActivities.length} activities built ${successful ? 'successfully' : 'with errors'}`)

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(successful ? 0 : 1)
}
