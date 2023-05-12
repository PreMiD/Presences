const presence = new Presence({
	clientId: "719732079180644424",
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

interface TrickSplitData {
	gameMode?: string;
	region?: string;
	aliveTime: number;
	pos: number;
	cellCount: number;
	connected: boolean;
}

let tsData: TrickSplitData = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/JdlCrl8.png",
	};

	if (tsData && tsData.connected) {
		presenceData.state = `${tsData.gameMode} on ${tsData.region}`;

		// In game?
		if (!document.querySelector(".end[style*=flex],.menu:not([style*=none])")) {
			// Spectating?
			if (tsData.cellCount === 0) presenceData.details = "Spectating";
			else {
				presenceData.details = `Playing as ${
					localStorage.getItem("nick") || "TrickSplit.io"
				} (#${tsData.pos})`;
				presenceData.startTimestamp = tsData.aliveTime;
			}
		} else presenceData.details = "Main Menu";
	} else presenceData.details = "Connecting...";

	// If data doesn't exist clear else set activity to the presence data
	if (!presenceData.details) {
		// Clear tray
		presence.setActivity(); // Clear activity
	} else presence.setActivity(presenceData);
});

presence.on("iFrameData", (data: TrickSplitData) => {
	tsData = data;
});
