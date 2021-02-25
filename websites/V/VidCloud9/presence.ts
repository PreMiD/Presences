const presence = new Presence({
    clientId: "697552926876368917"
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
  playback: boolean,
  title: HTMLTextAreaElement,
  browsingStamp: number;

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
    video = data;
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.dur;
      paused = data.iframe_video.paused;
    }
  }
);

presence.on("UpdateData", async () => {
  const info = await presence.getSetting("sSI"),
    elapsed = await presence.getSetting("sTE"),
    videoTime = await presence.getSetting("sVT");

  if (elapsed) {
    browsingStamp = Math.floor(Date.now() / 1000);
    presence.info("Elapsed is on");
  } else {
    browsingStamp = null;
    presence.info("Elapsed Off");
  }
  const timestamps = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  if (videoTime) {
    presence.info("Video Time is On");
    if (playback == true) {
      // lastPlaybackState = playback;
      browsingStamp = Math.floor(Date.now() / 1000);
    }
  } else {
    presence.info("Video time is off");
  }
  if (info) {
    presence.info("Info is On.");
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname == "/movies") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added movies";
    } else if (document.location.pathname == "/series") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added series";
    } else if (document.location.pathname == "/cinema-movies") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added cinema movies.";
    } else if (document.location.pathname == "/recommended-series") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing recommened series";
    }
    //Used for the video files (Needs some work done here)
    else if (document.location.pathname.includes("/videos/")) {
      title = document.querySelector(
        "#main_bg > div:nth-child(5) > div > div.video-info-left > h1"
      );
      if (title != null) {
        presenceData.state = (title as HTMLTextAreaElement).innerText;
        if (
          iFrameVideo == true &&
          !isNaN(duration) &&
          title != null &&
          video != null
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
            presenceData.smallImageText = (await strings).pause;
          }
        } else if (iFrameVideo == null && isNaN(duration) && title != null) {
          presenceData.details = "Viewing:";
          presenceData.state = (title as HTMLTextAreaElement).innerText;
          presenceData.startTimestamp = browsingStamp;
        } else {
          presenceData.details = "Error 03: Watching unknown show/movie.";
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
        presenceData.details = "Error 02: Watching unknown show/movie.";
        presenceData.smallImageKey = "search";
        presence.error("Can't read page.");
      }
    } else if (
      document.querySelector(
        "#main_bg > div:nth-child(5) > div > div.section-header > h3"
      ).textContent == " Result search"
    ) {
      presence.info("Searching");
      presenceData.details = "Searching:";
      presenceData.state = document.location.href.replace(
        "https://vidcloud9.com/search.html?keyword=",
        ""
      );
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    } //If it can't get the page it will output an error
    else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Error 01: Can't Read Page";
      presenceData.smallImageKey = "search";
      presence.error("Can't read page. Set up a conditional.");
    }
  } else {
    presenceData.details = null;
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
