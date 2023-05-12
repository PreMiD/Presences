const presence = new Presence({
		clientId: "1001436152873623683",
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
	const [privacyMode, showActiveChatAvatar] = await Promise.all([
			presence.getSetting<boolean>("privacyMode"),
			presence.getSetting<boolean>("showActiveChatAvatar"),
		]),
		presenceData: PresenceData = {
			details: "Other",
			largeImageKey: "https://i.imgur.com/dr9SkT5.png",
			startTimestamp: browsingTimestamp,
		},
		activeChat = document.querySelector<HTMLDivElement>(
			".deg2K div.O4POs.qFDXZ"
		),
		activeChatUsername = activeChat?.querySelector<HTMLSpanElement>(
			"span.mYSR9 > span.FiLwP"
		)?.textContent;

	if (activeChatUsername) {
		const avatar =
				activeChat?.querySelector<HTMLImageElement>("img.Dozhe")?.src,
			snapStreak =
				activeChat?.querySelectorAll("div.ovUsZ > span")[4]?.textContent;

		presenceData.details = "Chatting with";
		presenceData.state = !privacyMode ? activeChatUsername : "somebody";

		if (!privacyMode && snapStreak) presenceData.state += ` | ${snapStreak}`;

		if (showActiveChatAvatar && avatar) {
			presenceData.largeImageKey = avatar;
			presenceData.smallImageKey = "logo";
		}
	}

	if (presenceData.details && window.location.pathname.split("/")[1])
		presence.setActivity(presenceData);
	else presence.setActivity();
});
