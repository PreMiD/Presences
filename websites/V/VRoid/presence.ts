const presence = new Presence({
		clientId: "1144333935967473685",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

let oldLang: string, strings: Awaited<ReturnType<typeof presence.getStrings>>;

const enum Assets {
	Logo = "https://i.imgur.com/RAxM8Tw.png",
}

function getImportantPath(): string[] {
	const pathList = document.location.pathname.split("/").filter(Boolean);
	if (pathList[0] === "en") pathList.shift();
	if (pathList.length === 0) pathList.push("");
	return pathList;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		lang = await presence.getSetting<string>("lang"),
		pathList = getImportantPath(),
		{ hostname, href } = document.location;

	if (lang !== oldLang) {
		oldLang = lang;
		strings = await presence.getStrings(
			{
				browsing: "general.browsing",
				buttonReadArticle: "general.buttonReadArticle",
				buttonViewPage: "general.buttonViewPage",
				buttonViewProfile: "general.buttonViewProfile",
				readingAbout: "general.readingAbout",
				readingAnArticle: "general.readingAnArticle",
				viewAProduct: "general.viewAProduct",
				viewAProfile: "general.viewAProfile",
				viewCategory: "general.viewCategory",
				viewHome: "general.viewHome",
				viewPage: "general.viewPage",
				viewing: "general.viewing",
			},
			lang
		);
	}

	switch (hostname) {
		case "developer.vroid.com": {
			if (pathList[1] === "docs") {
				presenceData.details = `VRoid SDK - ${strings.readingAbout}`;
				presenceData.state = document.querySelector("h1").textContent.trim();
			} else {
				presenceData.details = `VRoid SDK - ${strings.browsing}`;
			}
			break;
		}
		case "hub.vroid.com": {
			break;
		}
		default: {
			switch (pathList[0]) {
				case "": {
					presenceData.details = strings.viewHome;
					break;
				}
				case "studio": {
					presenceData.details = strings.readingAbout;
					presenceData.state = "VRoid Studio";
					break;
				}
				case "mobile": {
					presenceData.details = strings.readingAbout;
					presenceData.state = "VRoid Mobile";
					break;
				}
				case "wear": {
					if (pathList[1]) {
						presenceData.details = strings.viewing;
						presenceData.state = document.title;
					} else {
						presenceData.details = strings.readingAbout;
						presenceData.state = "VRoid Wear";
					}
					break;
				}
				case "news": {
					if (pathList[1]) {
						presenceData.details = strings.readingAnArticle;
						presenceData.state =
							document.querySelector<HTMLHeadingElement>(
								"article h1"
							).textContent;
						presenceData.largeImageKey =
							document.querySelector<HTMLImageElement>("article img").src;
						presenceData.buttons = [
							{ label: strings.buttonReadArticle, url: href },
						];
					} else {
						presenceData.details = strings.readingAnArticle;
						presenceData.state =
							document.querySelector<HTMLImageElement>("h1 > img").alt;
					}
					break;
				}
			}
		}
	}

	const slides = slideshow.getSlides();
	if (slides.length) {
		if (!slideshow.currentSlide.details) {
			slideshow.currentSlide = slides[0].data;
		}
		presence.setActivity(slideshow);
	} else if (presenceData.details) {
		presence.setActivity(presenceData);
	} else {
		presence.setActivity();
	}
});
