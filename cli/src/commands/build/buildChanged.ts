import process from 'node:process'
import multimatch from 'multimatch'
import { getChangedActivities } from '../../util/getActivities.js'
import { info, success } from '../../util/log.js'
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
    const versionized = multimatch(activity.folder, '**/websites/*/*/v*').length > 0

    const isSuccess = await buildActivity({ path: activity.folder, activity: activity.metadata, versionized, kill, checkMetadata, watch: false })
    successful = successful && isSuccess
  }

  info(`${changedActivities.length} activities built ${successful ? 'successfully' : 'with errors'}`)

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(successful ? 0 : 1)
}
