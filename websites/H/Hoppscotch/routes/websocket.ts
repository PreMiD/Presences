import { Assets } from "../presence";
import { getWorkspaceName } from "../lib/workspace";
import { getRealtimeEndpoint } from "../lib/realtime";

export function Websocket(): PresenceData | null {
	const endpoint = getRealtimeEndpoint();

	if (!endpoint) return null;

	return {
		smallImageKey: Assets.Websocket,
		smallImageText: "Websocket",
		details: getWorkspaceName(),
		state: `🧑‍💻 | ${endpoint}`,
	};
}
