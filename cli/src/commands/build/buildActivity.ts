import { existsSync } from 'node:fs'
import { cp } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ActivityCompiler, type ActivityMetadata } from '../../classes/ActivityCompiler.js'
import { exit } from '../../util/log.js'

export async function buildActivity({
  path,
  activity,
  versionized,
  watch = false,
  killOnError = true,
}: {
  path: string
  activity: ActivityMetadata
  versionized: boolean
  watch?: boolean
  killOnError?: boolean
}) {
  if (!existsSync(path)) {
    exit(`Activity ${activity.service} not found`)
  }

  // Check if tsconfig.json exists, if not, create it
  if (!existsSync(resolve(path, 'tsconfig.json'))) {
    await cp(
      resolve(fileURLToPath(import.meta.url), `../../../templates/tsconfig${versionized ? '.versionized' : ''}.json`),
      resolve(path, 'tsconfig.json'),
    )
  }

  const compiler = new ActivityCompiler(path, activity)
  if (watch) {
    await compiler.watch()
  }
  else {
    await compiler.compile(true, killOnError)
  }
}
