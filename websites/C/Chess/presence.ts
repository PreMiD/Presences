const presence = new Presence({
		clientId: "699204548664885279",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/logo.png",
	Statistics = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/0.png",
	GamesArchive = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/1.png",
	Daily = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/2.png",
	Computer = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/3.png",
	FourPC = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/4.png",
	Variants = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/5.png",
	Fog = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/6.png",
	Horde = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/7.png",
	Koth = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/8.png",
	Torpedo = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/9.png",
	ThreeCheck = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/10.png",
	Giveaway = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/11.png",
	Sideways = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/12.png",
	Chataranga = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/13.png",
	Blindfold = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/14.png",
	Nocastle = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/15.png",
	Anything = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/16.png",
	Atomic = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/17.png",
	Automate = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/18.png",
	Puzzle = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/19.png",
	PuzzleRush = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/20.png",
	PuzzleWar = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/21.png",
	PuzzleOfDay = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/22.png",
	SoloChess = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/23.png",
	Drills = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/24.png",
	Lessons = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/25.png",
	Analysis = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/26.png",
	Articles = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/27.png",
	Vision = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/28.png",
	Openings = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/29.png",
	Explorer = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/30.png",
	Forum = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/31.png",
	Clubs = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/32.png",
	Blog = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/33.png",
	Members = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/34.png",
	Coaches = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/35.png",
	ChessToday = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/36.png",
	News = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/37.png",
	ChessTV = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/38.png",
	MasterGames = "https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/39.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/home")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/messages"))
		presenceData.details = "Viewing messages";
	else if (document.location.pathname.includes("/stats")) {
		presenceData.details = "Viewing statistics";
		presenceData.smallImageKey = Assets.Statistics;
		presenceData.smallImageText = "Statistics";
	} else if (document.location.pathname.includes("/games/archive")) {
		presenceData.details = "Viewing games archive";
		presenceData.smallImageKey = Assets.GamesArchive;
		presenceData.smallImageText = "Games archive";
	} else if (document.location.pathname.includes("/live")) {
		presenceData.details = "Playing Live Chess";
		presenceData.smallImageKey = Assets.Live;
		presenceData.smallImageText = "Live";
	} else if (document.location.pathname.indexOf("/daily/") === 0) {
		presenceData.details = "Playing Daily Chess";
		presenceData.smallImageKey = Assets.Daily;
		presenceData.smallImageText = "Daily";
	} else if (document.location.pathname === "/daily") {
		presenceData.details = "Playing Daily Chess";
		presenceData.smallImageKey = Assets.Daily;
		presenceData.smallImageText = "Daily";
	} else if (document.location.pathname.includes("/play/computer")) {
		presenceData.details = "Playing against computer";
		presenceData.smallImageKey = Assets.Computer;
		presenceData.smallImageText = "Computer";
	} else if (document.location.pathname.includes("/tournaments"))
		presenceData.details = "Viewing tournaments";
	else if (document.location.pathname.includes("/4-player-chess")) {
		presenceData.details = "Playing 4 Player Chess";
		presenceData.smallImageKey = Assets.FourPC;
		presenceData.smallImageText = "4 Player Chess";
	} else if (document.location.pathname === "/variants") {
		presenceData.details = "Browsing through Chess Variants";
		presenceData.smallImageKey = Assets.Variants;
		presenceData.smallImageText = "Variants";
	} else {
		switch (0) {
			case document.location.pathname.indexOf("/variants/fog-of-war/game/"): {
				presenceData.details = "Playing Fog of War";
				presenceData.smallImageKey = Assets.Fog;
				presenceData.smallImageText = "Fog of War";

				break;
			}
			case document.location.pathname.indexOf("/variants/horde/game/"): {
				presenceData.details = "Playing Horde";
				presenceData.smallImageKey = Assets.Horde;
				presenceData.smallImageText = "Horde";

				break;
			}
			case document.location.pathname.indexOf(
				"/variants/king-of-the-hill/game/"
			): {
				presenceData.details = "Playing King of the Hill";
				presenceData.smallImageKey = Assets.Koth;
				presenceData.smallImageText = "King of the Hill";

				break;
			}
			case document.location.pathname.indexOf("/variants/torpedo/game/"): {
				presenceData.details = "Playing Torpedo";
				presenceData.smallImageKey = Assets.Torpedo;
				presenceData.smallImageText = "Torpedo";

				break;
			}
			case document.location.pathname.indexOf("/variants/3-check/game/"): {
				presenceData.details = "Playing 3 Check";
				presenceData.smallImageKey = Assets.ThreeCheck;
				presenceData.smallImageText = "3 Check";

				break;
			}
			case document.location.pathname.indexOf("/variants/giveaway/game/"): {
				presenceData.details = "Playing Giveaway";
				presenceData.smallImageKey = Assets.Giveaway;
				presenceData.smallImageText = "Giveaway";

				break;
			}
			case document.location.pathname.indexOf(
				"/variants/sideway-pawns/game/"
			): {
				presenceData.details = "Playing Sideway Pawns";
				presenceData.smallImageKey = Assets.Sideways;
				presenceData.smallImageText = "Sideways Pawns";

				break;
			}
			case document.location.pathname.indexOf("/variants/chaturanga/game/"): {
				presenceData.details = "Playing Chaturanga";
				presenceData.smallImageKey = Assets.Chataranga;
				presenceData.smallImageText = "Chaturanga";

				break;
			}
			case document.location.pathname.indexOf("/variants/blindfold/game/"): {
				presenceData.details = "Playing Blindfold";
				presenceData.smallImageKey = Assets.Blindfold;
				presenceData.smallImageText = "Blindfold";

				break;
			}
			case document.location.pathname.indexOf("/variants/no-castling/game/"): {
				presenceData.details = "Playing No Castling";
				presenceData.smallImageKey = Assets.Nocastle;
				presenceData.smallImageText = "No Castling";

				break;
			}
			case document.location.pathname.indexOf(
				"/variants/capture-anything/game/"
			): {
				presenceData.details = "Playing Capture Anything";
				presenceData.smallImageKey = Assets.Anything;
				presenceData.smallImageText = "Capture Anything";

				break;
			}
			case document.location.pathname.indexOf("/variants/atomic/game/"): {
				presenceData.details = "Playing Atomic";
				presenceData.smallImageKey = Assets.Atomic;
				presenceData.smallImageText = "Atomic";

				break;
			}
			default:
				if (document.location.pathname.includes("/automate")) {
					presenceData.details = "Playing Automate chess";
					presenceData.smallImageKey = Assets.Automate;
					presenceData.smallImageText = "Automate";
				} else {
					switch (document.location.pathname) {
						case "/puzzles/rated": {
							presenceData.details = "Solving puzzles";
							presenceData.smallImageKey = Assets.Puzzle;
							presenceData.smallImageText = "Puzzles";

							break;
						}
						case "/puzzles/rush": {
							presenceData.details = "Playing Puzzle Rush";
							presenceData.smallImageKey = Assets.PuzzleRush;
							presenceData.smallImageText = "Puzzle Rush";

							break;
						}
						case "/puzzles/battle": {
							presenceData.details = "Playing Puzzle Battle";
							presenceData.smallImageKey = Assets.PuzzleWar;
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
								presenceData.smallImageKey = Assets.PuzzleOfDay;
								presenceData.smallImageText = "Daily Puzzle";
							} else if (document.location.pathname.includes("/solo-chess")) {
								presenceData.details = "Playing Solo Chess";
								presenceData.smallImageKey = Assets.SoloChess;
								presenceData.smallImageText = "Solo Chess";
							} else if (document.location.pathname.includes("/drills")) {
								presenceData.details = "Playing drills";
								presenceData.smallImageKey = Assets.Drills;
								presenceData.smallImageText = "Drills";
							} else if (document.location.pathname.includes("/lessons")) {
								presenceData.details = "Viewing lessons";
								presenceData.smallImageKey = Assets.Lessons;
								presenceData.smallImageText = "Lessons";
							} else if (document.location.pathname.includes("/analysis")) {
								presenceData.details = "Analyzing a game";
								presenceData.smallImageKey = Assets.Analysis;
								presenceData.smallImageText = "Analysis";
							} else if (
								document.location.pathname.indexOf("/article/view") === 0
							) {
								presenceData.details = "Reading an article";
								presenceData.smallImageKey = Assets.Articles;
								presenceData.smallImageText = "Article";
								presenceData.state = document.title;
							} else if (document.location.pathname === "/articles") {
								presenceData.details = "Browsing through articles";
								presenceData.smallImageKey = Assets.Articles;
								presenceData.smallImageText = "Articles";
							} else if (document.location.pathname === "/videos")
								presenceData.details = "Browsing through videos";
							else if (document.location.pathname.includes("/vision")) {
								presenceData.details = "Training vision";
								presenceData.smallImageKey = Assets.Vision;
								presenceData.smallImageText = "Vision";
							} else if (document.location.pathname.includes("/openings")) {
								presenceData.details = "Viewing openings";
								presenceData.smallImageKey = Assets.Openings;
								presenceData.smallImageText = "Openings";
							} else if (document.location.pathname.includes("/explorer")) {
								presenceData.details = "Using games explorer";
								presenceData.smallImageKey = Assets.Explorer;
								presenceData.smallImageText = "Games explorer";
							} else if (document.location.pathname.includes("/forum")) {
								presenceData.details = "Browsing through forum";
								presenceData.smallImageKey = Assets.Forum;
								presenceData.smallImageText = "Forum";
							} else if (document.location.pathname.includes("/clubs")) {
								presenceData.details = "Browsing through clubs";
								presenceData.smallImageKey = Assets.Clubs;
								presenceData.smallImageText = "Clubs";
							} else if (document.location.pathname === "/blogs") {
								presenceData.details = "Browsing through blogs";
								presenceData.smallImageKey = Assets.Blog;
								presenceData.smallImageText = "Blog";
							} else if (document.location.pathname.indexOf("/blog/") === 0) {
								presenceData.details = "Reading a blog post";
								presenceData.smallImageKey = Assets.Blog;
								presenceData.smallImageText = "Blog post";
								presenceData.state = document.title;
							} else if (document.location.pathname.includes("/members")) {
								presenceData.details = "Browsing through members";
								presenceData.smallImageKey = Assets.Members;
								presenceData.smallImageText = "Members";
							} else if (document.location.pathname.includes("/coaches")) {
								presenceData.details = "Browsing through coaches";
								presenceData.smallImageKey = Assets.Coaches;
								presenceData.smallImageText = "Coaches";
							} else if (document.location.pathname.includes("/today")) {
								presenceData.details = "Viewing Chess Today";
								presenceData.smallImageKey = Assets.ChessToday;
								presenceData.smallImageText = "Chess Today";
							} else if (
								document.location.pathname.indexOf("/news/view/") === 0
							) {
								presenceData.details = "Reading news";
								presenceData.smallImageKey = Assets.News;
								presenceData.smallImageText = "News";
								presenceData.state = document.title;
							} else if (document.location.pathname === "/news") {
								presenceData.details = "Browsing through news";
								presenceData.smallImageKey = Assets.News;
								presenceData.smallImageText = "News";
							} else if (document.location.pathname.includes("/tv")) {
								presenceData.details = "Viewing ChessTV";
								presenceData.smallImageKey = Assets.ChessTV;
								presenceData.smallImageText = "ChessTV";
							} else if (document.location.pathname === "/games") {
								presenceData.details = "Browsing through master games";
								presenceData.smallImageKey = Assets.MasterGames;
								presenceData.smallImageText = "Master Games";
							} else if (
								document.location.pathname.indexOf("/games/view/") === 0
							) {
								presenceData.details = "Watching a master game";
								presenceData.smallImageKey = Assets.MasterGames;
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
										"https://cdn.rcd.gg/PreMiD/websites/C/Chess/assets/logo.png";
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
