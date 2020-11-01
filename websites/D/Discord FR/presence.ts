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

  if (document.location.hostname === "discord.fr") { // Page d'acceuil
    if (document.location.pathname == "/") {
      presenceData.details = "Wiki, blog et tutoriels en français";
      presenceData.state = "discord.fr";

      presenceData.smallImageText = "Page d'acceuil";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/serveur")) { // Page Serveur
      presenceData.details = "Serveur d'entraide français.";
      presenceData.state = "discord.gg/fr";

      presenceData.largeImageKey = "serveur";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/serveur";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/blog")) { // Blog
      presenceData.details = "Consulte le Blog";
      presenceData.state = "";

      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog";

      const blog = document.location.pathname.split("/");
      if (blog[2] !== undefined) presenceData.smallImageText = `discord.fr/blog/${blog.splice(2).join("/")}`;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/wiki")) { // Wiki
      presenceData.details = "Consulte le wiki";
      presenceData.state = "";

      presenceData.largeImageKey = "wiki";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/wiki";

      const wiki = document.location.pathname.split("/");
      if (wiki[2] !== undefined) presenceData.smallImageText = `discord.fr/wiki/${wiki.splice(2).join("/")}`;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/recrutement")) { // Recrutement
      presenceData.details = "Consulte la page de recrutement";

      presenceData.largeImageKey = "recrutement";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/recrutement";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/partenariat")) { // Partenariat
      presenceData.details = "Consulte la page de partenariat";

      presenceData.largeImageKey = "partenariat";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/partenariat";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "i.discord.fr") { // Image i.discord.fr
    presenceData.details = "Consulte une image";
    presenceData.state = "i.discord.fr";

    presenceData.largeImageKey = "image";
    presenceData.smallImageKey = "dfr";
    presenceData.smallImageText = "i.discord.fr";

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "support.discord.fr") { // Support Discord FR
    if (document.location.pathname == "/") {
      presenceData.details = "Team Support";
      presenceData.state = "via ModMail";

      presenceData.largeImageKey = "support";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "support.discord.fr";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/logs")) { // Support Discord FR - Ticket
      presenceData.details = "Consulte une archive de ticket";
      presenceData.state = "";

      presenceData.largeImageKey = "logs";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = ""; 

      const support = document.location.pathname.split("/");
      if (support[2] !== undefined) presenceData.smallImageText = `support.discord.fr/logs/${support.splice(2).join("/")}`;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "giveaways.discord.fr") { // Giveaways Page
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
