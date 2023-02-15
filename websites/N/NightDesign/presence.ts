const presence = new Presence({
		clientId: "920440501017145364",
	}),
	strings: { [key: string]: string } = {
		prefix: "Watching ",
		suffix: ".",
		home: "Homepage",

		u: "$0 Profile",

		resource: "$0 Cosmetic texture",
		resources: "Cosmetic texture search",

		servers: "Server List",
		server: "$0 Server Profile",

		team: "Team List",

		stateResources: "Type: $0 | Creator: $1",
	},
	browsingTimestamp = Math.round(Date.now() / 1000);
let lastPath: string | undefined;
presence.on("UpdateData", async () => {
	let path: string = window.location.pathname;
	const maybeSupportedPageLanguage: string = path.split("/")[1];
	if (maybeSupportedPageLanguage.length === 2)
		path = path.replace(`/${maybeSupportedPageLanguage}`, "");

	if (lastPath === path) return;

	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/cspBuGx.png",
		startTimestamp: browsingTimestamp,
	};

	if (path !== "/home") {
		presenceData.buttons = [
			{
				label: "Visit page",
				url: window.location.href,
			},
		];
	}

	const pathSegments: string[] = path.split("/").filter(segment => segment);
	for (let i = 0; i < pathSegments.length; i++) {
		const pathSegment: string = pathSegments
				.slice(0, pathSegments.length - i)
				.join("/"),
			data = strings[pathSegment];

		if (!data) continue;

		switch (pathSegment) {
			case "resources":
				if (pathSegments.length !== 2) {
					presenceData.details = strings.resources;
					continue;
				}

				presenceData.details = strings.resource.replace(
					"$0",
textContent('[class="page-header-title"]')?.split(": ")[1]
				);
				presenceData.state = strings.stateResources
					.replace(
						"$0",
						toTitleCase(
							textContent(
								"div.page-content > div.row > div.col-md-7 > div:nth-child(2) > div.card-block > p > code:nth-child(1)"
							)
						)
					)
					.replace(
						"$1",
						textContent("div.card.mini-profile > div > div > h6 > span > span")
					);
				break;

			case "server":
				presenceData.details = data.replace(
					"$0",
					textContent(
						"div.page-header > div > div > div.col-md-4 > ul > li:nth-child(3)"
					)
				);
				presenceData.state = toTitleCase(pathSegments.slice(-1)[0]);
				break;

			case "u":
				presenceData.details = data.replace(
					"$0",
					textContent("div.page-header > div > div > div.col-md-8 > div > h5")
				);
				presenceData.state = toTitleCase(pathSegments.slice(-1)[0]);
				break;

			default:
				presenceData.details = data;
		}
	}

	if (!presenceData.details)
		presenceData.details = document.title.split(" | ")[0] ?? "Night.design";
	else {
		presenceData.details =
			`${strings.prefix}  ${presenceData.details} ${strings.suffix}`;
	}

	lastPath = path;
	presence.setActivity(presenceData);
});
function toTitleCase(str: string) {
	return str.replace(/\w\S*/g, function (txt: string) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
function textContent(selector: string): string {
	return document.querySelector(selector).textContent;
}
