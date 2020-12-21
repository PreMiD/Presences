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
  } else if (document.location.pathname.includes("/search/")) {
    const search = document.querySelector("#in_title > span.text").textContent;
    data.details = "| Erweiterte Suche";
    data.state = search;
  } else if (document.location.pathname.includes("/read/")) {
    const chapter = document.querySelector(
        "body > div.blur-content > div > div.reader-navigation > div.container > div.pages-control > div.dropdown.chapter-dropdown > button"
      ).textContent,
      browsingStamp = Math.floor(Date.now() / 1000),
      manganame = document
        .querySelector("head > title")
        .textContent.split("- Kapitel ")[0],
      seite = document.querySelector(
        "body > div.blur-content > div > div.reader-navigation > div.container > div.pages-control > div.dropdown.page-dropdown > button > span.page-text"
      ).textContent;
    data.details = manganame;
    data.state = chapter + " | " + seite;
    data.startTimestamp = browsingStamp;
    data.smallImageKey = "manga";
  } else if (
    document.location.pathname == "/series" ||
    document.location.pathname == "/series/"
  ) {
    const filter = document.querySelector(
      "#series_list > div.panel-body > div.col-md-12 > div:nth-child(3) > a"
    ).textContent;
    data.details = "| Serien";
    data.state = filter;
  } else if (document.location.pathname.startsWith("/series/")) {
    const manga = document.querySelector(
        "body > div.blur-content > div.wraper > div > div > div.content-container > div.row > div.col-md-8.series-detailed > h1"
      ).textContent,
      form = document
        .querySelector(
          "body > div.blur-content > div.wraper > div > div > div.content-container > div.row > div.col-md-8.series-detailed > div.row > div.col-md-8.col-sm-8.col-offest-xs-2.col-xs-12 > ul > li:nth-child(5) > a"
        )
        .textContent.split("(japanische Comics)")[0];
    data.details = "| " + form;
    data.state = manga;

    //Community
  } else if (document.location.pathname.startsWith("/team")) {
    data.details = "| Team";
  } else if (document.location.pathname.endsWith("/partner")) {
    data.details = "| Partner";
  } else if (document.location.pathname.startsWith("/gewinnspiel")) {
    const giveaway = document
      .querySelector("head > title")
      .textContent.split(" - Manga-Tube")[0];
    data.details = "| Gewinnspiel";
    data.state = giveaway;
  } else if (document.location.pathname.endsWith("/join")) {
    data.details = "| Bewerbungsformular";
  } else if (document.location.pathname.endsWith("/faq")) {
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
  } else if (document.location.pathname.includes("/inbox/")) {
    data.details = "| Postfach";
  } else if (document.location.pathname.includes("/edit/")) {
    data.details = "| Profil bearbeiten";
  } else if (document.location.pathname.startsWith("/profile/")) {
    const profile = document.querySelector(
        "#profile > div.profile-header.hide-md > div > div.profile-header-content > div.col-md-10.col-xs-8 > h4.profile-username.pull-left > b"
      ).textContent,
      level = document.querySelector("#user_level").textContent;
    data.details = "| Profil";
    data.state = profile + " | " + level;
  } else if (document.location.pathname.startsWith("/blog/")) {
    const blog = document.querySelector(
      "body > div.blur-content > div.wraper > div > div.content-container > div.row > div.col-md-12 > h3"
    ).textContent;
    data.details = "| Blog";
    data.state = blog;

    //Datenschutz & Impressum
  } else if (document.location.pathname.endsWith("/impressum")) {
    data.details = "| Impressum";
  } else if (document.location.pathname.endsWith("/datenschutz")) {
    data.details = "| Datenschutzerklärung";
  }

  //setActivity

  presence.setActivity(data);
});
