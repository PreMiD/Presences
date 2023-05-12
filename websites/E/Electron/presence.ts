const presence = new Presence({
	clientId: "691406198091677737",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

function parseQueryString(queryString?: string) {
	queryString ??= window.location.search.substring(1);

	const params: { [queryKey: string]: string } = {},
		queries = queryString.split("&");
	for (const indexQuery in queries) {
		const indexPair = indexQuery.split("=");
		params[decodeURIComponent(indexPair[0])] = decodeURIComponent(
			indexPair.length > 1 ? indexPair[1] : ""
		);
	}
	return params;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/QjEGajr.png",
		},
		route = document.location.pathname.split("/");

	presenceData.smallImageKey = Assets.Reading;
	presenceData.smallImageText = `Language : ${
		document.querySelector("a.site-header-nav-item.bordered.lang-select-button")
			.textContent
	}`;

	if (document.location.pathname === "/") presenceData.details = "Home";
	else if (document.location.pathname.includes("/apps")) {
		if (!route[2]) {
			presenceData.details = "Apps";
			presenceData.state = !parseQueryString(document.location.hash).q
				? `Watching apps list ${
						!parseQueryString(document.location.hash).category
							? ""
							: `(${parseQueryString(document.location.hash).category})`
				  }`
				: `Searching ${parseQueryString(document.location.hash).q} ${
						!parseQueryString(document.location.hash).category
							? ""
							: `(${parseQueryString(document.location.hash).category})`
				  }`;
		} else {
			presenceData.details = "Watching app";
			presenceData.state = document.querySelector(
				"h1.f00-light.lh-condensed.mb-3"
			).textContent;
		}
	} else if (document.location.pathname.includes("/docs")) {
		if (!route[2]) {
			presenceData.details = document.querySelector(
				"span.f0-light.mr-3.mr-lg-4"
			).textContent;
		} else {
			switch (route[2]) {
				case "tutorial": {
					if (!route[3]) {
						presenceData.details = document.querySelector(
							"h4.f3-light.docs-breadcrumbs"
						).textContent;
					} else {
						presenceData.details = "Docs / Guides";
						presenceData.state = document
							.querySelector("title")
							.textContent.replace(" | Electron", "");
					}

					break;
				}
				case "api": {
					if (!route[3]) {
						presenceData.details = document.querySelector(
							"h4.f3-light.docs-breadcrumbs"
						).textContent;
					} else if (route[3] === "structures") {
						if (!route[4]) {
							presenceData.details = document.querySelector(
								"h4.f3-light.docs-breadcrumbs"
							).textContent;
						} else {
							presenceData.details = "Docs / API Structures";
							presenceData.state = document
								.querySelector("title")
								.textContent.replace(" | Electron", "");
						}
					} else {
						presenceData.details = "Docs / API";
						presenceData.state = document
							.querySelector("title")
							.textContent.replace(" | Electron", "");
					}

					break;
				}
				case "development": {
					if (!route[3]) {
						presenceData.details = document.querySelector(
							"h4.f3-light.docs-breadcrumbs"
						).textContent;
					} else {
						presenceData.details = "Docs / Development";
						presenceData.state = document
							.querySelector("title")
							.textContent.replace(" | Electron", "");
					}

					break;
				}
				// No default
			}
		}
	} else if (document.location.pathname.includes("/blog")) {
		if (!route[2])
			presenceData.details = document.querySelector("h1.f00-light").textContent;
		else {
			const [title, TitleOne] = document
				.querySelector("title")
				.textContent.split(" | ");
			presenceData.details = title;
			presenceData.state = TitleOne;
		}
	} else if (document.location.pathname.includes("/releases/")) {
		presenceData.details = document.querySelector(
			".container-narrow h1"
		).textContent;
		presenceData.state = `${
			!parseQueryString(document.location.hash).version
				? "Version : all"
				: `Version : ${parseQueryString(document.location.hash).version}`
		}${
			!parseQueryString(document.location.hash).page
				? " | Page : 1"
				: ` | Page : ${parseQueryString(document.location.hash).page}`
		}`;
	} else
		presenceData.details = document.querySelector("h1.f00-light").textContent;

	if (!presenceData.details) presence.setActivity();
	else {
		presenceData.state ??= "Navigating...";
		presence.setActivity(presenceData);
	}
});
