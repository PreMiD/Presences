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

function getTimestamps(audioTime: number, audioDuration: string): number[] {
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
	addButton(presenceData, "Consulter l'article", url);
}

function addConsultCategoryButton(presenceData: PresenceData, url: string) {
	addButton(presenceData, "Consulter la catégorie", url);
}

async function addJoinGameButton(presenceData: PresenceData, gameId: string) {
	if (!(await presence.getSetting("joinGameButton"))) return;
	addButton(
		presenceData,
		`(${
			document.querySelector("div.Header_timer__36MsP")?.textContent
		}) Rejoindre la partie`,
		`https://wolfy.fr/game/${gameId}`
	);
}

function addVisitHelpCenterButton(presenceData: PresenceData) {
	addButton(
		presenceData,
		"Consulter le centre d'aide",
		"https://help.wolfy.fr"
	);
}

async function addVisitProfilButton(
	presenceData: PresenceData,
	username: string
) {
	if (!username) return;
	if (!(await presence.getSetting("visitProfileButton"))) return;

	let label = `Visiter le profil de ${username}`;
	if (label.length > 32) label = `${label.slice(0, 31)}…`;

	addButton(presenceData, label, `https://wolfy.fr/leaderboard/${username}`);
}

function addVisitWolfyButton(presenceData: PresenceData) {
	addButton(presenceData, "Visiter le site de Wolfy", "https://wolfy.fr");
}

async function handleCheckingLeaderboard(
	presenceData: PresenceData,
	username?: string
) {
	presenceData.smallImageKey = "leaderboard";
	presenceData.smallImageText = "Consulte le classement";

	if (!username) {
		const classementType =
			document.querySelector("div.Leaderboard_moonLeaderboard__3U2H7") !== null
				? "Lunaire"
				: document.querySelector("div.Leaderboard_lifeLeaderboard__3Wtz1") !==
				  null
				? "Éternel"
				: null;

		presenceData.details = `Regarde le classement ${classementType}`;
		presenceData.state = `Top ${parseInt(
			document.querySelector(
				"div.Leaderboard_playerLine__1uAgP > div.Leaderboard_rank__n6aio"
			)?.textContent
		).toLocaleString()} ${classementType} (${parseInt(
			document.querySelector("div.Leaderboard_lifetimeXp__372DW > p")
				?.textContent
		).toLocaleString()} ${classementType === "Lunaire" ? "lauriers" : "xp"})`;
	} else {
		presenceData.details = `Regarde le profil de ${username}`;
		presenceData.state = `[${
			document.querySelector("div.ExperienceGroup_first__3h_RY > p")
				?.textContent
		}] ${parseInt(
			document
				.querySelector("div.ExperienceGroup_experienceBarFull__3Qo8A > span")
				?.textContent.split(" / ")[0]
		).toLocaleString()} xp & ${parseInt(
			document.querySelector("p.PlayerCard_number__1d0CM").textContent
		).toLocaleString()} lauriers`;
		await addVisitProfilButton(presenceData, username);
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	path = document.location.pathname;

	if (window.location.href !== prev && !path.includes("/game/")) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
		prev = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	presenceData.startTimestamp = elapsed;

	if (document.location.hostname === "help.wolfy.fr") {
		if (path.includes("/article") && path.split("/")[3]) {
			presenceData.details = "Lit l'article ⤵️";
			presenceData.state = document.querySelector(
				"h1.csh-navigation-title-item-inner"
			)?.textContent;
			addConsultArticleButton(presenceData, document.location.href);
			addVisitHelpCenterButton(presenceData);
		} else if (path.includes("/category") && path.split("/")[3]) {
			presenceData.details = "Consulte la catégorie ⤵️";
			presenceData.state = document.querySelector(
				"span.csh-category-badge"
			)?.textContent;
			addConsultCategoryButton(presenceData, document.location.href);
		} else {
			presenceData.details = "Consulte le centre d'aide";
			presenceData.state = "Page d'accueil";
			addVisitHelpCenterButton(presenceData);
		}
	} else if (path.includes("/articles/") && path.split("/")[2]) {
		presenceData.details = "Lis l'article ⤵️";
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = "Lis un article";
		presenceData.state = document.querySelector("body h1").textContent;
	} else if (path.includes("/game/") && path.split("/")[2]) {
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

		await addVisitProfilButton(
			presenceData,
			document.querySelector("span.ChatMain_username__2C_7z")?.textContent // Will be the anonymous username if used
		);

		if (presenceData.state === "EN ATTENTE") {
			presenceData.state += ` (${
				document.querySelector("div.Header_timer__36MsP")?.textContent
			})`;
			await addJoinGameButton(presenceData, path.split("/")[2]);
		}

		const [startTimestamp, endTimestamp] = getTimestamps(cp, currTime);

		presenceData.details = "En jeu";

		presenceData.smallImageKey = "live";
		presenceData.smallImageText = "En jeu";
		if (currTime && currTime.includes(":")) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		} else presenceData.startTimestamp = cp;
	} else if (path.includes("/leaderboard")) {
		await addVisitProfilButton(
			presenceData,
			document.querySelector("p.Social_username__KhUdM")?.textContent
		);

		await handleCheckingLeaderboard(presenceData, path.split("/")[2]);
	} else {
		await addVisitProfilButton(
			presenceData,
			document.querySelector("p.Social_username__KhUdM")?.textContent
		);

		presenceData.details = "Dans un menu";

		switch (path) {
			case "/skin":
				presenceData.smallImageKey = "skin";
				presenceData.smallImageText = "Choisis ton skin";
				presenceData.state = "Consulte ses Skins";
				break;
			case "/settings":
				presenceData.state = "Change ses paramètres";
				break;
			case "/shop":
				presenceData.smallImageKey = "shop";
				presenceData.smallImageText = "Achete des skins";
				presenceData.state = "Consulte la Boutique";
				break;
			case "/articles":
				presenceData.state = "Consulte les dernières actualités";
				presenceData.smallImageKey = "reading";
				presenceData.smallImageText = "En train de lire";
				break;
			case "/play":
			case "/":
			default:
				presenceData.state = "Page d'accueil";
		}
	}

	if (!presenceData.buttons || !presenceData.buttons[1])
		addVisitWolfyButton(presenceData);

	presence.setActivity(presenceData);
});
