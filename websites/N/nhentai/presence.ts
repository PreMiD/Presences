const presence = new Presence({
		clientId: "612653415419609088",
	}),
	pattern = "- Page",
	searchResult = new URL(document.location.href).searchParams.get("q"),
	truncateAfter = function (str: string, pattern: string): string {
		return str.slice(0, str.indexOf(pattern));
	};

let lastPlaybackState = null,
	reading,
	browsingTimestamp = Math.floor(Date.now() / 1000),
	title: HTMLElement,
	title2: HTMLElement | string,
	currentPage: HTMLElement,
	pageNumber: HTMLElement,
	tabTitle: string,
	homeCurrentPage: HTMLElement,
	favoriteCurrentPage: HTMLElement,
	character: HTMLElement,
	parody: HTMLElement,
	group: HTMLElement,
	user: HTMLElement,
	tag: HTMLElement,
	artist: HTMLElement;

if (lastPlaybackState !== reading) {
	lastPlaybackState = reading;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/N/nhentai/assets/logo.png",
	};

	tabTitle = document.title;

	title = document.querySelector("#info > h1 > span.pretty");

	if (document.location.pathname === "/" || !document.location.pathname) {
		homeCurrentPage = document.querySelector(
			"#content > section.pagination > a.page.current"
		);

		presenceData.details = "Home";

		presenceData.state = `Page: ${homeCurrentPage.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/g/")) {
		if (tabTitle.includes("Page")) {
			currentPage = document.querySelector(
				"#content > section.reader-bar > div.reader-pagination > button > span.current"
			);

			pageNumber = document.querySelector(
				"#content > section.reader-bar > div.reader-pagination > button > span.num-pages"
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
	} else if (document.location.pathname.includes("/tags/")) {
		presenceData.details = "Browsing tags...";

		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
	} else if (document.location.pathname.includes("/artists/")) {
		presenceData.details = "Browsing artists...";

		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
	} else if (document.location.pathname.includes("/characters/")) {
		presenceData.details = "Browsing characters...";

		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
	} else if (document.location.pathname.includes("/parodies/")) {
		presenceData.details = "Browsing parodies...";

		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
	} else if (document.location.pathname.includes("/groups/")) {
		presenceData.details = "Browsing groups...";

		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
	} else if (document.location.pathname.includes("/info/")) {
		presenceData.details = "Reading informations...";

		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
	} else if (document.location.pathname.includes("/favorites/")) {
		favoriteCurrentPage = document.querySelector(
			"#content > section.pagination > a.page.current"
		);
		presenceData.details = "Favorites";

		presenceData.state = `Page: ${favoriteCurrentPage.textContent}`;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/search/")) {
		presenceData.details = "Searching for: ";

		presenceData.state = searchResult;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/character/")) {
		character = document.querySelector("#content > h1 > a > span.name");

		presenceData.details = "Searching by character: ";

		presenceData.state = character.textContent;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/tag/")) {
		tag = document.querySelector("#content > h1 > a > span.name");

		presenceData.details = "Searching by tag: ";

		presenceData.state = tag.textContent;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/artist/")) {
		artist = document.querySelector("#content > h1 > a > span.name");

		presenceData.details = "Searching by artist:";

		presenceData.state = artist.textContent;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/parody/")) {
		parody = document.querySelector("#content > h1 > a > span.name");

		presenceData.details = "Searching by parody: ";

		presenceData.state = parody.textContent;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/group/")) {
		group = document.querySelector("#content > h1 > a > span.name");

		presenceData.details = "Searching by group: ";

		presenceData.state = group.textContent;

		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/users/")) {
		user = document.querySelector("#user-container > div.user-info > h1");

		presenceData.details = "Viewing an user: ";

		presenceData.state = user.textContent;

		presenceData.startTimestamp = browsingTimestamp;
	} else {
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;
	}

	presence.setActivity(presenceData);

	/*

		let presenceData: PresenceData = {
			largeImageKey: "lg"
		}

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
	*/
});
