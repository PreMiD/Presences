const presence = new Presence({
		clientId: "1274632115102941204",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	difficultyImages: Record<string, string> = {
		Easy: "https://i.imgur.com/Bt0cKYs.png",
		Normal: "https://i.imgur.com/fmxpgSU.png",
		Hard: "https://i.imgur.com/IN1GT84.png",
		Expert: "https://i.imgur.com/aibm4vl.png",
		"Expert+": "https://i.imgur.com/LEHgcPp.png",
	};

const enum Assets {
	Logo = "https://i.imgur.com/VkOt2JM.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, hostname } = document.location,
		buttons = await presence.getSetting<boolean>("buttons");

	if (hostname.split(".")[0] === "accsaber") {
		switch (pathname.split("/")[1]) {
			case "leaderboards": {
				presenceData.details = "Viewing leaderboard";
				presenceData.state = document.querySelector(".pageNav.active");
				break;
			}
			case "profile": {
				const profilePicture = document.querySelector<HTMLImageElement>(
					`img[src^='https://media.accsaber.com/avatars/${
						pathname.split("/")[2]
					}']`
				);
				presenceData.details = `Viewing ${document.title.split(" | ")[0]}`;
				if (pathname.split("/")[3] !== "ap-graph") {
					presenceData.state = `${document
						.querySelector(".pageNav.active")
						.textContent.trim()
						.slice(0, 1)
						.toUpperCase()}${document
						.querySelector(".pageNav.active")
						.textContent.trim()
						.slice(1)}`;
				}
				presenceData.largeImageKey = profilePicture;
				presenceData.buttons = [{ url: href, label: "View Profile" }];
				break;
			}
			case "maps": {
				if (!pathname.split("/")[2])
					presenceData.details = "Browsing ranked maps";
				else {
					presenceData.details = document.querySelector("h1");
					presenceData.state = document.querySelector("h2");
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"img[src^='https://media.accsaber.com/covers/']"
					).src;
					presenceData.smallImageKey =
						difficultyImages[
							document.querySelector<HTMLDivElement>("h1 > div").title
						];
					presenceData.smallImageText =
						document.querySelector<HTMLDivElement>("h1 > div").title;
					presenceData.buttons = [{ url: href, label: "View Leaderboard" }];
				}
				break;
			}
		}
	} else if (hostname.split(".")[0] === "wiki") {
		presenceData.details = "Viewing ACC wiki";
		presenceData.state = document.querySelectorAll(".md-nav__link--active")[
			document.querySelectorAll(".md-nav__link--active").length - 1
		];
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details && presenceData.largeImageKey)
		presence.setActivity(presenceData);
});
