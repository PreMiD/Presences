const presence = new Presence({
		clientId: "966800501326876692"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			smallImageKey: "reading",
			smallImageText: "Regarde des annonces",
			startTimestamp: browsingTimestamp
		},
		defaultPresenceData: PresenceData = {
			largeImageKey: "logo",
			smallImageKey: "reading",
			smallImageText: "Regarde une page",
			startTimestamp: browsingTimestamp,
			details: "sur Leboncoin"
		};

	if (document.location.pathname.includes("/deposer-une-annonce")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Déposer une annonce";
	} else if (document.location.pathname.includes("/mes-recherches")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Mes recherches sauvegardées";
	} else if (document.location.pathname.includes("/mes-annonces")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Mes annonces sauvegardées";
	} else if (document.location.pathname.includes("/emploi")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Offres d'emploi";
	} else if (
		document.location.pathname.includes("/paiement-securise-livraison")
	) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Paiement sécurisé";
	} else if (document.location.pathname.includes("/messages")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Messages privés";
	} else if (document.location.pathname.includes("/dc")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Informations légales";
	} else if (document.location.pathname.includes("/annonces/offres")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Annonces pour toute la France";
	} else if (document.location.pathname.includes("/compte")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Paramètres du compte";
	} else if (document.location.pathname.includes("/profil/")) {
		presenceData.details = "Regarde la page :";
		const profilename = document.querySelector(
			"#mainContent > div.styles_Profile__3vhTo > div.styles_ProfileHero__aQISv > div > div.styles_userInfo__XBcBm > div > h3"
		).textContent;
		presenceData.state = `Profil de ${profilename}`;
		presenceData.buttons = [
			{ label: "Consulter le profil", url: document.location.href }
		];
	} else if (document.location.pathname.includes("/blog")) {
		presenceData.details = "Viewing Page:";
		presenceData.state = "Node.js News";
	} else if (document.location.pathname.includes("/recherche")) {
		presenceData.details = "Dans les résultats de recherche :";

		presenceData.state = `Annonces pour « ${
			document
				.querySelectorAll("h1")[0]
				.innerHTML.split("«")
				.pop()
				.split("»")[0]
		} »`;
	} else if (document.location.pathname.includes("/commerces_marches/")) {
		presenceData.details = `Annonce ${document.title.split("-")[0]}`;
		const nomannonceur = document.querySelector<HTMLSpanElement>(
			"#aside > section > div > div.styles_ProfileLight__esTKc > div.styles_ProfileLightContent__Jg3FU > div.styles_content__XvyPv > div.styles_heading__1Vz_9 > a"
		).textContent;
		presenceData.state = `Vendu par ${nomannonceur}`;
		presenceData.buttons = [
			{ label: "Consulter l'annonce", url: document.location.href }
		];
	} else if (document.location.pathname.includes("/voitures/")) {
		presenceData.details = `Annonce ${document.title.split("-")[0]}`;
		const nomannonceur = document.querySelector<HTMLSpanElement>(
			"#aside > section > div > div.styles_ProfileLight__esTKc > div.styles_ProfileLightContent__Jg3FU > div.styles_content__XvyPv > div.styles_heading__1Vz_9 > a"
		).textContent;
		presenceData.state = `Vendu par ${nomannonceur}`;
		presenceData.buttons = [
			{ label: "Consulter l'annonce", url: document.location.href }
		];
	} else if (document.location.pathname.includes("/")) {
		presenceData.details = `Annonce ${document.title.split("-")[0]}`;
		const prixannonce = document.querySelector(
				"#mainContent > div > div > nav > div._3IX1b > div > div > div.sc-bdVaJa.cJzirk > div.sc-bdVaJa.gleyua > div.sc-bdVaJa.gKAIQK > div > span"
			).textContent,
			nomannonceur = document.querySelector<HTMLSpanElement>(
				"#aside > section > div > div.styles_ProfileLight__esTKc > div.styles_ProfileLightContent__Jg3FU > div.styles_content__XvyPv > div > a._3k87M._3Hrjq._3Wx6b._2MFch._1hnil._35DXM._1-TTU._1GcfX._2DyF8._3k00F"
			).textContent;
		presenceData.state = `Vendu ${prixannonce} par ${nomannonceur}`;
		presenceData.buttons = [
			{ label: "Consulter l'annonce", url: document.location.href }
		];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity(defaultPresenceData);
});
