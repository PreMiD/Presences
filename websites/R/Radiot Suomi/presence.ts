const presence = new Presence({
		clientId: "749977202275123362",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/nhxjVmG.png",
	};
	if (document.location.hostname === "www.radio-suomi.com") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "🌐 Etusivulla";
		} else if (document.querySelector(".song-name")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `📻 ${
				document.querySelector(".mdc-typography--display1").textContent
			}`;
			presenceData.state = `🎵 ${
				document.querySelector(".song-name").textContent
			}`;
		} else {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `📻 ${
				document.querySelector(".mdc-typography--display1").textContent
			}`;
			presenceData.state = "🎵 Ei saatavilla";
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
