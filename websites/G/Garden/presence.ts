const presence = new Presence({
		clientId: "714194261679276094",
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
		largeImageKey: "https://i.imgur.com/PNc2c41.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/")
		presenceData.details = "play.gardenmc.fr";
	else if (document.location.pathname === "/p/rules") {
		presenceData.details = "Lit les règles";
		presenceData.state = "Règles";
	} else if (document.location.pathname.includes("/blog")) {
		presenceData.details = "Lit les news";
		presenceData.state = "Blog";
	} else if (document.location.pathname.includes("/user")) {
		presenceData.details = "Consulte un profil";
		presenceData.state = "Profil";
	} else if (document.location.pathname.includes("/topic/add/"))
		presenceData.details = "Écrit un nouveau topic";
	else {
		switch (document.location.pathname) {
			case "/vote": {
				presenceData.details = "En train de Voter";
				presenceData.state = "Vote";

				break;
			}
			case "/message": {
				presenceData.details = "Consulte ses messages";
				presenceData.state = "MP";

				break;
			}
			case "/support": {
				presenceData.details = "Consulte le support";
				presenceData.state = "Support";

				break;
			}
			case "/support/create": {
				presenceData.details = "Écrit un ticket au support";
				presenceData.state = "Support";

				break;
			}
			case "/message/new": {
				presenceData.details = "Écrit un message privé";
				presenceData.state = "MP";

				break;
			}
			case "/list": {
				presenceData.details = "Consulte la liste des membres";
				presenceData.state = "List";

				break;
			}
			case "/stats": {
				presenceData.details = "Consultes les stats du site";
				presenceData.state = "Statistiques";

				break;
			}
			case "/profile": {
				presenceData.details = "Consulte son profil";
				presenceData.state = "Profil";

				break;
			}
			case "/shop": {
				presenceData.details = "Consulte la boutique";
				presenceData.state = "Shop";

				break;
			}
			case "/faq": {
				presenceData.state = "F.A.Q";
				presenceData.details = "Consulte la F.A.Q";

				break;
			}
			case "/forum": {
				presenceData.details = "Consulte le forum";
				presenceData.state = "Forum";

				break;
			}
			case "/forum/Informations.4/": {
				presenceData.details = "Consulte les infos";
				presenceData.state = "Informations";

				break;
			}
			default:
				if (document.location.pathname.includes("/forum/Candidatures.5/")) {
					presenceData.details = "Parcourt les candidatures";
					presenceData.state = "Candidatures";
				} else if (document.location.pathname.includes("/topic/Candi")) {
					presenceData.details = "Lit une candidature";
					presenceData.state = "Candidatures";
				} else if (document.location.pathname.includes("/topic/candi")) {
					presenceData.details = "Lit une candidature";
					presenceData.state = "Candidatures";
				} else if (document.location.pathname.includes("/topic")) {
					presenceData.details = "Lit un topic";
					presenceData.state = "Topic";
				} else if (document.location.pathname.includes("/forum/Boite")) {
					presenceData.state = "Boite à idées";
					presenceData.details = "Consulte la boite à idée";
				} else if (document.location.pathname.includes("/forum/Bugs.7/")) {
					presenceData.details = "Consulte la section Bug";
					presenceData.state = "Bugs";
				} else if (
					document.location.pathname.includes(
						"/forum/Demande-de-Debannissement-.15/"
					)
				) {
					presenceData.state = "Demande deban";
					presenceData.details = "Consulte la section unban";
				} else if (document.location.pathname.includes("/forum/Aide.10/")) {
					presenceData.state = "Aides";
					presenceData.details = "Consulte la section aide";
				} else if (document.location.pathname.includes("/forum/Cr")) {
					presenceData.state = "Créations";
					presenceData.details = "Consulte les projets";
				} else if (document.location.pathname === "/forum/Taverne.12/") {
					presenceData.state = "Taverne";
					presenceData.details = "Boit un verre";
				}
		}
	}
	presence.setActivity(presenceData);
});
