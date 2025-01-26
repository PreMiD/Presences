import { existsSync } from 'node:fs'
import { cp } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { endGroup, startGroup } from '@actions/core'
import isCI from 'is-ci'
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
  if (isCI)
    startGroup(activity.service)

  if (!existsSync(path)) {
    if (isCI)
      endGroup()

    if (kill) {
      exit(`Activity ${activity.service} not found`)
    }
    else {
      return false
    }
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

    if (isCI)
      endGroup()

    return true
  }
  else {
    const success = await compiler.compile({ kill, checkMetadata, preCheck: true })

    if (isCI)
      endGroup()

    return success
  }
}
