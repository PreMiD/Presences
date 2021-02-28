const presence = new Presence({
  clientId: "770342692462526465"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangatube"
  };

  //Startseite
  if (document.location.pathname == "/") {
    data.details = "| Startseite";

    //Serien
  } else if (document.location.pathname.includes("/search")) {
    data.details = "| Erweiterte Suche";
  } else if (document.location.pathname.includes("/read/")) {
    const chapter = document
        .querySelector(
          "body > div.blur-content > div > div.reader-navigation > div.container > div.pages-control > div.dropdown.chapter-dropdown > ul > li.active > a"
        )
        .textContent.replace("Seite", "Kapitel"),
      manganame = document
        .querySelector("head > title")
        .textContent.split("- Kapitel ")[0],
      seite = document.querySelector(".page-text").textContent;
    data.details = manganame;
    data.state = chapter + " | " + seite;
    data.smallImageKey = "manga";
  } else if (document.location.pathname.startsWith("/series/")) {
    const name = document.querySelector(".series-title").textContent;
    data.details = "| Serie";
    data.state = name;
  } else if (document.location.pathname.startsWith("/series")) {
    data.details = "| Serien";
  } else if (document.location.pathname.includes("/serieslist")) {
    const serieslist = document
      .querySelector("head > title")
      .textContent.split("- Manga-Tube")[0];
    data.details = "| Serienliste";
    data.state = serieslist;

    //Community
  } else if (document.location.pathname.includes("/team")) {
    data.details = "| Team";
  } else if (document.location.pathname.startsWith("/partner")) {
    data.details = "| Partner";
  } else if (document.location.pathname.startsWith("/gewinnspiel")) {
    const giveaway = document
      .querySelector("head > title")
      .textContent.split(" - Manga-Tube")[0];
    data.details = "| Gewinnspiel";
    data.state = giveaway;
  } else if (document.location.pathname.startsWith("/join")) {
    data.details = "| Bewerben";
  } else if (document.location.pathname.startsWith("/faq")) {
    data.details = "| FAQ";

    //Profilbar
  } else if (document.location.pathname.startsWith("/poll")) {
    if (document.location.pathname.endsWith("/poll/")) {
      data.details = "| Laufende Umfragen";
    } else {
      const poll = document.querySelector("div.poll-question").textContent;
      data.details = "| Umfrage";
      data.state = poll;
    }
  } else if (document.location.pathname.includes("/write/")) {
    data.details = "| Postfach";
    data.state = "Nachricht Verfassen";
  } else if (document.location.pathname.includes("/inbox")) {
    if (document.location.pathname.includes("/message/")) {
      data.details = "| Postfach";
      data.state = "Nachricht";
    } else {
      data.details = "| Postfach";
      data.state = "Übersicht";
    }
  } else if (document.location.pathname.includes("/edit")) {
    data.details = "| Profil";
    data.state = "Bearbteiten";
  } else if (document.location.pathname.startsWith("/profile/")) {
    const profile = document.querySelector("b").textContent,
      level = document.querySelector("#user_level").textContent;
    data.details = "| Profil";
    data.state = profile + " | " + level;
  } else if (document.location.pathname.includes("/blog/")) {
    const blog = document.querySelector("h3").textContent;
    data.details = "| Blog";
    data.state = blog;

    //Datenschutz & Impressum
  } else if (document.location.pathname.startsWith("/impressum")) {
    data.details = "| Impressum";
  } else if (document.location.pathname.startsWith("/datenschutz")) {
    data.details = "| Datenschutz";

    //Login
  } else if (document.location.pathname.startsWith("/login")) {
    data.details = "| Login";
  }

  //setActivity
  presence.setActivity(data);
});
