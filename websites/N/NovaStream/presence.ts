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
				"div.space-y-2:nth-child(3) > p:nth-child(2) > span:nth-child(2)"
			)?.textContent;
			rating = document
				.querySelector(
					"div.space-y-2:nth-child(3) > p:nth-child(4) > span:nth-child(1) > span:nth-child(1)"
				)
				?.textContent?.split(" (")[0];
			runtime = document.querySelector(
				"p.text-gray-300:nth-child(8) > span:nth-child(2)"
			)?.textContent;
		} else {
			releaseDate = document.querySelector(
				"div.bg-gray-800:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > span:nth-child(2)"
			)?.textContent;
			rating = document
				.querySelector(
					"p.text-gray-300:nth-child(5) > span:nth-child(1) > span:nth-child(1)"
				)
				?.textContent.split(" (")[0];
			season = document
				.querySelector<HTMLSelectElement>("select.bg-gray-700:nth-child(1)")
				?.selectedOptions[0].textContent.replace("Season ", "");
			episode = document
				.querySelector<HTMLSelectElement>("select.rounded-lg:nth-child(2)")
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
			rating ? `⭐${rating}` : "",
		].join("");
	}

	// Watchlist modal
	const watchListElements =
		document.querySelector<HTMLInputElement>(
			"div.fixed:nth-child(9) .grid-cols-1"
		) ||
		document.querySelector<HTMLInputElement>("div.grid-cols-1:nth-child(2)");
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
