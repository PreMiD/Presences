var presence = new Presence({
    clientId: "640275259282686015"
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

var title: any;
var currentTime: any, video: HTMLVideoElement, duration: any, paused: any;

presence.on("UpdateData", async () => {
  var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
    presenceData: PresenceData = {
      largeImageKey: "tv"
    };

  if (
    document.querySelector("#bitmovinplayer-video-player_container") !== null
  ) {
    video = document.querySelector("#bitmovinplayer-video-player_container");
    currentTime = video.currentTime;
    duration = video.duration;
    paused = video.paused;
    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      title = document.querySelector(
        "body > now-root > now-seo > article > h1 > font > font"
      );
      if (title !== null) {
        presenceData.details = title.textContent.split("-")[0];
      } else {
        title = document.querySelector(
          "body > now-root > now-seo > article > h1"
        );
        presenceData.details = document.querySelector(
          "body > now-root > now-footer > footer > now-breadcrumb > ul > li:nth-child(3) > a > span"
        ).textContent;
        presenceData.state = title.textContent;
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "body > now-root > now-seo > article > h1 > font > font"
      );
      if (title !== null) {
        presenceData.state = title.textContent.split("-")[0];
      } else {
        title = document.querySelector(
          "body > now-root > now-seo > article > h1"
        );
        presenceData.state =
          document.querySelector(
            "body > now-root > now-footer > footer > now-breadcrumb > ul > li:nth-child(3) > a > span"
          ).textContent +
          " - " +
          title.textContent;
      }
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/serien/")) {
    presenceData.details = "Viewing serie:";
    presenceData.state = document
      .querySelector("head > title")
      .textContent.split(" - ")[0];
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/shows/")) {
    presenceData.details = "Viewing show:";
    presenceData.state = document
      .querySelector("head > title")
      .textContent.split(" - ")[0];
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/serien")) {
    presenceData.details = "Viewing all series";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/shows")) {
    presenceData.details = "Viewing all shows";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/filme/")) {
    presenceData.details = "Viewing show:";
    presenceData.state = document
      .querySelector("head > title")
      .textContent.split(" - ")[0];
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/filme")) {
    presenceData.details = "Viewing all series";
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
