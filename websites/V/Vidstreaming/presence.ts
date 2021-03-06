const presence = new Presence({
    clientId: "696085711148941344"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  video: {
    iframe_video: {
      duration: number;
      iFrameVideo: boolean;
      currTime: number;
      dur: number;
      paused: boolean;
    };
  },
  lastPlaybackState: boolean,
  playback: boolean,
  browsingStamp = Math.floor(Date.now() / 1000),
  title: HTMLTextAreaElement;

presence.on(
  "iFrameData",
  (data: {
    iframe_video: {
      duration: number;
      iFrameVideo: boolean;
      currTime: number;
      dur: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.dur;
      paused = data.iframe_video.paused;
      video = data;
    }
  }
);

presence.on("UpdateData", async () => {
  const info = await presence.getSetting("sSI"),
    elapsed = await presence.getSetting("sTE"),
    videoTime = await presence.getSetting("sVT");
  if (videoTime) {
    if (lastPlaybackState !== playback) {
      lastPlaybackState = playback;
      presence.info("Video Time is On");
    }
  } else {
    presence.info("Video Time is Off");
  }
  if (elapsed) {
    browsingStamp = Math.floor(Date.now() / 1000);
    presence.info("Elapsed is On");
  } else {
    presence.info("Elapsed is Off");
  }

  const timestamps = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  if (info) {
    presence.info("Info is On.");
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page or recently subbed";
    } else if (document.location.pathname == "/recently-added-raw") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added raw";
    } else if (document.location.pathname == "/recently-added-dub") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added dub";
    } else if (document.location.pathname == "/movies") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the anime movies";
    } else if (document.location.pathname == "/new-season") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the new anime seasons.";
    } else if (document.location.pathname == "/popular") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the popular anime.";
    } else if (document.location.pathname == "/ongoing-series") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the ongoing series.";
    }
    //Used for the video files (Needs some work done here)
    else if (document.location.pathname.includes("/videos/")) {
      title = document.querySelector(
        "body > #wrapper_bg > #wrapper > #main_bg > div > div > div.video-info-left > h1"
      );
      if (title !== null) {
        presenceData.state = title.innerText;

        if (
          iFrameVideo == true &&
          !isNaN(duration) &&
          title !== null &&
          video !== null
        ) {
          if (!paused) {
            presenceData.details = "Watching:";
            presenceData.smallImageKey = paused ? "pause" : "play";
            if (videoTime) {
              presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
              presenceData.startTimestamp = timestamps[0];
              presenceData.endTimestamp = timestamps[1];
            }
          } else if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.details = "Paused:";
            presenceData.smallImageKey = "pause";
          }
        } else if (iFrameVideo == null && isNaN(duration) && title !== null) {
          presenceData.details = "Viewing:";
          presenceData.state = title.innerText;
          presenceData.startTimestamp = browsingStamp;
        } else {
          presenceData.details = "Error 03: Watching unknown anime.";
          presenceData.state = "Can't tell if playing or not.";
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "search";
          presenceData.smallImageText = "Error 3";
          presence.error(
            "Can't tell what you are watching. Fix a variable or line of code."
          );
        }
      } else {
        //Can't get the basic site information
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Error 02: Watching unknown anime.";
        presenceData.smallImageKey = "search";
        presence.error("Watching an unknown show.");
      }
    } else if (
      document.querySelector(
        "#main_bg > div:nth-child(5) > div > div.section-header > h3"
      ).textContent == " Result search"
    ) {
      presence.info("Searching");
      presenceData.details = "Searching:";
      presenceData.state = document.location.href
        .replace("https://gogo-stream.com/search.html?keyword=", "")
        .split("%20")
        .join(" ");
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    } //If it can't get the page it will output an error
    else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Error 01: Can't Read Page";
      presenceData.smallImageKey = "search";
      presence.error("Can't read page.");
    }
  } else {
    presence.info("Info is off.");
  }
  if (presenceData.details == null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData);
  }
});
