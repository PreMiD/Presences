const presence = new Presence({
		clientId: "970659747021877318",
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
			largeImageKey: "https://i.imgur.com/VD9G5DE.png",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (privacy) presenceData.details = "Browsing...";
	else if (document.location.hostname.includes("store")) {
		if (document.querySelector("#decus-modal").className.includes("is-open")) {
			presenceData.details = document.querySelector(
				"#decus-modal > div > div > div.modal__header > h4"
			).textContent;
		} else if (page === "/") presenceData.details = "Homepage";
		else if (page.includes("/category/")) {
			const title = document.querySelector(
				"body > div.decus-wrapper > div.body > div.content > div > div.panel-heading"
			)?.textContent;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Category",
						url: document.location.href,
					},
				];
			}
			presenceData.details = document
				.querySelector("[class='dropdown active']")
				.textContent.replace(title, "");
			presenceData.state = `${title} Category`;
		}
	} else if (document.location.hostname.includes("install")) {
		presenceData.details = "Reading:";
		presenceData.state = "Pixelmon Download & Installation Guide";
		presenceData.smallImageKey = Assets.Reading;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
