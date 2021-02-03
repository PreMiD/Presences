let presence = new Presence({
  clientId: "563836644579606528" // DFR CLIENT ID
}),

strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

let timestamp = Math.floor(Date.now() / 1000);

let presenceData: PresenceData = {
  largeImageKey: "discordfr",
  smallImageKey: "rooster",
  details: "Chargement de la page...",
  state: "Discord FR",
  startTimestamp: timestamp
};

var title: any;
const ticket = document.location.pathname.split("/");
const search = document.location.pathname.split("/?q=");

function updatePresenceData(){
  
  if (document.location.hostname == "discord.fr") {
    // Accueil
    if (document.location.pathname == "/") {
      presenceData.details = "Wiki, blog et tutoriels";
      presenceData.state = "en français";
      presenceData.largeImageKey = "discordfr";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "Page d'accueil";
    }
    // Page serveur
    else if (document.location.pathname == "/serveur/") {
      presenceData.details = "Slash FR - Serveur communautaire Français";
      presenceData.state = "discord.gg/fr";
      presenceData.largeImageKey = "serveur";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/serveur";
    }
    // Mentions légales
    else if (document.location.pathname == "/mentions-legales/") {
      presenceData.details = "Consulte les";
      presenceData.state = "Mentions légales";
      presenceData.largeImageKey = "terms";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/mentions-legales";
    }
    // Recherche
    else if (document.location.pathname == "/search/") {
      presenceData.details = "Recherche un";
      presenceData.state = "élément sur le site";
      presenceData.largeImageKey = "search";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/search";
    }
    // Blog Nav Gen
    else if (document.location.pathname == "/blog/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Toutes les catégories";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog";
    }
    // Blog Nav Actu
    else if (document.location.pathname == "/blog/categories/actualite/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Toutes les catégories";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/categories/";
    }
    // Blog Nav Categories
    else if (document.location.pathname == "/blog/categories/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Catégorie: Actualité";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/categories/actualite";
    }
    // Blog Nav Bot
    else if (document.location.pathname == "/blog/categories/bot/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Catégorie: Bot";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/categories/bot";
    }
    // Blog Nav Dev
    else if (document.location.pathname == "/blog/categories/developpement/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Catégorie: Développement";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/categories/developpement";
    }
    // Blog Nav Guide
    else if (document.location.pathname == "/blog/categories/guide/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Catégorie: Guide";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/categories/guide";
    }
    // Blog Nav Serveur
    else if (document.location.pathname == "/blog/categories/serveur/") {
      presenceData.details = "Navigue sur le Blog";
      presenceData.state = "Catégorie: Serveur";
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/categories/serveur";
    }
    // Blog Article
    else if (document.location.pathname.includes("/blog/2")) {
      title = document.querySelector("#__docusaurus > div > div > div > main > article > header > h1");
      presenceData.details = "Consulte le Blog";
      presenceData.state = title.innerText.replace("", "");
      presenceData.largeImageKey = "blog";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/blog/";
    }
    // Wiki
    else if (document.location.pathname.includes("/wiki/")) {
      title = document.querySelector("#__docusaurus > div > div > main > div > div > div.col.docItemCol_U38p > div > article > header > h1");
      presenceData.details = "Consulte le wiki";
      presenceData.state = title.innerText.replace("", "");
      presenceData.largeImageKey = "wiki";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/wiki/";
    }
    // Recrutement
    else if (document.location.pathname.includes("/recrutement/")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "de recrutement";
      presenceData.largeImageKey = "recrutement";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/recrutement";
    }
    // Partenariat
    else if (document.location.pathname.includes("/partenariat/")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "de partenariat";
      presenceData.largeImageKey = "partenariat";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/partenariat";
    }
    // Unban
    else if (document.location.pathname.includes("/unban/")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "d'appel";
      presenceData.largeImageKey = "unban";
      presenceData.smallImageKey = "rooster";
      presenceData.smallImageText = "discord.fr/unban";
    }
    else {
      presenceData.details = "Erreur lors du chargement";
      presenceData.state = "discord.fr";
    }

  }

// Image Discord.FR (i.discord.fr)
  else if (document.location.hostname == "i.discord.fr") {
      presenceData.details = "Consulte une image";
      presenceData.state = "i.discord.fr";
      presenceData.largeImageKey = "image";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "i.discord.fr";
    }

// Status
  else if (document.location.hostname == "status.discord.fr") {
      presenceData.details = "Consulte l'état des services";
      presenceData.state = "status.discord.fr";
      presenceData.largeImageKey = "status";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "status.discord.fr";
    }

// Staff
  else if (document.location.hostname == "staff.discord.fr") {
    presenceData.details = "Consulte la";
    presenceData.state = "documentation staff";
    presenceData.largeImageKey = "staff";
    presenceData.smallImageKey = "rooster";
    presenceData.smallImageText = "staff.discord.fr";
    }

// Support Discord FR (support.discord.fr)
  else if (document.location.hostname == "support.discord.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Team Support";
      presenceData.state = "via ModMail";
      presenceData.largeImageKey = "support";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "support.discord.fr";
    }
    // Ticket
    else if (document.location.pathname.includes("/logs/")) {
      presenceData.details = "Consulte une archive";
      presenceData.state = "d'un ticket support";
      presenceData.largeImageKey = "logs";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = ""; 
    }
    else {
      presenceData.details = "Erreur lors du chargement";
      presenceData.state = "support.discord.fr";
    }

  }

}

updatePresenceData();
setInterval(updatePresenceData, 10000);

presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  if (presenceData.details == null) {
      //This will fire if the presence details are not set
      presence.setTrayTitle(); //Clears the tray title for mac users
      presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
      //This will fire when the presence details are set
      presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
