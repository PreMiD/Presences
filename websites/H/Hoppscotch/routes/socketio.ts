import { getRealtimeEndpoint } from '../lib/realtime'
import { getWorkspaceName } from '../lib/workspace'
import { Assets } from '../presence'

export function SocketIO(): PresenceData | null {
  const endpoint = getRealtimeEndpoint()

  if (!endpoint)
    return null

  return {
    smallImageKey: Assets.SocketIO,
    smallImageText: 'Socket.IO',
    details: getWorkspaceName(),
    state: `🧑‍💻 | ${endpoint}`,
  }
}
