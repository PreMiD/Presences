const presence = new Presence({ clientId: "1013183483750907904" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	statics: {
		[name: string]: string;
	} = {
		"": "Viewing homepage",
		pricing: "Comparing all plans",
		explore: "Exploring Patreon",
		home: "Viewing their feed",
		login: "Log in Patreon",
	},
	slideshow = presence.createSlideshow();
enum Assets {
	Logo = "https://i.imgur.com/XIq6vjx.png",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: Assets.Logo,
		},
		presenceDataSlide: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		showButtons = await presence.getSetting<boolean>("buttons"),
		{ pathname, href } = document.location,
		pathArr = pathname.split("/");

	switch (pathArr[1]) {
		case "product":
			presenceData.details = "Viewing a plan";
			presenceData.state = `Plan: ${pathArr[2]}`;
			break;
		case "c":
			presenceData.details = "Viewing a page for creators";
			presenceData.state = `For: ${
				{
					podcasts: "podcasters",
					video: "video creators",
					music: "musicians",
					visualartists: "visual artists",
					communities: "community leaders",
					writing: "writers & journalists",
					gaming: "gaming creators",
					nonprofits: "nonprofit organizations",
					"tutorials-and-education": "education & tutorial creators",
					"local-businesses": "local businesses",
				}[pathArr[2]]
			}`;
			break;
		case "apps":
			if (pathArr.length === 2) presenceData.details = "Viewing apps available";
			else {
				presenceData.details = "Viewing an app";
				presenceData.state = document.querySelector(
					".Text_variantDisplayTextLg__NwCo5"
				).textContent;
				presenceData.buttons = [{ label: "View app", url: href }];
			}
			break;
		case "settings":
			presenceData.details = "Editing their settings";
			presenceData.state = `Page: ${
				document.querySelectorAll('a[aria-current="page"]')[1].textContent
			}`;
			break;
		case "search":
			if (href.includes("?q=")) {
				presenceData.details = "Searching";
				presenceData.state = `Query: ${document
					.querySelector("input")
					.getAttribute("value")}`;
				presenceData.smallImageKey = Assets.Search;
			} else presenceData.details = "On searching page";
			break;
		case "posts":
			presenceData.details = presenceDataSlide.details = "Viewing a post";
			presenceData.state = document.querySelector(
				'span[data-tag="post-title"]'
			).textContent;
			presenceDataSlide.state = `From ${
				document.querySelector('div[data-tag="metadata-wrapper"] > div > div')
					.textContent
			}`;

			presenceData.buttons = presenceDataSlide.buttons = [
				{ label: "View Post", url: href },
			];

			slideshow.addSlide("slidePostName", presenceData, 5000);
			slideshow.addSlide("slideCreatorName", presenceDataSlide, 5000);
			break;
		default:
			if (Object.keys(statics).includes(pathArr[1]))
				presenceData.details = statics[pathArr[1]];
			else if (pathArr[1].includes("messages"))
				presenceData.details = "Reading their messages";
			else {
				presenceData.details = "Viewing a creator";
				presenceData.state = document.querySelector("h1").textContent.trim();
				presenceData.buttons = [{ label: "View Creator", url: href }];
			}
	}

	if (!showButtons) {
		delete presenceData.buttons;
		delete presenceDataSlide.buttons;
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
