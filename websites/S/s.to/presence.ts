const presence = new Presence({
  clientId: "463000750193246209"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "sto"
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Stöbert durch";
    presenceData.state = "die Startseite";

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/serie/stream/")) {
    const nameofserie = document.querySelector(
      "#series > section > div.container.row > div.series-meta.col-md-6-5.col-sm-6.col-xs-12 > div.series-title > h1 > span"
    );
    // Try if Name of Title are visible
    try {
      presenceData.details = `Schaut ${nameofserie.textContent}`;
      const titleofserie = document.querySelector(
        "#wrapper > div.seriesContentBox > div.container.marginBottom > div:nth-child(4) > div.hosterSiteTitle > h2 > span"
      ).textContent;
      presenceData.state = titleofserie;
    } catch {
      presenceData.details = "Schaut";
      presenceData.state = nameofserie.textContent;
    }
    delete presenceData.smallImageText;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/app") {
    presenceData.details = "Schaut nach";
    presenceData.state = "Streaming ToGo";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/beliebte-serien") {
    presenceData.details = "Schaut nach";
    presenceData.state = "Beliebten Serien";
    presenceData.smallImageKey = "search";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/team")) {
    presenceData.details = "Zählt die Teammitglieder";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/statistics") {
    presenceData.details = "Informiert sich über S.To";
    const info1 = document.querySelector(
      "#wrapper > div.container > div.row > div:nth-child(1) > div.facts.row > div:nth-child(4) > h3"
    );
    presenceData.state = info1.textContent;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/user/") &&
    document.location.pathname.endsWith("/subscribed")
  ) {
    const test1 = document.querySelector(
      "#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2"
    );
    presenceData.details = "Durchstöbert";
    presenceData.state = test1.textContent;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/user/") &&
    document.location.pathname.endsWith("/watched")
  ) {
    const name7 = document.querySelector(
      "#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2"
    );
    presenceData.details = "Durchstöbert";
    presenceData.state = name7.textContent;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/user/") &&
    document.location.pathname.endsWith("/watchlist")
  ) {
    const name8 = document.querySelector(
      "#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2"
    );
    presenceData.details = "Durchstöbert";
    presenceData.state = name8.textContent;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/info") {
    const name1 = document.querySelector(
      "#wrapper > div.container > div > div > div.col-lg-12 > div > h2"
    );
    presenceData.details = "Sieht...";
    presenceData.state = name1.textContent;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/profil")) {
    presenceData.details = "Beobachtet ein Profil";
    const name2 = document.querySelector(
      "#userDetails > div > div > div.col-lg-6.col-md-6.col-xs-12.col-sm-6 > a > h1"
    );
    presenceData.state = name2.textContent;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/katalog/")) {
    presenceData.details = "Sucht eine Serie im Katalog";
    const katalog1 = document.querySelector(
      "#wrapper > div.container.marginBottom > div.pageTitle > h1 > strong"
    );
    presenceData.state = `Serien mit ${katalog1.textContent}`;
    presenceData.smallImageKey = "search";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/account/subscribed")) {
    presenceData.details = "Informiert sich über";
    presenceData.state = "Abonnierte Serien";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/account/watchlist")) {
    presenceData.details = "Informiert sich über";
    presenceData.state = "Watchlist";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/account/watched")) {
    presenceData.details = "Liest den Log über";
    presenceData.state = "Zuletzt geschaute Episoden";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/news")) {
    presenceData.details = "Informiert sich über";
    presenceData.state = "Neuigkeiten von S.To";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/neu") {
    presenceData.details = "Sucht neue Serien";
    presenceData.state = "OwO";
    presenceData.smallImageKey = "search";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/nachrichten")) {
    const user1 = document.querySelector(
      "#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name"
    );
    presenceData.details = "Schreibt Nachrichten...";
    presenceData.state = `als ${user1.textContent}`;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/support") {
    presenceData.details = "Befindet sich im Support";
    const supportzahl = document.querySelector(
      "#wrapper > div.container.noPadding > div:nth-child(6) > h3"
    ).textContent;
    presenceData.state = supportzahl;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/support/frage/")) {
    const frage1 = document.querySelector(
      "#wrapper > div.container > div.row > div.col-lg-8 > section:nth-child(1) > article > h1"
    ).textContent;
    presenceData.details = "Liest Fragen...";
    presenceData.state = frage1;
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/support/fragen") {
    presenceData.details = "Liest Fragen...";
    presenceData.smallImageKey = "reading";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/account/settings")) {
    const user2 = document.querySelector(
      "#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name"
    );
    presenceData.details = "Ändert die Einstellungen";
    presenceData.state = `Account: ${user2.textContent}`;
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/account/support")) {
    const supporttickets = document.querySelector(
      "#wrapper > div.container > div.pageTitle > h1"
    ).textContent;
    presenceData.details = "Liest Supporttickets";
    presenceData.state = supporttickets;
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/account/friendships") {
    presenceData.details = "Beobachtet";
    presenceData.state = "die Freundesliste";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/support/anleitung") {
    presenceData.details = "Liest das Tutorial";
    presenceData.state = "So viel Text owo";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.endsWith("/account/statistics")) {
    presenceData.details = "Betrachtet Statisken...";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/registrierung") {
    const username1: HTMLInputElement = document.querySelector("#formUsername");
    presenceData.details = "Registriert sich gerade...";
    presenceData.state = `Vielleicht als ${username1.value}`;
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/account") {
    const user3 = document.querySelector(
      "#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name"
    );
    presenceData.details = "Angemeldet als";
    presenceData.state = user3.textContent;
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/serienwuensche") {
    const name4 = document.querySelector(
      "#wrapper > div.container > div.row.leaderboardBox > div.col-md-3 > div > strong"
    );
    presenceData.details = "Votet für neue Serien";
    presenceData.state = `${name4.textContent} Serienwünsche`;
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/serien")) {
    const name5: HTMLInputElement = document.querySelector("#serInput");
    presenceData.details = "Sucht eine neue Serie";
    presenceData.state = name5.value;
    presenceData.smallImageKey = "search";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/genre/")) {
    const name6 = document.querySelector(
      "#wrapper > div.container.marginBottom > div.seriesListSection > div.pageTitle.pageCenter.homeTitle > h1"
    );
    presenceData.details = "Sucht in Genre";
    presenceData.state = name6.textContent;
    presenceData.smallImageKey = "search";
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/random")) {
    presenceData.details = "Sucht eine random Serie";
    presenceData.smallImageKey = "search";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search")) {
    const views: HTMLInputElement = document.querySelector("#search");
    presenceData.smallImageKey = "search";
    presenceData.details = "Sucht...";
    presenceData.state = views.value;
    delete presenceData.smallImageText;

    presence.setActivity(presenceData);
  } else presence.setActivity();
});
