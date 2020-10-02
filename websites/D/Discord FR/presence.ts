const presence = new Presence({
  clientId: "563836644579606528" // CLIENT DISCORD FR
}),
browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "discordfr",
    smallImageKey: "rooster"
  };
  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname == "discord.fr") { // Page d'acceuil
    if (document.location.pathname == "/") {
      presenceData.details = "Wiki, blog et tutoriels en français";
      presenceData.state = "discord.fr";

      presenceData.smallImageText = "Page d'acceuil";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/serveur/") { // Page Serveur
      presenceData.details = "Serveur d'entraide français.";
      presenceData.state = "discord.gg/fr";

      presenceData.largeImageKey = "serveur";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/serveur";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/blog/") { // Blog
      presenceData.details = "Consulte le Blog";

      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/wiki/") { // Wiki
      presenceData.details = "Consulte le wiki";

      presenceData.largeImageKey = "wiki";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/wiki";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/recrutement/") { // Recrutement
      presenceData.details = "Consulte la page de recrutement";

      presenceData.largeImageKey = "recrutement";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/recrutement";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/partenariat/") { // Partenariat
      presenceData.details = "Consulte la page de partenariat";

      presenceData.largeImageKey = "partenariat";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/partenariat";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "i.discord.fr") { // Image i.discord.fr
    presenceData.details = "Consulte une image";
    presenceData.state = "i.discord.fr";

    presenceData.largeImageKey = "image";
    presenceData.smallImageKey = "dfr";
    presenceData.smallImageText = "i.discord.fr";

    presence.setActivity(presenceData);
  } else if (document.location.hostname == "support.discord.fr") { // Support Discord FR
    if (document.location.pathname == "/") {
      presenceData.details = "Team Support";
      presenceData.state = "via ModMail";

      presenceData.largeImageKey = "support";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "support.discord.fr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/logs/") { // Support Discord FR - Ticket
      const codelogs = document.location.pathname.split("/");
      presenceData.details = "Consulte une archive de ticket";
      presenceData.state = codelogs[2];

      presenceData.largeImageKey = "logs";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "support.discord.fr/logs/" + codelogs[2]; 

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "mc.discord.fr") { // Dynmap Discord FR
    if (document.location.pathname == "/") {
      presenceData.details = "Serveur Minecraft de Discord.FR";
      presenceData.state = "mc.discord.fr (Minecraft 1.16.3)";

      presenceData.largeImageKey = "minecraft";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "mc.discord.fr";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "giveaways.discord.fr") { // Giveaways
    if (document.location.pathname == "/") {
      presenceData.details = "Dashboard d'inscription";
      presenceData.state = "Giveaways sur discord.gg/fr";

      presenceData.largeImageKey = "giveaways";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "giveaways.discord.fr";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
