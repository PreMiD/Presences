const presence = new Presence({
		clientId: "938606998650519663",
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
			details: "Viewing an unsupported page",
			largeImageKey: "https://i.imgur.com/b7Go6NC.png",
			startTimestamp: browsingTimestamp,
		},
		page = document.location.pathname,
		[time, buttons, images] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("images"),
		]);

	if (page === "/") presenceData.details = "Browsing home page";
	else if (page.includes("/user")) {
		presenceData.details = "Viewing profile:";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>(
				"div.username"
			).firstChild.textContent;
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(".avatar img").src;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.URL,
			},
		];
	} else if (page.includes("/leaderboard"))
		presenceData.details = "Viewing Leaderboard";
	else if (page.includes("/rewards")) presenceData.details = "Viewing Rewards";
	else if (page.includes("/profile")) presenceData.details = "Editing Profile";
	else if (
		document.querySelector<HTMLHeadingElement>(
			"div.col-lg-6 div.text-center h3"
		)
	) {
		const gameImage = document
			.querySelector<HTMLImageElement>("div.game-card__image")
			.style.backgroundImage.slice(4, -1)
			.replaceAll('"', "");
		presenceData.details = "Viewing game:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"div.col-lg-6 div.text-center h3"
		).textContent;
		if (gameImage !== "null") presenceData.largeImageKey = gameImage;
		presenceData.buttons = [
			{
				label: "View Game",
				url: document.URL,
			},
		];
	} else if (page.includes("/activity")) {
		presenceData.details = "Viewing game activity:";
		presenceData.state = document.querySelectorAll<HTMLAnchorElement>(
			"div.card-body.pt-2.pb-2 a.active"
		)[1].textContent;
		presenceData.buttons = [
			{
				label: "View Game Activity",
				url: document.URL,
			},
		];
	} else if (
		page.includes("/translate") &&
		!document.querySelector<HTMLDivElement>(
			"div.align-items-center.d-flex div.alert.alert-warning"
		)
	) {
		presenceData.details = `Translating ${
			document.querySelector<HTMLHeadingElement>("div.mx-md-2.m-0 a")
				.textContent
		}`;
		presenceData.state = `Key: ${
			document.querySelector<HTMLDivElement>(
				"div.d-flex.align-items-center.mt-2 div.text-break"
			).textContent
		}`;
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>("img.image").src;
		presenceData.smallImageKey = Assets.Writing;
		presenceData.smallImageText = `Translating to${
			document.querySelector<HTMLDivElement>(
				"div.og-multi-select__content__selection"
			).textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Game",
				url: document.URL.split("/translate").join(""),
			},
		];
	}

	if (!time) delete presenceData.startTimestamp;
	if (!images && presenceData.largeImageKey)
		presenceData.largeImageKey = "https://i.imgur.com/b7Go6NC.png";
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
