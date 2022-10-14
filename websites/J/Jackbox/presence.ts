const presence = new Presence({
	clientId: "638118757453004820",
});

interface Game {
	name: string;
	logo: string;
}

let gamePlayerState: {
		playerName?: string;
		username?: string;
		playerInfo?: {
			username?: string;
		};
		state?: string;
		status?: string;
		kind?: string;
		category?: string;
		prompt?: {
			text?: string;
			html?: string;
		};
		entryId?: string;
		choiceId?: string;
		placeholder?: string;
		choiceType?: string;
		classes?: string[];
		[x: string]: unknown;
	} = {
		playerName: null,
		state: null,
		username: null,
	},
	game: Game,
	browsingTimestamp = Math.round(Date.now() / 1000),
	gametag: string;

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

if (window.location.hostname === "jackbox.tv") {
	// TODO: Handle names from party pack 8+ (they're in the key "info:number")
	setInterval(async () => {
		const playerStateLogs = await presence.getLogs(
			/recv <- .*?("key": "(bc:customer|player):[a-z0-9-]+",)/s
		);
		if (playerStateLogs.length > 0) {
			const lastLog = playerStateLogs[playerStateLogs.length - 1];
			if (/recv <- .*?"entities": {\n/s.test(lastLog)) {
				gamePlayerState = JSON.parse(lastLog.slice(8)).result.entities[
					lastLog.match(/"key": "((?:bc:customer|player):(?:[a-z0-9-]+))",/s)[1]
				][1].val;
			} else gamePlayerState = JSON.parse(lastLog.slice(8)).result.val;
		}
		if (!game) {
			type JackboxStorageLetiable = {
				tag: string;
			};
			const { tag } = await presence.getPageletiable<JackboxStorageLetiable>(
				'tv"]["storage'
			);
			gametag = tag;
			if (tag && tag !== "@connect") {
				game = Games[tag];
				browsingTimestamp = Math.round(Date.now() / 1000);
				if (!game) game = Games.unknown;
			}
		}
	}, 2000);
}

const Games: Record<string, Game> = {
	unknown: {
		name: "Unknown Game",
		logo: "https://i.imgur.com/SXfEdnL.png",
	},
	// Party Pack 1
	ydkj2015: {
		name: "You Don't Know Jack 2015",
		logo: "https://i.imgur.com/EGnX1E5.png",
	},
	drawful2: {
		name: "Drawful 2",
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	drawful2international: {
		name: "Drawful 2 International",
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	drawful: {
		name: "Drawful",
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	wordspud: {
		name: "Word Spud",
		logo: "https://i.imgur.com/gFUB4EX.png",
	},
	lieswatter: {
		name: "Lie Swatter",
		logo: "https://i.imgur.com/PavDjzP.png",
	},
	// Party Pack 2
	auction: {
		name: "Bidiots",
		logo: "https://i.imgur.com/CMcGDrM.png",
	},
	bombintern: {
		name: "Bomb Corp",
		logo: "https://i.imgur.com/XkqOv6o.png",
	},
	earwax: {
		name: "Earwax",
		logo: "https://i.imgur.com/oEidNn6.png",
	},
	fibbage: {
		name: "Fibbage XL",
		logo: "https://i.imgur.com/LxAtHuy.png",
	},
	fibbage2: {
		name: "Fibbage 2",
		logo: "https://i.imgur.com/LxAtHuy.png",
	},
	// Party Pack 3
	awshirt: {
		name: "Tee K.O.",
		logo: "https://i.imgur.com/wGbJhoR.png",
	},
	fakinit: {
		name: "Fakin' It",
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	pollposition: {
		name: "Guesspionage",
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	quiplash: {
		name: "Quiplash XL",
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	quiplash2: {
		name: "Quiplash 2",
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	"quiplash2-international": {
		name: "Quiplash 2 Interlational",
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	triviadeath: {
		name: "Trivia M Party", // TODO: Fix name
		logo: "https://i.imgur.com/zHOvymB.png",
	},
	// Party Pack 4
	overdrawn: {
		name: "Civic Doodle",
		logo: "https://i.imgur.com/6CBskbM.png",
	},
	bracketeering: {
		name: "Bracketeering",
		logo: "https://i.imgur.com/oJJpQqi.png",
	},
	monstermingle: {
		name: "Monster Seeking Monster",
		logo: "https://i.imgur.com/CPkaxX3.png",
	},
	survivetheinternet: {
		name: "Survive the Internet",
		logo: "https://i.imgur.com/eXCzZ2e.png",
	},
	fibbage3: {
		name: "Fibbage 3",
		logo: "https://i.imgur.com/eTsm2zC.png",
	},
	// Party Pack 5
	splittheroom: {
		name: "Split the Room",
		logo: "https://i.imgur.com/YyhOPAp.png",
	},
	slingshoot: {
		name: "Zeeple Dome",
		logo: "https://i.imgur.com/QqEKHgG.png",
	},
	patentlystupid: {
		name: "Patently Stupid",
		logo: "https://i.imgur.com/yGEE0Aw.png",
	},
	rapbattle: {
		name: "Mad Verse City",
		logo: "https://i.imgur.com/Up8Paw8.png",
	},
	ydkj2018: {
		name: "You Don't Know Jack: Full Stream",
		logo: "https://i.imgur.com/Li8TLXI.png",
	},
	// Party Pack 6
	pushthebutton: {
		name: "Push the Button",
		logo: "https://i.imgur.com/OhgGmMQ.png",
	},
	jokeboat: {
		name: "Joke Boat",
		logo: "https://i.imgur.com/Cih6bqA.png",
	},
	rolemodels: {
		name: "Role Models",
		logo: "https://i.imgur.com/sETBCgc.png",
	},
	triviadeath2: {
		name: "Trivia M Party 2", // TODO: Fix name
		logo: "https://i.imgur.com/9MmGVGD.png",
	},
	ridictionary: {
		name: "Dictionarium",
		logo: "https://i.imgur.com/8S0aSTw.png",
	},
	// Party Pack 7
	quiplash3: {
		name: "Quiplash 3",
		logo: "https://i.imgur.com/Jds4R56.png",
	},
	"jackbox-talks": {
		name: "Talking Points",
		logo: "https://i.imgur.com/8Amy9Di.png",
	},
	"blanky-blank": {
		name: "Blather 'Round",
		logo: "https://i.imgur.com/qLW2Fft.png",
	},
	everyday: {
		name: "The Devils and the Details",
		logo: "https://i.imgur.com/tXkh58c.png",
	},
	worldchamps: {
		name: "Champ'd Up",
		logo: "https://i.imgur.com/KnAS7yD.png",
	},
	// Party Pack 8
	"the-wheel": {
		name: "The Wheel of Enormous Proportions",
		logo: "https://i.imgur.com/KnAS7yD.png",
	},
	"murder-detectives": {
		name: "Weapons Drawn",
		logo: "https://i.imgur.com/yRXmXbf.png",
	},
	"apply-yourself": {
		name: "Job Job",
		logo: "https://i.imgur.com/FfZYRGL.png",
	},
	"drawful-animate": {
		name: "Drawful Animate",
		logo: "https://i.imgur.com/NtRvc93.png",
	},
	"survey-bomb": {
		name: "The Poll Mine",
		logo: "https://i.imgur.com/o4aaUox.png",
	},
	// Party Pack 9
	fourbage: {
		name: "Fibbage 4",
		logo: "TODO",
	},
	lineup: {
		name: "Quixort",
		logo: "TODO",
	},
	"range-game": {
		name: "Nonsensory",
		logo: "TODO",
	},
	"antique-freak": {
		name: "Junktopia",
		logo: "TODO",
	},
	htmf: {
		name: "Roomerang",
		logo: "TODO",
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
		]),
		{ href, hostname } = window.location;

	if (useTime) presenceData.startTimestamp = browsingTimestamp;

	switch (hostname) {
		case "jackbox.tv": {
			if (game) {
				const { name, logo } = game;
				presenceData.largeImageKey = logo;
				presenceData.details = `Playing ${name}`;
				if (useName) {
					const { playerName, username, playerInfo } = gamePlayerState,
						realUsername = playerName ?? username ?? playerInfo?.username;
					if (realUsername) {
						if (useDetails) presenceData.details += ` as ${realUsername}`;
						else presenceData.state = `as ${realUsername}`;
					}
				}
				if (useDetails) {
					switch (game) {
						case Games.unknown: {
							presenceData.state = `Playing an unsupported game (${gametag})`;
							break;
						}
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
									presenceData.state = "Bidding on art";
									break;
								}
								case "state-post-game": {
									presenceData.state = "Viewing results";
									break;
								}
							}
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
							switch (gamePlayerState.state) {
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
									switch (gamePlayerState.text) {
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
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector<HTMLDivElement>("#playericon")
							).backgroundImage.match(/^url\("(.*)"\)$/)[1];
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "MakeSingleChoice": {
									if (
										gamePlayerState.text === "Press this to skip the tutorial"
									) {
										presenceData.state = "Watching the tutorial";
										break;
									} else if (
										(gamePlayerState.text as string).includes(
											"Which answer will get the most votes?"
										)
									)
										presenceData.state = "Predicting the most popular answer";
									else if (
										(gamePlayerState.text as string).includes(
											"Vote for the answer that deserves to win."
										)
									)
										presenceData.state = "Voting on an answer";
									break;
								}
								case "EnterSingleText": {
									presenceData.state = "Answering a prompt";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
							}
							break;
						}
						case Games.monstermingle: {
							const icon = document.querySelector<HTMLDivElement>(
								".chatAvatar.playerIcon"
							);
							if (icon) {
								presenceData.smallImageKey =
									getComputedStyle(icon).backgroundImage.match(
										/^url\("(.*)"\)$/
									)[1];
							}
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "MakeSingleChoice": {
									if (
										(gamePlayerState.text as { blackBox: string })?.blackBox ===
										"Press this to skip the tutorial..."
									) {
										presenceData.state = "Watching the tutorial";
										break;
									}
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "chat": {
									const mode = (gamePlayerState.chat as { mode: string })?.mode;
									if (mode === "chat") presenceData.state = "Chatting";
									else if (mode === "browse")
										presenceData.state = "Browsing messages";
									else presenceData.state = "Choosing a date";
									break;
								}
							}
							break;
						}
						case Games.survivetheinternet: {
							const playerIcon =
									document.querySelector<HTMLDivElement>("#playericon"),
								currentGamePage = document.querySelector<HTMLDivElement>(
									"#playerRegion + div"
								),
								{ classList, textContent } = currentGamePage;
							if (playerIcon) {
								presenceData.smallImageKey =
									getComputedStyle(playerIcon).backgroundImage.match(
										/^url\("(.*)"\)$/
									)[1];
							}

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
									) {
										presenceData.state =
											"Voting for the most ridiculous answer";
									} else
										presenceData.state = "Waiting for other players to vote";
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
								) {
									presenceData.state =
										"Waiting for other players to answer their prompts";
								} else if (
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
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector<HTMLDivElement>("#playericon")
							).backgroundImage.match(/^url\("(.*)"\)$/)[1];
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "EndShortie": {
									presenceData.state = "Waiting for the next prompt";
									break;
								}
								case "ChooseLike": {
									presenceData.state = "Liking responses";
									break;
								}
								case "ChooseLie": {
									presenceData.state = "Looking for the truth";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "EnterText":
								case "EnterTruth": {
									presenceData.state = `Answering a prompt: ${gamePlayerState.question}`;
									break;
								}
								case "CategorySelection": {
									if (gamePlayerState.isChoosing)
										presenceData.state = "Choosing a category";
									else {
										presenceData.state =
											"Waiting for another player to choose a category";
									}
									break;
								}
							}
							break;
						}
						// Party Pack 5
						case Games.splittheroom: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									const { html } = gamePlayerState.prompt;
									if (html === "Press this to skip the tutorial...")
										presenceData.state = "Watching the tutorial";
									else if (
										html === "Did this person create an amusing scenario?"
									)
										presenceData.state = "Rating the scenario";
									else if (
										html.startsWith(
											"For bonus points, which option do you think"
										)
									)
										presenceData.state = "Predicting a player's choice";
									else presenceData.state = "Responding to a scenario";
									break;
								}
								case "EnterSingleText": {
									presenceData.state = "Completing a scenario";
									break;
								}
							}
							break;
						}
						case Games.slingshoot: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "Shoot": {
									presenceData.state = "Shooting";
									break;
								}
							}
							break;
						}
						case Games.patentlystupid: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									const { html } = gamePlayerState.prompt;
									switch (html) {
										case "": {
											presenceData.state = "Watching the tutorial";
											break;
										}
										case "<div>Choose an Issue</div><div>to base your invention on.</div>": {
											presenceData.state = "Choosing an issue to work on";
											break;
										}
										case "<div>Present your idea!</div><div>It's your turn to show off your invention!<br /><br />Would you like to present your invention, or would you like the game to do it for you?</div>": {
											presenceData.state = "Choosing presentation options";
											break;
										}
										case "<div>Present your idea!</div><div>You can control the timing!<br />(Show elements in any order.)</div>": {
											presenceData.state = "Presenting their invention";
											break;
										}
										default:
											if (html.startsWith("<div>Invest in the best!</div>"))
												presenceData.state = "Investing in an invention";
											else if (
												/choose an issue.*?to base your invention on/is.test(
													html
												)
											) {
												presenceData.state =
													"Choosing the final issue to work on";
											}
									}
									break;
								}
								case "EnterSingleText": {
									const { html } = gamePlayerState.prompt;
									if (html.startsWith("<div>Fill in the Blank!</div>"))
										presenceData.state = "Creating a problem";
									else if (
										html ===
										"<div>Write a title</div><div>for your invention</div>"
									)
										presenceData.state = "Naming their invention";
									else if (
										html ===
										"<div>Write a tagline</div><div>for your invention</div>"
									) {
										presenceData.state =
											"Creating a tagline for their invention";
									}
									break;
								}
								case "Draw": {
									presenceData.state = "Drawing their invention";
									break;
								}
							}
							break;
						}
						case Games.rapbattle: {
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector<HTMLDivElement>("#playericon")
							).backgroundImage.match(/^url\("(.*)"\)$/)?.[1];
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									const { text, html } = gamePlayerState.prompt;
									if (text === "Press this button to skip the tutorial...")
										presenceData.state = "Skipping the tutorial";
									else if (
										html ===
										"Rapidly press these buttons to make weird stuff happen..."
									)
										presenceData.state = "Making weird stuff happen";
									else {
										switch (text) {
											case "Listen to the RAP": {
												presenceData.state = "Listening to the rap";
												break;
											}
											case "Tap if you think this rhyme is DOPE": {
												presenceData.state = "Voting on the rap";
												break;
											}
											case "Who won this battle??": {
												presenceData.state =
													"Voting on the winner of the battle";
												break;
											}
										}
									}
									break;
								}
								case "EnterSingleText": {
									presenceData.state = `Entering a ${
										gamePlayerState.prompt.html.match(/\((.+?)\)$/)[1]
									}`;
									break;
								}
							}
							break;
						}
						case Games.ydkj2018: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									switch (gamePlayerState.roundType) {
										case "Shortie": {
											presenceData.state = "Answering a short trivia question";
											break;
										}
										case "DisOrDat": {
											presenceData.state = "Answering a dis-or-dat question";
											break;
										}
										case "PlayersChoice": {
											presenceData.state = "Choosing a type of question";
											break;
										}
										case "JackAttack": {
											presenceData.state = "Playing Jack Attack";
											break;
										}
									}
									break;
								}
							}
							break;
						}
						// Party Pack 6
						case Games.pushthebutton: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "SuspicionVote": {
									presenceData.state = "Voting on who seems suspicious";
									break;
								}
								case "Probe": {
									presenceData.state = "Probing their fellow players";
									break;
								}
								case "Draw": {
									presenceData.state = "In the Drawing Quarters";
									break;
								}
								case "AnalyzePlayer": {
									presenceData.state =
										"Using the bioscanner - describing glyphs";
									break;
								}
								case "AnalysisReport": {
									presenceData.state = "Using the bioscanner - reading report";
									break;
								}
								case "MakeSingleChoice": {
									const { choiceType, gameInfo, prompt } = gamePlayerState,
										{ activeTest } = gameInfo as {
											activeTest: string;
										};
									if (choiceType) {
										switch (choiceType) {
											case "TutorialOptOut": {
												presenceData.state =
													"Choosing whether to skip the tutorial";
												break;
											}
											case "ConfirmedIdentity": {
												presenceData.state = "Confirming their identity";
												break;
											}
										}
									} else if (activeTest) {
										if (activeTest === "Push The Button")
											presenceData.state = "Accusing players";
										else presenceData.state = `Taking the ${activeTest} test`;
									} else {
										const html = prompt?.html;
										if (
											html ===
											"You are the Captain.  What test would you like to perform?"
										) {
											presenceData.state = "Choosing a test to perform";
											break;
										} else if (
											/^Select <strong>.*?<\/strong> to Test!$/.test(html)
										) {
											presenceData.state = "Choosing players to test";
											break;
										}
									}
									break;
								}
								case "EnterSingleText": {
									const { activeTest } = gamePlayerState.gameInfo as {
										activeTest: string;
									};
									if (activeTest)
										presenceData.state = `Taking the ${activeTest} test`;
									break;
								}
								case "GameOver": {
									presenceData.state = `Viewing results - ${gamePlayerState.winningRole}s won`;
								}
							}
							break;
						}
						case Games.jokeboat: {
							const icon =
								document.querySelector<HTMLDivElement>("#playericon");
							if (icon) {
								presenceData.smallImageKey =
									getComputedStyle(icon).backgroundImage.match(
										/^url\("(.*)"\)$/
									)?.[1];
							}
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									const { choiceId } = gamePlayerState;
									if (choiceId === "ChooseCatchphrase")
										presenceData.state = "Choosing a catchphrase";
									else if (choiceId.startsWith("Skip"))
										presenceData.state = "Watching a tutorial";
									else if (choiceId.startsWith("ChooseSetup"))
										presenceData.state = "Choosing a joke setup";
									else if (choiceId.startsWith("ChooseTopic"))
										presenceData.state = "Choosing a topic for the joke";
									else if (choiceId.startsWith("ChooseAuthorReady"))
										presenceData.state = "Choosing how to tell the joke";
									else if (choiceId === "ChooseJoke")
										presenceData.state = "Voting on a joke";
									else if (choiceId === "ChoosePunchUpJoke")
										presenceData.state = "Choosing a joke to one-up";
									break;
								}
								case "EnterSingleText": {
									const { entryId, placeholder } = gamePlayerState;
									if (entryId.startsWith("Topic"))
										presenceData.state = `Entering a topic (${placeholder})`;
									else if (entryId.startsWith("Punchline"))
										presenceData.state = "Creating a punchline";
									else if (entryId === "PunchedUpLine")
										presenceData.state = "One-upping a joke";
									break;
								}
							}
							break;
						}
						case Games.rolemodels: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "Camera": {
									presenceData.state = "Taking a photo of themselves";
									break;
								}
								case "Draw": {
									presenceData.state = "Drawing a portrait of themselves";
									break;
								}
								case "MakeSingleChoice": {
									switch (gamePlayerState.choiceType) {
										case "SkipTutorial": {
											presenceData.state = "Watching the tutorial";
											break;
										}
										case "Prompt": {
											presenceData.state = "Choosing a category";
											break;
										}
										case "TagResolution": {
											presenceData.state = "Resolving a role conflict";
											break;
										}
										case "RoleModelsChoice": {
											presenceData.state = "Choosing the role that fits best";
											break;
										}
									}
									break;
								}
								case "Sortable": {
									presenceData.state = "Assigning roles to players";
									break;
								}
								case "EnterSingleText": {
									presenceData.state = "Answering a prompt";
									break;
								}
							}
							break;
						}
						case Games.triviadeath2: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									if (gamePlayerState.roundType === "FinalRound")
										presenceData.state = "Answering the final trivia questions";
									else {
										switch (gamePlayerState.choiceType) {
											case "SkipTutorial": {
												presenceData.state = "Watching the intro";
												break;
											}
											case "Question": {
												presenceData.state = "Answering trivia";
												break;
											}
											case "Rule": {
												presenceData.state = "Playing a rule game";
												break;
											}
											case "PostGameChoice": {
												presenceData.state = "Choosing a post-game option";
												break;
											}
											default: {
												presenceData.state = "Playing a death game";
											}
										}
									}
									break;
								}
								case "EnterSingleText": {
									const { entryId } = gamePlayerState;
									if (entryId.startsWith("MindMeld")) {
										presenceData.state = "Playing the mind meld game";
										break;
									} else if (entryId === "CreatePassword") {
										presenceData.state =
											"Creating a password for the password game";
										break;
									} else if (entryId === "Quiplash") {
										presenceData.state = `Playing Quiplash - ${gamePlayerState.prompt.html}`;
										break;
									} else presenceData.state = "Playing a text death game";
									break;
								}
								case "Draw": {
									presenceData.state = "Playing a drawing death game";
									break;
								}
							}
							break;
						}
						case Games.ridictionary: {
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector<HTMLDivElement>("#playericon")
							).backgroundImage.match(/^url\("(.*)"\)$/)[1];
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									switch (gamePlayerState.choiceType) {
										case "ChooseGameType": {
											presenceData.state = "Choosing a game type";
											break;
										}
										case "ChooseDefinition": {
											presenceData.state = `Voting for a definition of ${
												gamePlayerState.prompt.html.match(
													/<div>(.*?)<\/div>$/
												)[1]
											}`;
											break;
										}
										case "LikeDefinition": {
											presenceData.state = "Liking definitions";
											break;
										}
										case "ChooseSynonym": {
											presenceData.state = `Voting for a synonym of ${
												gamePlayerState.prompt.html.match(
													/<font.*?>(.*?)(?:: )?<\/font>$/
												)[1]
											}`;
											break;
										}
										case "LikeSynonym": {
											presenceData.state = "Liking synonyms";
											break;
										}
										case "LikeSentence": {
											presenceData.state = "Liking sentences";
											break;
										}
										case "ChooseSentence": {
											presenceData.state = `Voting for a sentence with ${
												gamePlayerState.prompt.html.match(
													/<div>(.*?)<\/div>$/
												)[1]
											}`;
											break;
										}
									}
									break;
								}
								case "EnterSingleText": {
									switch (gamePlayerState.entryId) {
										case "Definition": {
											presenceData.state = `Creating a definition for ${
												gamePlayerState.prompt.html.match(
													/<font.*?>(.*?)<\/font>/
												)[1]
											}`;
											break;
										}
										case "Synonym": {
											presenceData.state = `Creating a synonym for ${
												gamePlayerState.prompt.html.match(
													/<font.*?>(.*?)(?:: )?<\/font>/
												)[1]
											}`;
											break;
										}
										case "Sentence": {
											presenceData.state = `Creating a sentence using ${gamePlayerState.word}`;
											break;
										}
									}
								}
							}
							break;
						}
						// Party Pack 7
						case Games.quiplash3: {
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector<HTMLDivElement>("#playericon")
							).backgroundImage.match(/^url\("(.*)"\)$/)?.[1];
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "EnterSingleText": {
									presenceData.state = "Answering a prompt";
									break;
								}
								case "MakeSingleChoice": {
									presenceData.state = "Voting for their favorite answer";
									break;
								}
								case "EnterTextList": {
									presenceData.state = "Answering a Thriplash prompt";
									break;
								}
								default: {
									if (gamePlayerState.validActions) {
										switch (
											(gamePlayerState.validActions as string[]).join(",")
										) {
											case "toggle-visibility,new,load,exit": {
												presenceData.state = "In the Custom Content menu";
												break;
											}
											case "title,close": {
												presenceData.state = "Naming a custom Quiplash episode";
												break;
											}
											case "add,toggle-visibility,close":
											case "add,remove,toggle-visibility,done": {
												presenceData.state =
													"Adding prompts to a custom Quiplash episode";
												break;
											}
											case "submit,unlock,toggle-visibility,play,remove-content,episodes": {
												presenceData.state =
													"Viewing a custom Quiplash episode";
												break;
											}
										}
									}
								}
							}
							break;
						}
						case Games["jackbox-talks"]: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "Camera": {
									presenceData.state = "Taking a profile picture";
									break;
								}
								case "EnterSingleText": {
									const { entryId } = gamePlayerState;
									if (entryId.startsWith("prompt"))
										presenceData.state = "Creating topics";
									else if (entryId === "WriteQuote")
										presenceData.state = "Writing a quote about the talk";
									else if (entryId === "NameAward")
										presenceData.state = "Naming an award";
									break;
								}
								case "Awards": {
									presenceData.state = "Giving out their award";
									break;
								}
								case "MakeSingleChoice": {
									const { classes, choices, prompt } = gamePlayerState;
									if (
										prompt.html === "PICK THE TITLE OF THE TALK YOU WILL GIVE"
									)
										presenceData.state = "Choosing a talk title";
									else {
										switch (classes[0]) {
											case "SkipTutorial": {
												presenceData.state = "Watching the tutorial";
												break;
											}
											case "Presenter": {
												if (prompt.html.startsWith("RATE HOW WELL "))
													presenceData.state = "Rating their assistant";
												else if (prompt.text === "THANK YOU.")
													presenceData.state =
														"Presenting their talk - thank you";
												else {
													presenceData.state =
														"Presenting their talk - preparation";
												}
												break;
											}
											case "Assistant": {
												if (
													prompt.html ===
													"PICK THE BEST PICTURE TO REPRESENT THE TALK"
												)
													presenceData.state =
														"Choosing a picture for the talk";
												else presenceData.state = "Assisting their presenter";
												break;
											}
											default: {
												if (
													(choices as { className: string }[])[0].className ===
													"voteUp"
												)
													presenceData.state = "Reacting to the speech";
											}
										}
									}
									break;
								}
								case "Draw": {
									presenceData.state = "Presenting their talk - slide";
									break;
								}
							}
							break;
						}
						case Games["blanky-blank"]: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									switch (gamePlayerState.choiceType) {
										case "skipTutorial": {
											presenceData.state = "Watching the tutorial";
											break;
										}
										case "password": {
											presenceData.state = "Choosing a prompt";
											break;
										}
									}
									break;
								}
								case "MakeSentence": {
									switch ((gamePlayerState.sentence as { type: string }).type) {
										case "writing": {
											presenceData.state = "Crafting initial sentence";
											break;
										}
										case "call": {
											presenceData.state = "Crafting a sentence";
											break;
										}
										case "response": {
											presenceData.state =
												"Crafting a sentence using players' guesses";
											break;
										}
										case "mybad": {
											presenceData.state =
												"Deciding if they should have known the answer";
											break;
										}
									}
									break;
								}
								case "EnterSingleText": {
									presenceData.state = "Guessing the object";
									break;
								}
							}
							break;
						}
						case Games.everyday: {
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									switch (gamePlayerState.choiceId) {
										case "ChangeCharacter": {
											presenceData.state = "Choosing a character";
											break;
										}
										default: {
											if (gamePlayerState.choiceType === "SkipIntro")
												presenceData.state = "Watching the intro";
											else if (gamePlayerState.choiceType === "ShowTutorial") {
												presenceData.state =
													"Deciding if they want to watch the tutorial";
											}
										}
									}
									break;
								}
								case "CancelerMechanic": {
									presenceData.state =
										"Blocking a member from their selfish task";
									break;
								}
								case "TaskList": {
									presenceData.state = "Choosing a task";
									break;
								}
								case "NothingMechanic": {
									presenceData.state = "Doing nothing";
									break;
								}
								case "ScrubMechanic": {
									presenceData.state = "Scrubbing something";
									break;
								}
								case "RotateMechanic": {
									presenceData.state = "Rotating something";
									break;
								}
								case "TapMechanic": {
									presenceData.state = "Tapping something";
									break;
								}
								case "SwipeMechanic": {
									presenceData.state = "Swiping something";
									break;
								}
								case "TravelMechanicParticipant": {
									presenceData.state = "Travelling as a passenger";
									break;
								}
								case "TravelMechanicCaptain": {
									presenceData.state = "Travelling as the driver";
									break;
								}
								case "PhoneMechanic": {
									presenceData.state = "Calling someone";
									break;
								}
								case "DialogMechanic": {
									presenceData.state = "Talking to someone";
									break;
								}
								case "SearchMechanicCaptain":
								case "SearchMechanicParticipant": {
									presenceData.state = "Searching for something";
									break;
								}
								case "TextMechanicParticipant": {
									presenceData.state = "Writing a text";
									break;
								}
								case "TextMechanicCaptain": {
									presenceData.state = "Reading a text";
									break;
								}
								case "InstructionsMechanicCaptain": {
									presenceData.state = "Following instructions";
									break;
								}
								case "InstructionsMechanicParticipant": {
									presenceData.state = "Giving instructions";
									break;
								}
								case "HoldMechanic": {
									presenceData.state = "Holding something";
									break;
								}
							}
							break;
						}
						case Games.worldchamps: {
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector("#playericon")
							).backgroundImage.match(/^url\("(.*)"\)$/)?.[1];
							switch (gamePlayerState.state) {
								case "Lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "MakeSingleChoice": {
									const { choiceId } = gamePlayerState;
									if (choiceId) {
										if (choiceId.startsWith("FlipChoice"))
											presenceData.state = "Flipping their character";
									} else if (
										gamePlayerState.prompt.html?.startsWith("Who is <br>")
									)
										presenceData.state = "Voting for the best champion";
									else if (
										gamePlayerState.prompt.html?.startsWith(
											"Swap your character or keep it in<br>"
										)
									) {
										presenceData.state =
											"Choosing whether to swap their character";
									} else presenceData.state = "Watching the tutorial";
									break;
								}
								case "Draw": {
									const { entryId } = gamePlayerState;
									if (entryId.startsWith("champion")) {
										presenceData.state = "Drawing a champion";
										break;
									} else if (entryId.startsWith("challenger")) {
										const imageLink =
											document.querySelector<HTMLImageElement>(
												".imageData"
											)?.src;
										if (imageLink)
											presenceData.largeImageKey = await getShortURL(imageLink);
										presenceData.state = "Drawing a challenger";
										break;
									}
									break;
								}
							}
							break;
						}
						// Party Pack 8
						case Games["the-wheel"]: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "waiting": {
									presenceData.state = "Waiting";
									break;
								}
								case "singleTextEntry": {
									if (gamePlayerState.category === "askTheWheel") {
										presenceData.state = `Asking the wheel a question - '${
											document.querySelector<HTMLTextAreaElement>(
												".input-box textarea"
											).value
										}'`;
									}
									break;
								}
								case "choices": {
									if (gamePlayerState.category === "skip-intro") {
										presenceData.state = "Watching the tutorial";
									}
									break;
								}
								case "tappingList": {
									presenceData.state = "Selecting answers";
									break;
								}
								case "matching": {
									const [a, b] = gamePlayerState.headers as string[];
									presenceData.state = `Matching ${a} to ${b}`;
									break;
								}
								case "placeSlices": {
									presenceData.state = "Placing slices";
									break;
								}
								case "spin": {
									presenceData.state = "Spinning the wheel";
									break;
								}
								case "numeric": {
									presenceData.state = `Answering a numeric question - "${gamePlayerState.prompt}"`;
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								case "typingList": {
									presenceData.state = "Typing answers";
									break;
								}
								case "guessing": {
									presenceData.state = "Guessing what the wheel is thinking of";
									break;
								}
								case "singleTextEntry": {
									presenceData.state = "Answering a question";
									break;
								}
								case "tappingRapid": {
									presenceData.state = "Tapping rapidly";
									break;
								}
								case "choosePlayers": {
									presenceData.state = "Choosing players";
									break;
								}
								case "chooseSlices": {
									presenceData.state = "Choosing slices";
									break;
								}
							}
							break;
						}
						case Games["mrder-detectives"]: {
							// TODO: fix name
							presenceData.smallImageKey = getComputedStyle(
								document.querySelector<HTMLDivElement>(".header.avatar"),
								":after"
							).backgroundImage.match(/^url\("(.*)"\)$/)[1];
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "choosing": {
									break;
								}
								case "drawing": {
									presenceData.state = "Drawing their weapon clue";
									break;
								}
								case "inspecting": {
									break;
								}
								case "writing": {
									presenceData.state = "Inviting accomplices";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								default: {
									presenceData.state = "Waiting";
								}
							}
							break;
						}
						case Games["apply-yourself"]: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "Logo": {
									presenceData.state = "Waiting";
									break;
								}
								case "writing": {
									presenceData.state = "Writing a response";
									break;
								}
								case "voting": {
									presenceData.state = "Voting for a response";
									break;
								}
								case "magnets": {
									presenceData.state = "Answering a prompt using magnets";
									break;
								}
								case "resumagnets": {
									presenceData.state = "Filling out their resumé using magnets";
									break;
								}
								case "done": {
									presenceData.state = "Waiting for others to finish";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
							}
							break;
						}
						case Games["drawful-animate"]: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "waiting": {
									presenceData.state = "Waiting";
									break;
								}
								case "drawing": {
									if (gamePlayerState.prompt === "an animation of yourself") {
										presenceData.state = "Drawing an animation of themselves";
									} else {
										presenceData.state = "Drawing an animation";
									}
									break;
								}
								case "writing": {
									presenceData.state = "Guessing the original prompt";
									break;
								}
								case "liking": {
									presenceData.state = "Awarding likes to other's guesses";
									break;
								}
								case "choosing": {
									presenceData.state = "Looking for the true prompt";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								case "ugc": {
									presenceData.state = "Creating a custom game";
									break;
								}
							}
							break;
						}
						case Games["survey-bomb"]: {
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "waiting": {
									presenceData.state = "Waiting";
									break;
								}
								case "choices": {
									presenceData.state = "Selecting a door";
									break;
								}
								case "survey": {
									presenceData.state = "Completing survey";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
							}
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
							switch (gamePlayerState.kind) {
								case "lobby": {
									presenceData.state = "Waiting in lobby";
									break;
								}
								case "choices": {
									presenceData.state = "Selecting a topic to sort";
									break;
								}
								case "falling": {
									presenceData.state = "Sorting an item";
									break;
								}
								case "postGame": {
									presenceData.state = "Viewing the results";
									break;
								}
								default: {
									presenceData.state = "Waiting";
								}
							}
							break;
						}
						case Games["antique-freak"]: {
							break;
						}
						case Games.htmf: {
							break;
						}
					}
				}
			} else presenceData.details = "Idle";
			break;
		}
		case "games.jackbox.tv": {
			presenceData.details = "Looking at a past game";
			presenceData.state = document.title;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=-artifact] .image"
			).src;
			presenceData.buttons = [
				{
					label: "View Game",
					url: href,
				},
			];
			break;
		}
		case "www.jackboxgames.com": {
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
