import process from 'node:process'
import multimatch from 'multimatch'
import { getActivities } from '../../util/getActivities.js'
import { info } from '../../util/log.js'
import { writeSarifLog } from '../../util/sarif.js'
import { buildActivity } from './buildActivity.js'

export async function buildAll({
  kill,
  checkMetadata,
  sarif,
}: {
  kill: boolean
  checkMetadata: boolean
  sarif: boolean
}) {
  const activities = await getActivities()

  info(`Building ${activities.length} activities...`)

  let success = true
  for (const activity of activities) {
    const versionized = multimatch(activity.folder, '**/websites/*/*/v*').length > 0

    const isSuccess = await buildActivity({ path: activity.folder, activity: activity.metadata, versionized, watch: false, kill, checkMetadata })
    success = success && isSuccess
  }

  info(`${activities.length} activities built ${success ? 'successfully' : 'with errors'}`)

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(success ? 0 : 1)
}
