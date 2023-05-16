const presence = new Presence({
		clientId: "699204548664885279",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/LEtYrKg.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/home")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/messages"))
		presenceData.details = "Viewing messages";
	else if (document.location.pathname.includes("/stats")) {
		presenceData.details = "Viewing statistics";
		presenceData.smallImageKey = "statistics";
		presenceData.smallImageText = "Statistics";
	} else if (document.location.pathname.includes("/games/archive")) {
		presenceData.details = "Viewing games archive";
		presenceData.smallImageKey = "gamesarchive";
		presenceData.smallImageText = "Games archive";
	} else if (document.location.pathname.includes("/live")) {
		presenceData.details = "Playing Live Chess";
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = "Live";
	} else if (document.location.pathname.indexOf("/daily/") === 0) {
		presenceData.details = "Playing Daily Chess";
		presenceData.smallImageKey = "daily";
		presenceData.smallImageText = "Daily";
	} else if (document.location.pathname === "/daily") {
		presenceData.details = "Playing Daily Chess";
		presenceData.smallImageKey = "daily";
		presenceData.smallImageText = "Daily";
	} else if (document.location.pathname.includes("/play/computer")) {
		presenceData.details = "Playing against computer";
		presenceData.smallImageKey = "computer";
		presenceData.smallImageText = "Computer";
	} else if (document.location.pathname.includes("/tournaments"))
		presenceData.details = "Viewing tournaments";
	else if (document.location.pathname.includes("/4-player-chess")) {
		presenceData.details = "Playing 4 Player Chess";
		presenceData.smallImageKey = "4pc";
		presenceData.smallImageText = "4 Player Chess";
	} else if (document.location.pathname === "/variants") {
		presenceData.details = "Browsing through Chess Variants";
		presenceData.smallImageKey = "variants";
		presenceData.smallImageText = "Variants";
	} else {
		switch (0) {
			case document.location.pathname.indexOf("/variants/fog-of-war/game/"): {
				presenceData.details = "Playing Fog of War";
				presenceData.smallImageKey = "fog";
				presenceData.smallImageText = "Fog of War";

				break;
			}
			case document.location.pathname.indexOf("/variants/horde/game/"): {
				presenceData.details = "Playing Horde";
				presenceData.smallImageKey = "horde";
				presenceData.smallImageText = "Horde";

				break;
			}
			case document.location.pathname.indexOf(
				"/variants/king-of-the-hill/game/"
			): {
				presenceData.details = "Playing King of the Hill";
				presenceData.smallImageKey = "koth";
				presenceData.smallImageText = "King of the Hill";

				break;
			}
			case document.location.pathname.indexOf("/variants/torpedo/game/"): {
				presenceData.details = "Playing Torpedo";
				presenceData.smallImageKey = "torpedo";
				presenceData.smallImageText = "Torpedo";

				break;
			}
			case document.location.pathname.indexOf("/variants/3-check/game/"): {
				presenceData.details = "Playing 3 Check";
				presenceData.smallImageKey = "3+check";
				presenceData.smallImageText = "3 Check";

				break;
			}
			case document.location.pathname.indexOf("/variants/giveaway/game/"): {
				presenceData.details = "Playing Giveaway";
				presenceData.smallImageKey = "giveaway";
				presenceData.smallImageText = "Giveaway";

				break;
			}
			case document.location.pathname.indexOf(
				"/variants/sideway-pawns/game/"
			): {
				presenceData.details = "Playing Sideway Pawns";
				presenceData.smallImageKey = "sideways";
				presenceData.smallImageText = "Sideways Pawns";

				break;
			}
			case document.location.pathname.indexOf("/variants/chaturanga/game/"): {
				presenceData.details = "Playing Chaturanga";
				presenceData.smallImageKey = "chaturanga";
				presenceData.smallImageText = "Chaturanga";

				break;
			}
			case document.location.pathname.indexOf("/variants/blindfold/game/"): {
				presenceData.details = "Playing Blindfold";
				presenceData.smallImageKey = "blindfold";
				presenceData.smallImageText = "Blindfold";

				break;
			}
			case document.location.pathname.indexOf("/variants/no-castling/game/"): {
				presenceData.details = "Playing No Castling";
				presenceData.smallImageKey = "nocastle";
				presenceData.smallImageText = "No Castling";

				break;
			}
			case document.location.pathname.indexOf(
				"/variants/capture-anything/game/"
			): {
				presenceData.details = "Playing Capture Anything";
				presenceData.smallImageKey = "anything";
				presenceData.smallImageText = "Capture Anything";

				break;
			}
			case document.location.pathname.indexOf("/variants/atomic/game/"): {
				presenceData.details = "Playing Atomic";
				presenceData.smallImageKey = "atomic";
				presenceData.smallImageText = "Atomic";

				break;
			}
			default:
				if (document.location.pathname.includes("/automate")) {
					presenceData.details = "Playing Automate chess";
					presenceData.smallImageKey = "automate";
					presenceData.smallImageText = "Automate";
				} else {
					switch (document.location.pathname) {
						case "/puzzles/rated": {
							presenceData.details = "Solving puzzles";
							presenceData.smallImageKey = "puzzle";
							presenceData.smallImageText = "Puzzles";

							break;
						}
						case "/puzzles/rush": {
							presenceData.details = "Playing Puzzle Rush";
							presenceData.smallImageKey = "puzzlerush";
							presenceData.smallImageText = "Puzzle Rush";

							break;
						}
						case "/puzzles/battle": {
							presenceData.details = "Playing Puzzle Battle";
							presenceData.smallImageKey = "puzzlewar";
							presenceData.smallImageText = "Puzzle Battle";

							break;
						}
						default:
							if (
								document.location.pathname.indexOf(
									"/forum/view/daily-puzzles/"
								) === 0
							) {
								presenceData.details = "Solving Daily Puzzle";
								presenceData.smallImageKey = "puzzleoftheday";
								presenceData.smallImageText = "Daily Puzzle";
							} else if (document.location.pathname.includes("/solo-chess")) {
								presenceData.details = "Playing Solo Chess";
								presenceData.smallImageKey = "solochess";
								presenceData.smallImageText = "Solo Chess";
							} else if (document.location.pathname.includes("/drills")) {
								presenceData.details = "Playing drills";
								presenceData.smallImageKey = "drills";
								presenceData.smallImageText = "Drills";
							} else if (document.location.pathname.includes("/lessons")) {
								presenceData.details = "Viewing lessons";
								presenceData.smallImageKey = "lessons";
								presenceData.smallImageText = "Lessons";
							} else if (document.location.pathname.includes("/analysis")) {
								presenceData.details = "Analyzing a game";
								presenceData.smallImageKey = "analysis";
								presenceData.smallImageText = "Analysis";
							} else if (
								document.location.pathname.indexOf("/article/view") === 0
							) {
								presenceData.details = "Reading an article";
								presenceData.smallImageKey = "articles";
								presenceData.smallImageText = "Article";
								presenceData.state = document.title;
							} else if (document.location.pathname === "/articles") {
								presenceData.details = "Browsing through articles";
								presenceData.smallImageKey = "articles";
								presenceData.smallImageText = "Articles";
							} else if (document.location.pathname === "/videos")
								presenceData.details = "Browsing through videos";
							else if (document.location.pathname.includes("/vision")) {
								presenceData.details = "Training vision";
								presenceData.smallImageKey = "vision";
								presenceData.smallImageText = "Vision";
							} else if (document.location.pathname.includes("/openings")) {
								presenceData.details = "Viewing openings";
								presenceData.smallImageKey = "openings";
								presenceData.smallImageText = "Openings";
							} else if (document.location.pathname.includes("/explorer")) {
								presenceData.details = "Using games explorer";
								presenceData.smallImageKey = "explorer";
								presenceData.smallImageText = "Games explorer";
							} else if (document.location.pathname.includes("/forum")) {
								presenceData.details = "Browsing through forum";
								presenceData.smallImageKey = "forum";
								presenceData.smallImageText = "Forum";
							} else if (document.location.pathname.includes("/clubs")) {
								presenceData.details = "Browsing through clubs";
								presenceData.smallImageKey = "clubs";
								presenceData.smallImageText = "Clubs";
							} else if (document.location.pathname === "/blogs") {
								presenceData.details = "Browsing through blogs";
								presenceData.smallImageKey = "blog";
								presenceData.smallImageText = "Blog";
							} else if (document.location.pathname.indexOf("/blog/") === 0) {
								presenceData.details = "Reading a blog post";
								presenceData.smallImageKey = "blog";
								presenceData.smallImageText = "Blog post";
								presenceData.state = document.title;
							} else if (document.location.pathname.includes("/members")) {
								presenceData.details = "Browsing through members";
								presenceData.smallImageKey = "members";
								presenceData.smallImageText = "Members";
							} else if (document.location.pathname.includes("/coaches")) {
								presenceData.details = "Browsing through coaches";
								presenceData.smallImageKey = "coaches";
								presenceData.smallImageText = "Coaches";
							} else if (document.location.pathname.includes("/today")) {
								presenceData.details = "Viewing Chess Today";
								presenceData.smallImageKey = "chesstoday";
								presenceData.smallImageText = "Chess Today";
							} else if (
								document.location.pathname.indexOf("/news/view/") === 0
							) {
								presenceData.details = "Reading news";
								presenceData.smallImageKey = "news";
								presenceData.smallImageText = "News";
								presenceData.state = document.title;
							} else if (document.location.pathname === "/news") {
								presenceData.details = "Browsing through news";
								presenceData.smallImageKey = "news";
								presenceData.smallImageText = "News";
							} else if (document.location.pathname.includes("/tv")) {
								presenceData.details = "Viewing ChessTV";
								presenceData.smallImageKey = "chesstv";
								presenceData.smallImageText = "ChessTV";
							} else if (document.location.pathname === "/games") {
								presenceData.details = "Browsing through master games";
								presenceData.smallImageKey = "mastergames";
								presenceData.smallImageText = "Master Games";
							} else if (
								document.location.pathname.indexOf("/games/view/") === 0
							) {
								presenceData.details = "Watching a master game";
								presenceData.smallImageKey = "mastergames";
								presenceData.smallImageText = "Master Games";
								presenceData.state = document.title.substring(
									0,
									document.title.indexOf(")") + 1
								);
							} else if (
								document.location.pathname.includes(
									"/computer-chess-championship"
								)
							) {
								presenceData.details = "Watching Computer Chess Championship";
								presenceData.state = document.title.substring(
									0,
									document.title.indexOf("-")
								);
							} else if (
								document.location.pathname.indexOf("/video/player/") === 0
							) {
								const video: HTMLVideoElement = document.querySelector("video");

								if (video && !isNaN(video.duration)) {
									[presenceData.startTimestamp, presenceData.endTimestamp] =
										presence.getTimestamps(
											Math.floor(video.currentTime),
											Math.floor(video.duration)
										);
									presenceData.largeImageKey =
										"https://i.imgur.com/LEtYrKg.png";
									presenceData.details = "Watching video";
									presenceData.state = document.title;
									if (video.paused) {
										presenceData.smallImageKey = Assets.Pause;
										presenceData.smallImageText = (await strings).pause;
										delete presenceData.startTimestamp;
										delete presenceData.endTimestamp;
									} else {
										presenceData.smallImageKey = Assets.Play;
										presenceData.smallImageText = (await strings).play;
									}
								}
							}
					}
				}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
