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
    else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Recherche un";
      presenceData.state = "élément sur le site";
      presenceData.largeImageKey = "search";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/search";
    }
    else if (document.location.pathname.includes("/recrutement")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "de recrutement";
      presenceData.largeImageKey = "recrutement";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/recrutement";
    }
    else if (document.location.pathname.includes("/partenariat")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "de partenariat";
      presenceData.largeImageKey = "partenariat";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/partenariat";
    }
    else if (document.location.pathname.includes("/unban")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "d'appel";
      presenceData.largeImageKey = "unban";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/unban";
    }
  }

  if (document.location.hostname == "i.discord.fr") {
    presenceData.details = "Consulte une image";
    presenceData.state = "i.discord.fr";
    presenceData.largeImageKey = "image";
    presenceData.smallImageKey = "dfr";
    presenceData.smallImageText = "i.discord.fr";
  }

  if (document.location.hostname == "support.discord.fr") {
    presenceData.details = "Team Support";
    presenceData.state = "via ModMail";
    presenceData.largeImageKey = "support";
    presenceData.smallImageKey = "dfr";
    presenceData.smallImageText = "support.discord.fr";
  }

  if (document.location.hostname == "support.discord.fr") {
    presenceData.details = "Team Support";
    presenceData.state = "via ModMail";
    presenceData.largeImageKey = "support";
    presenceData.smallImageKey = "dfr";
    presenceData.smallImageText = "support.discord.fr";
    if (document.location.pathname.includes("/logs")) {
      presenceData.details = "Consulte une archive";
      presenceData.state = "d'un ticket support";
      presenceData.largeImageKey = "logs";
      presenceData.smallImageKey = "dfr";
    } 
  }

  if (document.location.hostname == "status.discord.fr") {
    presenceData.details = "Consulte l'état des services";
    presenceData.state = "status.discord.fr";
    presenceData.largeImageKey = "status";
    presenceData.smallImageKey = "dfr";
    presenceData.smallImageText = "status.discord.fr";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});