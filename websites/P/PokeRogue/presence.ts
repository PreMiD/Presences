const presence = new Presence({
		clientId: "1238090575924826114",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/P/PokeRogue/assets/logo.png",
}

type gameInfo = {
	gameInfo: {
		playTime: 0;
		gameMode: "";
		biome: "";
		wave: 0;
	};
};
let prevWave: number;

function replacePlaceholders(str: string, data: gameInfo) {
	return str
		.replace("%wave%", `Wave: ${data.gameInfo.wave} |`)
		.replace("%biome%", `Biome: ${data.gameInfo.biome} |`)
		.replace("%playtime%", `Playtime: ${data.gameInfo.playTime} min |`)
		.replace("%mode%", `Mode: ${data.gameInfo.gameMode} |`)
		.slice(0, -2);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[timePer, gameDetails, gameStates] = await Promise.all([
			presence.getSetting<boolean>("timePer"),
			presence.getSetting<string>("gameDetail"),
			presence.getSetting<string>("gameState"),
		]),
		data: gameInfo = await presence.getPageVariable("gameInfo");

	if (!data) return;
	if (!data.gameInfo.biome || (!gameDetails && !gameStates)) {
		presenceData.details = "Browsing...";
		return presence.setActivity(presenceData);
	}

	presenceData.details = replacePlaceholders(gameDetails, data);

	if (gameStates !== "{0}")
		presenceData.state = replacePlaceholders(gameStates, data);

	if (timePer && !prevWave) prevWave = data.gameInfo.wave;
	else if (timePer && prevWave !== data.gameInfo.wave)
		delete presenceData.startTimestamp;

	presence.setActivity(presenceData);
});
