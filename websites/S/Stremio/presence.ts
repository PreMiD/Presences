const presence = new Presence({
		clientId: "969208766807547917",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let timestamp: [number, number],
	pauseCheck: boolean,
	search: HTMLInputElement,
	title: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/6bm1P3r.png",
			startTimestamp: browsingTimestamp,
		},
		{ hash, hostname, href } = document.location,
		[privacy, thumbnails, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("thumbnails"),
			presence.getSetting<boolean>("buttons"),
		]),
		active = document.querySelector(
			"[class='ng-binding ng-scope selected']"
		)?.textContent;

	if (hostname.includes("app.strem.io")) {
		search = document.querySelector("#global-search-field");
		const video = document.querySelector<HTMLMediaElement>("#videoPlayer");
		if (privacy && !video) presenceData.details = "Browsing...";
		else if (privacy && video) presenceData.details = "Watching...";
		else if (search?.value) {
			presenceData.details = "Searching For:";
			presenceData.state = search.value;
		} else if (hash.includes("/detail/")) {
			title = document.querySelector(
				"#detail > div:nth-child(3) > div > div.sidebar-info-container > div > div.logo > div"
			).textContent;
			presenceData.details = title;
			presenceData.buttons = [
				{
					label: "Watch Video",
					url: href,
				},
			];
			if (thumbnails) {
				presenceData.largeImageKey =
					document
						.querySelector(
							"#detail > div.details-less-info > div.details-top > div:nth-child(1)"
						)
						?.firstElementChild.getAttribute("src") ?? "logo";
			}
		} else if (hash.includes("addons")) {
			search = document.querySelector(
				"#addons > div.filter > form > div.addon-search-input > input"
			);
			if (search?.value) {
				presenceData.details = "Searching addons for:";
				presenceData.state = search.value;
			} else {
				presenceData.state = active ?? "All";
				title = document.querySelector(
					"[class='ng-scope selected']"
				)?.textContent;

				presenceData.buttons = [
					{
						label: "Browse Addons",
						url: href,
					},
				];
				presenceData.details = `Browsing ${title}`;
			}
		} else if (hash.includes("settings")) {
			presenceData.details = `${
				document.querySelector("[class='ng-scope ng-binding active']")
					?.textContent ?? "General"
			} settings`;
		} else if (hash.includes("/discover/")) {
			if (active) {
				presenceData.buttons = [
					{
						label: "Browse",
						url: href,
					},
				];
				presenceData.details = `Browsing: ${active}`;
			} else presenceData.state = "Browsing Movies";
		} else if (hash.includes("/library")) {
			if (active) presenceData.details = `${active} Library`;
			else presenceData.details = "Library";

			presenceData.buttons = [
				{
					label: "View Library",
					url: href,
				},
			];
		} else if (hash.includes("/calendar")) {
			presenceData.buttons = [
				{
					label: "View Calendar",
					url: href,
				},
			];
			presenceData.details = "Calendar";
		} else if (hash.includes("player")) {
			if (video?.duration) {
				timestamp = presence.getTimestampsfromMedia(video);
				pauseCheck = video?.paused ?? true;
			} else if (!video.duration && document.querySelector("#controlbar-top")) {
				let split = document
					.querySelector("#play-progress-text")
					?.textContent.split("/");
				if (split?.[0]) {
					split = split.map(s => s.trim());
					timestamp = presence.getTimestamps(
						presence.timestampFromFormat(split[0]),
						presence.timestampFromFormat(split[1])
					);
				}

				pauseCheck = !document
					.querySelector("#controlbar-top")
					?.firstElementChild.className.includes("pause");
			}
			delete presenceData.startTimestamp;
			if (
				!pauseCheck &&
				!document.querySelector("#loading-logo").className.includes("flashing")
			) {
				presenceData.endTimestamp = timestamp[1];
				presenceData.smallImageKey = Assets.Play;
			} else {
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = Assets.Pause;
			}
			title = document
				.querySelector("head > title")
				?.textContent.replace("Stremio -", "");
			presenceData.details = title;
			presenceData.buttons = [
				{
					label: "Join View Party",
					url: href,
				},
			];
		} else if (hash === "#/") presenceData.details = "Viewing the homepage";
	} else if (hostname === "stremio.com") {
		if (hash.includes("addon-sdk")) presenceData.details = "Viewing Addon SDK";
		else if (hash.includes("contribute"))
			presenceData.details = "Contributing page";
		else if (hash.includes("community"))
			presenceData.details = "Viewing the Community";
		else if (hash.includes("technology"))
			presenceData.details = "Viewing the technology";
		else if (document.querySelector("#tos-container > h1 > strong")) {
			presenceData.details = `Reading ${
				document.querySelector("#tos-container > h1 > strong").textContent
			}`;
		} else if (
			document.querySelector("[class='active']")?.textContent !== "EN"
		) {
			presenceData.details =
				document.querySelector("[class='active']")?.textContent ??
				"Browsing...";
		}
	}

	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
