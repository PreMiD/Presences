import { buildAll } from './build/buildAll.js'
import { buildChanged } from './build/buildChanged.js'
import { buildSingle } from './build/buildSingle.js'

export async function build(service?: string, {
  watch = false,
  all = false,
  changed = false,
  kill = true,
  checkMetadata = false,
  sarif = false,
}: {
  watch?: boolean
  all?: boolean
  changed?: boolean
  kill?: boolean
  checkMetadata?: boolean
  sarif?: boolean
} = {}) {
  if (changed)
    return buildChanged({ kill, checkMetadata, sarif })
  if (all)
    return buildAll({ kill, checkMetadata, sarif })

  return buildSingle(service, { watch, checkMetadata, sarif, kill })
}
