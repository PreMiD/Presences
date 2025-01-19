import { getRealtimeEndpoint } from '../lib/realtime'
import { getWorkspaceName } from '../lib/workspace'
import { Assets } from '../presence'

export function MQTT(): PresenceData | null {
  const endpoint = getRealtimeEndpoint()

  if (!endpoint)
    return null

  return {
    smallImageKey: Assets.MQTT,
    smallImageText: 'MQTT',
    details: getWorkspaceName(),
    state: `🧑‍💻 | ${endpoint}`,
  }
}
