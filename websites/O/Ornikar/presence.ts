const presence = new Presence({
  clientId: "884234034450939974"
});
const timeS = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    smallImageKey: 'car',
    smallImageText: 'Ornikar',
    largeImageKey: 'logo',
  };

  const webpath = window.location.pathname.toLowerCase();

  // Connexion
  if (webpath.includes("/connexion")) {
    presenceData.details = "Authentification";
    presenceData.state = "En train de se connecter...";
  }

  // Code de la route
  else if (webpath.includes("/entrainement-au-code") || webpath.includes("/elearning")) {
    presenceData.details = "Code de la route";
  }

  // Conduite
  else if (webpath.includes("/conduite") || webpath.includes("/espace-conduite")) {
    presenceData.details = "Conduite";
  }

  // Boutique
  else if (webpath.includes("/boutique")) {
    presenceData.details = "Boutique";
  }

  // Compte
  else if (webpath.includes("/compte")) {
    presenceData.details = "Compte";
  }

  presenceData.startTimestamp = timeS;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});