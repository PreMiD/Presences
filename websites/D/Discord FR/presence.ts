var presence = new Presence({
  clientId: "563836644579606528" // CLIENT DISCORD FR
});

var title: any;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "discord.fr") {
    if (document.location.pathname == "") {
      presenceData.details = "Wiki, blog et tutoriels en français";
      presenceData.state = "discord.fr";

      presenceData.largeImageKey = "discordfr";
      presenceData.smallImageKey = "rooster";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/serveur/") {
      presenceData.details = "Serveur d'entraide français.";
      presenceData.state = "discord.gg/fr";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "serveur";

      presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/blog/") {
      presenceData.details = "Consulte le Blog";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "blog";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/wiki/") {
      presenceData.details = "Consulte le wiki";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "wiki";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/recrutement/") {
      presenceData.details = "Consulte la page de recrutement";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "recrutement";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/partenariat/") {
      presenceData.details = "Consulte la page de partenariat";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "partenariat";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
  if (document.location.hostname == "i.discord.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Consulte une image";
      presenceData.state = "i.discord.fr";

      presenceData.largeImageKey = "image";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
  if (document.location.hostname == "support.discord.fr") {
    if (document.location.pathname == "") {
      presenceData.details = "Team Support";
      presenceData.state = "via ModMail";

      presenceData.largeImageKey = "support";
      presenceData.smallImageKey = "dfr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/logs/") {
      const codelogs = document.location.pathname.split("/");
      presenceData.details = "Consulte une archive de ticket";
      presenceData.state = codelogs[2];

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "logs";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
  if (document.location.hostname == "mc.discord.fr") {
    if (document.location.pathname == "") {
      presenceData.details = "Serveur Minecraft de Discord.FR";
      presenceData.state = "mc.discord.fr (Minecraft 1.16.3)";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "minecraft";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
  if (document.location.hostname == "giveaways.discord.fr") {
    if (document.location.pathname == "") {
      presenceData.details = "Dashboard d'inscription";
      presenceData.state = "Giveaways sur discord.gg/fr";

      presenceData.smallImageKey = "dfr";
      presenceData.largeImageKey = "giveaways";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }

});