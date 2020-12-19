const presence = new Presence({
    clientId: "787739407720513596"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
const browsingTimer = Math.floor(Date.now() / 1000);

let timestamps,
  video,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback;

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
  const presenceData: presenceData = {
    largeImageKey: "logo-v2"
  };

  if (document.location.hostname == "animixplay.to") {
    if (document.location.pathname == "/") {
      urlParams = new URLSearchParams(window.location.search);

      if (urlParams.get("q")) {
        presenceData.startTimestamp = browsingTimer;
        presenceData.details = "Currently searching for...";
        presenceData.state = '"' + urlParams.get("q") + '"';
        presenceData.smallImageKey = "browsing-v1";
        presenceData.smallImageText = (await strings).browsing;
      } else if (urlParams.get("genre")) {
        presenceData.startTimestamp = browsingTimer;
        presenceData.details = "Currently exploring...";
        presenceData.state =
          "" +
          urlParams.get("genre").toLowerCase().replaceAll(",", " + ") +
          " related anime";
        presenceData.smallImageKey = "browsing-v1";
        presenceData.smallImageText = "Exploring...";
      } else if (urlParams.get("season") && urlParams.get("year")) {
        presenceData.startTimestamp = browsingTimer;
        presenceData.details = "Currently exploring...";
        presenceData.state =
          "" +
          urlParams.get("season").toLowerCase() +
          " " +
          urlParams.get("year").toLowerCase() +
          " anime";
        presenceData.smallImageKey = "browsing-v1";
        presenceData.smallImageText = "Exploring...";
      } else {
        presenceData.startTimestamp = browsingTimer;
        presenceData.details = "Currently browsing...";
        presenceData.smallImageKey = "browsing-v1";
        presenceData.smallImageText = (await strings).browsing;
      }
    } else if (new RegExp("^/v.").test(document.location.pathname)) {
      if (iFrameVideo) {
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
      } else {
        video = document.querySelector(
          "#playercontainer > div > div.plyr__video-wrapper > video"
        );
        (currentTime = video.currentTime),
          (duration = video.duration),
          (paused = video.paused),
          (timestamps = getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          ));
      }
      title = document.querySelector("#aligncenter > span.animetitle")
        .textContent;

      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause-v1" : "play-v1";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.details = "Currently watching...";
        presenceData.state = title;

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
    } else if (document.location.pathname.includes("/anime/")) {
      animepagetitle = document.querySelector("#animepagetitle").textContent;
      animepagetype = document
        .querySelector("#addInfo")
        .textContent.split(" ")[5]
        .trim(-1);
      presenceData.details = "Currently reading...";
      presenceData.state = animepagetitle + " (" + animepagetype + ")";
      presenceData.smallImageKey = "reading-v1";
      presenceData.smallImageText = "Reading...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
