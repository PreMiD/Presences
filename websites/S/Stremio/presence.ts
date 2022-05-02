const presence = new Presence({
		clientId: "969208766807547917"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let video: HTMLMediaElement, timestamp: [number, number], pauseCheck: boolean;
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
		active = document.querySelectorAll(
			"[class='ng-binding ng-scope selected']"
		)[0]?.textContent;

	let search: HTMLInputElement, genreSort: string;
	if (window.location.hostname.includes("app.strem.io")) {
		search = document.querySelector("#global-search-field");
		video = document.querySelector<HTMLMediaElement>("#videoPlayer");
		if (privacy && !video) presenceData.details = "Browsing...";
		else if (privacy && video) presenceData.details = "Watching...";
		else if (search?.value) {
			presenceData.details = "Searching For:";
			presenceData.state = search.value;
		} else if (page.includes("/detail/")) {
			presenceData.details = document.querySelector(
				"#detail > div:nth-child(3) > div > div.sidebar-info-container > div > div.logo > div"
			).textContent;
			if (thumbnails) {
				presenceData.largeImageKey =
					document
						.querySelector(
							"#detail > div.details-less-info > div.details-top > div:nth-child(1)"
						)
						?.firstElementChild?.getAttribute("src") ?? "logo";
			}
		} else if (page.includes("addons")) {
			search = document.querySelector(
				"#addons > div.filter > form > div.addon-search-input > input"
			);
			if (search?.value) {
				presenceData.details = "Searching Addons For:";
				presenceData.state = search.value;
			} else {
				if (active) {
					presenceData.state = `${active.charAt(0).toUpperCase()}${active.slice(
						1,
						active.length
					)}`;
				} else presenceData.state = "All";

				presenceData.details = `Browsing ${
					document.querySelector("[class='ng-scope selected']")?.textContent
				}:`;
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
				presenceData.state = `Sorted by: ${genreSort.substring(0, 1)}${genreSort
					.substring(1, genreSort.length)
					.toLowerCase()}`;
			}
			if (active) presenceData.details = `${active} Library`;
			else presenceData.details = "Library";
		} else if (page.includes("/calendar")) presenceData.details = "Calendar";
		else if (page.includes("player")) {
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
				} else timestamp = void 0;

				pauseCheck = document
					.querySelector("#controlbar-top")
					?.firstElementChild?.className.includes("pause")
					? false
					: true;
			}
			delete presenceData.startTimestamp;
			if (
				!pauseCheck &&
				!document.querySelector("#loading-logo").className.includes("flashing")
			) {
				presenceData.endTimestamp = timestamp[1] ?? 0;
				presenceData.smallImageKey = "play";
			} else {
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = "pause";
			}
			presenceData.details = document
				.querySelector("head > title")
				?.textContent.replace("Stremio -", "");
		} else if (window.location.pathname === "/")
			presenceData.details = "Homepage";

		if (buttons && !privacy && page !== "https://app.strem.io/#/") {
			presenceData.buttons = [
				{
					label: `View ${presenceData.details}`,
					url: document.location.href
				}
			];
		}
	} else presenceData.details = "Browsing...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
