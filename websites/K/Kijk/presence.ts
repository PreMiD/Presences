const presence = new Presence({
		clientId: "812413011502825504",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, title2: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		search = document.querySelector<HTMLInputElement>(
			"#__next > div > div > div.SearchModalstyle__SearchModalStyle-sc-1h6b5wy-0.knmuVj > div.SearchModalstyle__SearchModalHeaderStyle-sc-1h6b5wy-1.kNvWZE > div > div:nth-child(2) > div.SearchModalstyle__SearchModalInputWrapperStyle-sc-1h6b5wy-5.iwOFOK > input"
		),
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (privacy) presenceData.details = "Browsing...";
	else if (search.value) {
		presenceData.details = "Zoekt voor:";
		presenceData.state = search.value;
		presenceData.smallImageKey = "searching";
	} else if (page === "/") presenceData.details = "Bekijkt de homepagina";
	else if (page.includes("/films/")) {
		delete presenceData.startTimestamp;

		title2 = JSON.parse(document.querySelector("#__NEXT_DATA__").innerHTML)
			.props.pageProps.initialMovies[0].title;
		title = document.querySelector("#player");
		if (buttons) {
			presenceData.buttons = [
				{
					label: `Bekijk ${title2}`,
					url: document.location.href,
				},
			];
		}
		if (
			!title.className.includes("paused") &&
			!title.className.includes("playing")
		) {
			presenceData.details = "Bekijkt:";
			presenceData.state = title2;
		} else {
			presenceData.details = title2;
			if (title.className.includes("playing")) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					presence.timestampFromFormat(
						document.querySelector(
							"#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed"
						).textContent
					),
					presence.timestampFromFormat(
						document.querySelector(
							"#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration"
						).textContent
					)
				);
				presenceData.smallImageKey = "play";
			} else {
				presenceData.details = "Bekijkt:";
				presenceData.state = title2;
			}
		}
	} else if (page.includes("/films")) presenceData.details = "Bekijkt Films";
	else if (page.includes("/programmas/")) {
		delete presenceData.startTimestamp;

		title2 = JSON.parse(document.querySelector("#__NEXT_DATA__").innerHTML)
			.props.pageProps.video.series.title;
		title = document.querySelector("#player");
		if (buttons) {
			presenceData.buttons = [
				{
					label: `Bekijk ${title2}`,
					url: document.location.href,
				},
			];
		}
		if (title.className.includes("jw-state-paused")) {
			presenceData.details = title2;
			delete presenceData.endTimestamp;
			presenceData.smallImageKey = "pause";
		} else if (title.className.includes("jw-state-playing")) {
			presenceData.details = title2;
			[, presenceData.endTimestamp] = presence.getTimestamps(
				presence.timestampFromFormat(
					document.querySelector(
						"#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed"
					).textContent
				),
				presence.timestampFromFormat(
					document.querySelector(
						"#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration"
					).textContent
				)
			);
			presenceData.smallImageKey = "play";
		} else {
			presenceData.details = "Bekijkt:";
			presenceData.state = title2;
		}
	} else if (page.includes("/programmas"))
		presenceData.details = "Bekijkt Films";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
