const presence = new Presence({
		clientId: "812085870382809128",
	}),
	time = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/R/Riot%20Games/assets/logo.png",
	Valorant = "https://cdn.rcd.gg/PreMiD/websites/R/Riot%20Games/assets/0.png",
	Lol = "https://cdn.rcd.gg/PreMiD/websites/R/Riot%20Games/assets/1.png",
	Tft = "https://cdn.rcd.gg/PreMiD/websites/R/Riot%20Games/assets/2.png",
	Wildrift = "https://cdn.rcd.gg/PreMiD/websites/R/Riot%20Games/assets/3.png",
	Lor = "https://cdn.rcd.gg/PreMiD/websites/R/Riot%20Games/assets/4.png",
}

presence.on("UpdateData", async () => {
	const path = location.href
		.replace(/\/?$/, "/")
		.replace(`https://${location.hostname}`, "")
		.replace("?", "/");
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: time,
	};
	if (location.hostname.includes("riotgames.com")) {
		const statics: {
			[name: string]: PresenceData;
		} = {
			"/": {
				details: "Idling...",
			},
			"/who-we-are/": {
				details: "Looking at:",
				state: "Who we are | Riot Games",
			},
			"/work-with-us/": {
				details: "Looking at:",
				state: "Work with us! | Riot Games",
			},
			"/news/": {
				details: "Looking at News:",
				state: `${
					Array.from(document.querySelectorAll("div")).find(c =>
						c.className?.includes("style__Title")
					)?.textContent
				} | Riot Games`,
			},
			"/category/": {
				details: "Browsing Store:",
				state: `${document.querySelector("h1")?.textContent} | Riot Merch`,
			},
			"/product/": {
				details: "Looking at Product:",
				state: `${document.querySelector("h1")?.textContent} | Riot Merch`,
			},
			"/account/": {
				details: "Looking at Account:",
				state: `${document.querySelector("h1")?.textContent} | Riot Merch`,
			},
			"/cart/": {
				details: "Looking at Cart:",
				state: `${document.querySelector("h1")?.textContent} | Riot Merch`,
			},
		};
		for (const [k, v] of Object.entries(statics)) {
			if (path.match(k)) {
				presenceData.largeImageKey = Assets.Logo;
				presenceData = { ...presenceData, ...v };
			}
		}
	} else {
		switch (location.hostname) {
			case "teamfighttactics.leagueoflegends.com": {
				const statics: {
					[name: string]: PresenceData;
				} = {
					"/": {
						details: "Idling...",
					},
					"/news/": {
						details: "Looking at News:",
						state: `${
							Array.from(document.querySelectorAll("div")).find(c =>
								c.className?.includes("style__Title")
							)?.textContent
						} | TfT`,
					},
					"/set-overview/": {
						details: "Looking at:",
						state: "Set-Overview | TfT",
					},
				};
				for (const [k, v] of Object.entries(statics)) {
					if (path.match(k)) {
						presenceData.largeImageKey = Assets.Tft;
						presenceData = { ...presenceData, ...v };
					}
				}

				break;
			}
			case "wildrift.leagueoflegends.com": {
				const statics: {
					[name: string]: PresenceData;
				} = {
					"/": {
						details: "Idling...",
					},
					"/news/": {
						details: "Looking at News:",
						state: `${
							document.querySelector("h1")?.textContent
						} | LoL: Wild Rift`,
					},
					"/game-overview/": {
						details: "Looking at:",
						state: "Game-Overview | LoL:Wild Rift",
					},
					"/champions/": {
						details: "Looking at Champion:",
						state: `${
							document.querySelector("h3")?.textContent
						} | LoL: Wild Rift`,
					},
				};
				for (const [k, v] of Object.entries(statics)) {
					if (path.match(k)) {
						presenceData.largeImageKey = Assets.Wildrift;
						presenceData = { ...presenceData, ...v };
					}
				}

				break;
			}
			case "playvalorant.com": {
				const statics: {
					[name: string]: PresenceData;
				} = {
					"/": {
						details: "Idling...",
					},
					"/news/": {
						details: "Looking at News:",
						state: `${document.querySelector("h2")?.textContent} | VALORANT`,
					},
					"/maps/": {
						details: "Looking at:",
						state: "Maps | VALORANT",
					},
					"/agents/": {
						details: "Looking at:",
						state: `${
							document.querySelector(
								".slick-slide.slick-active.slick-center.slick-current > div > div > h2"
							)?.textContent
						} | VALORANT`, //ENTER HEADER
					},
					"/media/": {
						details: "Browsing Media",
						state: "VALORANT",
					},
					"/leaderboards/": {
						details: "Browsing Leaderboards:",
						state: "VALORANT",
					},
					"/specs/": {
						details: "Looking at:",
						state: "Specs | VALORANT",
					},
					"/arsenal/": {
						details: "Looking at:",
						state: "Arsenal | VALORANT",
					},
				};
				for (const [k, v] of Object.entries(statics)) {
					if (path.match(k)) {
						presenceData.largeImageKey = Assets.Valorant;
						presenceData = { ...presenceData, ...v };
					}
				}

				break;
			}
			default:
				if (location.hostname.includes("leagueoflegends.com")) {
					const statics: {
						[name: string]: PresenceData;
					} = {
						"/": {
							details: "Idling...",
						},
						"/how-to-play/": {
							details: "Looking at:",
							state: "How to Play! | LoL",
						},
						"/champions/": {
							details: "Looking at Champion:",
							state: `${document.querySelector("strong")?.textContent} | LoL`,
						},
						"/champion/": {
							details: "Looking at Champion:",
							state: `${
								Array.from(document.querySelectorAll("span")).find(c =>
									c.className?.includes("title")
								)?.textContent
							} | LoL`,
						},
						"/news/": {
							details: "Looking at News:",
							state: `${
								Array.from(document.querySelectorAll("div")).find(c =>
									c.className?.includes("style__Title")
								)?.textContent
							} | LoL`,
						},
						"/news/tags/patch-notes/": {
							details: "Looking at:",
							state: "Patch notes Overview | LoL",
						},
						"/featured/": {
							details: "Looking at:",
							state: "League Displays | LoL",
						},
						"/story/": {
							details: "Reading Story:",
							state: `${document.querySelector("h1")?.textContent} | LoL`,
						},
						"/regions/": {
							details: "Looking at Region:",
							state: `${
								Array.from(document.querySelectorAll("span")).find(c =>
									c.className?.includes("title")
								)?.textContent
							} | LoL`,
						},
						"/comic/": {
							details: "LoL - Reading comic:",
							state: `${document.querySelector("h1")?.textContent} | LoL`,
						},
						"/kda/": {
							details: "Alt Universe:",
							state: "K/DA | LoL",
						},
						"/star-guardian/": {
							details: "Alt Universe:",
							state: "Star Guardians | LoL",
						},
						"/odyssey/": {
							details: "Alt Universe:",
							state: "Odyssey | LoL",
						},
						"/explore/": {
							details: "Searching through:",
							state: "Everything League | LoL",
						},
					};
					for (const [k, v] of Object.entries(statics)) {
						if (path.match(k)) {
							presenceData.largeImageKey = Assets.Lol;
							presenceData = { ...presenceData, ...v };
						}
					}
				} else if (location.hostname.includes("playruneterra.com")) {
					const statics: {
						[name: string]: PresenceData;
					} = {
						"/": {
							details: "Idling...",
						},
						"/news/": {
							details: "Looking at news:",
							state: `${
								Array.from(document.querySelectorAll("div")).find(c =>
									c.className?.includes("style__Title")
								)?.textContent
							} | LoR`,
						},
						"/news/competitive/": {
							details: "Tournaments:",
							state: `${document.querySelector("h1")?.textContent} | LoR`,
						},
					};
					for (const [k, v] of Object.entries(statics)) {
						if (path.match(k)) {
							presenceData.largeImageKey = Assets.Lor;
							presenceData = { ...presenceData, ...v };
						}
					}
				}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
