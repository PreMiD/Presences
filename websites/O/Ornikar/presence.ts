const presence = new Presence({
  clientId: "884234034450939974"
}),
timeS = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    smallImageKey: 'car',
    smallImageText: 'Ornikar',
    largeImageKey: 'logo'
  },
  webpath = window.location.pathname.toLowerCase();

  if (webpath.includes("/connexion")) { // Authentification
    presenceData.details = "Authentification";
    presenceData.state = "En train de se connecter...";
  } else if (webpath.includes("/entrainement-au-code") || webpath.includes("/elearning")) { // Code de la route
    presenceData.details = "Code de la route";
  } else if (webpath.includes("/conduite") || webpath.includes("/espace-conduite")) { // Conduite
    presenceData.details = "Conduite";
  } else if (webpath.includes("/boutique")) { // Boutique
    presenceData.details = "Boutique";
  } else if (webpath.includes("/compte")) { // Compte
    presenceData.details = "Compte";
  }

  presenceData.startTimestamp = timeS;

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});