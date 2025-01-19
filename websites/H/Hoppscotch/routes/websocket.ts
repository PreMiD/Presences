import { getRealtimeEndpoint } from '../lib/realtime'
import { getWorkspaceName } from '../lib/workspace'
import { Assets } from '../presence'

export function Websocket(): PresenceData | null {
  const endpoint = getRealtimeEndpoint()

  if (!endpoint)
    return null

  return {
    smallImageKey: Assets.Websocket,
    smallImageText: 'Websocket',
    details: getWorkspaceName(),
    state: `🧑‍💻 | ${endpoint}`,
  }
}
