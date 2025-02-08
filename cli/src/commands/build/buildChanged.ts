import process from 'node:process'
import { getChangedActivities } from '../../util/getActivities.js'
import { info, success } from '../../util/log.js'
import { writeSarifLog } from '../../util/sarif.js'
import { buildActivity } from './buildActivity.js'

export async function buildChanged({
  kill,
  validate,
  sarif,
}: {
  kill: boolean
  validate: boolean
  sarif: boolean
}) {
  const { changed } = await getChangedActivities()
  if (changed.length === 0) {
    success('No changed activities found')
  }

  info(`Building ${changed.length} activities...`)

  let successful = true
  for (const activity of changed) {
    const isSuccess = await buildActivity({ path: activity.folder, activity: activity.metadata, versionized: activity.versionized, kill, validate, watch: false })
    successful = successful && isSuccess
  }

  info(`${changed.length} activities built ${successful ? 'successfully' : 'with errors'}`)

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(successful ? 0 : 1)
}
