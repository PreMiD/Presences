const presence = new Presence({
		clientId: "974646056161804398",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

enum Assets {
	Logo = "https://i.imgur.com/tZ9OLRG.jpg",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ hostname, href, pathname } = document.location,
		pathnameSplit = pathname.split("/"),
		buttons = await presence.getSetting<boolean>("buttons"),
		search = document.querySelector<HTMLInputElement>(
			'[autocapitalize="sentences"]'
		);

	switch (hostname) {
		case "www.tebex.io":
		case "tebex.io": {
			switch (pathnameSplit[1]) {
				case "store": {
					presenceData.details = `Viewing store function ${document
						.querySelector(
							'[class="text-white opacity-5 hover-opacity-10  opacity-10 "]'
						)
						?.textContent.toLowerCase()}`;
					presenceData.buttons = [
						{
							label: "View The Store",
							url: href,
						},
					];
					break;
				}
				case "games": {
					presenceData.details = "Viewing all games";
					break;
				}
				case "game-studios": {
					presenceData.details = "Viewing info for game studios";
					presenceData.buttons = [
						{
							label: "View Info",
							url: href,
						},
					];
					break;
				}
				case "partners": {
					presenceData.details = "Viewing partners";
					break;
				}
				case "contact": {
					presenceData.details = "Viewing contact info";
					break;
				}
				case "": {
					presenceData.details = "Viewing the home page";
					break;
				}
				default: {
					presenceData.details = `Viewing ${document
						.querySelector(
							'[class="btn btn-outline-white dropdown-toggle btn-lg mx-3"]'
						)
						.textContent.trim()}'s monetisation options`;
				}
			}
			break;
		}
		case "docs.tebex.io": {
			if (search?.value) {
				presenceData.details = "Searching the docs for";
				presenceData.state = search?.value;
				presenceData.smallImageKey = Assets.Search;
			} else {
				presenceData.details = `Reading the ${
					document.querySelector('[data-testid="page.title"]')?.textContent
				} page`;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.buttons = [
					{
						label: "Read Docs",
						url: href,
					},
				];
			}
			break;
		}
		default: {
			const viewing = `Viewing ${
				document.querySelector("[class*=store-name]")?.textContent ??
				document.querySelector("head > title")?.textContent.split("|")[0].trim()
			}'s`;
			switch (pathnameSplit[1]) {
				case "": {
					presenceData.details = `${viewing} homepage`;
					break;
				}
				case "category": {
					switch (pathnameSplit[2]) {
						case "": {
							presenceData.details = `${viewing} categories`;
							break;
						}
						default: {
							presenceData.details = `${viewing} ${
								document
									.querySelector('[class="page-title"]')
									?.textContent.toLowerCase() ??
								document
									.querySelectorAll('li[class="active"]')[1]
									?.textContent.toLowerCase()
							}`;
							break;
						}
					}
					break;
				}
				case "about": {
					presenceData.details = `${viewing} about page`;
					presenceData.buttons = [
						{
							label: "View The About Page",
							url: href,
						},
					];
					break;
				}
			}
			break;
		}
	}
	if (!search && buttons && !presenceData.buttons) {
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (!buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
