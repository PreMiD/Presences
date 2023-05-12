const presence = new Presence({
		clientId: "1036322932932218880",
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
presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/7JEHmcz.png",
			startTimestamp: browsingTimestamp,
		},
		webhookCount = document.querySelectorAll(".evedhr > .dWrjaT").length,
		messageCount = document.querySelectorAll(".jQDPRQ").length,
		embedCount = document.querySelectorAll(".jQDPPo > section").length;

	presenceData.details =
		webhookCount > 1 ? `Editing ${webhookCount} webhooks` : "Editing a webhook";

	presenceData.state = `${messageCount} message${
		messageCount > 1 ? "s" : ""
	} - ${embedCount} embed${embedCount > 1 || embedCount === 0 ? "s" : ""}`;

	presence.setActivity(presenceData);
});
