var presence = new Presence({
    clientId: "698231292172435567"
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

const browsingStamp = Math.floor(Date.now() / 1000);
let currentTime: any,
  duration: any,
  paused: any,
  playback: any,
  timestamps: any;

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "kisscartoon"
  };

  presenceData.startTimestamp = browsingStamp;

  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/kisscartoon.html"
  ) {
    presenceData.details = "Viewing home page";
  } else if (document.querySelector(".full.watch_container") !== null) {
    timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.details = document
        .querySelector("#adsIfrme > div > div > div > h1 > strong")
        .textContent.replace("Watch ", "")
        .replace(" online free", "");
      presenceData.state = document
        .querySelector("#selectEpisode")
        .textContent.trim();

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at:";
      presenceData.state =
        document
          .querySelector("#adsIfrme > div > div > div > h1 > strong")
          .textContent.replace("Watch ", "")
          .replace(" online free", "") +
        " " +
        document.querySelector("#selectEpisode").textContent.trim();
    }
  } else if (document.location.pathname.includes("/CartoonList")) {
    presenceData.details = "Viewing the Cartoon List";
  } else if (document.location.pathname.includes("/Cartoon")) {
    presenceData.details = "Viewing Cartoon:";
    presenceData.state = document.querySelector(
      "#leftside > div:nth-child(2) > div.barContent.full > div.full > h1 > a"
    ).textContent;
  } else if (document.location.pathname.includes("/ReportError")) {
    presenceData.details = "Reporting an error";
    presenceData.smallImageKey = "writing";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
