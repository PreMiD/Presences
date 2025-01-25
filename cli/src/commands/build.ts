import { getActivities } from '../util/getActivities.js'
import { buildAll } from './build/buildAll.js'
import { buildChanged } from './build/buildChanged.js'
import { buildSingle } from './build/buildSingle.js'

export async function build(service?: string, {
  watch = false,
  all = false,
  changed = false,
  kill = true,
  bumpCheck = false,
}: {
  watch?: boolean
  all?: boolean
  changed?: boolean
  kill?: boolean
  bumpCheck?: boolean
} = {}) {
  const activities = await getActivities()

  if (changed)
    return buildChanged({ kill, bumpCheck })
  if (all)
    return buildAll(activities, { kill, bumpCheck })

  return buildSingle(activities.map(({ metadata }) => metadata), service, { watch, bumpCheck})
}
