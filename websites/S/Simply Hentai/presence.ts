const presence = new Presence({
	clientId: "608043966285348944",
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
let lastPlaybackState = null,
	reading,
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

if (lastPlaybackState !== reading) {
	lastPlaybackState = reading;
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
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {};

	reading =
		document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;

	if (reading) {
		const [a, b] = document.querySelectorAll<HTMLElement>(
			".margin-bottom-12 h1 a"
		);

		presenceData.details = a.textContent;
		presenceData.state = `${b.textContent} [Page: ${
			document.querySelector<HTMLInputElement>(".page-jump.text-center").value
		}]`;
		presenceData.largeImageKey = "https://i.imgur.com/rs9kEod.png";
		presenceData.startTimestamp = browsingTimestamp;
	} else {
		const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/rs9kEod.png",
		};

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
