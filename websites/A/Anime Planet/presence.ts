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
      await presence.getSetting("lang")
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
  const newLang = await presence.getSetting("lang");

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
    buttonsE = await presence.getSetting("buttons"),
    animePlanetPages: {
      [key: string]: PresenceData;
    } = {
      "/characters/top-loved": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/characters/all": {
        details: (await strings).viewPage,
        state: "Characters"
      },
      "/characters/top-hated": {
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
      reviews: {
        details: (await strings).viewPage,
        state: `${content.title} • ${
          location.search.endsWith("anime") ? "Anime" : "Manga"
        }`
      },
      "/users/": {
        details: (await strings).viewProfile,
        state: document.querySelector("h1")?.textContent.trim(),
        smallImageText: document.querySelector("p:nth-child(2) > a")
          .textContent,
        buttons: [
          {
            label: (await strings).buttonViewProfile,
            url: document.baseURI
          }
        ]
      },
      "/manga/top-manga": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/manga/light-novels": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/manga/recommendations": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/manga/": {
        details: (await strings).viewManga,
        state: content.title
      },
      "/anime/all": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/anime/recommendations": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/anime/seasons": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/anime/top-anime": {
        details: (await strings).viewPage,
        state: content.title
      },
      "/anime/": {
        details: (await strings).viewAnime,
        state: content.title
      }
    };

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

      presenceData.details = content.title;
      presenceData.state = `EP.${content.episode.ep}${
        content.episode.title ? ` • ${content.episode.title}` : ``
      }`;

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
          url: document.querySelector<EHref>("h2.sub > a").href
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

    presenceData.details = content.title;
    presenceData.state = `${(await strings).chapter} ${content.episode.ep}`;

    presenceData.smallImageText = (await strings).reading;

    presenceData.buttons = [
      {
        label: "Read Chapter",
        url: document.baseURI
      }
    ];
  }

  for (const [key, value] of Object.entries(animePlanetPages)) {
    if (
      path.includes(key) &&
      path !== "/characters/" &&
      !path.includes("/videos/") &&
      path !== "/manga/" &&
      path !== "/anime/"
    ) {
      presenceData = { ...presenceData, ...value };
      break;
    } else if (path === "/characters/") {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Characters";
    } else if (path === "/anime/") {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Anime";
    } else if (path === "/manga/") {
      presenceData.details = (await strings).viewPage;
      presenceData.state = "Manga";
    }
  }

  if (!buttonsE) delete presenceData.buttons;

  presence.setActivity(presenceData);
});

interface EHref extends HTMLElement {
  href: string;
}

interface IFrameData {
  iframe_video: {
    duration: number;
    currentTime: number;
    paused: boolean;
  };
}
