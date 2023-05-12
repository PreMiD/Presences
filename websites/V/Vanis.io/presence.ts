const presence = new Presence({
	clientId: "759926761554313218",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

// Timestamp
function getTimeStamp() {
	return Math.floor(Date.now() / 1000);
}

// Variables
let Server: string, Region: string, Nickname: string, Mass: string;

presence.on("UpdateData", async () => {
	// Presence Data
	const presenceData: PresenceData = { largeImageKey: "vanis_image" },
		massElement = document.querySelector("#hud .stats div:nth-child(3)"),
		overlay = <HTMLElement>document.querySelector("#overlay");

	if (overlay.style.display !== "none") {
		// Game not Ready
		const RegionElement = document.querySelector("#tab-menu .tabs .tab.active"),
			ServerElement = document.querySelector(
				"#tab-menu .server-list .active .server-name"
			),
			NicknameElement = <HTMLInputElement>(
				document.querySelector("#player-data #nickname")
			);

		// Data Update
		Region = RegionElement && RegionElement.textContent.trim();
		Server = ServerElement && ServerElement.textContent.trim();
		Nickname = NicknameElement && NicknameElement.value;
		Mass = massElement && massElement.textContent.split(":")[1].trim();
	} else {
		// Game Started
		Mass = massElement && massElement.textContent.split(":")[1].trim();
	}

	if (overlay.style.display !== "none" && Mass.startsWith("0")) {
		presenceData.details = "Main menu";
		presenceData.startTimestamp = getTimeStamp();
	} else {
		presenceData.details = `Playing on server: ${Region} | ${Server}`;
		presenceData.state = `Player: ${Nickname} | Mass: ${Mass}`;
		presenceData.startTimestamp = getTimeStamp();
	}

	presence.setActivity(presenceData, true);
});
