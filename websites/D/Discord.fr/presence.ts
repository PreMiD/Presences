const presence = new Presence({
  clientId: "563836644579606528"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "discordfr",
    smallImageKey: "rooster",
    details: "Chargement de la page...",
    state: "Discord FR",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname == "discord.fr") {
    presenceData.details = "Wiki, blog et tutoriels";
    presenceData.state = "en français";
    presenceData.largeImageKey = "discordfr";
    presenceData.smallImageKey = "rooster";
    presenceData.smallImageText = "Page d'accueil";
    if (document.location.pathname.includes("/serveur")) {
      presenceData.details = "Slash FR - Serveur communautaire Français";
      presenceData.state = "discord.gg/fr";
      presenceData.largeImageKey = "serveur";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/serveur";
    } else if (document.location.pathname.includes("/mentions-legales")) {
      presenceData.details = "Consulte les";
      presenceData.state = "Mentions légales";
      presenceData.largeImageKey = "terms";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/mentions-legales";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});