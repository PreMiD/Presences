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
	},
	{ pathname } = document.location;

//chart page
	if (pathname.startsWith("/charts/")) {
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
	if (pathname.startsWith("/account/"))
		presenceData.details = "Account";

	//recs page
	if (
		pathname.startsWith("/recs/to/") ||
		pathname.startsWith("/recs/from/")
	) {
		presenceData.details = "Viewing User Recs:";
		presenceData.state = pathname.split("/")[3];
	}

	//play history page
	if (pathname.startsWith("/play-history/")) {
		presenceData.details = "Viewing Play History:";
		presenceData.state = `${pathname.split("/")[2]}`;
	}

	// user stats page
	if (pathname.startsWith("/stats/userstats")) {
		presenceData.details = "Viewing User Stats:";
		presenceData.state = new URLSearchParams(window.location.search).get("user");
	}

	//messages page
	if (pathname.startsWith("/messages/"))
		presenceData.details = "Messages";

	//development page
	if (pathname.startsWith("/development/"))
		presenceData.details = "Development";

	//RYMzilla page
	if (pathname.startsWith("/rymzilla/"))
		presenceData.details = "RYMzilla";

	//wiki page
	if (pathname.startsWith("/wiki/")) presenceData.details = "Wiki";

	//privacy page
	if (pathname.startsWith("/privacy/"))
		presenceData.details = "Privacy Policy";

	//tos page
	if (pathname.startsWith("/tos/"))
		presenceData.details = "Terms of Service";

	//contact page
	if (pathname.startsWith("/contact/"))
		presenceData.details = "Support / Feedback";

	//latest reviews page
	if (pathname.startsWith("/latest")) {
		const dateElement = document.querySelector("h4");
		if (dateElement) {
			presenceData.details = "Latest Reviews";
			presenceData.state = dateElement.textContent?.trim();
		}
	}

	//feature page
	if (pathname.startsWith("/feature/")) {
		const featureTitleElement = document.querySelector("h1");
		if (featureTitleElement) {
			presenceData.details = "Viewing Feature:";
			presenceData.state = featureTitleElement.textContent?.trim();
		}
	}

	//recommendations page
	if (pathname.startsWith("/recommendations/")) {
		presenceData.details = "Viewing Recommendations:";
		presenceData.state = `${pathname.split("/")[2]}`;
	}

	//friends page
	if (pathname.startsWith("/friends/")) {
		presenceData.details = "Viewing Friends:";
		presenceData.state = pathname.split("/")[2];
	}

	//label page
	if (pathname.startsWith("/label/")) {
		const labelNameElement = document.querySelector(
			".page_company_music_section_name_inner h1"
		);
		if (labelNameElement) {
			presenceData.details = "Viewing Label:";
			presenceData.state = labelNameElement.textContent?.trim();
		}
	}

	//work page
	if (pathname.startsWith("/work/")) {
		const workNameElement = document.querySelector(
			"li#ui_breadcrumb_item_page_breadcrumb"
		);
		if (workNameElement) {
			presenceData.details = "Viewing Work:";
			presenceData.state = workNameElement.textContent?.trim();
		}
	}

	//review page
	if (pathname.startsWith("/music-review/")) {
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
		pathname.startsWith("/submissions/") ||
		pathname.startsWith("/admin/") ||
		pathname.startsWith("/artist/profile_history?scope=") ||
		pathname.startsWith("/rgenre/")
	)
		presenceData.details = "Submissions";

	//genre page
	if (pathname.startsWith("/genre/")) {
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
	if (pathname.startsWith("/artist/")) {
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
	if (pathname.startsWith("/~")) {
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
	if (pathname.startsWith("/list/")) {
		const listTitleElement = document.querySelector(
				"h1[style='font-size:2.1em']"
			),
			listOwner = pathname.split("/")[2];
		if (listTitleElement) {
			const listTitle = listTitleElement.textContent?.trim();
			if (listTitle && listOwner) {
				presenceData.details = "Viewing List:";
				presenceData.state = `${listTitle} by ${listOwner}`;
			}
		}
	}

	//voting on descriptors page
	if (pathname.startsWith("/rdescriptor/set")) {
		const albumElement = document.querySelector("a.album"),
			artistElement = document.querySelector("a.artist");
		if (albumElement && artistElement) {
			presenceData.details = "Voting on Descriptors";
			presenceData.state = `${albumElement.textContent?.trim()} by ${artistElement.textContent?.trim()}`;
		}
	}

	//editing list page
	if (
		pathname.startsWith("/lists/edit") &&
		document.querySelector("span")
	)
		presenceData.details = "Editing List:";

	// search page
	if (pathname.startsWith("/search")) {
		presenceData.details = "Searching for:";
		presenceData.state = new URLSearchParams(window.location.search).get("searchterm");
	}

	//release page
	if (pathname.startsWith("/release/")) {
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
	if (pathname.startsWith("/collection/")) {
		presenceData.details = "Viewing Collection:";
		presenceData.state = `${pathname.split("/")[2]}`;
	}

	// compatibility page
	if (pathname.startsWith("/find_similar_users")) {
		presenceData.details = "Viewing Compatibility:";
		presenceData.state = new URLSearchParams(window.location.search).get("user");
	}

	for (const [path, data] of Object.entries(pages)) {
		if (pathname === path) {
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
