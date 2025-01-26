import type { ActivityMetadata } from '../../classes/ActivityCompiler.js'
import { readFile } from 'node:fs/promises'
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

  const activitiesToBuild: Parameters<typeof buildActivity>[0][] = []
  for (const activity of changedActivities) {
    try {
      const metadata: ActivityMetadata = JSON.parse(await readFile(resolve(activity, 'metadata.json'), 'utf-8'))
      const folderLetter = getFolderLetter(metadata.service)
      const sanitazedActivity = sanitazeFolderName(metadata.service)
      const path = resolve(process.cwd(), 'websites', folderLetter, sanitazedActivity)
      const versionized = path !== activity

      activitiesToBuild.push({ path: activity, activity: metadata, versionized, kill, checkMetadata, watch: false })
    }
    catch {}
  }

  if (activitiesToBuild.length === 0) {
    success('No changed activities found')
  }

  info(`Building ${activitiesToBuild.length} activities...`)

  let successful = true
  for (const activity of activitiesToBuild) {
    const isSuccess = await buildActivity(activity)
    successful = successful && isSuccess
  }

  info(`${activitiesToBuild.length} activities built ${successful ? 'successfully' : 'with errors'}`)

  if (sarif) {
    await writeSarifLog()
  }

  process.exit(successful ? 0 : 1)
}
