const presence = new Presence({
	clientId: "1332497160406695947",
}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/tDAXNRP.png",
}

async function getStrings() {
	return presence.getStrings({
		browsing: "general.browsing",
		search: "general.search",
		viewHome: "general.viewHome",
		viewPage: "general.viewPage",
		viewing: "general.viewing",
		viewAPage: "general.viewAPage",
		viewProfile: "general.viewProfile",
		viewAProfile: "general.viewAProfile",
		buttonViewPage: "general.buttonViewPage",
		buttonViewProfile: "general.buttonViewProfile",
	});
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

const gameNames: Record<string, string> = {
	network: "Network",
	bedwars: "Bed Wars",
	duels: "Duels",
	skywars: "SkyWars",
	arcade: "Arcade",
	blitz: "Blitz",
	buildbattle: "Build Battle",
	classic: "Classic",
	copsandcrims: "Cops and Crims",
	megawalls: "Mega Walls",
	murdermystery: "Murder Mystery",
	pit: "Pit",
	smashheroes: "Smash Heroes",
	tntgames: "TNT Games",
	uhc: "UHC",
	warlords: "Warlords",
	woolgames: "Wool Games",
	fishing: "Fishing",
},
	achievementsGameNames: Record<string, string> = {
		overall: "Overall",
		legacy: "Legacy",
		general: "General",
		arcade: "Arcade",
		arena: "Arena Brawl",
		bedwars: "Bed Wars",
		blitz: "Blitz",
		buildbattle: "Build Battle",
		copsandcrims: "Cops and Crims",
		duels: "Duels",
		housing: "Housing",
		megawalls: "Mega Walls",
		murdermystery: "Murder Mystery",
		paintball: "Paintball",
		pit: "Pit",
		quakecraft: "Quakecraft",
		skyblock: "SkyBlock",
		skywars: "SkyWars",
		smashheroes: "Smash Heroes",
		speeduhc: "Speed UHC",
		tkr: "Turbo Kat Racers",
		tntgames: "TNT Games",
		uhc: "UHC",
		vampirez: "VampireZ",
		walls: "Walls",
		warlords: "Warlords",
		woolgames: "Wool Games",
		easter: "Easter",
		halloween: "Halloween",
		holiday: "Holiday",
		summer: "Summer",
	};

presence.on("UpdateData", async () => {
	const [
		languageSetting,
		privacyModeSetting,
		showSmallImagesSetting,
		showButtonsSetting,
	] = await Promise.all([
		presence.getSetting<string>("language").catch(() => "en"),
		presence.getSetting<boolean>("privacyMode"),
		presence.getSetting<boolean>("showSmallImages"),
		presence.getSetting<boolean>("showButtons"),
	]);

	if (oldLang !== languageSetting) {
		oldLang = languageSetting;

		strings = await getStrings();
	}

	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: Assets.Logo,
	},
		{ pathname, href } = document.location,
		playerOrGuild = document.title.split(" | ")[0],
		game = pathname.split("/")[3];

	function homePage() {
		presenceData.details = strings.viewHome;
		presenceData.state = `${strings.search} for a player or guild...`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = strings.search;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	}

	function leaderboardsPage() {
		const gameSelected = document.querySelector(
			"#game-selector .leaderboard-selector-button.selected"
		),
			leaderboardSelected = document.querySelector(
				"#leaderboard-selector .leaderboard-selector-button.selected"
			);

		presenceData.details = `${strings.viewPage} Leaderboards`;
		presenceData.state =
			gameSelected && leaderboardSelected
				? `${strings.viewing
				} ${gameSelected?.textContent.trim()} - ${leaderboardSelected?.textContent.trim()} leaderboard`
				: `${strings.search} for a leaderboard...`;
		presenceData.smallImageKey =
			gameSelected && leaderboardSelected ? Assets.Viewing : Assets.Search;
		presenceData.smallImageText =
			gameSelected && leaderboardSelected ? strings.viewAPage : strings.search;
		presenceData.details = `${strings.viewPage} Leaderboards`;
		presenceData.state = `${strings.viewing} ${document
			.querySelector("#game-selector .leaderboard-selector-button.selected")
			?.textContent.trim()} - ${document
				.querySelector(
					"#leaderboard-selector .leaderboard-selector-button.selected"
				)
				?.textContent.trim()} leaderboard`;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.smallImageText = strings.viewAPage;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	}

	function playerPage() {
		if (playerOrGuild === "The simple, beautiful Hypixel stats website.")
			return homePage();
		else {
			presenceData.details = `${strings.viewProfile} ${playerOrGuild}`;
			presenceData.state = `${strings.viewing} ${gameNames[game]} stats`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewAProfile;
			presenceData.buttons = [
				{
					label: strings.buttonViewProfile,
					url: href,
				},
			];
		}
	}

	function guildPage() {
		if (playerOrGuild === "The simple, beautiful Hypixel stats website.")
			return homePage();
		else {
			presenceData.details = `${strings.viewProfile} ${playerOrGuild}`;
			presenceData.state = `${strings.viewing} Guild stats`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewAProfile;
			presenceData.buttons = [
				{
					label: strings.buttonViewProfile,
					url: href,
				},
			];
		}
	}

	function achievementsPage() {
		if (playerOrGuild === "The simple, beautiful Hypixel stats website.")
			return homePage();
		else {
			presenceData.details = `${strings.viewProfile} ${playerOrGuild}`;
			presenceData.state = `${strings.viewing} ${achievementsGameNames[game]} achievements`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewAProfile;
			presenceData.buttons = [
				{
					label: strings.buttonViewProfile,
					url: href,
				},
			];
		}
	}

	function questsPage() {
		if (playerOrGuild === "The simple, beautiful Hypixel stats website.")
			return homePage();
		else {
			presenceData.details = `${strings.viewProfile} ${playerOrGuild}`;
			presenceData.state = `${strings.viewing} Quests`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewAProfile;
			presenceData.buttons = [
				{
					label: strings.buttonViewProfile,
					url: href,
				},
			];
		}
	}

	if (pathname === "/") homePage();
	if (pathname === "/leaderboards") leaderboardsPage();
	if (pathname.startsWith("/player")) playerPage();
	if (pathname.startsWith("/guild")) guildPage();
	if (pathname.startsWith("/achievements")) achievementsPage();
	if (pathname.startsWith("/quests")) questsPage();

	if (privacyModeSetting) {
		return presence.setActivity({
			details: strings.browsing,
			startTimestamp: browsingTimestamp,
			smallImageKey: Assets.Viewing,
			smallImageText: strings.browsing,
		});
	}

	if (!showSmallImagesSetting) delete presenceData.smallImageKey;
	if (!showButtonsSetting) delete presenceData.buttons;

	await presence.setActivity(presenceData);
});
