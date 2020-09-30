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

  if (document.location.hostname == "") {
    if (document.location.pathname == "/") {
      presenceData.details = "Wiki, blog et tutoriels en français";
      presenceData.state = "discord.fr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/serveur/") {
      presenceData.details = "Serveur d'entraide français.";
      presenceData.state = "discord.gg/fr";

      presenceData.largeImageKey = "serveur";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/blog/") {
      presenceData.details = "Consulte le Blog";

      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/wiki/") {
      presenceData.details = "Consulte le wiki";

      presenceData.largeImageKey = "wiki";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/recrutement/") {
      presenceData.details = "Consulte la page de recrutement";

      presenceData.largeImageKey = "recrutement";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/partenariat/") {
      presenceData.details = "Consulte la page de partenariat";

      presenceData.largeImageKey = "partenariat";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "i.discord.fr") {
    presenceData.details = "Consulte une image";
    presenceData.state = "i.discord.fr";

    presenceData.largeImageKey = "image";
    presenceData.smallImageKey = "dfr";

    presence.setActivity(presenceData);
  } else if (document.location.hostname == "support.discord.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Team Support";
      presenceData.state = "via ModMail";

      presenceData.largeImageKey = "support";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/logs/") {
      const codelogs = document.location.pathname.split("/");
      presenceData.details = "Consulte une archive de ticket";
      presenceData.state = codelogs[2];

      presenceData.largeImageKey = "logs";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "mc.discord.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Serveur Minecraft de Discord.FR";
      presenceData.state = "mc.discord.fr (Minecraft 1.16.3)";

      presenceData.largeImageKey = "minecraft";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "giveaways.discord.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Dashboard d'inscription";
      presenceData.state = "Giveaways sur discord.gg/fr";

      presenceData.largeImageKey = "giveaways";
      presenceData.smallImageKey = "dfr";

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
