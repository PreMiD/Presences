const presence = new Presence({
		clientId: "839455068855861248",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/R/Read%20Manga%20Online/assets/logo.png",
	Settings = "https://cdn.rcd.gg/PreMiD/websites/R/Read%20Manga%20Online/assets/0.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;
	switch (pathname) {
		case "/": {
			presenceData.details = "Viewing the Homepage";
			break;
		}
		case "/popular-manga": {
			presenceData.details = "Looking at";
			presenceData.state = "Popular Manga";

			break;
		}
		case "/manga-list": {
			presenceData.details = "Viewing:";
			presenceData.state = "All Manga";

			break;
		}
		default:
			if (
				pathname.startsWith("/manga-list") &&
				pathname.endsWith("/completed")
			) {
				presenceData.details = "Looking at";
				presenceData.state = `Completed Manga on ${pathname
					.split("/")[2]
					.toUpperCase()}`;
			} else if (
				pathname.startsWith("/manga-list") &&
				pathname.endsWith("/ongoing")
			) {
				presenceData.details = "Looking at";
				presenceData.state = `Ongoing Manga on ${pathname
					.split("/")[2]
					.toUpperCase()}`;
			} else if (pathname.startsWith("/manga-list")) {
				presenceData.details = "Viewing:";
				presenceData.state = `Manga on ${pathname.split("/")[2].toUpperCase()}`;
			} else {
				switch (pathname) {
					case "/manga-list/hash/ongoing": {
						presenceData.details = "Looking at";
						presenceData.state = "Ongoing Manga List";

						break;
					}
					case "/manga-list/hash/completed": {
						presenceData.details = "Looking at";
						presenceData.state = "Completed Manga List";

						break;
					}
					case "/latest-releases": {
						presenceData.details = "Viewing:";
						presenceData.state = "Latest releases";

						break;
					}
					case "/collections": {
						presenceData.details = "Viewing:";
						presenceData.state = "Collections";

						break;
					}
					default:
						if (pathname.startsWith("/collection")) {
							presenceData.details = "Viewing collection:";
							presenceData.state =
								document.querySelector(".page-title").textContent;
						} else if (pathname === "/advanced-search") {
							presenceData.details = "Searching for:";
							presenceData.state = document.querySelector<HTMLInputElement>(
								'[name="manga-name"]'
							).value;
							presenceData.smallImageKey = Assets.Search;
						} else if (pathname.startsWith("/category")) {
							presenceData.details = "Browsing category:";
							presenceData.state = pathname.split("/")[2].replace("-", " ");
						} else if (pathname.endsWith("/all-pages")) {
							presenceData.details =
								document.querySelector(".page-title > a").textContent;
							presenceData.state =
								document.querySelector(".page-title > span").textContent;
							presenceData.smallImageKey = Assets.Reading;
							presenceData.buttons = [{ label: "Read manga", url: href }];
						} else if (pathname.startsWith("/manga")) {
							presenceData.details = "Reading:";
							presenceData.state =
								document.querySelector(".page-title").textContent;
							presenceData.smallImageKey = Assets.Viewing;
							presenceData.buttons = [{ label: "View manga", url: href }];
						} else if (pathname.startsWith("/user-panel")) {
							presenceData.details = "Viewing their:";
							presenceData.state =
								document.querySelector("a.active").textContent;
							presenceData.smallImageKey = Assets.Settings;
						}
				}
			}
	}
	presence.setActivity(presenceData);
});
