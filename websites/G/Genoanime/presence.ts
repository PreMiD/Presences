const presence = new Presence({
    clientId: "810203651317432351"
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
  playback: boolean,
  anime_breadcumb: string;

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
      largeImageKey: "genoanime",
      startTimestamp: browsingStamp
    },
    title = document.title.slice(0, -13); //title of the page
  if (document.location.pathname == "/") {
    presenceData.details = "Exploring Genoanime";
  } else if (document.location.pathname.includes("/browse")) {
    presenceData.details = "Exploring Genoanime library";
    presenceData.buttons = [
      {
        label: "View Library",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/details")) {
    presenceData.details = `Checking Synopsis`;
    presenceData.state = document.querySelector(
      ".anime__details__title h3"
    ).textContent;
    anime_breadcumb = document.querySelector<HTMLAnchorElement>(
      "#container > section > div > div.anime__details__content > div > div.col-lg-9 > div > div.anime__details__btn > a.watch-btn"
    ).href;
    presenceData.buttons = [
      {
        label: "Watch It",
        url: anime_breadcumb
      },
      {
        label: "Check Synopsis",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/watch")) {
    presenceData.details = title;
    presenceData.state =
      "Episode " + document.location.href.split("episode=")[1];
    anime_breadcumb = document.querySelector<HTMLAnchorElement>(
      "#anime_details_breadcrumbs"
    ).href;
    presenceData.buttons = [
      {
        label: "Watch Episode",
        url: document.location.href
      },
      {
        label: "Check Synopsis",
        url: anime_breadcumb
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
        (currentTime = video.currentTime),
          (duration = video.duration),
          (paused = video.paused),
          (timestamps = presence.getTimestamps(
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
    presenceData.details = "Searching For...";
    presenceData.state = (
      document.getElementById("search-anime") as HTMLInputElement
    ).value;
  } else if (document.location.pathname.includes("/amv")) {
    presenceData.details = "Watching AMV videos";
    presenceData.buttons = [
      {
        label: "Watch Video",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/favorite")) {
    presenceData.details = "Browsing Favourites";
  } else if (document.location.pathname.includes("/schedule")) {
    presenceData.details = "Checking Schedule";
    presenceData.state = document.querySelector(
      "#container > section > div > div:nth-child(1) > div > h3"
    ).textContent;
    presenceData.buttons = [
      {
        label: "View Schedule",
        url: document.location.href
      }
    ];
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
