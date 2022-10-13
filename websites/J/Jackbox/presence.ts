const presence = new Presence({
		clientId: "638118757453004820",
	}),
	browsingTimestamp = Math.round(Date.now() / 1000);

type LayoutCallback = () => string;
const LayoutVersion: Record<string, LayoutCallback> = {
	New: () => "New",
	Legacy: () => document.querySelector("#playername").textContent,
	CivicDoodle: () => document.querySelector("#playername #body").textContent,
	Dictionarium: () =>
		`${document.querySelector("#playericon").className.split("_")[1]}${document
			.querySelector("#playername")
			.textContent.toLowerCase()}`,
	VeryLegacy: () => document.querySelector("#player").children[0].textContent,
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
	logo: string;
}

let gameState: {
	playerName: string,
	state: string,
	[x: string]: unknown
};

if (window.location.hostname === "jackbox.tv") {
	setInterval(async () => {
		const logs = await presence.getLogs(/recv <- .*?"playerName":/s),
			latestLog = logs[logs.length - 1];
		gameState = JSON.parse(latestLog.slice(8)).result.val;
	}, 1000);
}

const Games: Record<string, Game> = {
	// Party Pack 1
	ydkj2015: {
		name: "You Don't Know Jack 2015",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/EGnX1E5.png",
	},
	drawful2: {
		name: "Drawful 2",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	drawful2international: {
		name: "Drawful 2 International",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	drawful: {
		name: "Drawful",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	wordspud: {
		name: "Word Spud",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/gFUB4EX.png",
	},
	lieswatter: {
		name: "Lie Swatter",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/PavDjzP.png",
	},
	// Party Pack 2
	auction: {
		name: "Bidiots",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/CMcGDrM.png",
	},
	bombintern: {
		name: "Bomb Corp",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/XkqOv6o.png",
	},
	earwax: {
		name: "Earwax",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/oEidNn6.png",
	},
	fibbage: {
		name: "Fibbage XL",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/LxAtHuy.png",
	},
	fibbage2: {
		name: "Fibbage 2",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/LxAtHuy.png",
	},
	// Party Pack 3
	awshirt: {
		name: "Tee K.O.",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/wGbJhoR.png",
	},
	fakinit: {
		name: "Fakin' It",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	pollposition: {
		name: "Guesspionage",
		layout: LayoutVersion.Guesspionage,
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	quiplash: {
		name: "Quiplash XL",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	quiplash2: {
		name: "Quiplash 2",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	"quiplash2-international": {
		name: "Quiplash 2 Interlational",
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	triviadeath: {
		name: "Trivia M Party", // TODO: Fix name
		layout: LayoutVersion.VeryLegacy,
		logo: "https://i.imgur.com/zHOvymB.png",
	},
	// Party Pack 4
	overdrawn: {
		name: "Civic Doodle",
		logo: "https://i.imgur.com/6CBskbM.png",
		layout: LayoutVersion.CivicDoodle,
	},
	bracketeering: {
		name: "Bracketeering",
		logo: "https://i.imgur.com/oJJpQqi.png",
		layout: LayoutVersion.Legacy,
	},
	monstermingle: {
		name: "Monster Seeking Monster",
		logo: "https://i.imgur.com/CPkaxX3.png",
		layout: LayoutVersion.Legacy,
	},
	survivetheinternet: {
		name: "Survive the Internet",
		logo: "https://i.imgur.com/eXCzZ2e.png",
		layout: LayoutVersion.Legacy,
	},
	fibbage3: {
		name: "Fibbage 3",
		logo: "https://i.imgur.com/eTsm2zC.png",
		layout: LayoutVersion.Legacy,
	},
	// Party Pack 5
	splittheroom: {
		name: "Split the Room",
		logo: "https://i.imgur.com/YyhOPAp.png",
		layout: LayoutVersion.Legacy,
	},
	slingshoot: {
		name: "Zeeple Dome",
		logo: "https://i.imgur.com/QqEKHgG.png",
		layout: LayoutVersion.Legacy,
	},
	patentlystupid: {
		name: "Patently Stupid",
		logo: "https://i.imgur.com/yGEE0Aw.png",
		layout: LayoutVersion.Legacy,
	},
	rapbattle: {
		name: "Mad Verse City",
		logo: "https://i.imgur.com/Up8Paw8.png",
		layout: LayoutVersion.Legacy,
	},
	ydkj2018: {
		name: "You Don't Know Jack: Full Stream",
		logo: "https://i.imgur.com/Li8TLXI.png",
		layout: LayoutVersion.Legacy,
	},
	// Party Pack 6
	pushthebutton: {
		name: "Push the Button",
		logo: "https://i.imgur.com/OhgGmMQ.png",
		layout: LayoutVersion.Legacy,
	},
	jokeboat: {
		name: "Joke Boat",
		logo: "https://i.imgur.com/Cih6bqA.png",
		layout: LayoutVersion.Legacy,
	},
	rolemodels: {
		name: "Role Models",
		logo: "https://i.imgur.com/sETBCgc.png",
		layout: LayoutVersion.Legacy,
	},
	triviadeath2: {
		name: "Trivia M Party 2", // TODO: Fix name
		logo: "https://i.imgur.com/9MmGVGD.png",
		layout: LayoutVersion.Legacy,
	},
	ridictionary: {
		name: "Dictionarium",
		logo: "https://i.imgur.com/8S0aSTw.png",
		layout: LayoutVersion.Dictionarium,
	},
	// Party Pack 7
	quiplash3: {
		name: "Quiplash 3",
		logo: "https://i.imgur.com/Jds4R56.png",
		layout: LayoutVersion.Legacy,
	},
	"jackbox-talks": {
		name: "Talking Points",
		logo: "https://i.imgur.com/8Amy9Di.png",
		layout: LayoutVersion.Legacy,
	},
	"blanky-blank": {
		name: "Blather 'Round",
		logo: "https://i.imgur.com/qLW2Fft.png",
		layout: LayoutVersion.Legacy,
	},
	everyday: {
		name: "The Devils and the Details",
		logo: "https://i.imgur.com/tXkh58c.png",
		layout: LayoutVersion.DevilAndDetails,
	},
	worldchamps: {
		name: "Champ'd Up",
		logo: "https://i.imgur.com/KnAS7yD.png",
		layout: LayoutVersion.Legacy,
	},
	// Party Pack 8
	"the-wheel": {
		name: "The Wheel of Enormous Proportions",
		logo: "https://i.imgur.com/KnAS7yD.png",
		layout: LayoutVersion.EnormousWheel,
	},
	"murder-detectives": {
		name: "Weapons Drawn",
		logo: "https://i.imgur.com/yRXmXbf.png",
		layout: LayoutVersion.WeaponsDrawn,
	},
	"apply-yourself": {
		name: "Job Job",
		logo: "https://i.imgur.com/FfZYRGL.png",
		layout: LayoutVersion.JobJob,
	},
	"drawful-animate": {
		name: "Drawful Animate",
		logo: "https://i.imgur.com/NtRvc93.png",
		layout: LayoutVersion.DrawfulAnimate,
	},
	"survey-bomb": {
		name: "The Poll Mine",
		logo: "https://i.imgur.com/o4aaUox.png",
		layout: LayoutVersion.PollMine,
	},
	// Party Pack 9
	fourbage: {
		name: "Fibbage 4",
		logo: "TODO",
		layout: LayoutVersion.New,
	},
	lineup: {
		name: "Quixort",
		logo: "TODO",
		layout: LayoutVersion.New,
	},
	"range-game": {
		name: "Nonsensory",
		logo: "TODO",
		layout: LayoutVersion.New,
	},
	"antique-freak": {
		name: "Junktopia",
		logo: "TODO",
		layout: LayoutVersion.New,
	},
	htmf: {
		name: "Roomerang",
		logo: "TODO",
		layout: LayoutVersion.New,
	},
};

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
			let getLayoutPlayerName = LayoutVersion.Legacy;
			const game =
				Games[await presence.getPageletiable<string>('tv"]["storage"]["tag')];
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
						case Games.lieswatter: {
							const { classList } = document.querySelector<HTMLDivElement>(
								".lieswatter-page:not(.pt-page-off)"
							);
							if (classList.contains("state-lobby"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-answer"))
								presenceData.state = "Swatting lies";
							else if (classList.contains("state-nothing"))
								presenceData.state = "Waiting for other players";
							break;
						}
						case Games.wordspud: {
							const { classList } = document.querySelector<HTMLDivElement>(
								".wordspud-page:not(.pt-page-off)"
							);
							if (classList.contains("state-waiting"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-startbutton"))
								presenceData.state = "Waiting for other players to join";
							else if (classList.contains("state-writing"))
								presenceData.state = "Writing something";
							else if (classList.contains("state-vote"))
								presenceData.state = "Voting on a word";
							else if (classList.contains("state-vote-wait"))
								presenceData.state = "Being judged";
							else if (classList.contains("state-nothing"))
								presenceData.state = "Waiting";
							else if (classList.contains("state-voted"))
								presenceData.state = "Waiting for other players to vote";
							else if (classList.contains("state-gameover"))
								presenceData.state = "Game over";
							break;
						}
						case Games.ydkj2015: {
							const { classList } = document.querySelector<HTMLDivElement>(
								".ydkj-page:not(.pt-page-off)"
							);
							if (classList.contains("state-default"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-jack-attack"))
								presenceData.state = "Playing Jack Attack";
							break;
						}
						case Games.drawful2international:
						case Games.drawuful:
						case Games.drawful2: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".drawful-page:not(.pt-page-off)"
								),
								{ classList, id } = currentGamePage;
							if (classList.contains("state-lobby"))
								presenceData.state = "Waiting in lobby";
							else if (
								classList.contains("state-lyingdone") ||
								classList.contains("state-nothing") ||
								classList.contains("state-drawing-done")
							)
								presenceData.state = "Waiting";
							else if (classList.contains("state-round")) {
								presenceData.state =
									currentGamePage.querySelector("span").textContent;
							} else if (classList.contains("state-drawing-sent")) {
								presenceData.state =
									"Waiting for other players to finish drawing";
							} else if (classList.contains("state-enterlie"))
								presenceData.state = "Entering a lie";
							else if (classList.contains("state-chooselie"))
								presenceData.state = "Looking for the truth";
							else if (classList.contains("state-chooselikes"))
								presenceData.state = "Liking lies";
							else if (classList.contains("state-liereceived"))
								presenceData.state = "Waiting for other players to enter lies";
							else if (classList.contains("state-notchoosing")) {
								presenceData.state =
									"Waiting for other players to discover the truth";
							} else if (classList.contains("state-draw"))
								presenceData.state = "Drawing something";
							else if (classList.contains("state-audience-choose"))
								presenceData.state = "Choosing a lie";
							else if (id === "state-ugc")
								presenceData.state = "Creating a custom game";
							else if (classList.contains("state-audience"))
								presenceData.state = "In the audience";
							break;
						}
						// Party Pack 2
						case Games.auction: {
							const { id } = document.querySelector<HTMLDivElement>(
								".auction-page:not(.pt-page-off)"
							);
							switch (id) {
								case "state-lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "state-logo": {
									presenceData.state = "Watching tutorial";
									break;
								}
								case "state-draw": {
									presenceData.state = "Creating a piece of art";
									break;
								}
								case "state-done-drawing": {
									presenceData.state =
										"Waiting for other players to finish drawing";
									break;
								}
								case "state-auction": {
									// TODO: Add current bid
									presenceData.state = "Bidding on art";
									break;
								}
								case "state-post-game": {
									presenceData.state = "Viewing results";
									break;
								}
							}
							// TODO: Add screw state
							break;
						}
						case Games.fibbage:
						case Games.fibbage2: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".fibbage-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-lobby"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-round")) {
								presenceData.state =
									currentGamePage.querySelector("p").textContent;
							} else if (classList.contains("state-notchoosing")) {
								presenceData.state = `Waiting for ${
									currentGamePage
										.querySelector("span")
										.textContent.match(/^(.*?) is picking a category$/)[1]
								} to pick a category`;
							} else if (classList.contains("state-nothing"))
								presenceData.state = "Waiting";
							else if (classList.contains("state-enterlie"))
								presenceData.state = "Entering a lie";
							else if (classList.contains("state-lyingdone"))
								presenceData.state = "Lying done";
							else if (classList.contains("state-liereceived"))
								presenceData.state = "Waiting for other players to enter lies";
							else if (
								classList.contains("state-chooselie") ||
								classList.contains("state-audience-chooselie")
							)
								presenceData.state = "Finding the truth";
							else if (
								classList.contains("state-chooselikes") ||
								classList.contains("state-audience-chooselikes")
							)
								presenceData.state = "Liking lies";
							else if (classList.contains("state-choosing"))
								presenceData.state = "Choosing a category";
							else if (classList.contains("state-pickbloop"))
								presenceData.state = "Chossing a sound";
							else if (classList.contains("state-audience-join"))
								presenceData.state = "Joining audience";
							else if (classList.contains("state-audience-score"))
								presenceData.state = "Viewing audience scores";
							break;
						}
						case Games.quiplash2:
						case Games["quiplash2-international"]:
						case Games.quiplash: {
							const { id } = document.querySelector<HTMLDivElement>(
								".quiplash-page:not(.pt-page-off)"
							);
							switch (id) {
								case "state-lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "state-logo": {
									presenceData.state = "Watching tutorial";
									break;
								}
								case "state-round": {
									presenceData.state = "TODO"; // Check image content
									break;
								}
								case "state-answer-question-audience": {
									presenceData.state = "Writing audience quip";
									break;
								}
								case "state-answer-question": {
									presenceData.state = "Writing quip";
									break;
								}
								case "state-done-answering": {
									presenceData.state = "Waiting for other players to answer";
									break;
								}
								case "state-vote": {
									// TODO: Add question and choices
									presenceData.state = "Voting";
									break;
								}
							}
							break;
						}
						case Games.bombintern: {
							const { classList } = document.querySelector<HTMLDivElement>(
								".bombintern-page:not(.pt-page-off)"
							);
							if (classList.contains("state-lobby"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-dayend"))
								presenceData.state = "Day end";
							else if (classList.contains("state-gameover"))
								presenceData.state = "Game over";
							else if (classList.contains("state-nothing"))
								presenceData.state = "Waiting";
							else if (classList.contains("state-message"))
								presenceData.state = "Reading a message";
							else if (classList.contains("state-smashpuzzle"))
								presenceData.state = "Defusing a smash puzzle bomb";
							else if (classList.contains("state-wiredbomb"))
								presenceData.state = "Defusing a wired bomb";
							else if (classList.contains("state-coffeebomb"))
								presenceData.state = "Defusing a coffee bomb";
							else if (classList.contains("state-filingbomb"))
								presenceData.state = "Defusing a filing bomb";
							else if (classList.contains("state-keypadbomb"))
								presenceData.state = "Defusing a keypad bomb";
							else if (classList.contains("state-copierbomb"))
								presenceData.state = "Defusing a copier bomb";
							break;
						}
						case Games.earwax: {
							const { id, classList } = document.querySelector<HTMLDivElement>(
								".earwax-page:not(.pt-page-off)"
							);
							switch (id) {
								case "state-lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "state-intro": {
									presenceData.state = "Watching tutorial";
									break;
								}
								case "state-logo":
								case "state-audience-wait": {
									presenceData.state = "Waiting";
									break;
								}
								default:
									if (classList.contains("state-choosing"))
										presenceData.state = "Choosing a prompt";
									else if (classList.contains("state-notchoosing")) {
										presenceData.state =
											"Waiting for the judge to choose a prompt";
									} else if (classList.contains("state-notselectingsound")) {
										presenceData.state =
											"Waiting for players to choose a sound";
									} else if (
										classList.contains("state-selectingsound") ||
										id === "state-answer-question-audience"
									)
										presenceData.state = "Choosing a sound";
									else if (classList.contains("state-audience-join"))
										presenceData.state = "Joining the audience";
									else if (id === "state-vote")
										presenceData.state = "Voting on a sound";
							}
							break;
						}
						// Party Pack 3
						case Games.awshirt: {
							const { id } = document.querySelector<HTMLDivElement>(
								".awshirt-page:not(.pt-page-off)"
							);
							switch (id) {
								case "state-lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "state-logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "state-audience": {
									presenceData.state = "In the audience";
									break;
								}
								case "state-draw": {
									presenceData.state = "Drawing a shirt";
									break;
								}
								case "state-drawing-done": {
									presenceData.state =
										"Waiting for other players to finish drawing their shirt";
									break;
								}
								case "state-input": {
									presenceData.state = "Creating taglines";
									break;
								}
								case "state-prompts-done": {
									presenceData.state =
										"Waiting for other players to finish their taglines";
									break;
								}
								case "state-shirt": {
									presenceData.state = "Creating a t-shirt";
									break;
								}
								case "state-shirt-done": {
									presenceData.state =
										"Waiting for other players to finish their t-shirts";
									break;
								}
								case "state-vote": {
									presenceData.state = "Voting on a t-shirt";
									break;
								}
								case "state-voting-done": {
									presenceData.state =
										"Waiting for other players to finish voting";
									break;
								}
								case "state-audience-suggestions": {
									presenceData.state = "Entering a suggestion";
									break;
								}
								case "state-round": {
									presenceData.state = "TODO";
									break;
								}
								case "state-answer-question-audience":
								case "state-answer-question": {
									presenceData.state = "Answering a question";
									break;
								}
								case "state-done-answering": {
									presenceData.state =
										"Waiting for other players to finish answering";
									break;
								}
							}
							// TODO: Verify
							break;
						}
						case Games.fakinit: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".fakinit-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-lobby"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-nothing"))
								presenceData.state = "Waiting";
							else if (classList.contains("state-gameplay"))
								presenceData.state = "Following instructions";
							else if (classList.contains("state-skip-instructions"))
								presenceData.state = "Watching the tutorial";
							else if (classList.contains("state-categories"))
								presenceData.state = "Choosing a category";
							else if (classList.contains("state-notchoosing"))
								presenceData.state = "Waiting for a category to be chosen";
							else if (classList.contains("state-round")) {
								presenceData.state =
									currentGamePage.querySelector("p").textContent;
							} else if (classList.contains("state-vote"))
								presenceData.state = "Voting on a player";
							else if (classList.contains("state-vote-locked"))
								presenceData.state = "Viewing vote results";
							break;
						}
						case Games.pollposition: {
							const currentGamePage = document.querySelector<HTMLDivElement>(
									".pollposition-page:not(.pt-page-off)"
								),
								{ classList } = currentGamePage;
							if (classList.contains("state-lobby"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("state-post-lobby"))
								presenceData.state = "Watching the tutorial";
							else if (classList.contains("state-nothing"))
								presenceData.state = "Waiting";
							else if (classList.contains("state-round")) {
								presenceData.state =
									currentGamePage.querySelector("p").textContent;
							} else if (
								classList.contains("state-upordowndone") ||
								classList.contains("state-waitforpercentage") ||
								classList.contains("state-waitforupordown") ||
								classList.contains("state-waitforaudience") ||
								classList.contains("state-upordown-sent") ||
								classList.contains("state-waitforallpercentages")
							)
								presenceData.state = "Waiting for other players to decide";
							else if (classList.contains("state-choosecategory"))
								presenceData.state = "Choosing a category";
							else if (classList.contains("state-waitforcategory"))
								presenceData.state = "Waiting for a category to be chosen";
							else if (classList.contains("state-showquestion"))
								presenceData.state = "Viewing a survey prompt";
							else if (classList.contains("state-chooseupordown")) {
								presenceData.state =
									"Deciding if the true percentage is higher or lower";
							} else if (classList.contains("state-choosemultiple"))
								presenceData.state = "Choosing multiple choices";
							else if (
								classList.contains("state-audience-choice-sent") ||
								classList.contains("state-waitformultiple")
							) {
								presenceData.state =
									"Waiting for other players to choose their choices";
							} else if (classList.contains("state-audience-wait"))
								presenceData.state = "In the audience";
							else if (classList.contains("state-audience-chose-option"))
								presenceData.state = "Choosing an option in the audience";
							else if (classList.contains("state-choosecharacter"))
								presenceData.state = "Choosing a character";
							break;
						}
						case Games.triviadeath: {
							const { id } = document.querySelector<HTMLDivElement>(
								".triviadeath-page:not(.pt-page-off)"
							);
							switch (id) {
								case "state-lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "state-logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "state-make-single-choice": {
									presenceData.state = "Answering a single choice question";
									break;
								}
								case "state-make-many-choices": {
									presenceData.state = "Answering a multiple choice question";
									break;
								}
								case "state-enter-single-text": {
									presenceData.state = "Answering a text prompt";
									break;
								}
								case "state-enter-single-drawing": {
									presenceData.state = "Drawing a picture";
									break;
								}
								case "state-grid": {
									presenceData.state = "Playing a grid game";
									break;
								}
								case "state-game-results": {
									presenceData.state = "Viewing game results";
									break;
								}
							}
							break;
						}
						// Party Pack 4
						case Games.overdrawn: {
							switch (gameState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "Draw": {
									presenceData.state = "Drawing";
									break;
								}
								case "Reaction": {
									presenceData.state = "Reacting to the drawings";
									break;
								}
								case "MakeSingleChoice": {
									const text = gameState.text as string;
									switch (text) {
										case "Which player's addition was better?": {
											presenceData.state = "Voting for the best addition";
											break;
										}
										case "You drew something this round, sit back and relax.": {
											presenceData.state = "Waiting for other players to vote";
											break;
										}
										case "Which title is best?": {
											presenceData.state = "Voting for the best title";
											break;
										}
									}
									break;
								}
								case "EnterSingleText": {
									presenceData.state = "Entering a title for their drawing";
									break;
								}
							}
							break;
						}
						case Games.bracketeering: {
							break;
						}
						case Games.monstermingle: {
							break;
						}
						case Games.survivetheinternet: {
							const playerIcon =
									document.querySelector<HTMLDivElement>("#playericon"),
								currentGamePage = document.querySelector<HTMLDivElement>(
									"#playerRegion + div"
								),
								{ classList, textContent } = currentGamePage;
							if (playerIcon)
								presenceData.smallImageKey =
									getComputedStyle(playerIcon).backgroundImage.match(
										/^url\("(.*)"\)$/
									)[1];

							if (classList.contains("Lobby"))
								presenceData.state = "Waiting in lobby";
							else if (classList.contains("Logo"))
								presenceData.state = "Waiting";
							else if (classList.contains("MakeSingleChoice")) {
								if (/the tutorial\.\.\./.test(textContent))
									presenceData.state = "Viewing the tutorial";
								else if (
									/ridiculous\?$/.test(
										currentGamePage.querySelector<HTMLDivElement>(
											".aboveBlackBox"
										).textContent
									)
								) {
									if (
										currentGamePage.querySelector<HTMLDivElement>(
											".makeSingleChoiceDone"
										).style.display === "none"
									)
										presenceData.state =
											"Voting for the most ridiculous answer";
									else presenceData.state = "Waiting for other players to vote";
								} else if (
									currentGamePage.querySelector<HTMLDivElement>(
										".aboveBlackBox"
									).textContent === ""
								)
									presenceData.state = "Answering a photosharing prompt";
							} else if (classList.contains("EnterSingleText")) {
								if (
									currentGamePage.querySelector<HTMLFormElement>(
										".enterSingleTextForm"
									).style.display === "none"
								)
									presenceData.state =
										"Waiting for other players to answer their prompts";
								else if (
									currentGamePage.querySelector<HTMLDivElement>(
										".finalRoundImage"
									) ||
									currentGamePage.querySelector<HTMLDivElement>(
										".blackBox:not(.hide)"
									)
								)
									presenceData.state = "Twisting another player's response";
								else presenceData.state = "Answering a prompt";
							}
							break;
						}
						case Games.fibbage3: {
							break;
						}
						// Party Pack 5
						case Games.splittheroom: {
							break;
						}
						case Games.slingshoot: {
							break;
						}
						case Games.patentlystupid: {
							break;
						}
						case Games.rapbattle: {
							break;
						}
						case Games.ydkj2018: {
							break;
						}
						// Party Pack 6
						case Games.pushthebutton: {
							break;
						}
						case Games.jokeboat: {
							break;
						}
						case Games.rolemodels: {
							break;
						}
						case Games.triviadeath2: {
							break;
						}
						case Games.ridictionary: {
							break;
						}
						// Party Pack 7
						case Games.quiplash3: {
							break;
						}
						case Games["jackbox-talks"]: {
							break;
						}
						case Games["blanky-blank"]: {
							break;
						}
						case Games.everyday: {
							break;
						}
						case Games.worldchamps: {
							break;
						}
						// Party Pack 8
						case Games["the-wheel"]: {
							break;
						}
						case Games["murder-detectives"]: {
							break;
						}
						case Games["apply-yourself"]: {
							break;
						}
						case Games["drawful-animate"]: {
							break;
						}
						case Games["survey-bomb"]: {
							break;
						}
						// Party Pack 9
						case Games.fourbage: {
							break;
						}
						case Games.lineup: {
							break;
						}
						case Games["range-game"]: {
							break;
						}
						case Games["antique-freak"]: {
							break;
						}
						case Games.htmf: {
							break;
						}
					}
				} else presenceData.state = playerName;
			} else presenceData.details = "Idle";
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
