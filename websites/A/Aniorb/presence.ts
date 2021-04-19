const presence = new Presence({
    clientId: "776312991939428373"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let timestamps: number[],
  video: HTMLVideoElement,
  currentTime: number,
  duration: number,
  paused: boolean,
  iFrameVideo: boolean,
  playback: boolean;
presence.on(
  "iFrameData",
  (data: {
    iframe_video: {
      duration: number;
      iFrameVideo: boolean;
      currTime: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.duration;
      paused = data.iframe_video.paused;
    }
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "aniorb",
    startTimestamp: browsingStamp
  };
  if (document.location.pathname == "/")
    presenceData.details = "Browsing Aniorb";
  else if (document.location.pathname.includes("/recentlyadded")) {
    presenceData.details = "Browsing Recently Added";
    presenceData.smallImageKey = "recent";
    presenceData.buttons = [
      {
        label: "View Recently Added Anime",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/newseason")) {
    presenceData.details = "Browsing New Season";
    presenceData.smallImageKey = "season";
    presenceData.buttons = [
      {
        label: "View New Season Animes",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/movies")) {
    presenceData.details = "Browsing Movies";
    presenceData.smallImageKey = "movie";
    presenceData.buttons = [
      {
        label: "View Anime Movies",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/popular")) {
    presenceData.details = "Browsing Popular";
    presenceData.smallImageKey = "star";
    presenceData.buttons = [
      {
        label: "View Popular Animes",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/genre")) {
    presenceData.details =
      "Viewing genre:";
    presenceData.state = 
      document.querySelector(
        "span.text-red-500.capitalize.px-16.font-thin.text-xl"
      ).textContent;
    presenceData.smallImageKey = "genre";
    presenceData.buttons = [
      {
        label: "View Genre ",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/details")) {
    presenceData.details = "Checking Synopsis";
    presenceData.smallImageKey = "details";
    presenceData.state = document.querySelector(
      "span.font-bold.text-4xl"
    ).textContent;
    presenceData.buttons = [
      {
        label: "Check Synopsis",
        url: document.location.href
      },
      {
        label: "Read Manga",
        url: document
          .querySelector("span.text-red-500.text-center > a")
          .getAttribute("href")
      }
    ];
  } else if (document.location.pathname.includes("/watch")) {
    presenceData.details = document
      .querySelector(
        "#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.w-full.py-4.capitalize.flex.flex-col.items-start.lg\\:items-start > span"
      )
      .textContent.toUpperCase();
    presenceData.state =
      "Episode " +
      document
        .querySelector(
          "#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.flex-col.pb-2.xl\\:w-player.justify-between.items-center.w-full.text-white.my-4 > div.flex.w-full.justify-between.items-end"
        )
        .textContent.substr(19, 2);
    presenceData.smallImageKey = "watching";
    presenceData.buttons = [
      // watch episode
      {
        label: "Watch Episode",
        url: document.location.href
      }
    ];
    if (iFrameVideo) {
      timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    } else {
      video = document.querySelector("div > div.plyr__video-wrapper > video");
      if (video) {
        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;
        timestamps = presence.getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          ));
      }
    }

    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = timestamps[1];
      if (paused) {
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("/search")) {
    presenceData.details = "Searching For";
    presenceData.smallImageKey = "search";
    presenceData.state = document.querySelector(
      "#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div.mt-28.lg\\:mt-0 > span.text-red-500.capitalize.px-16.font-thin.text-xl"
    ).textContent;
  } else if (document.location.pathname.includes("/myList")) {
    presenceData.details = "Browsing My List";
    presenceData.smallImageKey = "heart";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
