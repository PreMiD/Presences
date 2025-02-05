import { buildAll } from './build/buildAll.js'
import { buildChanged } from './build/buildChanged.js'
import { buildSingle } from './build/buildSingle.js'

export async function build(service?: string, {
  watch = false,
  all = false,
  changed = false,
  kill = true,
  validate = false,
  sarif = false,
}: {
  watch?: boolean
  all?: boolean
  changed?: boolean
  kill?: boolean
  validate?: boolean
  sarif?: boolean
} = {}) {
  if (changed)
    return buildChanged({ kill, validate, sarif })
  if (all)
    return buildAll({ kill, validate, sarif })

  return buildSingle(service, { watch, validate, sarif, kill })
}
