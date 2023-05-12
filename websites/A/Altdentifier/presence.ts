const presence = new Presence({
		clientId: "656152542429839380",
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
		largeImageKey: "https://i.imgur.com/GT29NDe.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "altdentifier.com") {
		if (document.location.pathname.includes("/dashboard")) {
			presenceData.details = "Viewing a servers";
			if (document.location.pathname.includes("/dashboard/")) {
				presenceData.details = "Managing the settings of";
				presenceData.state = `server: ${document
					.querySelector("#body > h1")
					.textContent.replace("Managing ", "")}`;
			}
		} else if (document.location.pathname.includes("/blog")) {
			presenceData.details = "Reading a blog";
			presenceData.smallImageKey = Assets.Reading;
			if (document.location.pathname.includes("/blog/")) {
				presenceData.details = "Reading a blog article:";
				presenceData.state = document
					.querySelector("body > h1")
					.textContent.toUpperCase();
				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (document.location.pathname.includes("/faq")) {
			presenceData.details = "Reading a FAQ";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/commands")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Commands";
		} else if (document.location.pathname.includes("/status")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Status";
		} else if (document.location.pathname.includes("/about")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "About";
		} else if (document.location.pathname.includes("/premium")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Premium";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
