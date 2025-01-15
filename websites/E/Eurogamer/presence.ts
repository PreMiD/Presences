const presence = new Presence({
		clientId: "1328434205486612582",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/L2r2n5e.png",
}

async function getStrings() {
	return presence.getStrings({
		search: "general.searchFor",
		viewHome: "general.viewHome",
		buttonViewPage: "general.buttonViewPage",
		read: "general.readingArticle",
		thread: "general.readingThread",
		viewList: "general.viewList",
		viewMovie: "general.viewMovie",
		viewGenre: "general.viewGenre",
		viewing: "general.viewing",
		viewCategory: "general.viewCategory",
		support: "general.support",
		viewProfile: "general.viewProfile",
	});
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		{ pathname, href, search } = document.location;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (pathname.split("/")[1]) {
		case "latest": {
			presenceData.details = "Viewing latest articles";
			break;
		}
		case "companies": {
			presenceData.details = "Viewing company:";
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "community": {
			presenceData.details = strings.viewProfile;
			presenceData.state = document.querySelector(".page_title");
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(".avatar_image")?.src ??
				Assets.Logo;
			break;
		}
		case "pc":
		case "nintendo":
		case "playstation":
		case "xbox":
		case "digital-foundry":
		case "news":
		case "reviews":
		case "videos":
		case "features":
		case "guides":
		case "deals": {
			presenceData.details = strings.viewCategory;
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "platforms": {
			presenceData.details = "Viewing platform:";
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "genres": {
			presenceData.details = strings.viewGenre;
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "topics": {
			presenceData.details = "Viewing topic:";
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "movies": {
			presenceData.details = strings.viewMovie;
			presenceData.state = document.querySelector(".page_title");
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(".cover_image")?.src ??
				Assets.Logo;
			break;
		}
		case "video-game-franchises": {
			presenceData.details = strings.viewList;
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "games": {
			presenceData.details = "Viewing game:";
			presenceData.state = document.querySelector(".page_title");
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(".cover_image")?.src ??
				Assets.Logo;
			break;
		}
		case "authors": {
			presenceData.details = "Viewing author:";
			presenceData.state = document.querySelector(".page_title");
			break;
		}
		case "archive": {
			presenceData.details = "Viewing a archive";
			break;
		}
		case "about-us": {
			presenceData.details = "Viewing about us page";
			break;
		}
		case "contact-us": {
			presenceData.details = "Viewing contact us page";
			break;
		}
		case "subscribe": {
			presenceData.details = strings.viewing;
			presenceData.state = strings.support;
			break;
		}
		case "code-of-conduct":
		case "editorial-policy":
		case "review-policy":
		case "terms-and-conditions": {
			presenceData.details = strings.viewing;
			presenceData.state = document.querySelector(".section_title");
			break;
		}
		case "maps": {
			presenceData.details = "Viewing interactive maps";
			if (pathname.split("/")[2]) {
				presenceData.details = "Viewing interactive map:";
				presenceData.state = document.querySelector(".section_title");
			}
			break;
		}
		case "search": {
			presenceData.details = strings.search;
			presenceData.state = decodeURIComponent(
				search.split("=")[1].replaceAll("+", " ")
			);
			break;
		}
		default: {
			if (pathname.split("/")[1].length >= 1) {
				if (search && search.split("=")[1].includes("comments")) {
					presenceData.details = strings.thread;
					presenceData.state = document
						.querySelector(".page_title")
						.textContent.replace(/.*["](.*?)["]$/, "$1")
						.trim();
				} else {
					presenceData.details = strings.read;
					presenceData.state = document.querySelector(".title");
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: href,
						},
					];
				}
			} else presenceData.details = strings.viewHome;

			break;
		}
	}

	presence.setActivity(presenceData);
});
