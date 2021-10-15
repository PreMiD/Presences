const presence = new Presence({
    clientId: "714194261679276094"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    const presenceData: PresenceData = {
      details: "play.gardenmc.fr",
      state: "https://gardenmc.fr",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/p/rules") {
    const presenceData: PresenceData = {
      state: "Règles",
      details: "Lit les règles",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/blog")) {
    const presenceData: PresenceData = {
      state: "Blog",
      details: "Lit les news",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/user")) {
    const presenceData: PresenceData = {
      details: "Consulte un profil",
      state: "Profil",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/topic/add/")) {
    const presenceData: PresenceData = {
      details: "Écrit un nouveau topic",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/vote") {
    const presenceData: PresenceData = {
      details: "En train de Voter",
      state: "Vote",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/message") {
    const presenceData: PresenceData = {
      details: "Consulte ses messages",
      state: "MP",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/support") {
    const presenceData: PresenceData = {
      details: "Consulte le support",
      state: "Support",
      largeImageKey: "gardenpresence"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/support/create") {
    const presenceData: PresenceData = {
      details: "Écrit un ticket au support",
      state: "Support",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/message/new") {
    const presenceData: PresenceData = {
      details: "Écrit un message privé",
      state: "MP",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/list") {
    const presenceData: PresenceData = {
      details: "Consulte la liste des membres",
      state: "List",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/stats") {
    const presenceData: PresenceData = {
      details: "Consultes les stats du site",
      state: "Statistiques",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/profile") {
    const presenceData: PresenceData = {
      details: "Consulte son profil",
      state: "Profil",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/shop") {
    const presenceData: PresenceData = {
      details: "Consulte la boutique",
      state: "Shop",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/faq") {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "F.A.Q",
      details: "Consulte la F.A.Q"
    };
    //Forum
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/forum") {
    const presenceData: PresenceData = {
      details: "Consulte le forum",
      state: "Forum",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/forum/Informations.4/") {
    const presenceData: PresenceData = {
      details: "Consulte les infos",
      state: "Informations",
      largeImageKey: "gardenpresence"
    };
    //Candidatures
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/forum/Candidatures.5/")) {
    const presenceData: PresenceData = {
      details: "Parcourt les candidatures",
      state: "Candidatures",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/topic/Candi")) {
    const presenceData: PresenceData = {
      details: "Lit une candidature",
      state: "Candidatures",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/topic/candi")) {
    const presenceData: PresenceData = {
      details: "Lit une candidature",
      state: "Candidatures",
      largeImageKey: "gardenpresence"
    };
    // Fin Candidatures
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/topic")) {
    const presenceData: PresenceData = {
      details: "Lit un topic",
      state: "Topic",
      largeImageKey: "gardenpresence"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/forum/Boite")) {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "Boite à idées",
      details: "Consulte la boite à idée"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/forum/Bugs.7/")) {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "Bugs",
      details: "Consulte la section Bug"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/forum/Demande-de-Debannissement-.15/")
  ) {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "Demande deban",
      details: "Consulte la section unban"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/forum/Aide.10/")) {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "Aides",
      details: "Consulte la section aide"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/forum/Cr")) {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "Créations",
      details: "Consulte les projets"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/forum/Taverne.12/") {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence",
      state: "Taverne",
      details: "Boit un verre"
    };
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else {
    const presenceData: PresenceData = {
      largeImageKey: "gardenpresence"
    };
    presence.setActivity(presenceData);
  }
});
