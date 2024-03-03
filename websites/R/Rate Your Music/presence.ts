const enum Assets {
	Logo = "https://i.imgur.com/4hrNGBS.png",
}

let browsingTimestamp: number;

function updatePresence() {
	if (!browsingTimestamp) browsingTimestamp = Math.floor(Date.now() / 1000);

	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	const pages: Record<string, PresenceData> = {
		"/charts/": {
			details: "Viewing Chart:",
		},
		"/new-music/": {
			details: "New Releases",
		},
		"/genres/": {
			details: "Genres",
		},
		"/lists/": {
			details: "Lists",
		},
		"/subscribe/": {
			details: "Subscribe",
		},
		"/": {
			details: "Home",
		},
	};

	//chart page
	if (location.pathname.startsWith("/charts/")) {
		const chartNameElement = document.querySelector(
			"#page_charts_section_charts_header_chart_name"
		);
		if (chartNameElement) {
			const chartName = chartNameElement.textContent?.trim();
			if (chartName) {
				presenceData.details = "Viewing Chart:";
				presenceData.state = chartName;
			}
		}
	}

	//account page
	if (location.pathname.startsWith("/account/"))
		presenceData.details = "Account";

	//recs page
	if (
		location.pathname.startsWith("/recs/to/") ||
		location.pathname.startsWith("/recs/from/")
	) {
		presenceData.details = "Viewing User Recs:";
		presenceData.state = location.pathname.split("/")[3];
	}

	//play history page
	if (location.pathname.startsWith("/play-history/")) {
		presenceData.details = "Viewing Play History:";
		presenceData.state = `${location.pathname.split("/")[2]}`;
	}

	//user stats page
	if (location.pathname.startsWith("/stats/userstats")) {
		presenceData.details = "Viewing User Stats:";
		presenceData.state = new URLSearchParams(location.search).get("user");
	}

	//messages page
	if (location.pathname.startsWith("/messages/"))
		presenceData.details = "Messages";

	//development page
	if (location.pathname.startsWith("/development/"))
		presenceData.details = "Development";

	//RYMzilla page
	if (location.pathname.startsWith("/rymzilla/"))
		presenceData.details = "RYMzilla";

	//wiki page
	if (location.pathname.startsWith("/wiki/")) presenceData.details = "Wiki";

	//privacy page
	if (location.pathname.startsWith("/privacy/"))
		presenceData.details = "Privacy Policy";

	//tos page
	if (location.pathname.startsWith("/tos/"))
		presenceData.details = "Terms of Service";

	//contact page
	if (location.pathname.startsWith("/contact/"))
		presenceData.details = "Support / Feedback";

	//latest reviews page
	if (location.pathname.startsWith("/latest")) {
		const dateElement = document.querySelector("h4");
		if (dateElement) {
			presenceData.details = "Latest Reviews";
			presenceData.state = dateElement.textContent?.trim();
		}
	}

	//feature page
	if (location.pathname.startsWith("/feature/")) {
		const featureTitleElement = document.querySelector("h1");
		if (featureTitleElement) {
			presenceData.details = "Viewing Feature:";
			presenceData.state = featureTitleElement.textContent?.trim();
		}
	}

	//recommendations page
	if (location.pathname.startsWith("/recommendations/")) {
		presenceData.details = "Viewing Recommendations:";
		presenceData.state = `${location.pathname.split("/")[2]}`;
	}

	//friends page
	if (location.pathname.startsWith("/friends/")) {
		presenceData.details = "Viewing Friends:";
		presenceData.state = location.pathname.split("/")[2];
	}

	//label page
	if (location.pathname.startsWith("/label/")) {
		const labelNameElement = document.querySelector(
			".page_company_music_section_name_inner h1"
		);
		if (labelNameElement) {
			presenceData.details = "Viewing Label:";
			presenceData.state = labelNameElement.textContent?.trim();
		}
	}

	//work page
	if (location.pathname.startsWith("/work/")) {
		const workNameElement = document.querySelector(
			"li#ui_breadcrumb_item_page_breadcrumb"
		);
		if (workNameElement) {
			presenceData.details = "Viewing Work:";
			presenceData.state = workNameElement.textContent?.trim();
		}
	}

	//review page
	if (location.pathname.startsWith("/music-review/")) {
		const albumNameElement = document.querySelector("a.album"),
			artistElement = document.querySelector("a.artist"),
			userElement = document.querySelector("a.user");
		if (albumNameElement && artistElement && userElement) {
			presenceData.details = "Viewing Review:";
			presenceData.state = `${albumNameElement.textContent?.trim()} by ${artistElement.textContent?.trim()} | Review by ${userElement.textContent?.trim()}`;
		}
	}

	//submissions page
	if (
		location.pathname.startsWith("/submissions/") ||
		location.pathname.startsWith("/admin/") ||
		location.pathname.startsWith("/artist/profile_history?scope=") ||
		location.pathname.startsWith("/rgenre/")
	)
		presenceData.details = "Submissions";

	//genre page
	if (location.pathname.startsWith("/genre/")) {
		const genreNameElement = document.querySelector(
			"#page_genre_section_name h1"
		);
		if (genreNameElement) {
			const genreName = genreNameElement.textContent?.trim();
			if (genreName) {
				presenceData.details = "Viewing Genre:";
				presenceData.state = genreName;
			}
		}
	}

	//artist page
	if (location.pathname.startsWith("/artist/")) {
		const artistNameElement = document.querySelector("h1.artist_name_hdr");
		if (artistNameElement) {
			const artistName = artistNameElement.textContent?.trim();
			if (artistName) {
				presenceData.details = "Viewing Artist:";
				presenceData.state = artistName;
			}
		}
	}

	//user page
	if (location.pathname.startsWith("/~")) {
		const usernameElement = document.querySelector("#profilename");
		if (usernameElement) {
			const username = usernameElement.textContent?.trim();
			if (username) {
				presenceData.details = "Viewing User:";
				presenceData.state = username;
			}
		}
	}

	//list page
	if (location.pathname.startsWith("/list/")) {
		const listTitleElement = document.querySelector(
				"h1[style='font-size:2.1em']"
			),
			listOwner = location.pathname.split("/")[2];
		if (listTitleElement) {
			const listTitle = listTitleElement.textContent?.trim();
			if (listTitle && listOwner) {
				presenceData.details = "Viewing List:";
				presenceData.state = `${listTitle} by ${listOwner}`;
			}
		}
	}

	//voting on descriptors page
	if (location.pathname.startsWith("/rdescriptor/set")) {
		const albumElement = document.querySelector("a.album"),
			artistElement = document.querySelector("a.artist");
		if (albumElement && artistElement) {
			presenceData.details = "Voting on Descriptors";
			presenceData.state = `${albumElement.textContent?.trim()} by ${artistElement.textContent?.trim()}`;
		}
	}

	//editing list page
	if (
		location.pathname.startsWith("/lists/edit") &&
		document.querySelector("span")
	)
		presenceData.details = "Editing List:";

	//search page
	if (location.pathname.startsWith("/search")) {
		const searchTerm = new URLSearchParams(location.search).get("searchterm");
		if (searchTerm) {
			presenceData.details = "Searching for:";
			presenceData.state = searchTerm;
		}
	}

	//release page
	if (location.pathname.startsWith("/release/")) {
		const albumTitleElement = document.querySelector(".album_title");
		if (
			albumTitleElement &&
			document.querySelector(".album_artist_small a.artist")
		) {
			presenceData.details = "Viewing Release:";
			presenceData.state = `${albumTitleElement.textContent?.trim()}`;
		}
	}

	//collection page
	if (location.pathname.startsWith("/collection/")) {
		presenceData.details = "Viewing Collection:";
		presenceData.state = `${location.pathname.split("/")[2]}`;
	}

	//compatibility page
	if (location.pathname.startsWith("/find_similar_users")) {
		presenceData.details = "Viewing Compatibility:";
		presenceData.state = new URLSearchParams(location.search).get("user");
	}

	for (const [path, data] of Object.entries(pages)) {
		if (location.pathname === path) {
			presenceData = { ...presenceData, ...data };
			break;
		}
	}

	new Presence({
		clientId: "1213365863470866462",
	}).setActivity(presenceData);
}

updatePresence();

window.addEventListener("popstate", updatePresence);

setInterval(updatePresence, 3000);
