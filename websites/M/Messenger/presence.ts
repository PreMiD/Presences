const presence = new Presence({
		clientId: "630896385889271819",
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
			largeImageKey: "https://i.imgur.com/Ij0u52Z.png",
			startTimestamp: browsingTimestamp,
		},
		[messageRecipient, callRecipient] = await Promise.all([
			presence.getSetting<boolean>("message"),
			presence.getSetting<boolean>("call"),
		]);

	if (document.location.pathname.includes("/groupcall/")) {
		const users = document
			.querySelector("div > div > span")
			?.textContent?.split(", ")
			?.slice(1);
		if (users) {
			if (new URLSearchParams(location.search).get("has_video") === "true") {
				presenceData.details = "In a video call with:";
				presenceData.smallImageKey = "videocall";
			} else {
				presenceData.details = "In a call with:";
				presenceData.smallImageKey = Assets.Call;
			}
			presenceData.state = callRecipient ? users.join(", ") : "(Hidden)";
		} else if (document.querySelector("span")?.textContent) {
			presenceData.details = "In a Messenger room";
			presenceData.smallImageKey = Assets.Call;
		} else presenceData.details = "Joining a call...";
	} else if (document.location.pathname.includes("/t/")) {
		if (!document.querySelector('[data-text="true"]')?.textContent) {
			presenceData.details = "Reading messages from:";
			presenceData.smallImageKey = Assets.Reading;
		} else {
			presenceData.details = "Writing to:";
			presenceData.smallImageKey = Assets.Writing;
		}
		presenceData.state = messageRecipient
			? document.querySelector("div.t6p9ggj4.tkr6xdv7 span > span")
					?.textContent ?? "Unknown"
			: "(Hidden)";
	} else if (document.location.pathname.includes("/new")) {
		presenceData.details = "Composing a new message";
		presenceData.smallImageKey = Assets.Writing;
	} else if (document.location.pathname.includes("/about"))
		presenceData.details = "Viewing the about page";

	presence.setActivity(presenceData);
});
