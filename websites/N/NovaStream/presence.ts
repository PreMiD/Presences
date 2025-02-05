const presence = new Presence({
		clientId: "1334576902081351761",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/sASc3GV.png",
		smallImageKey: Assets.Play,
		smallImageText: "Watching free content",
		startTimestamp: browsingTimestamp,
		type: ActivityType.Watching,
	};

	if (document.location.pathname === "/") {
		const searchInput =
			document.querySelector<HTMLInputElement>(".search-input")?.value;
		if (searchInput && searchInput.length > 0)
			presenceData.state = `Searching for: "${searchInput}"`;
		else presenceData.state = "Browsing content to watch";
	} else if (document.location.pathname.includes("/watch")) {
		let title = document.querySelector("h1.text-2xl")?.textContent,
			releaseDate,
			rating,
			season,
			episode,
			runtime,
			seasonEpisode;

		if (document.location.search.includes("type=movie")) {
			releaseDate = document.querySelector(
				'[x-text*="content?.release_date"], [x-text*="content?.first_air_date"]'
			)?.textContent;
			rating = document.querySelector(
				'[x-text*="content?.vote_average?"]'
			)?.textContent;
			runtime = document.querySelector(
				"[x-text*=\"Math.floor(content.runtime / 60) + 'h ' + (content.runtime % 60) + 'm'\"]"
			)?.textContent;
		} else {
			releaseDate = document.querySelector(
				'[x-text*="content?.release_date"], [x-text*="content?.first_air_date"]'
			)?.textContent;
			rating = document.querySelector<HTMLSelectElement>(
				'[x-text*="content?.vote_average?"]'
			)?.textContent;
			season = document
				.querySelector<HTMLSelectElement>('[x-model*="selectedSeason"]')
				?.selectedOptions[0].textContent.replace("Season ", "");
			episode = document
				.querySelector<HTMLSelectElement>('[x-model*="selectedEpisode"]')
				?.selectedOptions[0].textContent.replace("Episode ", "");
			if (season && episode) seasonEpisode = `S${season}E${episode}  •  `;
		}
		const releaseYear = releaseDate?.substring(0, 4);
		if (releaseYear) title += ` (${releaseYear})`;

		presenceData.buttons = [
			{ label: "Watch now", url: document.location.href },
		];
		if (title) presenceData.details = `Watching ${title}`;
		presenceData.state = [
			runtime ? `${runtime}  •  ` : "",
			seasonEpisode ?? "",
			rating ? `⭐${rating}/10` : "",
		].join("");
	}

	// Watchlist modal
	const watchListElements = document.querySelector<HTMLInputElement>(
		'[x-for*="item in watchLaterItems"]'
	);
	if (
		watchListElements &&
		window.getComputedStyle(
			watchListElements.parentElement.parentElement.parentElement,
			null
		).display === "flex"
	) {
		presenceData.state = `Browsing Watchlist: ${
			watchListElements.children.length - 1
		} items`;
		presenceData.details = "";
	}

	if (presenceData.state) presence.setActivity(presenceData);
});
