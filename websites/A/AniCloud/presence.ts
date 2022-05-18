const presence = new Presence({
		clientId: "830517484472762408"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	}),
	pages: { [k: string]: string } = {
		"/animes": "Betrachtet alle Animes",
		"/beliebte-animes": "Betrachtet beliebte Animes",
		"/support/anleitung": "So funktioniert's -",
		"/animekalender": "Animekalender - ",
		"/random": "Der Anime-Zufallsgenerator",
		"/zufall": "Der Anime-Zufallsgenerator",
		"/neu": "Betrachtet neue Animes",
		"/support/regeln": "Betrachtet die Nutzungsbedingungen",
		"/dmca": "Digital Millennium Copyright Act of 1998",
		"/animewuensche": "Betrachtet Animewünsche",
		"/login": "Login bei Anicloud",
		"/registation": "Registrierung bei Anicloud",
		"/account": "Betrachtet sein Account",
		"/user/profil/": "Betrachtet ein Profil",
		"/account/nachrichten": "Betrachtet seine Nachrichten",
		"/account/notifications": "Betrachtet seine Benachrichtigungen",
		"/account/support": "im Support Bereich",
		"/account/watchlist": "Betrachtet seine Watchlist",
		"/account/subscribed": "Betrachtet seine Abonnierte Animes",
		"/account/settings": "Account Einstellungen",
		"/support/fragen": "Betrachtet Fragen & Antworten",
		"/support": "Hilfe & Support bei Anicloud",
		"/edit:information": "Neue Serieninformationen vorschlagen"
	};
let video,
	timeEnd: number,
	currentTime: number,
	paused: boolean,
	played: boolean;

presence.on(
	"iFrameData",
	async (data: {
		currentTime: number;
		timeEnd: number;
		paused: boolean;
		played: boolean;
	}) => {
		({ currentTime, timeEnd, played, paused } = data);
	}
);

presence.on("UpdateData", async () => {
	const page = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "anicloud",
			startTimestamp: Math.floor(Date.now() / 1000)
		};
	if (page === "/") presenceData.details = "Betrachtet die Startseite";
	else if (page.startsWith("/anime/")) {
		presenceData.details = `${
			(document.querySelector("h1") as HTMLElement).textContent
		}`;
		presenceData.state = `${(
			document.querySelector("title") as HTMLElement
		).textContent
			.split("Staffel")[0]
			.replace("Filme von", " ")
			.split(" | AniCloud.io - Animes gratis online ansehen")} - ${
			(document.querySelector("h2") as HTMLElement).textContent
		}`;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(currentTime, timeEnd);
		presenceData.buttons = [
			{
				label: "Watch Anime",
				url: document.location.href
			}
		];

		video = document.querySelector("video");
		if (video) {
			played = video.currentTime !== 0;
			timeEnd = video.duration;
			({ currentTime } = video);
			({ paused } = video);
		}
		if (played) {
			if (!paused) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					currentTime,
					timeEnd
				);
			}
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
		}

		//Obere Reiter
	} else {
		switch (page) {
			case "/animes": {
				presenceData.details = pages[page];
				presenceData.state = `Sortiert nach: ${
					(
						document.querySelector(
							"#wrapper > div.container.marginBottom > div.seriesListNavigation > strong"
						) as HTMLElement
					).textContent
				}`;

				break;
			}
			case "/beliebte-animes": {
				presenceData.state = `${
					(document.querySelector("title") as HTMLElement).textContent.split(
						"|"
					)[0]
				}`;

				break;
			}
			case "/support/anleitung": {
				presenceData.details = pages[page];
				presenceData.state = "Die Anleitung";

				break;
			}
			default:
				if (page.includes("/search")) {
					presenceData.details = "Sucht nach:";
					presenceData.state = `${
						(
							document.querySelector(
								"#wrapper > div.container > div.pageTitle.searchResultsPageTitle > h2 > strong"
							) as HTMLElement
						).textContent
					}`;
				} else {
					switch (page) {
						case "/animekalender": {
							presenceData.details = pages[page];
							presenceData.state = `${
								(
									document.querySelector(
										"#wrapper > div.container > div.seriesWishListHeader > div.row > div.col-md-4 > small"
									) as HTMLElement
								).textContent
							}`;

							break;
						}
						case "/zufall": {
							presenceData.details = pages[page];
							break;
						}
						case "/random": {
							presenceData.details = pages[page];
							break;
						}
						case "/neu": {
							presenceData.details = pages[page];
							break;
						}
						case "/support/regeln": {
							presenceData.details = pages[page];
							break;
						}
						case "/dmca": {
							presenceData.details = pages[page];
							break;
						}
						case "/animewuensche": {
							presenceData.details = pages[page];
							break;
						}
						case "/login": {
							presenceData.details = pages[page];
							break;
						}
						case "/registrierung": {
							presenceData.details = pages[page];
							break;
						}
						case "/account": {
							presenceData.details = pages[page];
							break;
						}
						default:
							if (page.startsWith("/user/profil/")) {
								presenceData.details = "Betrachtet ein Profil";
								presenceData.state = `${
									(document.querySelector("h1") as HTMLElement).textContent
								}`;
								presenceData.smallImageKey = "user";
								presenceData.smallImageText = `${
									(
										document.querySelector(
											"#userDetails > div > div > div:nth-child(3) > div"
										) as HTMLElement
									).textContent
								}`;
							} else {
								switch (page) {
									case "/account/nachrichten": {
										presenceData.details = pages[page];
										break;
									}
									case "/account/notifications": {
										presenceData.details = pages[page];
										break;
									}
									case "/account/support": {
										presenceData.details = pages[page];
										break;
									}
									case "/account/watchlist": {
										presenceData.details = pages[page];
										break;
									}
									case "/account/subscribed": {
										presenceData.details = pages[page];
										break;
									}
									case "/account/settings": {
										presenceData.details = pages[page];
										break;
									}
									default:
										if (page.startsWith("/support/fragen"))
											presenceData.details = pages[page];
										else if (page === "/support")
											presenceData.details = pages[page];
										else if (page === "/edit:information")
											presenceData.details = pages[page];
										else if (page.startsWith("/katalog/")) {
											presenceData.details = `Betrachtet Animes mit ${
												(
													document.querySelector(
														"#wrapper > div.container.marginBottom > div.pageTitle > h1 > strong"
													) as HTMLElement
												).textContent
											}`;
										} else if (page.startsWith("/support/frage/")) {
											presenceData.details = `Frage von ${
												(document.querySelector("h5") as HTMLElement)
													.textContent
											}`;
											presenceData.state = `${
												(document.querySelector("h1") as HTMLElement)
													.textContent
											}`;
										} else if (page.startsWith("/genre/")) {
											presenceData.details = `Sucht nach ${
												(
													document.querySelector(
														"#wrapper > div.container.marginBottom > div.seriesListSection > div.pageTitle.pageCenter.homeTitle > h1"
													) as HTMLElement
												).textContent
											}`;
										} else {
											presenceData.details =
												"Befindet sich auf einer Unbekannte Seite";
										}
								}
							}
					}
				}
		}
	}

	if (presenceData.details && presenceData.state)
		presence.setActivity(presenceData);
});
