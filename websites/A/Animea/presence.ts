const presence = new Presence({ clientId: "1006563035957182545" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/lpx1Af4.png",
			startTimestamp: browsingTimestamp,
		},
		pathnameArray = document.location.pathname.split("/"),
		[time, showCover, showButtons] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("buttons"),
		]);

	switch (pathnameArray[1]) {
		case "":
			presenceData.details = "Parcours la page d'accueil";
			break;
		case "discovery": {
			presenceData.details = "Découvre de nouveaux animes";
			const queryText = document
				.querySelector<HTMLDivElement>("div.filter-value")
				.textContent.trim();
			if (queryText !== "Tout") presenceData.state = `Type : ${queryText}`;
			break;
		}
		case "series":
		case "movies": {
			presenceData.details = `Parcours les ${
				pathnameArray[1] === "series" ? "animés" : "films animés"
			}`;
			const queryText: string = document
				.querySelector<HTMLDivElement>("div.filter-value")
				.textContent.trim();
			if (queryText !== "Tout") presenceData.state = `Catégorie : ${queryText}`;
			break;
		}
		case "categories":
			presenceData.details = "Parcours les catégories";
			break;
		case "category":
			presenceData.details = "Parcours la catégorie";
			presenceData.state = document
				.querySelector<HTMLDivElement>("div.text-24")
				.textContent.trim();
			break;
		case "serie": {
			if (pathnameArray[2].includes("-episode")) {
				presenceData.details = `Regarde ${document
					.querySelector("a > h1")
					.textContent.trim()}`;
				const queryText: string[] = document
					.querySelector<HTMLHeadingElement>(".mb-1")
					.textContent.trim()
					.split(".");
				presenceData.state = `Saison ${queryText[0]}, Épisode ${
					queryText[1].split(" ")[1]
				}`;

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.current, video.duration);

				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Lecture en cours";

				if (video.paused) {
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = "En pause";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}

				presenceData.largeImageKey = document
					.querySelector<HTMLHeadElement>('meta[property="og:image"]')
					.getAttribute("content");

				presenceData.buttons = [
					{ label: "Voir l'épisode", url: document.location.href },
					{
						label: "Voir l'animé",
						url: document.location.href.replace(
							/-\d*-season-\d*-episode/gm,
							""
						),
					},
				];
			} else {
				presenceData.details = "Parcours la page de";
				presenceData.state = document
					.querySelector<HTMLHeadingElement>("div.pl-md-4 > h1")
					.textContent.trim();

				presenceData.largeImageKey = document
					.querySelector<HTMLHeadElement>('meta[property="og:image"]')
					.getAttribute("content");
				presenceData.buttons = [
					{ label: "Voir l'animé", url: document.location.href },
				];
			}
			break;
		}
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!showCover)
		presenceData.largeImageKey = "https://i.imgur.com/lpx1Af4.png";
	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
