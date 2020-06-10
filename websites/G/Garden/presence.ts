const presence = new Presence({
  clientId: "714194261679276094"
});

let title: any;

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "gardenpresence"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "gardenmc.fr") {
    if (document.location.pathname == "/") {
      presenceData.details = "Regarde la page d'accueille";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/p/rules") {
      presenceData.details = "Lit les règles";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/stats") {
      presenceData.details = "Consulte les stats du site";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/profile")) {
      presenceData.details = "Consulte son profil";
//Forum
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/forum") {
      presenceData.details = "Consulte le forum";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Informations.4/")) {
      presenceData.details = "Consulte les informations";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Candidatures.5/")) {
      presenceData.details = "Consulte les candidatures";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Boite")) {
      presenceData.details = "Consulte la boite à idée";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Bugs.7/")) {
      presenceData.details = "Consulte la section Bugs";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Demande-de-Debannissement-.15/")) {
      presenceData.details = "Consulte la section deban";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Aide.10/")) {
      presenceData.details = "Consulte la section Aide";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Cr")) {
      presenceData.details = "Consulte les projets";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes ("/forum/Taverne.12/")) {
      presenceData.details = "Consulte la taverne";

//Forum      
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/shop") {
      presenceData.details = "Consulte la boutique";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/faq") {
      presenceData.details = "Consulte la F.A.Q";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/vote") {
      presenceData.details = "En train de voter";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/support") {
      presenceData.details = "Consulte le support";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/support/create") {
      presenceData.details = "Écrit au support";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/user/") {
      presenceData.details = "Consulte un profil";

      presence.setActivity(presenceData);
    } else if (
      document.querySelector("body > div.background-forum > div > div > div > div.col-md-4 > div > div:nth-child(1) > h2") != null
    ) {
      title = document.querySelector("body > div.background-forum > div > div > div > div.col-md-4 > div > div:nth-child(1) > h2");
      presenceData.details = "Consulte le profil de:";
      if (title.innerText.length > 128) {
        presenceData.state = title.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = title.innerText;
      }
      presence.setActivity(presenceData);
    } else if (
      document.querySelector("body > div.background-forum > div > div.forum-forum > div > p") != null
    ) {
      title = document.querySelector("body > div.background-forum > div > div.forum-forum > div > p");
      presenceData.details = "Consulte le topic:";
      if (title.innerText.length > 128) {
        presenceData.state = title.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = title.innerText;
      }
      presence.setActivity(presenceData);
    } else if (
      document.querySelector("body > div.news-page > div > div > div > h1") != null
    ) {
      title = document.querySelector("body > div.news-page > div > div > div > h1");
      presenceData.details = "Lit la news:";
      if (title.innerText.length > 128) {
        presenceData.state = title.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = title.innerText;
      }
      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
