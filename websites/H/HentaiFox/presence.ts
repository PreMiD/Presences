const presence = new Presence({
	clientId: "732982987905302570",
});

let lastPlaybackState = null,
	reading,
	browsingTimestamp = Math.floor(Date.now() / 1000),
	title: HTMLElement,
	title2: string,
	tabTitle: string,
	pathname: boolean,
	pageNumber: HTMLElement,
	parody: HTMLElement,
	language: HTMLElement,
	character: HTMLElement,
	tags: HTMLElement,
	category: HTMLElement,
	currentPage: HTMLElement,
	profile: HTMLElement,
	groups: HTMLElement,
	homeCurrentPage: HTMLElement,
	artist: HTMLElement;

const pattern = "- Page",
	searchResult = new URL(document.location.href).searchParams.get("q"),
	truncateAfter = function (str: string, pattern: string): string {
		return str.slice(0, str.indexOf(pattern));
	};

enum Assets {
	Logo = "https://i.imgur.com/o9joHZX.png",
}

if (lastPlaybackState !== reading) {
	lastPlaybackState = reading;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};

	tabTitle = document.title;

	title = document.querySelector("div.gallery_right > div.info > h1");

	if (
		document.location.pathname.includes("/parody/") ||
		document.location.pathname.includes("/parodies/") ||
		document.location.pathname.includes("/tag/") ||
		document.location.pathname.includes("/tags/") ||
		document.location.pathname.includes("/character/") ||
		document.location.pathname.includes("/characters/") ||
		document.location.pathname.includes("/artist/") ||
		document.location.pathname.includes("/artists/") ||
		document.location.pathname.includes("/group/") ||
		document.location.pathname.includes("/groups/")
	)
		pathname = false;
	else if (document.location.pathname.includes("/pag/")) pathname = false;

	if (
		document.location.pathname === "/" ||
		pathname === true ||
		!document.location.pathname
	) {
		homeCurrentPage = document.querySelector(
			"ul.pagination > li.page-item.active > a.page-link"
		);

		presenceData.details = "Home";
		presenceData.state = `Page: ${homeCurrentPage.textContent}`;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (
		document.location.pathname.includes("/gallery/") ||
		document.location.pathname.includes("/g/")
	) {
		if (tabTitle.includes("Page")) {
			currentPage = document.querySelector(
				"div.gallery_pagination > button > span.current"
			);

			pageNumber = document.querySelector(
				"div.gallery_pagination > button > span.total_pages"
			);

			title2 = truncateAfter(tabTitle, pattern);

			presenceData.details = `Reading: ${title2}`;

			presenceData.state = `Current page: ${currentPage.textContent}/${pageNumber.textContent}`;

			presenceData.startTimestamp = browsingTimestamp;
		} else if (title.textContent.length > 0) {
			if (title.textContent.length > 128)
				presenceData.state = "Title longer than 128 characters.";
			else presenceData.state = title.textContent;

			presenceData.details = "Viewing a page: ";

			presenceData.startTimestamp = browsingTimestamp;
		}
	} else if (document.location.pathname.includes("/tag/")) {
		presenceData.details = "Browsing tags...";

		tags = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Tag: ${tags.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/artist/")) {
		presenceData.details = "Browsing artists...";

		artist = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Artist: ${artist.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/character/")) {
		presenceData.details = "Browsing characters...";

		character = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Character: ${character.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/parody/")) {
		presenceData.details = "Browsing parodies...";

		parody = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Parody: ${parody.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/group/")) {
		presenceData.details = "Browsing groups...";

		groups = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Group: ${groups.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/language/")) {
		presenceData.details = "Browsing language...";

		language = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Language: ${language.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/category/")) {
		presenceData.details = "Browsing category...";

		category = document.querySelector(
			"div.galleries_overview.g_center > h1.tag_info > span.skey"
		);
		presenceData.state = `Category: ${category.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/parodies/")) {
		presenceData.details = "Browsing parodies...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/tags/")) {
		presenceData.details = "Browsing tags...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/characters/")) {
		presenceData.details = "Browsing characters...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/artists/")) {
		presenceData.details = "Browsing artists...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/groups/")) {
		presenceData.details = "Browsing groups...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/faplist/")) {
		presenceData.details = "Browsing faplist...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/contact/")) {
		presenceData.details = "Browsing contact...";

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.state;
	} else if (document.location.pathname.includes("/profile/")) {
		profile = document.querySelector(
			"div.row.profile_block > div.pb_left > h2"
		);

		presenceData.details = "Viewing an profile:";

		presenceData.state = profile.textContent.replace("Welcome,", "");

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/search/")) {
		presenceData.details = "Searching for: ";

		presenceData.state = searchResult;

		presenceData.startTimestamp = browsingTimestamp;
	} else {
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;
	}

	presence.setActivity(presenceData);
});
