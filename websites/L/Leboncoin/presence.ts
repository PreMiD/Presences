const presence = new Presence({
		clientId: "966800501326876692",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/L/Leboncoin/assets/logo.png",
		smallImageKey: Assets.Reading,
		smallImageText: "Regarde des annonces",
		startTimestamp: browsingTimestamp,
		details: "Regarde la page :",
	};

	if (document.location.pathname.includes("/deposer-une-annonce"))
		presenceData.state = "Déposer une annonce";
	else if (document.location.pathname.includes("/mes-recherches"))
		presenceData.state = "Mes recherches sauvegardées";
	else if (document.location.pathname.includes("/mes-annonces"))
		presenceData.state = "Mes annonces sauvegardées";
	else if (document.location.pathname.includes("/emploi"))
		presenceData.state = "Offres d'emploi";
	else if (document.location.pathname.includes("/paiement-securise-livraison"))
		presenceData.state = "Paiement sécurisé";
	else if (document.location.pathname.includes("/messages"))
		presenceData.state = "Messages privés";
	else if (document.location.pathname.includes("/dc"))
		presenceData.state = "Informations légales";
	else if (document.location.pathname.includes("/annonces/offres"))
		presenceData.state = "Annonces pour toute la France";
	else if (document.location.pathname.includes("/compte"))
		presenceData.state = "Paramètres du compte";
	else if (document.location.pathname.includes("/profil/")) {
		const profileName = document.querySelector(
			"#mainContent > div.styles_Profile__3vhTo > div.styles_ProfileHero__aQISv > div > div.styles_userInfo__XBcBm > div > h3"
		).textContent;
		presenceData.state = `Profil de ${profileName}`;
		presenceData.buttons = [
			{ label: "Consulter le profil", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/recherche")) {
		presenceData.details = "Dans les résultats de recherche :";

		presenceData.state = `Annonces pour « ${
			document.querySelector("h1").textContent.split("«").pop().split("»")[0]
		} »`;
	} else if (document.location.pathname.includes("/commerces_marches/")) {
		presenceData.details = `Annonce ${document.title.split("-")[0]}`;
		const advertiserName = document.querySelector<HTMLSpanElement>(
			"#aside > section > div > div.styles_ProfileLight__esTKc > div.styles_ProfileLightContent__Jg3FU > div.styles_content__XvyPv > div.styles_heading__1Vz_9 > a"
		).textContent;
		presenceData.state = `Vendu par ${advertiserName}`;
		presenceData.buttons = [
			{ label: "Consulter l'annonce", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/voitures/")) {
		presenceData.details = `Annonce ${document.title.split("-")[0]}`;
		const advertiserName = document.querySelector<HTMLSpanElement>(
			"#aside > section > div > div.styles_ProfileLight__esTKc > div.styles_ProfileLightContent__Jg3FU > div.styles_content__XvyPv > div.styles_heading__1Vz_9 > a"
		).textContent;
		presenceData.state = `Vendu par ${advertiserName}`;
		presenceData.buttons = [
			{ label: "Consulter l'annonce", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/")) {
		presenceData.details = `Annonce ${document.title.split("-")[0]}`;
		const adsPrice = document.querySelector(
				"#mainContent > div > div > nav > div._3IX1b > div > div > div.sc-bdVaJa.cJzirk > div.sc-bdVaJa.gleyua > div.sc-bdVaJa.gKAIQK > div > span"
			).textContent,
			advertiserName = document.querySelector<HTMLSpanElement>(
				"#aside > section > div > div.styles_ProfileLight__esTKc > div.styles_ProfileLightContent__Jg3FU > div.styles_content__XvyPv > div > a._3k87M._3Hrjq._3Wx6b._2MFch._1hnil._35DXM._1-TTU._1GcfX._2DyF8._3k00F"
			).textContent;
		presenceData.state = `Vendu ${adsPrice} par ${advertiserName}`;
		presenceData.buttons = [
			{ label: "Consulter l'annonce", url: document.location.href },
		];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
