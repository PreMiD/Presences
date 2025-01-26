import { existsSync } from 'node:fs'
import { cp } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { ActivityCompiler, type ActivityMetadata } from '../../classes/ActivityCompiler.js'
import { exit } from '../../util/log.js'

export async function buildActivity({
  path,
  activity,
  versionized,
  watch,
  kill,
  checkMetadata,
}: {
  path: string
  activity: ActivityMetadata
  versionized: boolean
  watch: boolean
  kill: boolean
  checkMetadata: boolean
}): Promise<boolean> {
  if (!existsSync(path)) {
    exit(`Activity ${activity.service} not found`)
  }

  // Check if tsconfig.json exists, if not, create it
  if (!existsSync(resolve(path, 'tsconfig.json'))) {
    await cp(
      resolve(process.cwd(), `cli/templates/tsconfig${versionized ? '.versionized' : ''}.json`),
      resolve(path, 'tsconfig.json'),
    )
  }

  const compiler = new ActivityCompiler(path, activity, versionized)
  if (watch) {
    await compiler.watch({ checkMetadata })
    return true
  }
  else {
    return await compiler.compile({ kill, checkMetadata, preCheck: true })
  }
}
