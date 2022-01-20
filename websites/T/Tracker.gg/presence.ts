const presence = new Presence({ clientId: "929349462365704222" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		{ pathname } = window.location,
		botHost = document.location.hostname;

	if (botHost === "tracker.gg") {
		if (pathname === "/") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Homepage";
		} else if (pathname === "/apps") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Tracker Apps";
		} else if (pathname === "/developers") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Developers";
		} else if (pathname === "/developers/apps/create") {
			presenceData.details = "Creating";
			presenceData.state = "Tracker Dev App";
		} else if (pathname.includes("/developers/apps/")) {
			try {
				const appName = document
					.querySelector<HTMLDivElement>(
						"#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__analytics.card.bordered.responsive > header > div > div.left > div:nth-child(2) > div.title"
					)
					.textContent.replace("Dashboard", "");
				presenceData.details = "Editing App";
				presenceData.state = appName;
				presenceData.smallImageText = appName;
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__details.card.responsive > div > div:nth-child(1) > div > img"
				).src;
			} catch (e) {
				presenceData.details = "Viewing:";
				presenceData.state = "Developer Apps";
			}
		} else if (pathname.includes("/developers/docs")) {
			try {
				presenceData.details = "Viewing Docs";
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					"#app > div.trn-wrapper > div.trn-container > div > main > div.docs > div.content-container > div > div > h1"
				).textContent;
			} catch {
				presenceData.details = "Viewing API";
				presenceData.state = document
					.querySelector<HTMLHeadingElement>(
						"#app > div.trn-wrapper > div.trn-container > div > main > div.docs > div.content-container > div > div > header > h1"
					)
					.textContent.replace("apex", "")
					.replace("csgo", "")
					.replace("division-2", "")
					.replace("splitgate", "")
					.replace("hyper-scape", "")
					.replace("fortnite", "");
			}
		} else if (pathname === "/overlays") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Overlays";
		} else if (pathname === "/overlays/editor") {
			presenceData.details = "Creating";
			presenceData.state = "Tracker Overlay";
		} else if (pathname === "/premium") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Premium";
		} else if (pathname === "/partners") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Partners";
		} else if (pathname === "/shop") {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Shop";
		} else if (pathname === "/valorant") {
			presenceData.details = "Viewing Valorant Page";
			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname.includes("/valorant/profile")) {
			presenceData.details = "Viewing Valorant Profile:";
			presenceData.state =
				document.querySelector<HTMLSpanElement>(
					"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__username"
				).textContent +
				document.querySelector<HTMLSpanElement>(
					"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__discriminator"
				).textContent;
			presenceData.smallImageKey = "valorant";
			presenceData.smallImageText = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__username"
			).textContent;
			presenceData.largeImageKey = document
				.querySelector<HTMLImageElement>(
					"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > svg > image"
				)
				.getAttribute("href");
		} else if (pathname.includes("/valorant/leaderboards")) {
			if (pathname.includes("/valorant/leaderboards/ranked")) {
				presenceData.details = "Viewing:";
				presenceData.state = "Valorant Leaderboards Ranked";
				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "valorant";
			} else if (pathname.includes("/valorant/leaderboards/stats")) {
				presenceData.details = "Viewing:";
				presenceData.state = "Valorant Leaderboards Seasonal";
				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "valorant";
			}
		} else if (pathname.includes("/valorant/guides")) {
			if (pathname.includes("/clips/submit")) {
				presenceData.details = "Submitting Valorant Clip";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "valorant";
			} else if (pathname.includes("/clips")) {
				try {
					const stream: Element = document.querySelector<HTMLIFrameElement>(
						"#app > div.trn-wrapper > div.trn-container > div > div.container.guide-tile__modal > div.content.animated > div > div > iframe"
					);
					if (stream) {
						presenceData.details = "Watching:";
						presenceData.state = "Valorant Lineup Clip";

						presenceData.smallImageText = "TRN";
						presenceData.largeImageKey = "valorant";
					} else {
						presenceData.details = "Viewing:";
						presenceData.state = "Valorant Lineup Guides";

						presenceData.smallImageText = "TRN";
						presenceData.largeImageKey = "valorant";
					}
				} catch {
					presenceData.details = "Viewing:";
					presenceData.state = "Valorant Lineup Guides";
					presenceData.smallImageKey = "valorant";
					presenceData.smallImageText = "Valorant";
				}
			} else if (pathname.includes("/dashboard")) {
				presenceData.details = "Viewing:";
				presenceData.state = "own Valorant Guides";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "valorant";
			} else {
				try {
					presenceData.details = "Reading Guide:";
					presenceData.state = document.querySelector<HTMLHeadingElement>(
						"#app > div.trn-wrapper > div.trn-container > div > main > article > div.guide__header > h1"
					).textContent;

					presenceData.smallImageText = `Written by ${
						document.querySelector<HTMLSpanElement>(
							"#app > div.trn-wrapper > div.trn-container > div > main > article > div.guide__main > div > div.guide-main__hero.card.header-bordered.responsive > div.guide-main-metadata > div.guide-main__author.guide-main-metadata__author > span.guide-main__author-username"
						).textContent
					}`;
					presenceData.largeImageKey = "valorant";
				} catch {
					presenceData.details = "Viewing:";
					presenceData.state = "Valorant Guides";

					presenceData.smallImageText = "TRN";
					presenceData.largeImageKey = "valorant";
				}
			}
		} else if (pathname === "/valorant/lfg") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Looking for Group";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/insights/agents") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Insights";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/agents") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Agents";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname.includes("/valorant/agents")) {
			presenceData.details = "Viewing Valorant Agent:";
			presenceData.state = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > div.agent-breadcrumbs > ol > li:nth-child(3) > a > span"
			).textContent;

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/weapons") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Weapons";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname.includes("/valorant/weapons")) {
			presenceData.details = "Viewing Valorant Weapon:";
			presenceData.state = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > ol > li:nth-child(4) > a > span"
			).textContent;

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/maps") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Maps";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname.includes("/valorant/maps")) {
			presenceData.details = "Viewing Valorant Map:";
			presenceData.state = document
				.querySelector<HTMLHeadingElement>(
					"#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.no-card-margin.site-container.site-container--mobile-margin.site-container--background-fade.map-grid > div:nth-child(3) > div.map-info > h1"
				)
				.textContent.replace(" - Valorant Map", "");

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/cards") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Cards";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/buddies") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Buddies";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/valorant/sprays") {
			presenceData.details = "Viewing:";
			presenceData.state = "Valorant Sprays";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "valorant";
		} else if (pathname === "/hyper-scape") {
			presenceData.details = "Viewing Game:";
			presenceData.state = "Hyper Scape";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "hyperscape";
		} else if (pathname.includes("/hyper-scape/profile")) {
			const playerName: string = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
			).textContent;

			presenceData.details = "Viewing HyperScape Profile:";
			presenceData.state = playerName;
			presenceData.smallImageKey = "hyperscape";
			presenceData.smallImageText = playerName;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img"
			).src;
		} else if (pathname.includes("/hyper-scape/leaderboards/")) {
			if (pathname.includes("/stats/")) {
				presenceData.details = "Viewing:";
				presenceData.state = "HyperScape Leaderboards Lifetime";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "hyperscape";
			} else if (pathname.includes("/career-bests/")) {
				presenceData.details = "Viewing:";
				presenceData.state = "HyperScape Leaderboards Career Bests";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "hyperscape";
			} else if (pathname.includes("/playlists/")) {
				presenceData.details = "Viewing:";
				presenceData.state = "HyperScape Leaderboards Playlists";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "hyperscape";
			} else if (pathname.includes("/weapons/")) {
				presenceData.details = "Viewing:";
				presenceData.state = "HyperScape Leaderboards Weapons";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "hyperscape";
			}
		} else if (pathname === "/csgo") {
			presenceData.details = "Viewing Game:";
			presenceData.state = "CS:GO";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "csgo";
		} else if (pathname.includes("/csgo/profile/")) {
			const playerName: string = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
			).textContent;

			presenceData.details = "Viewing CSGO Profile:";
			presenceData.state = playerName;
			presenceData.smallImageKey = "csgo";
			presenceData.smallImageText = playerName;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img"
			).src;
		} else if (pathname.includes("/csgo/leaderboards/stats/all/")) {
			presenceData.details = "Viewing:";
			presenceData.state = "CSGO Leaderboard";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "csgo";
		} else if (pathname === "/lol") {
			presenceData.details = "Viewing Game:";
			presenceData.state = "Leage of Legends";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "lol";
		} else if (pathname.includes("/lol/profile")) {
			const playerName: string = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
			).textContent;

			presenceData.details = "Viewing LoL Profile:";
			presenceData.state = playerName;
			presenceData.smallImageKey = "lol";
			presenceData.smallImageText = playerName;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img"
			).src;
		} else if (pathname.includes("/lol/leaderboards/stats/")) {
			presenceData.details = "Viewing:";
			presenceData.state = "LoL Leaderboard";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "lol";
		} else if (pathname === "/splitgate") {
			presenceData.details = "Viewing Game:";
			presenceData.state = "Splitgate";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "splitgate";
		} else if (pathname.includes("/splitgate/profile/")) {
			const playerName: string = document.querySelector<HTMLSpanElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
			).textContent;

			presenceData.details = "Viewing Splitgate Profile:";
			presenceData.state = playerName;
			presenceData.smallImageKey = "splitgate";
			presenceData.smallImageText = playerName;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img.ph-avatar__image"
			).src;
		} else if (pathname.includes("/splitgate/leaderboards/")) {
			if (pathname.includes("/playlist/")) {
				presenceData.details = "Viewing Leaderboard:";
				presenceData.state = "Playlist";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "splitgate";
			} else if (pathname.includes("/stats/")) {
				presenceData.details = "Viewing Leaderboard:";
				presenceData.state = "Overall";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "splitgate";
			}
		} else if (pathname === "/splitgate/challenges") {
			presenceData.details = "Viewing:";
			presenceData.state = "Splitgate Challenges";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "splitgate";
		} else if (pathname.includes("/splitgate/challenges/")) {
			const challengeTitle: string = document.querySelector<HTMLHeadingElement>(
				"#app > div.trn-wrapper > div.trn-container > div > main > div.challenge > div.challenge__header > div > div.challenge__meta > h1"
			).textContent;

			presenceData.details = "Viewing Challenge:";
			presenceData.state = challengeTitle;

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "splitgate";
		}
	} else if (botHost === "fortnitetracker.com") {
		if (pathname === "/") {
			presenceData.details = "Viewing Fortnite Page";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname.includes("/profile/all/")) {
			const playerName: string = document.querySelector<HTMLSpanElement>(
				"#profile > div.trn-card.trn-profile-header > div > h1 > span"
			).textContent;

			presenceData.details = "Viewing Fortnite Profile:";
			presenceData.state = playerName;
			presenceData.smallImageKey = "fortnite";
			presenceData.smallImageText = playerName;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"#profile > div.trn-card.trn-profile-header > div > div.trn-profile-header__avatar.trn-roundavatar.trn-roundavatar--white > img"
			).src;
		} else if (pathname === "/event-lfp") {
			presenceData.details = "Viewing:";
			presenceData.state = "Looking for Player";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname === "/events") {
			presenceData.details = "Viewing:";
			presenceData.state = "Events";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname === "/events/powerrankings") {
			presenceData.details = "Viewing:";
			presenceData.state = "Power Ranking";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname === "/arena/leaderboards") {
			presenceData.details = "Viewing Leaderboard:";
			presenceData.state = "Hype";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname === "/events/earnings") {
			presenceData.details = "Viewing Leaderboard:";
			presenceData.state = "Earnings";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname === "/bests/win-streaks") {
			presenceData.details = "Viewing Leaderboard:";
			presenceData.state = "Win Streak";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname.includes("/bests/high-kills/")) {
			presenceData.details = "Viewing Leaderboard:";
			presenceData.state = "Single Match Kills";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname.includes("/leaderboards/")) {
			if (pathname.includes("/TRNRating")) {
				presenceData.details = "Viewing Leaderboard:";
				presenceData.state = "Tracker Network Rating";

				presenceData.smallImageText = "TRN";
				presenceData.largeImageKey = "fortnite";
			}
		} else if (pathname === "/challenges") {
			presenceData.details = "Viewing:";
			presenceData.state = "Challanges";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname.includes("/challenges/")) {
			presenceData.details = "Viewing Challange:";
			presenceData.state = document.querySelector<HTMLHeadingElement>(
				"#app > div > div.ftr-challenges > div:nth-child(1) > div.trn-card__header > h3"
			).textContent;

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		} else if (pathname === "/creative") {
			presenceData.details = "Viewing:";
			presenceData.state = "Creative Maps";

			presenceData.smallImageText = "TRN";
			presenceData.largeImageKey = "fortnite";
		}
	} else if (botHost === "thetrackernetwork.com") {
		if (pathname.includes("/manage/")) {
			presenceData.details = "Editing Profile";
			presenceData.state = document.querySelector<HTMLDivElement>(
				"body > div > div.trn-wrapper > div > div > main > div > div:nth-child(2) > div.mgn-header"
			).textContent;
		} else if (pathname === "/contact") {
			presenceData.details = "Viewing:";
			presenceData.state = "Contact Page";
		} else if (pathname === "/home/privacypolicy") {
			presenceData.details = "Viewing:";
			presenceData.state = "Privacy Policy";
		} else if (pathname === "/home/tos") {
			presenceData.details = "Viewing:";
			presenceData.state = "Terms of Service";
		} else if (pathname === "/home") {
			presenceData.details = "Viewing:";
			presenceData.state = "Homepage";
		}
	}

	if (
		!(await presence.getSetting("buttons")) ||
		presenceData.details === "Editing App:"
	)
		delete presenceData.buttons;
	else {
		presenceData.buttons = [
			{
				label: "Open Page",
				url: document.URL
			}
		];
	}

	if (
		pathname.includes("/manage/") &&
		(await presence.getSetting("privacy")) &&
		botHost === "thetrackernetwork.com"
	) {
		presenceData.details = "Viewing Page:";
		presenceData.state = "Homepage";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
