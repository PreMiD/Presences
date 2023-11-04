const presence = new Presence({
		clientId: "904084297831571518",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/A/atomicradio/assets/logo.png",
			smallImageKey: Assets.Search,
			startTimestamp: browsingTimestamp,
		},
		player = document.querySelector<HTMLDivElement>("div.player"),
		{ pathname } = document.location;

	if (player) {
		const spaceId = player.querySelector("#spaceId").textContent;
		presenceData.largeImageKey = player.querySelector("#artwork").textContent;
		presenceData.smallImageKey =
			player.querySelector<HTMLButtonElement>('[id*="-button"]').id ===
			"play-button"
				? Assets.Play
				: Assets.Pause;
		presenceData.details =
			player.querySelector<HTMLAnchorElement>("div.track-title").textContent;
		presenceData.state =
			player.querySelector<HTMLDivElement>("div.track-artist").textContent;
		presenceData.endTimestamp = new Date(
			player.querySelector("#endingAt").textContent
		).getTime();
		presenceData.smallImageText = spaceId.toUpperCase();
		presenceData.buttons = [
			{ label: "Listen", url: `https://atomic.radio/${spaceId}` },
		];
	} else {
		presenceData.details = "Browsing...";
		if (pathname.includes("/statistics"))
			presenceData.details = "Viewing statistics";
		else if (pathname.includes("/streams"))
			presenceData.details = "Viewing stream urls";
		else if (pathname.includes("/about"))
			presenceData.details = "Viewing about us";
		else if (pathname.includes("/apply"))
			presenceData.details = "Viewing apply";
		else if (pathname.includes("/contributors"))
			presenceData.details = "Viewing contributors";
		else if (pathname.includes("/partners"))
			presenceData.details = "Viewing partners";
		else if (pathname.includes("/legal/imprint"))
			presenceData.details = "Viewing imprint";
		else if (pathname.includes("/legal/privacy"))
			presenceData.details = "Viewing privacy";
		else if (pathname.includes("/account"))
			presenceData.details = "Viewing account";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
