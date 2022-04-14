const presence = new Presence({
		clientId: "721798189111443537"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		browsing: "presence.activity.browsing"
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

function addVisitProfilButton(presenceData: PresenceData, username: string) {
	presenceData.buttons = [
		{
			label: "Visiter son profil",
			url: `https://wolfy.fr/leaderboard/${username}`
		}
	];
}

function handleCheckingLeaderboard(
	presenceData: PresenceData,
	username?: string
) {
	if (!username) {
		const classementType =
			document.querySelector("div.Leaderboard_moonLeaderboard__3U2H7") !== null
				? "Lunaire"
				: document.querySelector("div.Leaderboard_lifeLeaderboard__3Wtz1") !==
				  null
				? "Éternel"
				: null;

		presenceData.details = `Top ${parseInt(
			document.querySelector(
				"div.Leaderboard_playerLine__1uAgP > div.Leaderboard_rank__n6aio"
			)?.textContent
		).toLocaleString()} ${classementType} (${parseInt(
			document.querySelector("div.Leaderboard_lifetimeXp__372DW > p")
				?.textContent
		).toLocaleString()} ${classementType === "Lunaire" ? "lauriers" : "xp"})`;
		presenceData.state = `Regarde le classement ${classementType}`;
	} else {
		presenceData.details = `[${
			document.querySelector("div.ExperienceGroup_first__3h_RY > p")
				?.textContent
		}] ${parseInt(
			document
				.querySelector("div.ExperienceGroup_experienceBarFull__3Qo8A > span")
				?.textContent.split(" / ")[0]
		).toLocaleString()} xp & ${parseInt(
			document.querySelector("p.PlayerCard_number__1d0CM").textContent
		).toLocaleString()} lauriers`;
		presenceData.state = `Regarde le profile de ${username}`;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "wf"
	};

	path = document.location.pathname;

	if (window.location.href !== prev && !path.includes("/game/")) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
		prev = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	presenceData.details = (await strings).browsing;
	presenceData.smallImageKey = "search";
	presenceData.smallImageText = (await strings).browsing;
	presenceData.startTimestamp = elapsed;

	if (
		path.includes("/articles/") &&
		path.split("/")[2] !== null &&
		path.split("/")[2].length > 1
	)
		presenceData.state = document.querySelector("body h1").textContent;
	else if (
		path.includes("/game/") &&
		path.split("/")[2] !== null &&
		path.split("/")[2].length > 1
	) {
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

		addVisitProfilButton(
			presenceData,
			document.querySelector("span.ChatMain_username__2C_7z")?.textContent
		);

		const [startTimestamp, endTimestamp] = getTimestamps(cp, currTime);

		presenceData.details = "En jeu";

		presenceData.smallImageKey = "live";
		presenceData.smallImageText = (await strings).play;
		if (currTime && currTime.includes(":")) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		} else presenceData.startTimestamp = cp;
	} else if (path.includes("/leaderboard"))
		handleCheckingLeaderboard(presenceData, path.split("/")[2]);
	else {
		addVisitProfilButton(
			presenceData,
			document.querySelector("p.Social_username__KhUdM")?.textContent
		);

		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = "Dans un menu";
		presenceData.details = "Dans un menu";

		switch (path) {
			case "/settings":
				presenceData.state = "Paramètres";
				break;
			case "/shop":
				presenceData.state = "Boutique";
				break;
			case "/articles":
				presenceData.state = "Actualités";
				presenceData.smallImageKey = "reading";
				presenceData.smallImageText = "En train de lire";
				break;
			case "/play":
			case "/":
			default:
				presenceData.state = "Page d'accueil";
		}
	}

	presence.setActivity(presenceData);
});
