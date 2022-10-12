const presence = new Presence({
		clientId: "638118757453004820",
	}),
	browsingTimestamp = Math.round(Date.now() / 1000);

type LayoutName =
	| "New"
	| "Dictionarium"
	| "Legacy"
	| "Guesspionage"
	| "DevilAndDetails"
	| "DrawfulAnimate"
	| "EnormousWheel"
	| "JobJob"
	| "PollMine"
	| "WeaponsDrawn";
type LayoutCallback = () => string;
const LayoutVersion: Record<LayoutName, LayoutCallback> = {
	New: () => document.querySelector("#playername").textContent,
	Dictionarium: () =>
		`${document.querySelector("#playericon").className.split("_")[1]}${document
			.querySelector("#playername")
			.textContent.toLowerCase()}`,
	Legacy: () => document.querySelector("#player").children[0].textContent,
	Guesspionage: () => document.querySelector("#player").children[1].textContent,
	DevilAndDetails: () => document.querySelector(".player-text").textContent,
	// TODO: Find similarities?
	DrawfulAnimate: () => document.querySelector(".header").textContent,
	EnormousWheel: () => document.querySelector(".player.name").textContent,
	JobJob: () => document.querySelector(".name").textContent,
	PollMine: () => "",
	WeaponsDrawn: () => document.querySelector(".avatar.header").textContent,
};

interface Game {
	name: string;
	layout?: LayoutCallback;
	selector: string;
	logo: string;
}

const Games: Record<string, Game> = {
	// Party Pack 1
	YouDontKnowJack2015: {
		name: "You Don't Know Jack 2015",
		layout: LayoutVersion.Legacy,
		selector: "#page-ydkj2015",
		logo: "https://i.imgur.com/EGnX1E5.png",
	},
	Drawful: {
		name: "Drawful 1/2",
		layout: LayoutVersion.Legacy,
		selector: "#page-drawful",
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	WordSpud: {
		name: "Word Spud",
		layout: LayoutVersion.Legacy,
		selector: "#page-wordspud",
		logo: "https://i.imgur.com/gFUB4EX.png",
	},
	LieSwatter: {
		name: "Lie Swatter",
		layout: LayoutVersion.Legacy,
		selector: "#page-lieswatter",
		logo: "https://i.imgur.com/PavDjzP.png",
	},
	// Party Pack 2
	Bidiots: {
		name: "Bidiots",
		layout: LayoutVersion.Legacy,
		selector: "#page-auction",
		logo: "https://i.imgur.com/CMcGDrM.png",
	},
	BompCorp: {
		name: "Bomb Corp",
		layout: LayoutVersion.Legacy,
		selector: "#page-bombintern",
		logo: "https://i.imgur.com/XkqOv6o.png",
	},
	Earwax: {
		name: "Earwax",
		layout: LayoutVersion.Legacy,
		selector: "#page-earwax",
		logo: "https://i.imgur.com/oEidNn6.png",
	},
	Fibbage: {
		name: "Fibbage XL/2",
		layout: LayoutVersion.Legacy,
		selector: "#page-fibbage",
		logo: "https://i.imgur.com/LxAtHuy.png",
	},
	// Party Pack 3
	TeeKO: {
		name: "Tee K.O.",
		layout: LayoutVersion.Legacy,
		selector: "#page-awshirt",
		logo: "https://i.imgur.com/wGbJhoR.png",
	},
	FakinIt: {
		name: "Fakin' It",
		layout: LayoutVersion.Legacy,
		selector: "#page-fakinit",
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	Guesspionage: {
		name: "Guesspionage",
		layout: LayoutVersion.Guesspionage,
		selector: "#page-pollposition",
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	Quiplash: {
		name: "Quiplash 1/2/XL",
		layout: LayoutVersion.Legacy,
		selector: "#page-quiplash",
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	TriviaDeathParty: {
		name: "Trivia M Party", // TODO: Fix name
		layout: LayoutVersion.Legacy,
		selector: "#page-triviadeath",
		logo: "https://i.imgur.com/zHOvymB.png",
	},
	// Party Pack 4
	CivicDoodle: {
		name: "Civic Doodle",
		selector: ".Overdrawn",
		logo: "https://i.imgur.com/6CBskbM.png",
	},
	Bracketeering: {
		name: "Bracketeering",
		selector: ".bracketeering",
		logo: "https://i.imgur.com/oJJpQqi.png",
	},
	MonsterSeekingMonster: {
		name: "Monster Seeking Monster",
		selector: ".MonsterMingle",
		logo: "https://i.imgur.com/CPkaxX3.png",
	},
	SurviveTheInternet: {
		name: "Survive the Internet",
		selector: ".SurviveTheInternet",
		logo: "https://i.imgur.com/eXCzZ2e.png",
	},
	Fibbage3: {
		name: "Fibbage 3",
		selector: ".Fibbage3",
		logo: "https://i.imgur.com/eTsm2zC.png",
	},
	// Party Pack 5
	SplitTheRoom: {
		name: "Split the Room",
		selector: ".SplitTheRoom",
		logo: "https://i.imgur.com/YyhOPAp.png",
	},
	ZeepleDome: {
		name: "Zeeple Dome",
		selector: ".SlingShoot",
		logo: "https://i.imgur.com/QqEKHgG.png",
	},
	PatentlyStupid: {
		name: "Patently Stupid",
		selector: ".PatentlyStupid",
		logo: "https://i.imgur.com/yGEE0Aw.png",
	},
	MadVerseCity: {
		name: "Mad Verse City",
		selector: ".RapBattle",
		logo: "https://i.imgur.com/Up8Paw8.png",
	},
	YouDontKnowJackFullStream: {
		name: "You Don't Know Jack: Full Stream",
		selector: ".YDKJ2018",
		logo: "https://i.imgur.com/Li8TLXI.png",
	},
	// Party Pack 6
	PushTheButton: {
		name: "Push the Button",
		selector: ".pushthebutton", // TODO: Verify
		logo: "https://i.imgur.com/OhgGmMQ.png",
	},
	JokeBoat: {
		name: "Joke Boat",
		selector: ".Jokeboat",
		logo: "https://i.imgur.com/Cih6bqA.png",
	},
	RoleModels: {
		name: "Role Models",
		selector: ".RoleModels",
		logo: "https://i.imgur.com/sETBCgc.png",
	},
	TriviaDeathParty2: {
		name: "Trivia M Party 2", // TODO: Fix name
		selector: ".TriviaDeath2",
		logo: "https://i.imgur.com/9MmGVGD.png",
	},
	Dictionarium: {
		name: "Dictionarium",
		selector: ".Ridictionarium",
		logo: "https://i.imgur.com/8S0aSTw.png",
		layout: LayoutVersion.Dictionarium,
	},
	// Party Pack 7
	Quiplash3: {
		name: "Quiplash 3",
		selector: ".quiplash3",
		logo: "https://i.imgur.com/Jds4R56.png",
	},
	TalkingPoints: {
		name: "Talking Points",
		selector: ".jackbox-talks",
		logo: "https://i.imgur.com/8Amy9Di.png",
	},
	BlatherRound: {
		name: "Blather 'Round",
		selector: ".blanky-blank",
		logo: "https://i.imgur.com/qLW2Fft.png",
	},
	TheDevilsAndTheDetails: {
		name: "The Devils and the Details",
		selector: ".everyday",
		logo: "https://i.imgur.com/tXkh58c.png",
		layout: LayoutVersion.DevilAndDetails,
	},
	ChampdUp: {
		name: "Champ'd Up",
		selector: ".worldchamps",
		logo: "https://i.imgur.com/KnAS7yD.png",
	},
	// Party Pack 8
	WheelOfEnormousProportions: {
		name: "The Wheel of Enormous Proportions",
		selector: ".wheel",
		logo: "https://i.imgur.com/KnAS7yD.png",
		layout: LayoutVersion.EnormousWheel,
	},
	WeaponsDrawn: {
		name: "Weapons Drawn",
		selector: ".detectives",
		logo: "https://i.imgur.com/yRXmXbf.png",
		layout: LayoutVersion.WeaponsDrawn,
	},
	JobJob: {
		name: "Job Job",
		selector: ".apply-yourself",
		logo: "https://i.imgur.com/FfZYRGL.png",
		layout: LayoutVersion.JobJob,
	},
	DrawfulAnimate: {
		name: "Drawful Animate",
		selector: ".drawful-animate",
		logo: "https://i.imgur.com/NtRvc93.png",
		layout: LayoutVersion.DrawfulAnimate,
	},
	ThePollMine: {
		name: "The Poll Mine",
		selector: ".poll-mine",
		logo: "https://i.imgur.com/o4aaUox.png",
		layout: LayoutVersion.PollMine,
	},
	// Party Pack 9
	Fibbage4: {
		name: "Fibbage 4",
		selector: "TODO",
		logo: "TODO",
	},
	Quixort: {
		name: "Quixort",
		selector: "TODO",
		logo: "TODO",
	},
	Nonsensory: {
		name: "Nonsensory",
		selector: "TODO",
		logo: "TODO",
	},
	Junktopia: {
		name: "Junktopia",
		selector: "TODO",
		logo: "TODO",
	},
	Roomerang: {
		name: "Roomerang",
		selector: "TODO",
		logo: "TODO",
	},
};

let game: Game,
	getLayoutPlayerName = LayoutVersion.New;

if (window.location.hostname === "jackbox.tv") {
	const gameDiscoveryInterval = setInterval(async () => {
		getLayoutPlayerName = LayoutVersion.New;
		game = Object.values(Games).find(
			game => document.querySelector(game.selector) !== null
		);
		if (game) clearInterval(gameDiscoveryInterval);
	}, 500);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SXfEdnL.png",
		},
		[useName, useTime, useDetails] = await Promise.all([
			presence.getSetting<boolean>("useName"),
			presence.getSetting<boolean>("useTime"),
			presence.getSetting<boolean>("useDetails"),
		]);

	if (useTime) presenceData.startTimestamp = browsingTimestamp;

	switch (window.location.hostname) {
		case "jackbox.tv": {
			if (game) {
				const { layout, name, logo } = game;
				let playerName: string;
				getLayoutPlayerName = layout;
				presenceData.largeImageKey = logo;
				presenceData.details = `Playing ${name}`;
				if (useName) {
					try {
						const name = getLayoutPlayerName();
						if (name) playerName = ` as ${name}`;
					} catch (err) {
						playerName = "";
					}
				}
				if (useDetails) {
					presenceData.details += playerName;
					switch (game) {
						// Party Pack 1
						case Games.LieSwatter: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".lieswatter-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-lobby")) {
								presenceData.state = "Waiting in lobby";
							} else if (classList.contains("state-answer")) {
								presenceData.state = "Swatting lies";
							} else if (classList.contains("state-nothing")) {
								presenceData.state = "Waiting for other players";
							}
							break;
						}
						case Games.WordSpud: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".wordspud-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-waiting")) {
								presenceData.state = "Waiting in lobby";
							} else if (classList.contains("state-startbutton")) {
								presenceData.state = "Waiting for other players to join";
							} else if (classList.contains("state-writing")) {
								presenceData.state = "Writing something";
							} else if (classList.contains("state-vote")) {
								presenceData.state = "Voting on a word";
							} else if (classList.contains("state-vote-wait")) {
								presenceData.state = "Being judged";
							} else if (classList.contains("state-nothing")) {
								presenceData.state = "Waiting";
							} else if (classList.contains("state-voted")) {
								presenceData.state = "Waiting for other players to vote";
							} else if (classList.contains("state-gameover")) {
								presenceData.state = "Game over";
							}
							break;
						}
						// Party Pack 2
						case Games.Bidiots: {
							break;
						}
						case Games.Fibbage: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".fibbage-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-lobby")) {
								presenceData.state = "Waiting in lobby";
							} else if (classList.contains("state-round")) {
								presenceData.state =
									currentGamePage.querySelector("p").textContent;
							} else if (classList.contains("state-notchoosing")) {
								presenceData.state = `Waiting for ${
									currentGamePage
										.querySelector("span")
										.textContent.match(/^(.*?) is picking a category$/)[1]
								} to pick a category`;
							} else if (classList.contains("state-nothing")) {
								presenceData.state = "Waiting";
							} else if (classList.contains("state-enterlie")) {
								presenceData.state = "Entering a lie";
							} else if (classList.contains("state-lyingdone")) {
								presenceData.state = "Lying done";
							} else if (classList.contains("state-liereceived")) {
								presenceData.state = "Waiting for other players to enter lies";
							} else if (
								classList.contains("state-chooselie") ||
								classList.contains("state-audience-chooselie")
							) {
								presenceData.state = "Finding the truth";
							} else if (
								classList.contains("state-chooselikes") ||
								classList.contains("state-audience-chooselikes")
							) {
								presenceData.state = "Liking lies";
							} else if (classList.contains("state-choosing")) {
								presenceData.state = "Choosing a category";
							} else if (classList.contains("state-pickbloop")) {
								presenceData.state = "Chossing a sound";
							} else if (classList.contains("state-audience-join")) {
								presenceData.state = "Joining audience";
							} else if (classList.contains("state-audience-score")) {
								presenceData.state = "Viewing audience scores";
							}
							break;
						}
						case Games.Quiplash: {
							break;
						}
						case Games.BompCorp: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".bombintern-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-lobby")) {
								presenceData.state = "Waiting in lobby";
							} else if (classList.contains("state-dayend")) {
								presenceData.state = "Day end";
							} else if (classList.contains("state-gameover")) {
								presenceData.state = "Game over";
							} else if (classList.contains("state-nothing")) {
								presenceData.state = "Waiting";
							} else if (classList.contains("state-message")) {
								presenceData.state = "Reading a message";
							} else if (classList.contains("state-smashpuzzle")) {
								presenceData.state = "Defusing a smash puzzle bomb";
							} else if (classList.contains("state-wiredbomb")) {
								presenceData.state = "Defusing a wired bomb";
							} else if (classList.contains("state-coffeebomb")) {
								presenceData.state = "Defusing a coffee bomb";
							} else if (classList.contains("state-filingbomb")) {
								presenceData.state = "Defusing a filing bomb";
							} else if (classList.contains("state-keypadbomb")) {
								presenceData.state = "Defusing a keypad bomb";
							} else if (classList.contains("state-copierbomb")) {
								presenceData.state = "Defusing a copier bomb";
							}
							break;
						}
						case Games.Earwax: {
							break;
						}
						// Party Pack 3
						case Games.TeeKO: {
							break;
						}
						case Games.FakinIt: {
							break;
						}
						case Games.Guesspionage: {
							break;
						}
						case Games.TriviaDeathParty: {
							break;
						}
						// Party Pack 4
						case Games.CivicDoodle: {
							break;
						}
						case Games.Bracketeering: {
							break;
						}
						case Games.MonsterSeekingMonster: {
							break;
						}
						case Games.SurviveTheInternet: {
							break;
						}
						case Games.Fibbage3: {
							break;
						}
						// Party Pack 5
						case Games.SplitTheRoom: {
							break;
						}
						case Games.ZeepleDome: {
							break;
						}
						case Games.PatentlyStupid: {
							break;
						}
						case Games.MadVerseCity: {
							break;
						}
						case Games.YouDontKnowJackFullStream: {
							break;
						}
						// Party Pack 6
						case Games.PushTheButton: {
							break;
						}
						case Games.JokeBoat: {
							break;
						}
						case Games.RoleModels: {
							break;
						}
						case Games.TriviaDeathParty2: {
							break;
						}
						case Games.Dictionarium: {
							break;
						}
						// Party Pack 7
						case Games.Quiplash3: {
							break;
						}
						case Games.TalkingPoints: {
							break;
						}
						case Games.BlatherRound: {
							break;
						}
						case Games.TheDevilsAndTheDetails: {
							break;
						}
						case Games.ChampdUp: {
							break;
						}
						// Party Pack 8
						case Games.WheelOfEnormousProportions: {
							break;
						}
						case Games.WeaponsDrawn: {
							break;
						}
						case Games.JobJob: {
							break;
						}
						case Games.DrawfulAnimate: {
							break;
						}
						case Games.ThePollMine: {
							break;
						}
						// Party Pack 9
						case Games.Fibbage4: {
							break;
						}
						case Games.Quixort: {
							break;
						}
						case Games.Nonsensory: {
							break;
						}
						case Games.Junktopia: {
							break;
						}
						case Games.Roomerang: {
							break;
						}
					}
				} else {
					presenceData.state = playerName;
				}
			} else {
				presenceData.details = "Idle";
			}
			break;
		}
		case "games.jackbox.tv": {
			presenceData.details = "Looking at a past game";
			break;
		}
		case "www.jackboxgames.com": {
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
