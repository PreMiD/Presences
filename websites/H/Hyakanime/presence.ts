const presence = new Presence({
		clientId: "967174885992456292",
	}),
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/cRrhUIZ.png",
			startTimestamp: browsingTimestamp,
			details: "Sur la page d'accueil",
		},
		page = document.location.pathname;
	if (page.startsWith("/anime/")) {
		presenceData.details = "Regarde la fiche:";
		const anime = document.querySelector(
			"#root > div.anime-body > div.anime-white-informations > div.anime-white-infos > div:nth-child(2) > h1"
		).textContent;
		presenceData.state = anime.split("Adulte")[0];
		presenceData.buttons = [
			{
				label: "Afficher la fiche",
				url: document.location.href,
			},
		];
	} else if (page.startsWith("/profile/")) {
		presenceData.details = "Regarde le profil de:";
		presenceData.state = document.querySelector(
			"#root > div:nth-child(3) > div.profil-banner-top > div > div.bloc-name-banner > h1"
		).textContent;
		presenceData.buttons = [
			{
				label: "Afficher le profil",
				url: document.location.href,
			},
		];
	} else if (page.includes("/search/"))
		presenceData.details = "Cherche une fiche...";
	else if (page.startsWith("/new"))
		presenceData.details = "Soumets une nouvelle fiche";
	else if (page.startsWith("/edit/")) presenceData.details = "Édit une fiche";
	else if (page.startsWith("/bibliotheque"))
		presenceData.details = "Regarde sa bibliothèque";
	else if (page.startsWith("/settings"))
		presenceData.details = "Regarde ses paramètres";
	else if (page.startsWith("/team"))
		presenceData.details = "Regarde l'équipe de modération";
	else if (page.startsWith("/premium"))
		presenceData.details = "Considère l'achat du premium";
	else if (page.startsWith("/mentions-legales"))
		presenceData.details = "Regarde les mentions légales";
	else if (page.startsWith("/simulcast"))
		presenceData.details = "Regarde les fiches en simulcast";
	else if (page.startsWith("/soon"))
		presenceData.details = "Regarde les fiches sortant bientôt";
	else if (page.startsWith("/agenda")) {
		presenceData.details = "Regarde l'agenda";
		presenceData.buttons = [
			{
				label: "Afficher l'agenda",
				url: document.location.href,
			},
		];
	}
	presence.setActivity(presenceData);
});
