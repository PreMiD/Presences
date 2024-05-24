import { Assets } from "../presence";
import { getWorkspaceName } from "../lib/workspace";
import { getRealtimeEndpoint } from "../lib/realtime";

export function SocketIO(): PresenceData | null {
	const endpoint = getRealtimeEndpoint();

	if (!endpoint) return null;

	return {
		smallImageKey: Assets.SocketIO,
		smallImageText: "Socket.IO",
		details: getWorkspaceName(),
		state: `🧑‍💻 | ${endpoint}`,
	};
}
