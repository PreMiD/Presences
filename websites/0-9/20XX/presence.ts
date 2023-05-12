const presence = new Presence({
	clientId: "719179907518693427",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

interface Data20XX {
	user?: {
		displayName: string;
		isGuest: boolean;
		isDonator: boolean;
		username: string;
		rank?: number;
	};
	serverInfo?: {
		name: string;
		location: string;
		description: string;
	};
	game?: {
		character: string;
		gameOver: boolean;
		info: {
			gametype: string;
			maxplayers: number;
			players: number;
			name: string;
			objective: number;
			scoreToWin: number;
			teams: number;
		};
		score: {
			death: number;
			kill: number;
			name: string;
			objective: number;
			team: number;
		};
		map?: string;
	};
	nav: string;
}

let data20XX: Data20XX = null;

interface ItemMap {
	[key: string]: string;
}

// A map of character prefixes with their names.
const characterNameMap: ItemMap = {
		box: "Box",
		crt: "Crate",
		qua: "Quad",
		vox: "Voxel",
		blk: "Block",
		crg: "Cargo",
		inf: "Plus",
		cub: "Cube",
	},
	// A map of map IDs with their names.
	mapNameMap: ItemMap = {
		attack: "Attack Area",
		battle: "Battle Field",
		big: "Big Place",
		area: "404",
		combat: "Combat Zone",
		final: "Final Destination",
		location: "Last Location",
		platform: "Penultimate Platform",
		point: "Prerequisite Point",
		position: "Primary Position",
		vector: "Veritable Vector",
		war: "War Ground",
		dig: "Dig",
		unearth: "Unearth",
		excavate: "Excavate",
	};

// The timestamp of the first time a game was detected.
let gameStartTimestamp: number = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/yamlw9T.png",
	};

	if (data20XX) {
		switch (data20XX.nav) {
			case "setgame":
				presenceData.details = "Changing Game Settings";
				break;
			case "setgraphic":
				presenceData.details = "Changing Graphic Settings";
				break;
			case "stat":
				presenceData.details = "Looking at Player Stats";
				break;
			case "unlock":
				presenceData.details = "Looking at Unlocks";
				break;
			case "lobby":
				presenceData.details = "In Lobby Select";
				break;
			default:
				presenceData.details = "Main Menu";
		}

		if (data20XX.user) {
			presenceData.state = `${data20XX.user.displayName} (${
				data20XX.user.isGuest ? "guest" : `rank ${data20XX.user.rank}`
			})`;
			if (data20XX.serverInfo)
				presenceData.state += ` in ${data20XX.serverInfo.location}`;
		}

		if (data20XX.game) {
			presenceData.details = `In-Game - ${data20XX.game.info.gametype} (${data20XX.game.info.players}/${data20XX.game.info.maxplayers})`;

			gameStartTimestamp ??= Date.now();

			// Character
			presenceData.smallImageKey = `char_${
				data20XX.game.character.split("_")[0]
			}`;
			presenceData.smallImageText =
				characterNameMap[data20XX.game.character.split("_")[0]];

			// Map
			if (data20XX.game.map) {
				presenceData.largeImageKey = `map_${data20XX.game.map}`;
				presenceData.smallImageText = `${mapNameMap[data20XX.game.map]} - ${
					presenceData.smallImageText
				}`;
			}

			presenceData.startTimestamp = gameStartTimestamp;
		} else gameStartTimestamp = null;
	} else if (location.pathname.endsWith("/help.html"))
		presenceData.details = "Reading the Help Document";
	else if (location.pathname.endsWith("/rules.html"))
		presenceData.details = "Reading the Rules";
	else if (location.pathname.endsWith("/tos.html"))
		presenceData.details = "Reading the Terms of Service";

	if (!(await presence.getSetting<boolean>("showName")))
		delete presenceData.state;

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});

presence.on("iFrameData", (data: Data20XX) => {
	data20XX = data;
});
