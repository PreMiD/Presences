const presence = new Presence({ clientId: "1028640811925114942" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

enum Assets {
	Logo = "https://i.imgur.com/C3CetGw.png",
	Pause = "https://i.imgur.com/0A75vqT.png",
	Play = "https://i.imgur.com/Dj5dekr.png",
	Search = "https://i.imgur.com/C3CetGw.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
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
		case "index":
			presenceData.details = "Parcours la page d'accueil";
			break;
		case "discover":
		case "search":
			presenceData.details = "Recherche de nouveaux animes";
			break;
		case "tags": {
			presenceData.details = "Recherche de nouveaux animes";
			const queryText = pathnameArray[2];
			if (queryText !== "All") presenceData.state = `Filtre : ${queryText}`;
			break;
		}
		case "categories":
			presenceData.details = "Parcours les catégories";
			break;
		case "anime":
			presenceData.details = `Découvre ${document
				.querySelector("div.top h1")
				.textContent.trim()}`;
			presenceData.largeImageKey = document
				.querySelector("div.left img")
				.getAttribute("src");
			presenceData.buttons = [
				{
					label: "Voir l'animé",
					url: document.location.href,
				},
			];
			break;
		case "video": {
			presenceData.details = `Regarde ${document
				.querySelector("#anime_name")
				.getAttribute("value")}`;
			presenceData.state = `${document
				.querySelector("#anime_season")
				.getAttribute("value")}, ${document
				.querySelector("#anime_episode")
				.getAttribute("value")}`;

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
				.querySelector("div.left img")
				.getAttribute("src");

			presenceData.buttons = [
				{ label: "Voir l'épisode", url: document.location.href },
				{
					label: "Voir l'animé",
					url: `https://oneanime.fr/anime/${pathnameArray[2]}`,
				},
			];
			break;
		}
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!showCover) presenceData.largeImageKey = Assets.Logo;
	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
