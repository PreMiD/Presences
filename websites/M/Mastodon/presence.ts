const presence = new Presence({
	clientId: "1107321415243415574",
});

const enum Assets {
	Logo = "https://i.imgur.com/njcb4Wp.png",
	FediverseLogo = "https://i.imgur.com/B0HPMOQ.png",
}

// checks if user is logged from textarea
function checkPositionAccountAvatar() {
	if (document.querySelectorAll(".autosuggest-textarea__textarea").length < 1)
		return 1;
	return 2;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		{ pathname, hostname } = document.location;

	if (pathname === "/home") {
		presenceData.smallImageText = "Home";
		presenceData.details = "On the homepage";
	} else if (pathname === "/notifications") {
		presenceData.smallImageText = "Notifications";
		presenceData.details = "Checking notifications";
	} else if (pathname.startsWith("/explore")) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Explore";
		presenceData.details = "On the explore";
	} else {
		switch (pathname) {
			case "/public/local": {
				presenceData.smallImageText = "Local timeline";
				presenceData.details = "Looking in local timeline";

				break;
			}
			case "/public": {
				presenceData.largeImageKey = Assets.FediverseLogo;
				presenceData.smallImageText = "Fediverse";
				presenceData.details = "Looking in fediverse";

				break;
			}
			case "/bookmarks":
			case "/favourites":
			case "/lists": {
				const pathName = pathname.split("/")[1];
				presenceData.smallImageText = pathName;
				presenceData.details = `Looking their ${pathName}`;

				break;
			}
			case "/search": {
				presenceData.smallImageText = "Search";
				presenceData.details = `Searching ${document
					.querySelector(".search__input")
					.getAttribute("value")}`;

				break;
			}
			default:
				if (pathname.startsWith("/@")) {
					presenceData.smallImageKey = document
						.querySelectorAll(".account__avatar")
						[checkPositionAccountAvatar()].querySelector("img")
						.getAttribute("src");
					presenceData.smallImageText = `${document.location}`;

					presenceData.details = `Viewing ${
						pathname.split(/[@,/]+/)[1]
					}'s profile`;
				} else if (pathname.startsWith("/settings")) {
					presenceData.smallImageText = "Settings";
					presenceData.details = "Viewing their settings";
				} else if (pathname === "/relationships") {
					presenceData.smallImageText = "Relationships";
					presenceData.details = "Viewing their followers";
				} else if (pathname.startsWith("/tags")) {
					presenceData.smallImageText = "tags";
					presenceData.details = `Searching ${pathname.split("/")[2]} tag`;
				} else {
					switch (pathname) {
						case "/about": {
							presenceData.smallImageKey = document
								.querySelectorAll(".account__avatar")
								[checkPositionAccountAvatar()].querySelector("img")
								.getAttribute("src");
							presenceData.largeImageKey = document
								.querySelector(".about__header__hero img")
								.getAttribute("src");
							presenceData.smallImageText = `About ${hostname}`;
							presenceData.details = `About ${hostname}`;

							break;
						}
						case "/directory": {
							presenceData.smallImageText = "Directory";
							presenceData.details = "On the directory";

							break;
						}
						case "/privacy-policy": {
							presenceData.smallImageText = "Privacy and Policy";
							presenceData.details = "Reading Privacy and Policy";

							break;
						}
					}
				}
		}
	}

	presence.setActivity(presenceData);
});
