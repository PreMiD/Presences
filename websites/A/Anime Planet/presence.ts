const presence = new Presence({
    clientId: "818135576074387507"
  }),
  getStrings = async () =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        viewPage: "general.viewPage",
        viewEpisode: "general.buttonViewEpisode",
        viewSeries: "general.buttonViewSeries",
        viewAnime: "general.viewAnime",
        chapter: "general.chapter",
        readingAricle: "general.readingArticle",
        reading: "general.reading",
        viewProfile: "general.viewProfile",
        anime: "general.anime",
        searchFor: "general.searchFor",
        viewManga: "general.viewManga",
        buttonViewProfile: "general.buttonViewProfile"
      },
      await presence.getSetting("lang").catch(() => "en")
    ),
  startsTime = Math.floor(Date.now() / 1000);

let strings = getStrings(),
  oldLang: string = null,
  playback: boolean,
  duration: number,
  currentTime: number,
  paused: boolean;

presence.on("iFrameData", (data: IFrameData) => {
  playback = data.iframe_video?.duration !== undefined ? true : false;

  if (playback) {
    duration = data.iframe_video.duration;
    currentTime = data.iframe_video.currentTime;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  const newLang: string = await presence.getSetting("lang").catch(() => "en"),
    AnimeDetails: string = await presence.getSetting("AnimeDetails"),
    AnimeState: string = await presence.getSetting("AnimeState"),
    MangaDetails: string = await presence.getSetting("MangaDetails"),
    MangaState: string = await presence.getSetting("MangaState"),
    timestamp: boolean = await presence.getSetting("timestamp"),
    buttons = await presence.getSetting("buttons");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  let presenceData: PresenceData = {
    largeImageKey: "animep_logo",
    details: (await strings).browse,
    smallImageKey: "reading",
    startTimestamp: startsTime
  };

  const path = document.location.pathname,
    content = {
      title: (
        document.querySelector("h2>a") ||
        document.querySelector("h1>a") ||
        document.querySelector("h1")
      )?.textContent.trim(),
      episode: {
        title: "",
        ep: ""
      },
      titleAndEpisode: document
        .querySelector("h2.sub")
        ?.textContent.replace(
          document.querySelector("h2.sub > a")?.textContent,
          ""
        )
        .trim()
        .split("-")
    },
    animePlanetPages: {
      [key: string]: PresenceData;
    } = {
      "/characters/(top-hated|all|top-loved)": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/characters/tags": {
        details: (await strings).viewPage,
        state: "Characters"
      },
      "/characters/": {
        details: "Viewing character:",
        state: `${content.title} • ${
          document.querySelector("table > tbody > tr > td")?.textContent
        }`,
        buttons: [
          {
            label: "View Character",
            url: document.baseURI
          }
        ]
      },
      "/forum/forums/": {
        details: "Reading forum:",
        state: content.title,
        buttons: [
          {
            label: "Read Forum",
            url: document.baseURI
          }
        ]
      },
      "/forum/threads/": {
        details: "Reading thread:",
        state: content.title,
        buttons: [
          {
            label: "Read Thread",
            url: document.baseURI
          }
        ]
      },
      "/forum/": {
        details: (await strings).viewPage,
        state: "Forums"
      },
      "/challenges/": {
        details: "Viewing challenge:",
        state: content.title
      },
      "/community/": {
        details: (await strings).viewPage,
        state: `Community • ${content.title}`
      },
      "reviews.php": {
        details: (await strings).viewPage,
        state: `${content.title} • ${
          location.search.endsWith("anime") ? "Anime" : "Manga"
        }`
      },
      "/users/": {
        details: (await strings).viewProfile,
        state: document.querySelector("h1")?.textContent.trim(),
        smallImageText:
          document.querySelector("p:nth-child(2) > a").textContent,
        buttons: [
          {
            label: (await strings).buttonViewProfile,
            url: document.baseURI
          }
        ]
      },
      "/studios/": {
        details: `Viewing studio:`,
        state: content.title
      },
      "/manga/(read-online|recommendations|light-novels|top-manga|all|magazines)":
        {
          details: (await strings).viewPage,
          state: content.title
        },
      "/manga/tags/": {
        details: `Manga | Viewing tag:`,
        state: content.title
      },
      "/manga/": {
        details: (await strings).viewManga,
        state: content.title
      },
      "/anime/(watch-online|top-anime|seasons|all|recommendations)": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/anime/tags/": {
        details: `Anime | Viewing tag:`,
        state: content.title
      },
      "/anime/": {
        details: (await strings).viewAnime,
        state: content.title
      },
      "/login": {
        details: (await strings).viewPage,
        state: "The login page"
      },
      "/sign-up": {
        details: (await strings).viewPage,
        state: "The sign up page"
      }
    };

  for (const [key, value] of Object.entries(animePlanetPages)) {
    if (path.match(key)) {
      presenceData = { ...presenceData, ...value };
      break;
    }
  }

  if (path.includes("/videos/")) {
    if (content.titleAndEpisode.length > 1) {
      content.episode.title = document
        .querySelector("h2.sub")
        .textContent.replace(
          document.querySelector("h2.sub > a").textContent,
          ""
        )
        .trim()
        .split("-")
        .slice(1)
        .join("")
        .trim();
    }

    content.episode.ep = document
      .querySelector("h2.sub")
      .textContent.replace(document.querySelector("h2.sub > a").textContent, "")
      .trim()
      .split(/-/)[0]
      .match(/[1-9]?[0-9]?[0-9]?.?[1-9]?[0-9]/)[0]
      .trim();

    if (!isNaN(duration)) {
      const timestamps = presence.getTimestamps(currentTime, duration);

      presenceData.details = AnimeDetails.replace(
        "%title%",
        content.title
      ).replace(
        "%episode%",
        `EP.${content.episode.ep} ${content.episode.title ?? ""}`
      );
      presenceData.state = AnimeState.replace("%title%", content.title).replace(
        "%episode%",
        `EP.${content.episode.ep} ${content.episode.title ?? ""}`
      );

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;

      presenceData.buttons = [
        {
          label: (await strings).viewEpisode,
          url: document.baseURI
        },
        {
          label: (await strings).viewSeries,
          url: document.querySelector<HTMLAnchorElement>("h2.sub > a").href
        }
      ];

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = (await strings).viewAnime;
      presenceData.state = content.title;
    }
  } else if (path.includes("/chapters/")) {
    content.episode.ep = document
      .querySelector("h1")
      .textContent.replace(content.title, "")
      .match(/[1-9]?[0-9]?[0-9]?.?[1-9]?[0-9]?[0-9]/g)[0];

    presenceData.details = MangaDetails.replace(
      "%title%",
      content.title
    ).replace("%chapter%", `${(await strings).chapter} ${content.episode.ep}`);
    presenceData.state = MangaState.replace("%title%", content.title).replace(
      "%chapter%",
      `${(await strings).chapter} ${content.episode.ep}`
    );

    presenceData.smallImageText = (await strings).reading;

    presenceData.buttons = [
      {
        label: "Read Chapter",
        url: document.baseURI
      }
    ];
  }

  if (!buttons) delete presenceData.buttons;
  if (!timestamp) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  presence.setActivity(presenceData);
});

interface IFrameData {
  iframe_video: {
    duration: number;
    currentTime: number;
    paused: boolean;
  };
}
