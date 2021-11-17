const presence = new Presence({
    clientId: "867411016836186112"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  path = document.location.pathname,
  browsingStamp = Math.floor(Date.now() / 1000);

let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    const playback: boolean = data?.duration ? true : false;
    if (playback) video = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (path.includes("/liste-danimes")) {
    presenceData.details = "Visite la page :";
    presenceData.state = "Listes d'animes";
  } else if (path.includes("/nouveaux-ajouts")) {
    presenceData.details = "Visite la page :";
    presenceData.state = "Nouveaux animes";
  } else if (path.includes("/prochainement")) {
    presenceData.details = "Visite la page :";
    presenceData.state = "Prochains animes";
  } else if (document.location.search.startsWith("?s")) {
    const urlParams = new URLSearchParams(document.location.search),
      searchResult = urlParams.get("s");

    presenceData.details = "Recherche un anime :";
    presenceData.state = searchResult;
    presenceData.smallImageKey = "search";
  } else if (path.includes("/anime/")) {
    const animeTitle = document.querySelector(
        "body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1"
      )?.textContent,
      title = document.querySelector(
        "#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(2) > a"
      )?.textContent;

    presenceData.details = "Visite la page de l'anime :";
    presenceData.state = animeTitle;
    if (!isNaN(video.duration) && title) {
      const splitString = document.querySelector(
          "#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active"
        ).textContent,
        [startTimestamp, endTimestamp] = presence.getTimestamps(
          video.currentTime,
          video.duration
        ),
        [, epAndSeason] = splitString.split("-"),
        animeLink = document
          .querySelector(
            "#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(2) > a"
          )
          .getAttribute("href");

      presenceData.details = title;
      presenceData.state = epAndSeason;
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.buttons = [
        {
          label: "Regarder l'épisode",
          url: document.location.href
        },
        {
          label: "Voir l'anime",
          url: animeLink
        }
      ];
      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (path.includes("/anime-genre")) {
    const genre = document.querySelector(
      "body > div.wrap > div.body-wrap > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.entry-header > div > div > h1"
    )?.textContent;

    presenceData.details = "Visite la page :";
    presenceData.state = `Listes d'animes du genre "${genre}"`;
  } else presenceData.details = "Page d'accueil";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
