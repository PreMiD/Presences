type langStrings = {
	choosingSkin: string;
	consultingArticles: string;
	consultingCategory: string;
	consultingAFutureEvent: string;
	consultingEvents: string;
	consultingHelpCenter: string;
	consultingHome: string;
	consultingLeaderboard: string;
	consultingShop: string;
	consultingSettings: string;
	consultingSkin: string;
	consultingSpecificLeaderboard: string; // $leaderboardType
	joinGame: string;
	laurels: string;
	life: string;
	lookingAtProfile: string; // $username
	lunar: string;
	inAMenu: string;
	participatingToAnEvent: string;
	playing: string;
	readingAnArticle: string;
	toConsultArticle: string;
	toConsultCategory: string;
	toConsultEvent: string;
	visitHelpCenter: string;
	visitProfile: string; // $username
	visitWolfy: string;
	waiting: string;
};

const strings: Record<string, Partial<langStrings>> = {
	en: {
		choosingSkin: "Choosing a skin",
		consultingArticles: "Consulting articles",
		consultingCategory: "Consulting a category ⤵️",
		consultingAFutureEvent: "Consulting a future event ⤵️",
		consultingEvents: "Consulting events",
		consultingHelpCenter: "Consulting the help center",
		consultingHome: "Consulting the home page",
		consultingLeaderboard: "Consulting the leaderboard",
		consultingShop: "Consulting the shop",
		consultingSettings: "Consulting the settings",
		consultingSkin: "Consulting a skin",
		consultingSpecificLeaderboard:
			"Consulting the $leaderboardType leaderboard",
		joinGame: "Join game",
		laurels: "Laurels",
		life: "Eternal",
		lookingAtProfile: "Looking at $username's profile",
		lunar: "Lunar",
		inAMenu: "In a menu",
		participatingToAnEvent: "Participating to an event",
		playing: "In Game",
		readingAnArticle: "Reading an article ⤵️",
		toConsultArticle: "Consult this article",
		toConsultCategory: "Consult this category",
		toConsultEvent: "Consult this event",
		visitHelpCenter: "Visit the help center",
		visitProfile: "Visit $username's profile",
		visitWolfy: "Visit Wolfy's website",
		waiting: "WAITING"
	},
	fr: {
		choosingSkin: "Choisit son skin",
		consultingArticles: "Consulte les articles",
		consultingCategory: "Consulte la catégorie ⤵️",
		consultingAFutureEvent: "Consulte l'événement prochain ⤵️",
		consultingEvents: "Consulte les évènements",
		consultingHelpCenter: "Consulte le centre d'aide",
		consultingHome: "Consulte la page d'accueil",
		consultingLeaderboard: "Consulte le classement",
		consultingShop: "Consulte la boutique",
		consultingSettings: "Consulte ses paramètres",
		consultingSkin: "Consulte un skin",
		consultingSpecificLeaderboard: "Consulte le classement $leaderboardType",
		joinGame: "Rejoindre la partie",
		laurels: "Lauriers",
		life: "Éternel",
		lookingAtProfile: "Regarde le profil de $username",
		lunar: "Lunaire",
		inAMenu: "Dans un menu",
		participatingToAnEvent: "Participe à un événement",
		playing: "En jeu",
		readingAnArticle: "Lit l'article ⤵️",
		toConsultArticle: "Consulter l'article",
		toConsultCategory: "Consulter la catégorie",
		toConsultEvent: "Consulter l'événement",
		visitHelpCenter: "Visite le centre d'aide",
		visitProfile: "Voir le profil de $username",
		visitWolfy: "Visiter le site de Wolfy",
		waiting: "EN ATTENTE"
	}
};

function getString(key: keyof langStrings) {
	return (
		strings[document.querySelector("html")?.lang ?? "en"]?.[key] ||
		strings.fr[key] ||
		`<${key}>`
	);
}

const presence = new Presence({
	clientId: "501842028569559061" // Official Wolfy Discord App Client ID, owned by Wolfy's Admin
});

let path,
	prev: string,
	elapsed: number,
	prevState: string,
	cp: number,
	currTime: string;

function getTime(list: string[]): number {
	let ret = 0;
	for (let index = list.length - 1; index >= 0; index--)
		ret += (parseInt(list[index]) * 60) ** index;

	return ret;
}

function getInGameTimestamps(
	audioTime: number,
	audioDuration: string
): number[] {
	return [
		Date.now(),
		audioTime + getTime(audioDuration.split(":").reverse()) * 1000
	];
}

function addButton(presenceData: PresenceData, label: string, url: string) {
	if (!presenceData.buttons) {
		presenceData.buttons = [
			{
				label,
				url
			}
		];
	} else {
		presenceData.buttons[1] = {
			label,
			url
		};
	}
}

function addConsultArticleButton(presenceData: PresenceData, url: string) {
	addButton(presenceData, getString("toConsultArticle"), url);
}

function addConsultCategoryButton(presenceData: PresenceData, url: string) {
	addButton(presenceData, getString("toConsultCategory"), url);
}

async function addJoinGameButton(presenceData: PresenceData, gameId: string) {
	if (!(await presence.getSetting("joinGameButton"))) return;
	addButton(
		presenceData,
		`(${
			document.querySelector("div.Header_timer__36MsP")?.textContent
		}) ${getString("joinGame")}`,
		`https://wolfy.fr/game/${gameId}`
	);
}

function addVisitHelpCenterButton(presenceData: PresenceData) {
	addButton(
		presenceData,
		getString("visitHelpCenter"),
		"https://help.wolfy.fr"
	);
}

function addVisitEventButton(presenceData: PresenceData, href: string) {
	addButton(presenceData, getString("toConsultEvent"), href);
}

async function addVisitProfilButton(
	presenceData: PresenceData,
	username: string
) {
	if (!username) return;
	if (!(await presence.getSetting("visitProfileButton"))) return;

	let label = `${getString("visitProfile").replace("$username", username)}`;
	if (label.length > 32) label = `${label.slice(0, 31)}…`;

	addButton(presenceData, label, `https://wolfy.fr/leaderboard/${username}`);
}

function addVisitWolfyButton(presenceData: PresenceData) {
	addButton(presenceData, getString("visitWolfy"), "https://wolfy.net");
}

async function handleCheckingLeaderboard(
	presenceData: PresenceData,
	username?: string
) {
	presenceData.smallImageKey = "leaderboard";
	presenceData.smallImageText = getString("consultingLeaderboard");

	if (!username) {
		const classementType =
			document.querySelector("div.Leaderboard_moonLeaderboard__3U2H7") !== null
				? "lunar"
				: document.querySelector("div.Leaderboard_lifeLeaderboard__3Wtz1") !==
				  null
				? "life"
				: null;

		presenceData.details = getString("consultingSpecificLeaderboard").replace(
			"$leaderboardType",
			getString(classementType)
		);
		presenceData.state = `Top ${parseInt(
			document.querySelector(
				"div.Leaderboard_playerLine__1uAgP > div.Leaderboard_rank__n6aio"
			)?.textContent
		).toLocaleString()} ${classementType} (${parseInt(
			document.querySelector("div.Leaderboard_lifetimeXp__372DW > p")
				?.textContent
		).toLocaleString()} ${
			classementType === "lunar" ? getString("laurels") : "xp"
		})`;
	} else {
		presenceData.details = getString("lookingAtProfile").replace(
			"$username",
			username
		);
		presenceData.state = `[${
			document.querySelector("div.ExperienceGroup_first__3h_RY > p")
				?.textContent
		}] ${parseInt(
			document
				.querySelector("div.ExperienceGroup_experienceBarFull__3Qo8A > span")
				?.textContent.split(" / ")[0]
		).toLocaleString()} xp & ${parseInt(
			document.querySelector("p.PlayerCard_number__1d0CM").textContent
		).toLocaleString()} ${getString("laurels")}`;
		await addVisitProfilButton(presenceData, username);
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	path = document.location.pathname;

	const pathOffset =
		path.split("/")[1] === document.querySelector("html")?.lang ? 1 : 0; // If the language is the first path element, we need to add an offset

	if (window.location.href !== prev && !path.includes("/game/")) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
		prev = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	presenceData.startTimestamp = elapsed;

	if (
		document.location.hostname === "help.wolfy.net" ||
		document.location.hostname === "help.wolfy.fr"
	) {
		if (path.includes("/article") && path.split("/")[3]) {
			presenceData.details = getString("readingAnArticle");
			presenceData.state = document.querySelector(
				"h1.csh-navigation-title-item-inner"
			)?.textContent;
			addConsultArticleButton(presenceData, document.location.href);
			addVisitHelpCenterButton(presenceData);
		} else if (path.includes("/category") && path.split("/")[3]) {
			presenceData.details = getString("consultingCategory");
			presenceData.state = document.querySelector(
				"span.csh-category-badge"
			)?.textContent;
			addConsultCategoryButton(presenceData, document.location.href);
		} else {
			presenceData.details = getString("consultingHelpCenter");
			presenceData.state = getString("consultingHome");
			addVisitHelpCenterButton(presenceData);
		}
	} else if (path.includes("/articles/") && path.split("/")[2 + pathOffset]) {
		presenceData.details = getString("readingAnArticle");
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = getString("readingAnArticle");
		presenceData.state = document.querySelector("body h1").textContent;
		addConsultArticleButton(presenceData, document.location.href);
	} else if (path.includes("/game/") && path.split("/")[2 + pathOffset]) {
		presenceData.state = document
			.querySelector("div.Header_nameState__3u5uu")
			.textContent.toUpperCase();

		if (presenceData.state !== prevState) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
			prevState = presenceData.state;
			cp = Date.now();
			currTime = document.querySelector("div.Header_timer__36MsP").textContent;
		}

		presenceData.details = getString("playing");

		presenceData.smallImageKey = "live";
		presenceData.smallImageText = getString("playing");
		if (currTime?.includes(":")) {
			[presence.startTimestamp, presence.endTimestamp] = getInGameTimestamps(
				cp,
				currTime
			);
		} else presenceData.startTimestamp = cp;

		await addVisitProfilButton(
			presenceData,
			document.querySelector("span.ChatMain_username__2C_7z")?.textContent // Will be the anonymous username if used
		);

		if (presenceData.state === getString("waiting")) {
			presenceData.state += ` (${
				document.querySelector("div.Header_timer__36MsP")?.textContent
			})`;
			await addJoinGameButton(presenceData, path.split("/")[2 + pathOffset]);
		}
	} else if (path.includes("/leaderboard")) {
		await addVisitProfilButton(
			presenceData,
			document.querySelector("p.Social_username__KhUdM")?.textContent
		);

		await handleCheckingLeaderboard(
			presenceData,
			path.split("/")[2 + pathOffset]
		);
	} else if (path.includes("/event") && path.split("/")[2 + pathOffset]) {
		if (document.querySelector("div.Event_eventIntroduction__1HrZz")) {
			presenceData.details = getString("participatingToAnEvent");
			presenceData.state = `Top ${parseInt(
				document.querySelector(
					"div.Event_lineLeaderboard__hxgUV.Event_me__2Lm3n > div.Event_rank__Id586"
				).textContent
			).toLocaleString()} - ${parseInt(
				document.querySelector(
					"div.Event_lineLeaderboard__hxgUV.Event_me__2Lm3n > div.Event_points__3K_vr"
				).textContent
			).toLocaleString()} points`;
		} else {
			presenceData.details = getString("consultingAFutureEvent");
			presenceData.state = document.querySelector(
				"div.Event_title__hCZ5r"
			)?.textContent;
		}
		addVisitEventButton(presenceData, document.location.href);
	} else {
		await addVisitProfilButton(
			presenceData,
			document.querySelector("p.Social_username__KhUdM")?.textContent
		);

		presenceData.details = getString("inAMenu");

		switch (path.split("/")[1 + pathOffset]) {
			case "skin":
				presenceData.smallImageKey = "skin";
				presenceData.smallImageText = getString("choosingSkin");
				presenceData.state = getString("consultingSkin");
				break;
			case "settings":
				presenceData.state = getString("consultingSettings");
				break;
			case "shop":
				presenceData.smallImageKey = "shop";
				presenceData.smallImageText = "Achete des skins";
				presenceData.state = getString("consultingShop");
				break;
			case "articles":
				presenceData.state = getString("consultingArticles");
				presenceData.smallImageKey = "reading";
				presenceData.smallImageText = getString("consultingArticles");
				break;
			default:
				presenceData.state = getString("consultingHome");
		}
	}

	if (!presenceData.buttons || !presenceData.buttons[1])
		addVisitWolfyButton(presenceData);

	presence.setActivity(presenceData);
});
