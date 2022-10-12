const presence = new Presence({
		clientId: "638118757453004820",
	}),
	browsingTimestamp = Math.round(Date.now() / 1000);

enum LayoutVersion {
	New = "new",
	Dictionarium = "dict",
	Legacy = "legacy",
	Guesspionage = "guesp",
	DevilAndDetails = "devilanddetails",
	DrawfulAnimate = "drawfulanimate",
	EnormousWheel = "newer",
	JobJob = "jobjob",
	PollMine = "pollmine",
	WeaponsDrawn = "weaponsdrawn",
}

interface Game {
	name: string;
	layout?: LayoutVersion;
	selector: string;
	logo: string;
}

const Games: Game[] = [
	// Party Pack 1
	{
		name: "You Don't Know Jack 2015",
		layout: LayoutVersion.Legacy,
		selector: "#page-ydkj2015",
		logo: "https://i.imgur.com/EGnX1E5.png",
	},
	{
		name: "Drawful 1/2",
		layout: LayoutVersion.Legacy,
		selector: "#page-drawful",
		logo: "https://i.imgur.com/TOaYCE3.png",
	},
	{
		name: "Word Spud",
		layout: LayoutVersion.Legacy,
		selector: "#page-wordspud",
		logo: "https://i.imgur.com/gFUB4EX.png",
	},
	{
		name: "Lie Swatter",
		layout: LayoutVersion.Legacy,
		selector: "#page-lieswatter",
		logo: "https://i.imgur.com/PavDjzP.png",
	},
	// Party Pack 2
	{
		name: "Bidiots",
		layout: LayoutVersion.Legacy,
		selector: "#page-auction",
		logo: "https://i.imgur.com/CMcGDrM.png",
	},
	{
		name: "Bomb Corp",
		layout: LayoutVersion.Legacy,
		selector: "#page-bombintern",
		logo: "https://i.imgur.com/XkqOv6o.png",
	},
	{
		name: "Earwax",
		layout: LayoutVersion.Legacy,
		selector: "#page-earwax",
		logo: "https://i.imgur.com/oEidNn6.png",
	},
	{
		name: "Fibbage XL/2",
		layout: LayoutVersion.Legacy,
		selector: "#page-fibbage",
		logo: "https://i.imgur.com/LxAtHuy.png",
	},
	// Party Pack 3
	{
		name: "Tee K.O.",
		layout: LayoutVersion.Legacy,
		selector: "#page-awshirt",
		logo: "https://i.imgur.com/wGbJhoR.png",
	},
	{
		name: "Fakin' It",
		layout: LayoutVersion.Legacy,
		selector: "#page-fakinit",
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	{
		name: "Guesspionage",
		layout: LayoutVersion.Guesspionage,
		selector: "#page-pollposition",
		logo: "https://i.imgur.com/nDqnyqV.png",
	},
	{
		name: "Quiplash 1/2/XL",
		layout: LayoutVersion.Legacy,
		selector: "#page-quiplash",
		logo: "https://i.imgur.com/NAySr0E.png",
	},
	{
		name: "Trivia M Party", // TODO: Fix name
		layout: LayoutVersion.Legacy,
		selector: "#page-triviadeath",
		logo: "https://i.imgur.com/zHOvymB.png",
	},
	// Party Pack 4
	{
		name: "Civic Doodle",
		selector: ".Overdrawn",
		logo: "https://i.imgur.com/6CBskbM.png",
	},
	{
		name: "Bracketeering",
		selector: ".bracketeering",
		logo: "https://i.imgur.com/oJJpQqi.png",
	},
	{
		name: "Monster Seeking Monster",
		selector: ".MonsterMingle",
		logo: "https://i.imgur.com/CPkaxX3.png",
	},
	{
		name: "Survive the Internet",
		selector: ".SurviveTheInternet",
		logo: "https://i.imgur.com/eXCzZ2e.png",
	},
	{
		name: "Fibbage 3",
		selector: ".Fibbage3",
		logo: "https://i.imgur.com/eTsm2zC.png",
	},
	// Party Pack 5
	{
		name: "Split the Room",
		selector: ".SplitTheRoom",
		logo: "https://i.imgur.com/YyhOPAp.png",
	},
	{
		name: "Zeeple Dome",
		selector: ".SlingShoot",
		logo: "https://i.imgur.com/QqEKHgG.png",
	},
	{
		name: "Patently Stupid",
		selector: ".PatentlyStupid",
		logo: "https://i.imgur.com/yGEE0Aw.png",
	},
	{
		name: "Mad Verse City",
		selector: ".RapBattle",
		logo: "https://i.imgur.com/Up8Paw8.png",
	},
	{
		name: "You Don't Know Jack: Full Stream",
		selector: ".YDKJ2018",
		logo: "https://i.imgur.com/Li8TLXI.png",
	},
	// Party Pack 6
	{
		name: "Push the Button",
		selector: ".pushthebutton", // TODO: Verify
		logo: "https://i.imgur.com/OhgGmMQ.png",
	},
	{
		name: "Joke Boat",
		selector: ".Jokeboat",
		logo: "https://i.imgur.com/Cih6bqA.png",
	},
	{
		name: "Role Models",
		selector: ".RoleModels",
		logo: "https://i.imgur.com/sETBCgc.png",
	},
	{
		name: "Trivia M Party 2", // TODO: Fix name
		selector: ".TriviaDeath2",
		logo: "https://i.imgur.com/9MmGVGD.png",
	},
	{
		name: "Dictionarium",
		selector: ".Ridictionarium",
		logo: "https://i.imgur.com/8S0aSTw.png",
		layout: LayoutVersion.Dictionarium,
	},
	// Party Pack 7
	{
		name: "Quiplash 3",
		selector: ".quiplash3",
		logo: "https://i.imgur.com/Jds4R56.png",
	},
	{
		name: "Talking Points",
		selector: ".jackbox-talks",
		logo: "https://i.imgur.com/8Amy9Di.png",
	},
	{
		name: "Blather 'Round",
		selector: ".blanky-blank",
		logo: "https://i.imgur.com/qLW2Fft.png",
	},
	{
		name: "The Devils and the Details",
		selector: ".everyday",
		logo: "https://i.imgur.com/tXkh58c.png",
		layout: LayoutVersion.DevilAndDetails,
	},
	{
		name: "Champ'd Up",
		selector: ".worldchamps",
		logo: "https://i.imgur.com/KnAS7yD.png",
	},
	// Party Pack 8
	{
		name: "Wheel of Enormous Proportions",
		selector: ".wheel",
		logo: "https://i.imgur.com/KnAS7yD.png",
		layout: LayoutVersion.EnormousWheel,
	},
	{
		name: "Weapons Drawn",
		selector: ".detectives",
		logo: "https://i.imgur.com/yRXmXbf.png",
		layout: LayoutVersion.WeaponsDrawn,
	},
	{
		name: "Job Job",
		selector: ".apply-yourself",
		logo: "https://i.imgur.com/FfZYRGL.png",
		layout: LayoutVersion.JobJob
	},
	{
		name: "Drawful Animate",
		selector: ".drawful-animate",
		logo: "https://i.imgur.com/NtRvc93.png",
		layout: LayoutVersion.DrawfulAnimate
	},
	{
		name: "The Poll Mine",
		selector: ".poll-mine",
		logo: "https://i.imgur.com/o4aaUox.png",
		layout: LayoutVersion.PollMine
	},
	// Party Pack 9
	{
		name: "Fibbage 4",
		selector: "TODO",
		logo: "TODO",
	},
	{
		name: "Quixort",
		selector: "TODO",
		logo: "TODO",
	},
	{
		name: "Nonsensory",
		selector: "TODO",
		logo: "TODO",
	},
	{
		name: "Junktopia",
		selector: "TODO",
		logo: "TODO",
	},
	{
		name: "Roomerang",
		selector: "TODO",
		logo: "TODO",
	},
];

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
			let layout: LayoutVersion = LayoutVersion.New;
			const {
				layout: gamelayout,
				name,
				logo,
			} = Games.find(game => document.querySelector(game.selector) !== null);
			if (gamelayout) layout = gamelayout;
			if (logo) presenceData.largeImageKey = logo;
			presenceData.details = `Playing ${name}`;
			if (useName) {
				switch (layout) {
					case LayoutVersion.New: {
						presenceData.state = `as ${
							document.querySelector("#playername").textContent
						}`;
						break;
					}
					case LayoutVersion.Legacy: {
						presenceData.state = `as ${
							document.querySelector("#player").children[0].textContent
						}`;
						break;
					}
					case LayoutVersion.Dictionarium: {
						presenceData.state = `as ${
							document.querySelector("#playericon").className.split("_")[1]
						}${document
							.querySelector("#playername")
							.textContent.toLowerCase()}`;
						break;
					}
					case LayoutVersion.Guesspionage: {
						presenceData.state = `as ${
							document.querySelector("#player").children[1].textContent
						}`;
						break;
					}
					case LayoutVersion.DevilAndDetails: {
						presenceData.state = `as ${
							document.querySelector(".player-text").textContent
						}`;
						break;
					}
					case LayoutVersion.DrawfulAnimate: {
						presenceData.state = `as ${
							document.querySelector(".header").textContent
						}`;
						break;
					}
					case LayoutVersion.EnormousWheel: {
						presenceData.state = `as ${
							document.querySelector(".player.name").textContent
						}`;
						break;
					}
					case LayoutVersion.JobJob: {
						presenceData.state = `as ${
							document.querySelector(".name").textContent
						}`;
						break;
					}
					case LayoutVersion.PollMine: {
						// TODO: Implement
						break;
					}
					case LayoutVersion.WeaponsDrawn: {
						presenceData.state = `as ${
							document.querySelector(".avatar.header").textContent
						}`;
					}
				}
			}
			if (useDetails) {
				// TODO: Add game details...
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
