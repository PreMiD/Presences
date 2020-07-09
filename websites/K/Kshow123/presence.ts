const presence = new Presence({
    clientId: "614388233886760972"
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

let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo: boolean, currentTime: any, duration: any, paused: any;
let lastPlaybackState = null,
  playback: any;

if (document.location.pathname.includes(".html")) {
  presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.dur;
      paused = data.iframe_video.paused;
    }
  });
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ksow123stack"
  };

  presenceData.startTimestamp = browsingStamp;

  if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (
    document.location.pathname.includes(".html") &&
    document.location.pathname.includes("/pages/")
  ) {
    presenceData.details = "Reading the FAQs";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes(".html")) {
    if (iFrameVideo == true && !isNaN(duration)) {
      const timestamps = getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );

      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      const title = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
      );
      const views = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)"
      );
      presenceData.details = title.textContent;

      const air = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)"
      );
      const air2 = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)"
      );

      if (air !== null && air.textContent.includes("Air on:")) {
        presenceData.state =
          views.textContent.replace("Status: ", "") +
          ", " +
          air.textContent.replace("Air", "Aired");
      } else if (air2 !== null && air2.textContent.includes("Air on:")) {
        presenceData.state =
          views.textContent.replace("Status: ", "") +
          ", " +
          air2.textContent.replace("Air", "Aired");
      } else {
        presenceData.state = views.textContent;
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo == null && isNaN(duration)) {
      const title = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
      );
      presenceData.details = "Looking at: ";
      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the main page";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/show/latest/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the latest shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/show/popular/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the most popular shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/show/rated/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the highest rated shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/show/") {
    presenceData.details = "Browsing through";
    presenceData.state = "a list of all shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/show/")) {
    const views = document.querySelector("#info > div.media > div > h1 > a");

    presenceData.details = "Browsing through all episodes of:";
    presenceData.state = views.textContent;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search/")) {
    const views = document.querySelector("#featured > div.page-header > h3");

    presenceData.details = "Searching for:";
    presenceData.state = views.textContent;
    presenceData.smallImageKey = "search";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
