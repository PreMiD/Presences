import type { ActivityMetadata } from '../classes/ActivityCompiler.js'
import { readFile } from 'node:fs/promises'
import process from 'node:process'
import { globby } from 'globby'

export async function getActivities(): Promise<ActivityMetadata[]> {
  return (await Promise.all(
    (
      await globby([`${process.cwd()}/websites/*/*/metadata.json`, `${process.cwd()}/websites/*/*/v*/metadata.json`])
    ).map(async (file): Promise<ActivityMetadata> => JSON.parse(await readFile(file, 'utf-8'))),
  )).sort((a, b) => {
    if (a.service !== b.service)
      return a.service.localeCompare(b.service)
    return a.apiVersion - b.apiVersion
  })
}
