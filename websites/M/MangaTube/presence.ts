const presence = new Presence({
  clientId: "770342692462526465"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangatube"
  };

  //Startseite
  if (document.location.pathname === "/") presenceData.details = "| Startseite";
  //Serien
  else if (document.location.pathname.includes("/search"))
    presenceData.details = "| Erweiterte Suche";
  else if (document.location.pathname.includes("/read/")) {
    const [manganame] = document
      .querySelector("head > title")
      .textContent.split("- Kapitel ");
    presenceData.details = manganame;
    data.state = `${document
      .querySelector(
        "body > div.blur-content > div > div.reader-navigation > div.container > div.pages-control > div.dropdown.chapter-dropdown > ul > li.active > a"
      )
      .textContent.replace("Seite", "Kapitel")} | ${
      document.querySelector(".page-text").textContent
    }`;
    data.smallImageKey = "manga";
  } else if (document.location.pathname.startsWith("/series/")) {
    presenceData.details = "| Serie";
    data.state = document.querySelector(".series-title").textContent;
  } else if (document.location.pathname.startsWith("/series"))
    presenceData.details = "| Serien";
  else if (document.location.pathname.includes("/serieslist")) {
    const [serieslist] = document
      .querySelector("head > title")
      .textContent.split("- Manga-Tube");
    presenceData.details = "| Serienliste";
    data.state = serieslist;

    //Community
  } else if (document.location.pathname.includes("/team"))
    presenceData.details = "| Team";
  else if (document.location.pathname.startsWith("/partner"))
    presenceData.details = "| Partner";
  else if (document.location.pathname.startsWith("/gewinnspiel")) {
    const [giveaway] = document
      .querySelector("head > title")
      .textContent.split(" - Manga-Tube");
    presenceData.details = "| Gewinnspiel";
    data.state = giveaway;
  } else if (document.location.pathname.startsWith("/join"))
    presenceData.details = "| Bewerben";
  else if (document.location.pathname.startsWith("/faq"))
    presenceData.details = "| FAQ";
  //Profilbar
  else if (document.location.pathname.startsWith("/poll")) {
    if (document.location.pathname.endsWith("/poll/"))
      presenceData.details = "| Laufende Umfragen";
    else {
      presenceData.details = "| Umfrage";
      data.state = document.querySelector("div.poll-question").textContent;
    }
  } else if (document.location.pathname.includes("/write/")) {
    presenceData.details = "| Postfach";
    data.state = "Nachricht Verfassen";
  } else if (document.location.pathname.includes("/inbox")) {
    if (document.location.pathname.includes("/message/")) {
      presenceData.details = "| Postfach";
      data.state = "Nachricht";
    } else {
      presenceData.details = "| Postfach";
      data.state = "Übersicht";
    }
  } else if (document.location.pathname.includes("/edit")) {
    presenceData.details = "| Profil";
    data.state = "Bearbteiten";
  } else if (document.location.pathname.startsWith("/profile/")) {
    presenceData.details = "| Profil";
    data.state = `${document.querySelector("b").textContent} | ${
      document.querySelector("#user_level").textContent
    }`;
  } else if (document.location.pathname.includes("/blog/")) {
    presenceData.details = "| Blog";
    data.state = document.querySelector("h3").textContent;

    //Datenschutz & Impressum
  } else if (document.location.pathname.startsWith("/impressum"))
    presenceData.details = "| Impressum";
  else if (document.location.pathname.startsWith("/datenschutz"))
    presenceData.details = "| Datenschutz";
  //Login
  else if (document.location.pathname.startsWith("/login"))
    presenceData.details = "| Login";

  //setActivity
  presence.setActivity(data);
});
