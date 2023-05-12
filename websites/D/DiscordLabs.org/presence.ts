const presence = new Presence({
		clientId: "660894911331172372",
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
let priceEls;

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/f22iobC.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "bots.discordlabs.org") {
		presenceData.details = "Viewing Page:";
		presenceData.state = "DiscordLabs Bot List";

		if (document.location.pathname.includes("/partners")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "DiscordLabs Partners";
		} else if (document.location.pathname.includes("/profile/")) {
			priceEls = document.querySelectorAll(".uname");
			for (const priceEl of priceEls) {
				presenceData.details = "Viewing a profile:";
				presenceData.state = (priceEl as HTMLElement).textContent;
			}
		} else if (document.location.pathname.includes("/submit/")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "DiscordLabs Bot Sumbit";
		} else if (document.location.pathname.includes("/submit")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "DiscordLabs Bot Sumbit";
		} else if (document.location.pathname.includes("/search/")) {
			presenceData.details = "Search for:";
			presenceData.state = window.location.href
				.slice(39)
				.replaceAll("+|%20", " ");
		} else if (document.location.pathname.includes("/bot/")) {
			priceEls = document.querySelectorAll(".botname");
			for (const priceEl of priceEls) {
				presenceData.details = "Viewing a Discord bot:";
				presenceData.state = (priceEl as HTMLElement).textContent;
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
