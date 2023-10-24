const presence = new Presence({
		clientId: "904084297831571518",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/16lVdWy.png",
			smallImageKey: Assets.Search,
			startTimestamp: browsingTimestamp,
		},
		player = document.querySelector<HTMLDivElement>("div.player");

	if (player) {
		const spaceId = player.querySelector(
			"div.container > #spaceId"
		).textContent;
		presenceData.largeImageKey = player.querySelector(
			"div.container > #artwork"
		).textContent;
		presenceData.smallImageKey =
			player.querySelector<HTMLButtonElement>(
				"div.container > div.center-controls > button"
			).id === "play-button"
				? Assets.Pause
				: Assets.Play;
		presenceData.details = player.querySelector<HTMLAnchorElement>(
			"div.container > a > div.track-info > a.track-title"
		).textContent;
		presenceData.state = player.querySelector<HTMLDivElement>(
			"div.container > a > div.track-info > div.track-artist"
		).textContent;
		presenceData.endTimestamp = new Date(
			player.querySelector("div.container > #endingAt").textContent
		).getTime();
		presenceData.smallImageText = spaceId.toUpperCase();
		presenceData.buttons = [
			{ label: "Listen", url: `https://atomic.radio/${spaceId}` },
		];
	} else {
		presenceData.details = "Browsing...";
		if (document.location.pathname.includes("/statistics"))
			presenceData.details = "Viewing statistics";
		else if (document.location.pathname.includes("/streams"))
			presenceData.details = "Viewing stream urls";
		else if (document.location.pathname.includes("/about"))
			presenceData.details = "Viewing about us";
		else if (document.location.pathname.includes("/apply"))
			presenceData.details = "Viewing apply";
		else if (document.location.pathname.includes("/contributors"))
			presenceData.details = "Viewing contributors";
		else if (document.location.pathname.includes("/partners"))
			presenceData.details = "Viewing partners";
		else if (document.location.pathname.includes("/legal/imprint"))
			presenceData.details = "Viewing imprint";
		else if (document.location.pathname.includes("/legal/privacy"))
			presenceData.details = "Viewing privacy";
		else if (document.location.pathname.includes("/account"))
			presenceData.details = "Viewing account";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
