const presence = new Presence({
    clientId: "641402862961950733"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let episodeTitle: string,
  dramaTitle: string,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback: boolean;

presence.on(
  "iFrameData",
  (data: {
    iframe_video: {
      currTime: number;
      duration: number;
      paused: boolean;
      iFrameVideo: boolean;
    };
  }) => {
    playback = data.iframe_video.duration !== null ? true : false;

    if (playback) {
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.duration;
      paused = data.iframe_video.paused;
    }
  }
);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "ka"
    },
    episodeSelection = document.querySelector("div#all-episodes");
  // Kissasian.la and kissasian.li are different sites with different DOM structure
  if (document.location.hostname == "kissasian.la") {
    if (document.location.pathname == "/") {
      const searchField: HTMLInputElement = document.querySelector(
        "input[type='search'].search-field"
      );
      if (searchField.value !== "") {
        presenceData.details = "Searching for";
        presenceData.state = searchField.value;
      } else {
        presenceData.details = "Viewing home page";
      }
    } else if (
      document.querySelector("header.entry-header > div.entry-meta") &&
      document
        .querySelector("header.entry-header > div.entry-meta")
        .textContent.toLowerCase()
        .includes("posted")
    ) {
      const userElement = document.querySelector("h1.entry-title");
      presenceData.details = "Reading post:";
      presenceData.state = userElement.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.querySelector("div.synopsis")) {
      const userElement = document.querySelector("header.entry-header");
      presenceData.details = "Viewing drama:";
      presenceData.state = userElement.textContent;
      presenceData.smallImageKey = "reading";
    } else if (episodeSelection) {
      episodeTitle = document.querySelector(
        "div#player-content > header > h1"
      ).textContent;
      // .textContent.replace("information", "")
      // .replace("Drama", "");
      dramaTitle = document.querySelector(".meta-cat > a").textContent;

      const timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = dramaTitle;
        presenceData.state = episodeTitle.replace(dramaTitle.trim(), "");

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking at:";
        presenceData.state = episodeTitle;
      }
    } else if (document.location.pathname.includes("/asian-drama-list/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing drama list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/tag/most-popular/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing most popular dramas";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/drama/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing dramas";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/movies/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing movies";
      presenceData.smallImageKey = "reading";
    } else if (
      document.location.pathname.includes(
        "/category/latest-asian-drama-releases/"
      )
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing lastest asian drama releases";
      presenceData.smallImageKey = "reading";
    } else if (
      document.location.pathname.includes("/category/latest-kshow-releases/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing lastest kshow releases";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/asian-movie-list/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing movie list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/kshow/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing KShow list";
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.hostname == "kissasian.li") {
    if (document.location.pathname == "/") {
      presenceData.details = "Viewing home page";
    } else if (document.querySelector("#selectEpisode") !== null) {
      const video: HTMLVideoElement =
        document.querySelector("#my_video_1_html5_api") ||
        document.querySelector("#centerDivVideo > div > div > video") ||
        document.querySelector("video");
      if (video !== null) {
        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;
      }
      const title = document
          .querySelector("#navsubbar > p > a")
          .textContent.replace("information", "")
          .replace("Drama", ""),
        user = document
          .querySelector("head > title")
          .textContent.replace("Watch", "")
          .replace("online with English sub | KissAsian", ""),
        timestamps = presence.getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = title;
        presenceData.state = user.replace(title.trim(), "");

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking at:";
        presenceData.state = user;
      }
    } else if (document.location.pathname.includes("/Drama/")) {
      presenceData.startTimestamp = browsingStamp;
      const user = document.querySelector(
        "#leftside > div:nth-child(1) > div.barContent > div:nth-child(2) > a"
      );
      presenceData.details = "Viewing drama:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/DramaList")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing drama list";
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
