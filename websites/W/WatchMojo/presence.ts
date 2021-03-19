const presence = new Presence({
    clientId: "822457774574272592"
  }),
  getStrings = async () => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        watchingVid: "general.watchingVid",
        watching: "general.watching",
        search: "general.search",
        searchFor: "general.searchFor",
        searchSomething: "general.searchSomething",
        playingTrivia: "watchmojo.playingTrivia",
        trivia: "watchmojo.trivia",
        triviaGame: "watchmojo.triviaGame",
        article: "general.readingArticle",
        category: "general.viewCategory",
        viewChannel: "general.viewChannel",
        buttonViewChannel: "general.buttonViewChannel",
        buttonReadArticle: "general.buttonReadArticle",
        buttonWatchVideo: "general.buttonWatchVideo",
        buttonPlayTrivia: "watchmojo.buttonPlayTrivia"
      },
      await presence.getSetting("lang")
    );
  },
  capitalize = (s: string) => {
    s = s.replace("%20", "-");
    if (s.includes("-")) {
      let newStr = "";
      for (let i = 0; i < s.split("-").length; i++) {
        const str = s.split("-")[i];
        newStr += str.charAt(0).toUpperCase() + str.slice(1) + " ";
      }
      return newStr;
    } else {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  };

let browsingStamp = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href,
  strings = getStrings(),
  oldLang: string = null,
  iframeDur = 0,
  iframeCur = 0,
  iframePau = false;

presence.on(
  "iFrameData",
  (data: {
    video: boolean;
    duration: number;
    currentTime: number;
    paused: boolean;
  }) => {
    if (data.video) {
      iframeDur = data.duration;
      iframeCur = data.currentTime;
      iframePau = data.paused;
    }
  }
);

presence.on("UpdateData", async () => {
  const newLang: string = await presence.getSetting("lang"),
    showBrowsing: boolean = await presence.getSetting("browse"),
    showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    privacy: boolean = await presence.getSetting("privacy"),
    video: HTMLVideoElement = document.querySelector("#myDiv_html5");

  let presenceData: PresenceData = {
    largeImageKey: "mojo"
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const path = location.href
      .replace(/\/?$/, "/")
      .replace("https://" + document.location.hostname, "")
      .replace("?", "/")
      .replace("=", "/"),
    statics: {
      [name: string]: PresenceData;
    } = {
      "/": {
        details: (await strings).browse
      },
      "/video/id/(\\d*)/": {
        details: privacy
          ? (await strings).watchingVid
          : (await strings).watching,
        state: privacy
          ? null
          : document.querySelector(".brid-poster-title")?.textContent,
        smallImageKey: video?.paused ? "pause" : "play",
        smallImageText: video?.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: video?.paused
          ? null
          : video
          ? presence.getTimestampsfromMedia(video)[0]
          : null,
        endTimestamp: video?.paused
          ? null
          : video
          ? presence.getTimestampsfromMedia(video)[1]
          : null,
        buttons: [
          { label: (await strings).buttonWatchVideo, url: document.URL }
        ]
      },
      "/trivia/": {
        details: privacy
          ? (await strings).playingTrivia
          : (await strings).trivia.replace(
              "{0}",
              document.querySelector("#yttitle")?.textContent
            ),
        state: privacy
          ? null
          : (await strings).triviaGame
              .replace(
                "{0}",
                document
                  .querySelector("#questnum")
                  ?.textContent.split("of")[0]
                  .split(" ")[1]
                  .trim()
              )
              .replace(
                "{1}",
                document
                  .querySelector("#questnum")
                  ?.textContent.split("of")[1]
                  .split(" ")[1]
                  .trim()
              )
              .replace(
                "{2}",
                document
                  .querySelector(".scorequiz > b")
                  ?.textContent.split("/")[0]
                  .split(" ")[2]
              )
              .replace(
                "{3}",
                document
                  .querySelector(".scorequiz > b")
                  ?.textContent.split("/")[1]
              ),
        smallImageKey: iframePau ? "pause" : "play",
        smallImageText: iframePau
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: iframePau
          ? 0
          : presence.getTimestamps(iframeCur, iframeDur)[0],
        endTimestamp: iframePau
          ? 0
          : presence.getTimestamps(iframeCur, iframeDur)[1],
        buttons: [
          { label: (await strings).buttonPlayTrivia, url: document.URL }
        ]
      },
      "/blog/(\\d*)/(\\d*)/(\\d*)/": {
        details: (await strings).article,
        state: document.querySelector("h1")?.textContent,
        buttons: [
          { label: (await strings).buttonReadArticle, url: document.URL }
        ]
      },
      "/categories/": {
        details: (await strings).category,
        state:
          typeof location.pathname.split("/")[2] === "string"
            ? capitalize(location.pathname.split("/")[2])
            : "NEEDS RESET"
      },
      "/channels/": {
        details: (await strings).viewChannel,
        state: location.pathname.split("/")[2],
        buttons: [
          { label: (await strings).buttonViewChannel, url: document.URL }
        ]
      },
      "/search/": {
        details: (await strings).searchFor,
        state:
          document.querySelector("#result > div > b:nth-child(2)")
            ?.textContent ||
          document.querySelector("#resultd > a > span")?.textContent,
        smallImageKey: "search",
        smallImageText: (await strings).search
      }
    };

  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (showBrowsing) {
    for (const [k, v] of Object.entries(statics)) {
      if (path.match(k)) {
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browse;
        presenceData = { ...presenceData, ...v };
      }
    }
  }

  if (privacy && presenceData.smallImageKey === "search") {
    presenceData.details = (await strings).searchSomething;
    delete presenceData.state;
  } else if (privacy && presenceData.smallImageKey === "reading") {
    presenceData.details = (await strings).browse;
    delete presenceData.state;
  }

  if (!showButtons || privacy) delete presenceData.buttons;

  if (!presenceData.details) delete presenceData.details;
  if (!presenceData.state) delete presenceData.state;
  if (!presenceData.startTimestamp) delete presenceData.startTimestamp;
  if (!presenceData.endTimestamp) delete presenceData.endTimestamp;

  if (!presenceData.details) {
    presence.setActivity();
    presence.setTrayTitle();
  } else {
    presence.setActivity(presenceData);
  }
});
