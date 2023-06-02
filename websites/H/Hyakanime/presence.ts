const presence = new Presence({
		clientId: "967174885992456292",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/H/Hyakanime/assets/logo.png",
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
