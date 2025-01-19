import { getRealtimeEndpoint } from '../lib/realtime'
import { getWorkspaceName } from '../lib/workspace'
import { Assets } from '../presence'

export function ServerSentEvents(): PresenceData | null {
  const endpoint = getRealtimeEndpoint()

  if (!endpoint)
    return null

  return {
    smallImageKey: Assets.ServerSentEvents,
    smallImageText: 'Server Sent Events',
    details: getWorkspaceName(),
    state: `🧑‍💻 | ${endpoint}`,
  }
}
