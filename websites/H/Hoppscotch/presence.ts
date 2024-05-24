import { GraphQL } from "./routes/graphql";
import { MQTT } from "./routes/mqtt";
import { Rest } from "./routes/rest";
import { Settings } from "./routes/settings";
import { SocketIO } from "./routes/socketio";
import { ServerSentEvents } from "./routes/sse";
import { Websocket } from "./routes/websocket";

const presence = new Presence({
	clientId: "792735245488488458",
});

export const enum Assets {
	Logo = "https://hoppscotch.io/icon.png",
	Rest = "https://i.imgur.com/nSEZ5mB.png",
	GraphQL = "https://i.imgur.com/unKFP0O.png",
	Websocket = "https://i.imgur.com/1d69yyz.png",
	ServerSentEvents = "https://i.imgur.com/1yO70KH.png",
	SocketIO = "https://i.imgur.com/bDqkuls.png",
	MQTT = "https://i.imgur.com/CPaISN8.png",
	Settings = "https://i.imgur.com/EVwzrxd.png",
}

const BASE = {
		name: "Hoppscotch",
		largeImageKey: Assets.Logo,
		startTimestamp: Math.floor(Date.now() / 1000),
	},
	Route = {
		"/": Rest,
		"/graphql": GraphQL,
		"/realtime/websocket": Websocket,
		"/realtime/sse": ServerSentEvents,
		"/realtime/socketio": SocketIO,
		"/realtime/mqtt": MQTT,
		"/settings": Settings,
	} as {
		[key: string]: () => PresenceData | null;
	};

presence.on("UpdateData", async () => {
	const currentRoute = Route[document.location.pathname];

	if (!currentRoute) return;

	const presenceData = currentRoute();

	if (presenceData === null) return;

	presence.setActivity({ ...BASE, ...presenceData });
});
