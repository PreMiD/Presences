const presence = new Presence({
	clientId: "719179907518693427",
});

const assets: Record<string, string> = {
  "char_box": "https://cdn.discordapp.com/app-assets/719179907518693427/719212571315535966.png?size=512",
  "char_crt": "https://cdn.discordapp.com/app-assets/719179907518693427/719213263115518074.png?size=512",
  "char_vox": "https://cdn.discordapp.com/app-assets/719179907518693427/719213359064678490.png?size=512",
  "char_blk": "https://cdn.discordapp.com/app-assets/719179907518693427/719213513964388402.png?size=512",
  "char_crg": "https://cdn.discordapp.com/app-assets/719179907518693427/719213666326675559.png?size=512",
  "char_qua": "https://cdn.discordapp.com/app-assets/719179907518693427/719213759524110366.png?size=512",
  "char_inf": "https://cdn.discordapp.com/app-assets/719179907518693427/719214624515555398.png?size=512",
  "map_attack": "https://cdn.discordapp.com/app-assets/719179907518693427/719233088147947570.png?size=512",
  "map_area": "https://cdn.discordapp.com/app-assets/719179907518693427/719233091410984970.png?size=512",
  "map_combat": "https://cdn.discordapp.com/app-assets/719179907518693427/719233092493115534.png?size=512",
  "map_point": "https://cdn.discordapp.com/app-assets/719179907518693427/719233093562794015.png?size=512",
  "map_final": "https://cdn.discordapp.com/app-assets/719179907518693427/719233094166643061.png?size=512",
  "map_vector": "https://cdn.discordapp.com/app-assets/719179907518693427/719233094481215508.png?size=512",
  "map_location": "https://cdn.discordapp.com/app-assets/719179907518693427/719233095697563668.png?size=512",
  "map_position": "https://cdn.discordapp.com/app-assets/719179907518693427/719233096611921950.png?size=512",
  "map_dig": "https://cdn.discordapp.com/app-assets/719179907518693427/719233097148923995.png?size=512",
  "map_battle": "https://cdn.discordapp.com/app-assets/719179907518693427/719233097463365652.png?size=512",
  "map_war": "https://cdn.discordapp.com/app-assets/719179907518693427/719233097639657523.png?size=512",
  "map_platform": "https://cdn.discordapp.com/app-assets/719179907518693427/719233098000236655.png?size=512",
  "map_big": "https://cdn.discordapp.com/app-assets/719179907518693427/719233098444832780.png?size=512",
  "map_excavate": "https://cdn.discordapp.com/app-assets/719179907518693427/719233100525076630.png?size=512",
  "map_unearth": "https://cdn.discordapp.com/app-assets/719179907518693427/719233101238370424.png?size=512",
  "20xx": "https://cdn.discordapp.com/app-assets/719179907518693427/719779654654886032.png?size=512",
  "char_cub": "https://cdn.discordapp.com/app-assets/719179907518693427/741868633847758849.png?size=512",
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
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/0-9/20XX/assets/logo.png",
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
			presenceData.smallImageKey = assets[`char_${
				data20XX.game.character.split("_")[0]
			}`];
			presenceData.smallImageText =
				characterNameMap[data20XX.game.character.split("_")[0]];

			// Map
			if (data20XX.game.map) {
				presenceData.largeImageKey = assets[`map_${data20XX.game.map}`];
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
