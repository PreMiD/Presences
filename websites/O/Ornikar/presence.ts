const presence = new Presence({
    clientId: "884234034450939974"
  }),
  timeS = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    smallImageKey: "car",
    smallImageText: "Ornikar",
    largeImageKey: "logo"
  },
    webpath = window.location.pathname.toLowerCase();

  if (webpath.includes("/connexion")) { // Authentification
    presenceData.details = "Authentification";
    presenceData.state = "En train de se connecter...";
  } else if (webpath.includes("/entrainement-au-code") || webpath.includes("/elearning")) { // Code de la route
    presenceData.details = "Code de la route";

    if(webpath.includes("/elearning/session/") && !webpath.includes("/result")) { // L'utilisateur fait une série
      presenceData.state = "En train d'effectuer une série";
    } else if(webpath.includes("/elearning/session/") && webpath.includes("/result")) { // L'utilisateur regarde ses résultats
      presenceData.state = "Regarde ses résultats";
    }  else if(webpath.includes("/elearning/activie")) { // L'utilisateur étudie une leçon
      presenceData.state = "Etudie une leçon";
    }
  } else if (webpath.includes("/conduite") || webpath.includes("/espace-conduite")) { // Conduite
    presenceData.details = "Conduite";

    if(webpath.includes("/conduite/reservation")) { // Réserve une créneau
      presenceData.state = "Réserve un créneau";
    }
  } else if (webpath.includes("/boutique") || webpath.includes("/panier")) { // Boutique
    presenceData.details = "Boutique";

    if(webpath === "/boutique") {
      presenceData.state = "Accueil de la boutique";
    } else if(webpath.includes("/panier")) {
      presenceData.state = "Dans le panier";
    }
  } else if (webpath.includes("/compte")) { // Compte
    presenceData.details = "Compte";

    if(webpath.includes("/compte/contact")) {
      presenceData.state = "Informations";
    } else if(webpath.includes("/compte/candidat")) {
      presenceData.state = "Dossier candidat";
    } else if(webpath.includes("/compte/password")) {
      presenceData.state = "Mot de passe";
    } else if (webpath.includes("/compte/notifications")) {
      presenceData.state = "Notifications";
    } else if(webpath.includes("/compte/contrat")) {
      presenceData.state = "Contrat"
    }
  }

  presenceData.startTimestamp = timeS;

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});