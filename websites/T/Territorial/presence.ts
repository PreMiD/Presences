const presence = new Presence({
		clientId: "1014903980410802237",
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
			largeImageKey: "https://i.imgur.com/8vXevly.png",
			startTimestamp: browsingTimestamp,
		},
		{ href } = document.location,
		buttons = await presence.getSetting<boolean>("buttons"),
		context = document
			.querySelector<HTMLCanvasElement>("#canvasA")
			.getContext("2d");
	let tryOne: number;
	const start = context.getImageData(100, 550, 400, 60).data[0];
	if (start === 57 || start === 27 || start === 45) {
		tryOne = Number(context.getImageData(810, 140, 400, 60).data[0]);
		tryOne === 55
			? (presenceData.details = "Viewing clans leaderboard")
			: tryOne === 4
			? (presenceData.details = "Viewing players leaderboard")
			: context.getImageData(810, 80, 400, 60).data[0] === 68
			? (presenceData.details = "Viewing clans leaderboard")
			: (tryOne = context.getImageData(780, 160, 400, 60).data[0]) === 254 ||
			  tryOne === 8
			? (presenceData.details = "Viewing emoji menu")
			: (tryOne = context.getImageData(1380, 60, 400, 60).data[0]) === 8 ||
			  tryOne === 56
			? (presenceData.details = "Viewing options")
			: (tryOne = context.getImageData(1400, 80, 400, 60).data[0]) === 94 ||
			  tryOne === 46
			? (presenceData.details = "Viewing options")
			: (tryOne = context.getImageData(500, 220, 400, 60).data[0]) === 14 ||
			  tryOne === 6
			? (presenceData.details = "Viewing color options")
			: (tryOne = context.getImageData(500, 60, 400, 60).data[0]) === 14 ||
			  tryOne === 6
			? (presenceData.details = "Viewing color options")
			: (presenceData.details = "Viewing main menu");

		presenceData.buttons = [{ label: "View Menu", url: href }];
	} else if (
		context.getImageData(1020, 540, 400, 60).data[0] === 255 ||
		context.getImageData(1116, 502, 400, 60).data[0] === 255
	)
		presenceData.details = "The game has ended";
	else {
		presenceData.details = "Playing the game";
		presenceData.buttons = [{ label: "Play", url: href }];
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
