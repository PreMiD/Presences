import { success } from '../../util/log.js'
import process from 'node:process'
import { dirname, resolve } from 'node:path'
import { buildActivity } from './buildActivity.js'
import { readFile } from 'node:fs/promises'
import { getFolderLetter } from '../../util/getFolderLetter.js'
import { ActivityMetadata } from '../../classes/ActivityCompiler.js'
import { sanitazeFolderName } from '../../util/sanitazeFolderName.js'
import { getChangedActivities } from '../../util/getActivities.js'

export async function buildChanged({ kill, bumpCheck }: { kill: boolean, bumpCheck: boolean }) {
  const changedActivities = await getChangedActivities()
  if (changedActivities.length === 0) {
    success('No changed activities found')
  }

  const activitiesToBuild: Parameters<typeof buildActivity>[0][] = []
  for (const activity of changedActivities) {
    try {
      const directory = dirname(activity)
      const metadata: ActivityMetadata = JSON.parse(await readFile(activity, 'utf-8'))
      const folderLetter = getFolderLetter(metadata.service)
      const sanitazedActivity = sanitazeFolderName(metadata.service)
      const path = resolve(process.cwd(), 'websites', folderLetter, sanitazedActivity)
      const versionized = path !== directory

      activitiesToBuild.push({ path: directory, activity: metadata, versionized, kill, bumpCheck, watch: false })
    } catch {}
  }

  if (activitiesToBuild.length === 0) {
    success('No changed activities found')
  }

  for (const activity of activitiesToBuild) {
    await buildActivity(activity)
  }
}
