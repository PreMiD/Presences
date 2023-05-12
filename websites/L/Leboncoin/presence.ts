const presence = new Presence({
		clientId: "966800501326876692",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Eiyj8Lv.png",
		smallImageKey: "reading",
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
