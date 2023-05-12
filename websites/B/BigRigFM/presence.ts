const presence = new Presence({
		clientId: "985821439829622825",
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
presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/2GSzYEu.png",
			startTimestamp: browsingTimestamp,
		},
		spotifyUrl = document
			.querySelector(".player-artist-text a")
			.getAttribute("href");

	presenceData.details = `${
		document.querySelector(".player-artist-text").textContent
	} - ${document.querySelector(".player-title-text").textContent}`;
	presenceData.state =
		document.querySelector(".live-name")?.textContent || "AutoDJ";

	presenceData.buttons = [
		{
			label: "Tune into BRFM",
			url: "https://bigrig.fm/listen",
		},
	];

	if (spotifyUrl) {
		presenceData.buttons.push({
			label: "Listen on Spotify",
			url: spotifyUrl,
		});
	}

	presence.setActivity(presenceData);
});
