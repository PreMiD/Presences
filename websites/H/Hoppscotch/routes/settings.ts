import { getWorkspaceName } from '../lib/workspace'
import { Assets } from '../presence'

export function Settings(): PresenceData {
  return {
    smallImageKey: Assets.Settings,
    smallImageText: 'Settings',
    details: getWorkspaceName(),
    state: 'Configuring settings',
  }
}
