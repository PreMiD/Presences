import { Assets } from "../presence";
import { getWorkspaceName } from "../lib/workspace";

export function Settings(): PresenceData {
	return {
		smallImageKey: Assets.Settings,
		smallImageText: "Settings",
		details: getWorkspaceName(),
		state: "Configuring settings",
	};
}
