const presence = new Presence({
		clientId: "969208766807547917"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLMediaElement,
	timestamp: [number, number],
	pauseCheck: boolean,
	search: HTMLInputElement,
	genreSort: string,
	title: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		page = window.location.href,
		[privacy, thumbnails, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("thumbnails"),
			presence.getSetting<boolean>("buttons")
		]),
		active = document.querySelector(
			"[class='ng-binding ng-scope selected']"
		)?.textContent;

	if (window.location.hostname.includes("app.strem.io")) {
		search = document.querySelector("#global-search-field");
		video = document.querySelector<HTMLMediaElement>("#videoPlayer");
		if (privacy && !video) presenceData.details = "Browsing...";
		else if (privacy && video) presenceData.details = "Watching...";
		else if (search?.value) {
			presenceData.details = "Searching For:";
			presenceData.state = search.value;
		} else if (page.includes("/detail/")) {
			title = document.querySelector(
				"#detail > div:nth-child(3) > div > div.sidebar-info-container > div > div.logo > div"
			).textContent;
			presenceData.details = title;
			presenceData.buttons = [
				{
					label: "Watch Video",
					url: page
				}
			];
			if (thumbnails) {
				presenceData.largeImageKey =
					document
						.querySelector(
							"#detail > div.details-less-info > div.details-top > div:nth-child(1)"
						)
						?.firstElementChild.getAttribute("src") ?? "logo";
			}
		} else if (page.includes("addons")) {
			search = document.querySelector(
				"#addons > div.filter > form > div.addon-search-input > input"
			);
			if (search?.value) {
				presenceData.details = "Searching Addons For:";
				presenceData.state = search.value;
			} else {
				presenceData.state = active ?? "All";
				title = document.querySelector(
					"[class='ng-scope selected']"
				)?.textContent;

				presenceData.buttons = [
					{
						label: "Browse Addons",
						url: page
					}
				];
				presenceData.details = `Browsing ${title}:`;
			}
		} else if (page.includes("settings")) {
			presenceData.details = `${
				document.querySelector("[class='ng-scope ng-binding active']")
					?.textContent ?? "General"
			} Settings`;
		} else if (page.includes("/discover/")) {
			if (active) {
				genreSort = document.querySelector(
					"[class='ng-scope ng-binding selected']"
				)?.textContent;
				if (!genreSort) {
					genreSort =
						document.querySelectorAll(
							"[class='ng-binding ng-scope selected']"
						)[2]?.textContent ?? "None";
				}
				if (genreSort === "Top") genreSort = "All";
				presenceData.buttons = [
					{
						label: `Browse ${active}`,
						url: page
					}
				];
				presenceData.details = `Browsing ${active}`;
				presenceData.state = `Genre: ${genreSort}`;
			} else presenceData.state = "Browsing Movies";
		} else if (page.includes("/library")) {
			genreSort = document
				.querySelector<HTMLSelectElement>(
					"#library > div.sort-filter > div.custom-select.lib-sort > select"
				)
				?.value.replace("SORT", "")
				.replace("_", " ")
				.trim();
			if (genreSort) {
				presenceData.state = `Sorted by: ${genreSort.charAt(0)}${genreSort
					.slice(1)
					.toLowerCase()}`;
			}
			if (active) presenceData.details = `${active} Library`;
			else presenceData.details = "Library";

			presenceData.buttons = [
				{
					label: "View Library",
					url: page
				}
			];
		} else if (page.includes("/calendar")) {
			presenceData.buttons = [
				{
					label: "View Calendar",
					url: page
				}
			];
			presenceData.details = "Calendar";
		} else if (page.includes("player")) {
			if (video?.duration) {
				timestamp = presence.getTimestampsfromMedia(video);
				pauseCheck = video.paused;
			} else if (!video.duration && document.querySelector("#controlbar-top")) {
				const split = document
					.querySelector("#play-progress-text")
					?.textContent.split("/");
				if (split?.[0]) {
					timestamp = presence.getTimestamps(
						presence.timestampFromFormat(split[0].trim()),
						presence.timestampFromFormat(split[1].trim())
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
				presenceData.smallImageKey = "play";
			} else {
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = "pause";
			}
			title = document
				.querySelector("head > title")
				?.textContent.replace("Stremio -", "");
			presenceData.details = title;
			presenceData.buttons = [
				{
					label: "Join View Party",
					url: page
				}
			];
		} else if (window.location.pathname === "/")
			presenceData.details = "Homepage";
	} else presenceData.details = "Browsing...";

	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
