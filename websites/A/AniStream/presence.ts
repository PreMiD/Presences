const presence = new Presence({
    clientId: "928295860532572210"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playack.paused"
  }),
  pages: { [k: string]: string } = {
    "/trends": "Betrachtet die Trends",
    "/kalender": "Betrachtet Aktuelle Simulcasts",
    "/changelogs": "Neuste Änderungen",
    "/discovery": "Betrachtet alle Anime",
    "/login": "Loggt sich ein....",
    "/register": "Registriert sich....",
    "/profile": "Betrachtet das Profil von",
    "/notifications": "Betrachtet seine Benachrichtigungen",
    "/settings": "Bearbeitet sein Account",
    "/hentais": "Befindet sich im Hentai Sektion",
    "/premiumcollection": "Befindet sich im Premium Sektion",
    "/movies": "Betrachtet alle Filme",
    "/series": "Betrachtet alle Serien",
    "/request": "Request Anime",
    "/actor": "Betrachtet alle Schauspieler"
  };
let endTimestamp,
  video,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback;

presence.on(
  "iFrameData",
  (data: {
    iframeVideo: {
      duration: number;
      iFrameVideo: boolean;
      currentTime: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframeVideo.duration !== null ? true : false;
    if (playback)
      ({ iFrameVideo, currentTime, duration, paused } = data.iframeVideo);
  }
);

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "anistream",
      details: "Befindet sich auf der Startseite",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (page.endsWith("episode")) {
    presenceData.details = `${
      (
        document.querySelector(
          "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div.app-detail.flex-fill > div.detail-content > div.detail-text.flex-fill > div.caption > div.caption-content > a > h1"
        ) as HTMLElement
      ).textContent
    }`;
    presenceData.state =
      `${
        document.querySelector(
          `body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div.app-detail.flex-fill > div.detail-content > div.detail-text.flex-fill > div.caption > div.caption-content > h3`
        ).textContent
      }
       -  
      ${
        document.querySelector(
          "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div > div.detail-content > div.detail-text.flex-fill > div.caption > div.caption-content > h2"
        ).textContent
      }`.replace(",", " | ");

    presenceData.buttons = [
      {
        label: "Watch Anime",
        url: document.location.href
      }
    ];

    if (iFrameVideo) {
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    } else {
      video = document.querySelector<HTMLVideoElement>(
        "#videoplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      );
      ({ currentTime, duration, paused } = video);
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    }

    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause-ver1" : "play-ver1";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;

      presenceData.endTimestamp = endTimestamp;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (page.startsWith("/serie/")) {
    presenceData.smallImageKey = "series-ver1";
    presenceData.details = "Betrachtet eine Serie:";
    presenceData.state = `${
      (
        document.querySelector(
          "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div.app-detail.flex-fill > div > div.col-md-9 > div > h1"
        ) as HTMLElement
      ).textContent
    }`;
  } else if (page.startsWith("/profile/")) {
    presenceData.details = "Betrachtet das Profil von";
    presenceData.state = `${
      (
        document.querySelector(
          "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div > div > div > div.profile-header > div.profile-content > div.name"
        ) as HTMLElement
      ).textContent
    }`;
    presenceData.buttons = [
      {
        label: "Watch Profile",
        url: document.location.href
      }
    ];

    //LINKE LEISTE & OBERE
  } else if (page === "/trends") presenceData.details = pages[page];
  else if (page.startsWith("/search")) {
    presenceData.details = "Sucht nach:";
    presenceData.state = `${
      document.querySelector(
        "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div > div.d-flex > div > div > div.mb-4 > div.subtext.text-12"
      ).textContent
    }`.replace("verbal", " - ");
  } else if (page === "/request") presenceData.details = pages[page];
  else if (page === "/movies") presenceData.details = pages[page];
  else if (page === "/series") presenceData.details = pages[page];
  else if (page.startsWith("/movie/")) {
    presenceData.details = "Betrachtet ein Film:";
    presenceData.state = `${
      document.querySelector(
        "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div > div.detail-content > div.detail-text.flex-fill > div.caption > div.caption-content > h1"
      ).textContent
    }`;

    presenceData.buttons = [
      {
        label: "Watch Movie",
        url: document.location.href
      }
    ];

    if (iFrameVideo) {
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    } else {
      video = document.querySelector<HTMLVideoElement>(
        "#videoplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      );
      ({ currentTime, duration, paused } = video);
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    }

    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause-ver1" : "play-ver1";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;

      presenceData.endTimestamp = endTimestamp;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (page === "/actor") presenceData.details = pages[page];
  else if (page === "/premiumcollection") presenceData.state = pages[page];
  else if (page === "/hentais") presenceData.details = pages[page];
  else if (page === "/kalender") presenceData.details = pages[page];
  else if (page === "/changelogs") presenceData.details = pages[page];
  else if (page.includes("/changelogs/")) {
    presenceData.details = "Anistream Changelog";
    presenceData.state = `${
      document.querySelector(
        "body > div.container > div > div.app-wrapper > div.app-container.flex-fill > div > div > div.flex-fill > div > div.text-24.text-white.font-weight-bold"
      ).textContent
    }`;
  } else if (page === "/settings") presenceData.details = pages[page];
  else if (page === "/notifications") presenceData.details = pages[page];
  else if (page === "/login") presenceData.details = pages[page];
  else if (page === "/register") presenceData.details = pages[page];
  else if (page === "/discovery") {
    presenceData.details = "Betrachtet alle Animes";
    presenceData.state = `Sortiert nach: ${
      document.querySelector("#filter-sorting > div.filter-value").textContent
    }`;
  }
  presence.setActivity(presenceData);
});
