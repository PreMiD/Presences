const presence = new Presence({
    clientId: "830517484472762408"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages: { [k: string]: string } = {
    "/animes": "Betrachtet alle Animes",
    "/beliebte-animes": "Betrachtet beliebte Animes",
    "/support/anleitung": "So funktioniert's -",
    "/animekalender": "Animekalender - ",
    "/random": "Der Anime-Zufallsgenerator",
    "/zufall": "Der Anime-Zufallsgenerator",
    "/neu": "Betrachtet neue Animes",
    "/support/regeln": "Betrachtet die Nutzungsbedingungen",
    "/dmca": "Digital Millennium Copyright Act of 1998",
    "/animewuensche": "Betrachtet Animewünsche",
    "/login": "Login bei Anicloud",
    "/registation": "Registrierung bei Anicloud",
    "/account": "Betrachtet sein Account",
    "/user/profil/": "Betrachtet ein Profil",
    "/account/nachrichten": "Betrachtet seine Nachrichten",
    "/account/notifications": "Betrachtet seine Benachrichtigungen",
    "/account/support": "im Support Bereich",
    "/account/watchlist": "Betrachtet seine Watchlist",
    "/account/subscribed": "Betrachtet seine Abonnierte Animes",
    "/account/settings": "Account Einstellungen",
    "/support/fragen": "Betrachtet Fragen & Antworten",
    "/support": "Hilfe & Support bei Anicloud",
    "/edit:information": "Neue Serieninformationen vorschlagen"
  };
let video,
  timeEnd: number,
  currentTime: number,
  paused: boolean,
  played: boolean;

presence.on(
  "iFrameData",
  async (data: {
    currentTime: number;
    timeEnd: number;
    paused: boolean;
    played: boolean;
  }) => {
    ({ currentTime, timeEnd, played, paused } = data);
  }
);

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    animeName = document.querySelector("h1") as HTMLElement,
    episode = document.querySelector("title") as HTMLElement,
    germanepisodename = document.querySelector("h2") as HTMLElement,
    genre = document.querySelector(
      "#wrapper > div.container.marginBottom > div.seriesListNavigation > strong"
    ) as HTMLElement,
    animekalender = document.querySelector(
      "#wrapper > div.container > div.seriesWishListHeader > div.row > div.col-md-4 > small"
    ) as HTMLElement,
    beliebteanime = document.querySelector("title") as HTMLElement,
    search = document.querySelector(
      "#wrapper > div.container > div.pageTitle.searchResultsPageTitle > h2 > strong"
    ) as HTMLElement,
    rank = document.querySelector(
      "#userDetails > div > div > div:nth-child(3) > div"
    ) as HTMLElement,
    user = document.querySelector("h1") as HTMLElement,
    forum = document.querySelector("h1") as HTMLElement,
    forumname = document.querySelector("h5") as HTMLElement,
    katalog = document.querySelector(
      "#wrapper > div.container.marginBottom > div.pageTitle > h1 > strong"
    ) as HTMLElement,
    genre2 = document.querySelector(
      "#wrapper > div.container.marginBottom > div.seriesListSection > div.pageTitle.pageCenter.homeTitle > h1"
    ) as HTMLElement,
    data: PresenceData = {
      largeImageKey: "anicloud",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    timestamps = presence.getTimestamps(currentTime, timeEnd);
  if (page === "/") data.details = "Betrachtet die Startseite";
  else if (page.startsWith("/anime/")) {
    data.details = `${animeName.textContent}`;
    data.state = `${episode.textContent
      .split("Staffel")[0]
      .replace("Filme von", " ")
      .split(" | AniCloud.io - Animes gratis online ansehen")} - ${
      germanepisodename.textContent
    }`;
    [data.startTimestamp, data.endTimestamp] = timestamps;
    data.buttons = [
      {
        label: "Watch Anime",
        url: document.location.href
      }
    ];

    video = document.querySelector("video");
    if (video) {
      played = video.currentTime !== 0;
      timeEnd = video.duration;
      ({ currentTime } = video);
      ({ paused } = video);
    }
    if (played) {
      if (!paused) {
        const timestamps = presence.getTimestamps(currentTime, timeEnd);
        [, data.endTimestamp] = timestamps;
      }
      data.smallImageKey = paused ? "pause" : "play";
      data.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
    }

    //Obere Reiter
  } else if (page === "/animes") {
    data.details = pages[page];
    data.state = `Sortiert nach: ${genre.textContent}`;
  } else if (page === "/beliebte-animes")
    data.state = `${beliebteanime.textContent.split("|")[0]}`;
  else if (page === "/support/anleitung") {
    data.details = pages[page];
    data.state = "Die Anleitung";
  } else if (page.includes("/search")) {
    data.details = "Sucht nach:";
    data.state = `${search.textContent}`;
  } else if (page === "/animekalender") {
    data.details = pages[page];
    data.state = `${animekalender.textContent}`;
  } else if (page === "/zufall") data.details = pages[page];
  else if (page === "/random") data.details = pages[page];
  // UNTERE REITER
  else if (page === "/neu") data.details = pages[page];
  else if (page === "/support/regeln") data.details = pages[page];
  else if (page === "/dmca") data.details = pages[page];
  else if (page === "/animewuensche") data.details = pages[page];
  //Sign In & Sign Up
  else if (page === "/login") data.details = pages[page];
  else if (page === "/registrierung") data.details = pages[page];
  //User Leiste
  else if (page === "/account") data.details = pages[page];
  else if (page.startsWith("/user/profil/")) {
    data.details = "Betrachtet ein Profil";
    data.state = `${user.textContent}`;
    data.smallImageKey = "user";
    data.smallImageText = `${rank.textContent}`;
  } else if (page === "/account/nachrichten") data.details = pages[page];
  else if (page === "/account/notifications") data.details = pages[page];
  else if (page === "/account/support") data.details = pages[page];
  else if (page === "/account/watchlist") data.details = pages[page];
  else if (page === "/account/subscribed") data.details = pages[page];
  else if (page === "/account/settings") data.details = pages[page];
  //MORE PROFILE SETTINGS --
  //BUGGY 1.0.5 ??
  else if (page.startsWith("/support/fragen")) data.details = pages[page];
  else if (page === "/support") data.details = pages[page];
  else if (page === "/edit:information") data.details = pages[page];
  else if (page.startsWith("/katalog/"))
    data.details = `Betrachtet Animes mit ${katalog.textContent}`;
  else if (page.startsWith("/support/frage/")) {
    data.details = `Frage von ${forumname.textContent}`;
    data.state = `${forum.textContent}`;
  } else if (page.startsWith("/genre/"))
    data.details = `Sucht nach ${genre2.textContent}`;
  else data.details = "Befindet sich auf einer Unbekannte Seite";

  if (data.details && data.state) presence.setActivity(data);
});
