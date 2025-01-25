import type { ActivityMetadata } from '../classes/ActivityCompiler.js'
import { readFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import process from 'node:process'
import { globby } from 'globby'

export interface ActivityMetadataAndFolder {
  metadata: ActivityMetadata
  folder: string
}

export async function getActivities(): Promise<ActivityMetadataAndFolder[]> {
  return (await Promise.all(
    (
      await globby([`${process.cwd()}/websites/*/*/metadata.json`, `${process.cwd()}/websites/*/*/v*/metadata.json`])
    ).map(async (file): Promise<ActivityMetadataAndFolder> => ({
      metadata: JSON.parse(await readFile(file, 'utf-8')),
      folder: dirname(file),
    })),
  )).sort(({ metadata: a }, { metadata: b }) => {
    if (a.service !== b.service)
      return a.service.localeCompare(b.service)
    return a.apiVersion - b.apiVersion
  })
}
