var presence = new Presence({
    clientId: "641402862961950733"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);
var user: any;
var title: any;
var currentTime: any,
  duration: any,
  paused: any,
  playback: any,
  video: HTMLVideoElement,
  timestamps: any;
presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;

  //console.log(data.iframe_video);
  //console.log(document.location.pathname);

  if (playback) {
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ka"
  };

  if (document.location.hostname == "kissasian.sh") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.querySelector("#selectEpisode") !== null) {
      video =
        document.querySelector("#my_video_1_html5_api") ||
        document.querySelector("#centerDivVideo > div > div > video") ||
        document.querySelector("video");
      if (video !== null) {
        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;
      }
      title = document
        .querySelector("#navsubbar > p > a")
        .textContent.replace("information", "")
        .replace("Drama", "");
      user = document
        .querySelector("head > title")
        .textContent.replace("Watch", "")
        .replace("online with English sub | KissAsian", "");

      timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
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
      user = document.querySelector(
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
