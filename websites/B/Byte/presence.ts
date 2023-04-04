const presence = new Presence({
		clientId: "671199009674756146",
	}),
	strings = presence.getStrings({
		browse: "general.browsing",
		search: "general.searching",
	}),
	getElement = (query: string): string => {
		const element = document.querySelector(query);
		if (element) return element.textContent.replace(/^\s+|\s+$/g, "");
		else return;
	};

let oldUrl: string, browsingTimestamp: number;

function setObject(path: string) {
	switch (path) {
		case "/": {
			return {
				details: "Browsing",
			};
		}

		case "/about/": {
			return {
				details: "Viewing",
				state: "About",
			};
		}

		case "/faq/": {
			return {
				details: "Viewing",
				state: "Frequently Asked Questions",
			};
		}

		case "/terms/": {
			return {
				details: "Viewing",
				state: "Terms of Service",
			};
		}

		case "/tos/": {
			return {
				details: "Viewing",
				state: "Terms of Service",
			};
		}

		case "/privacy/": {
			return {
				details: "Viewing",
				state: "Privacy",
			};
		}

		case "/guidelines/": {
			return {
				details: "Viewing",
				state: "Guidelines",
			};
		}

		case "/contact/": {
			return {
				details: "Viewing",
				state: "Contact",
			};
		}
	}
}

presence.on("UpdateData", async () => {
	const path = location.pathname.replace(/\/?$/, "/"),
		detailsObj = setObject(path),
		presenceData: PresenceData = {
			details: detailsObj.details,
			state: detailsObj.state,
			largeImageKey: "https://i.imgur.com/oX5socK.png",
		};

	if (oldUrl !== path) {
		oldUrl = path;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}

	if (browsingTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (document.location.hostname === "community.byte.co") {
		presenceData.details = "Browsing Community";
		presenceData.largeImageKey = "bytecom";

		if (
			path.match("/categories/") ||
			path.match("/latest/") ||
			path.match("/top/") ||
			path.match("/unread/")
		)
			presenceData.state = getElement(".active");

		if (path.match("/new/")) presenceData.state = "Newest";

		if (path.match("/badges/")) {
			presenceData.details = "Viewing Badges";
			presenceData.state = getElement(".show-badge-details .badge-link");
		}

		if (path.match("/tags/")) presenceData.state = "Tags";

		if (path.match("/tag/")) {
			presenceData.details = "Viewing Tag";
			presenceData.state = getElement(".discourse-tag");
		}

		if (path.match("/cakeday/")) {
			presenceData.details = "Viewing Cakedays";
			presenceData.state = `${getElement(".nav-pills .active")} (${getElement(
				".anniversaries .nav-pills .active"
			)})`;
		}

		if (path.match("/c/")) {
			presenceData.details = "Viewing Category";
			presenceData.state = getElement(".selected-name .category-name");

			const tag = getElement(".active");
			if (tag) presenceData.details += `'s ${tag}`;
		}

		if (path.match("/t/")) {
			presenceData.details = "Viewing Thread";
			presenceData.state = getElement(".fancy-title");
		}

		if (path.match("/u/")) {
			presenceData.details = "Viewing Users";

			if (document.querySelector(".details")) {
				presenceData.details = "Viewing User";
				presenceData.state = `${getElement(".username")} (${getElement(
					".full-name"
				)})`;

				const tag = getElement(".active");
				if (tag) presenceData.details += `'s ${tag}`;
			}
		}

		if (path.match("/g/")) {
			presenceData.details = "Viewing Group";
			presenceData.state = `${getElement(".group-info-name")} (${getElement(
				".group-info-full-name"
			)})`;

			const tag = getElement(".active");
			if (tag) presenceData.details += `'s ${tag}`;
		}

		if (path.match("/search/")) {
			presenceData.details = "Searching";
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = (await strings).search;

			presenceData.state = document.querySelector("input").value;
		}
	}

	if (document.location.hostname === "help.byte.co") {
		presenceData.details = "Browsing Help";
		presenceData.largeImageKey = "bytehelp";

		if (path.match("/sections/")) {
			presenceData.details = "Viewing Section";
			presenceData.state = getElement("h1");
		}

		if (path.match("/articles/")) {
			presenceData.details = "Viewing Article";
			presenceData.state = getElement(".article-title");
		}

		if (path.match("/requests/new/")) {
			presenceData.details = "Creating";
			presenceData.state = "New Request";
		}
	}

	if (presenceData.details) {
		if (presenceData.details.match("(Browsing|Viewing)")) {
			presenceData.smallImageKey = "reading";
			presenceData.smallImageText = (await strings).browse;
		}

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
