import { getWorkspaceName } from "../lib/workspace";
import { Assets } from "../presence";

export function Profile(): PresenceData | null {
	return {
		smallImageKey: Assets.Profile,
		smallImageText: "Profile",
		details: getWorkspaceName(),
		state: "Viewing their profile",
	} as PresenceData;
}
