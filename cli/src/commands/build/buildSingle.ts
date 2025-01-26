import process from 'node:process'
import { getSingleActivity } from '../../util/getSingleActivity.js'
import { writeSarifLog } from '../../util/sarif.js'
import { buildActivity } from './buildActivity.js'

export async function buildSingle(service: string | undefined, {
  watch,
  checkMetadata,
  sarif,
  kill,
}: {
  watch: boolean
  checkMetadata: boolean
  sarif: boolean
  kill: boolean
}) {
  const { metadata, folder, versionized } = await getSingleActivity(`Select or search for an activity to ${watch ? 'develop' : 'build'}`, service)

  const successful = await buildActivity({ path: folder, activity: metadata, versionized, watch, checkMetadata, kill })

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(successful ? 0 : 1)
}
