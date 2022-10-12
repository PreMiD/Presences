const presence = new Presence({
		clientId: "638118757453004820",
	}),
	browsingTimestamp = Math.round(Date.now() / 1000);

const LayoutVersion: Record<string, Function> = {
	New: () => document.querySelector("#playername").textContent,
	Dictionarium: () => `${document.querySelector("#playericon").className.split("_")[1]}${document
		.querySelector("#playername")
		.textContent.toLowerCase()}`,
	Legacy: () => document.querySelector("#player").children[0].textContent,
	Guesspionage: () => document.querySelector("#player").children[1].textContent,
	DevilAndDetails: () => document.querySelector(".player-text").textContent,
	// TODO: Find similarities?
	DrawfulAnimate: () => document.querySelector(".header").textContent,
	EnormousWheel: () => document.querySelector(".player.name").textContent,
	JobJob: () => document.querySelector(".name").textContent,
	PollMine: () => {},
	WeaponsDrawn: () => document.querySelector(".avatar.header").textContent,
}

interface Game {
	name: string;
	layout?: Function;
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SXfEdnL.png",
		},
		useName = await presence.getSetting<boolean>("useName"),
		useTime = await presence.getSetting<boolean>("useTime"),
		useDetails = await presence.getSetting<boolean>("useDetails");

	if (useTime) presenceData.startTimestamp = browsingTimestamp;

	switch (window.location.hostname) {
		case "jackbox.tv": {
			let getLayoutPlayerName = LayoutVersion.New;
			const game = Object.values(Games).find(
				game => document.querySelector(game.selector) !== null
			);
			if (game) {
				const { layout: gameLayout, name, logo } = game;
				if (gameLayout) getLayoutPlayerName = gameLayout;
				if (logo) presenceData.largeImageKey = logo;
				if (name) presenceData.details = `Playing ${name}`;
				if (useName) {
					let playerName: string;
					try {
						const name = getLayoutPlayerName();
						if (name) playerName = ` as ${name}`;
					} catch (err) {
						playerName = "";
					}
					presenceData.details += playerName;
				}
				if (useDetails) {
					// TODO: Add game details...
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
