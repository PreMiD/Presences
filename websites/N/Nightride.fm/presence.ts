const presence = new Presence({
		clientId: "993215633351245964",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/HnZw53P.png",
		},
		songName = `${document.querySelector("#npArtist").textContent} ${
			document.querySelector("#npTitle").textContent
		}`;

	let state;
	if (document.querySelector("body").className.includes("playing")) {
		state = "Playing";
		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = "Playing";
		presenceData.startTimestamp = browsingTimestamp;
	} else {
		state = "Paused";
		presenceData.smallImageKey = Assets.Pause;
		presenceData.smallImageText = "Paused";
		presenceData.endTimestamp;
	}

	presenceData.state = `${state}: ${songName}`;
	presenceData.buttons = [
		{ label: "Go to station", url: document.location.href },
	];

	if (document.location.pathname.includes("/stations"))
		presenceData.details = "Viewing stations";
	else if (document.location.pathname.includes("/news"))
		presenceData.details = "Viewing news";
	else if (document.location.pathname.includes("/milkdrop"))
		presenceData.details = "Viewing milkdrop";
	else if (document.location.pathname.includes("/chat"))
		presenceData.details = "Viewing chat";
	else if (document.location.pathname.includes("/archive"))
		presenceData.details = "Viewing archives";
	else if (document.location.pathname.includes("releases"))
		presenceData.details = "Viewing releases";
	else if (document.location.pathname.includes("/about"))
		presenceData.details = "Viewing details of Nightride.fm";
	else delete presenceData.details;

	presence.setActivity(presenceData);
});
