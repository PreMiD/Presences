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
      presenceData.details = "Serveur d'entraide Français";
      presenceData.state = "discord.gg/fr";
      presenceData.largeImageKey = "serveur";
      presenceData.smallImageKey = "dfr";
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
      presenceData.details = "Recherche:";
      presenceData.state = "";
      presenceData.largeImageKey = "search";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/search";
    }
    // Blog 
    else if (document.location.pathname.includes("/blog/")) {
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
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/recrutement";
    }
    // Partenariat
    else if (document.location.pathname.includes("/partenariat/")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "de partenariat";
      presenceData.largeImageKey = "partenariat";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/partenariat";
    }
    // Unban
    else if (document.location.pathname.includes("/unban/")) {
      presenceData.details = "Consulte le formulaire";
      presenceData.state = "d'appel";
      presenceData.largeImageKey = "unban";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "discord.fr/unban";
    }
    else {
      presenceData.details = "Erreur lors du chargement";
      presenceData.state = "discord.fr";
    }

  }

// Image Discord.FR (i.discord.fr)
  else if (document.location.hostname == "i.discord.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Consulte une image";
      presenceData.state = "i.discord.fr";
      presenceData.largeImageKey = "image";
      presenceData.smallImageKey = "dfr";
      presenceData.smallImageText = "i.discord.fr";
    }
    else {
      presenceData.details = "Erreur lors du chargement";
      presenceData.state = "i.discord.fr";
    }

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
    presenceData.details = "Consulte l'archive d'un ticket";
    presenceData.state = "";
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
