const presence = new Presence({
		clientId: "765234467849240657",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Rockstargamestransparent = "https://cdn.discordapp.com/app-assets/765234467849240657/878424036550533120.png?size=512",
	Rockstargamespurple = "https://cdn.discordapp.com/app-assets/765234467849240657/878444100817416222.png?size=512",
	Rockstargamesspecial3 = "https://cdn.discordapp.com/app-assets/765234467849240657/878444113752633344.png?size=512",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/R/Rockstar%20Games/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location;

	if (
		hostname === "rockstargames.com" ||
		hostname === "www.rockstargames.com"
	) {
		if (pathname === "/") presenceData.details = "Browsing Homepage";
		else if (pathname === "/newswire")
			presenceData.details = "Browsing Newswire";
		else if (pathname.startsWith("/newswire/")) {
			presenceData.details = "Browsing Newswire";
			presenceData.state = document.querySelector("head > title").textContent;
		} else if (pathname === "/games") presenceData.details = "Browsing Games";
		else if (pathname.startsWith("/games/")) {
			presenceData.details = "Browsing Games";
			presenceData.state = document.querySelector("head > title").textContent;
		} else {
			switch (pathname) {
				case "/reddeadonline": {
					presenceData.details = "Browsing Games";
					presenceData.state = "Read Dead Redemption Online";

					break;
				}
				case "/GTAOnline": {
					presenceData.details = "Browsing Games";
					presenceData.state = "Grand Theft Auto Online";

					break;
				}
				case "/videos": {
					presenceData.details = "Browsing Videos";
					break;
				}
				default:
					if (pathname.startsWith("/videos/")) {
						presenceData.details = "Browsing Videos";
						presenceData.state =
							document.querySelector("head > title").textContent;
					} else if (pathname === "/downloads")
						presenceData.details = "Browsing Downloads";
			}
		}
	}

	if (
		hostname === "support.rockstargames.com" ||
		hostname === "www.support.rockstargames.com"
	) {
		presenceData.largeImageKey = Assets.Rockstargamestransparent;
		if (pathname === "/") presenceData.details = "Browsing Support Homepage";
		else if (pathname.startsWith("/categories/")) {
			presenceData.details = "Browsing Support Pages";
			presenceData.state = document.querySelector("head > title").textContent;
		}
	}

	if (
		hostname === "socialclub.rockstargames.com" ||
		hostname === "www.socialclub.rockstargames.com"
	) {
		presenceData.largeImageKey = Assets.Rockstargamespurple;
		if (pathname === "/")
			presenceData.details = "Browsing Social Club Homepage";
		else if (pathname === "/games")
			presenceData.details = "Browsing Social Club Games";
		else if (pathname.startsWith("/games/")) {
			presenceData.details = "Browsing Games";
			presenceData.state = document.querySelector("head > title").textContent;
		} else {
			switch (pathname) {
				case "/crews": {
					presenceData.details = "Browsing Social Club Crews";
					break;
				}
				case "/jobs": {
					presenceData.details = "Browsing Social Club Jobs";
					break;
				}
				case "/photos": {
					presenceData.details = "Browsing Social Club Photos";
					break;
				}
				case "/videos": {
					presenceData.details = "Browsing Social Club Videos";
					break;
				}
				case "/events": {
					presenceData.details = "Browsing Social Club Events";
					break;
				}
				case "/rockstar-games-launcher":
					{
						presenceData.details = "Browsing Rockstar's Game Launcher";
						// No default
					}
					break;
			}
		}
	}

	if (
		hostname === "store.rockstargames.com" ||
		hostname === "www.store.rockstargames.com"
	) {
		presenceData.largeImageKey = Assets.Rockstargamesspecial3;
		if (pathname === "/en") presenceData.details = "Browsing Store Homepage";
		else if (pathname.startsWith("/en/")) {
			presenceData.details = "Browsing Rockstar Store";
			presenceData.state = document.querySelector("head > title").textContent;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
