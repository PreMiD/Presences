var presence = new Presence({
    clientId: "614389710625964045"
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

var title: any, views: any, air: any;
var iFrameVideo: boolean, currentTime: any, duration: any, paused: any;

var lastPlaybackState = null;
var playback;

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

if (document.location.pathname.includes("/kshow/")) {
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
  // Get the video
  var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
    presenceData: presenceData = {
      largeImageKey: "kshowonline",
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };
  if (
    document.location.pathname.includes(".html") &&
    document.location.pathname.includes("/pages/")
  ) {
    presence.setActivity();
    presence.setTrayTitle();
  } else if (document.location.pathname.includes("/kshow/")) {
    if (iFrameVideo == true && !isNaN(duration)) {
      title = document.querySelector(
        "#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > h4"
      );
      views = document.querySelector("#view");
      presenceData.details = title.innerText.replace(views.innerText, "");

      air = document.querySelector(
        "#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > div.row.panel-info > div.col.s12.m9 > table > tbody > tr:nth-child(6) > td"
      );
      views = document.querySelector(
        "#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > div.row.panel-info > div.col.s12.m9 > table > tbody > tr:nth-child(5) > td"
      );
      if (air !== null) {
        presenceData.state =
          "Subbed by: " + views.innerText + ", Aired on: " + air.innerText;
      } else {
        presenceData.state = views.innerText;
      }

      // Set presence state to views value

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      presence.setActivity(presenceData);
    } else if (iFrameVideo == null && isNaN(duration)) {
      delete presenceData.endTimestamp;
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > h4"
      );
      views = document.querySelector("#view");
      presenceData.state = title.innerText.replace(views.innerText, "");
      delete presenceData.smallImageText;
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the main page";
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/list/view") {
    presenceData.details = "Browsing through";
    presenceData.state = "the most viewed shows";
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/list/rate") {
    presenceData.details = "Browsing through";
    presenceData.state = "the highest rated shows";
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/list") {
    presenceData.details = "Browsing through";
    presenceData.state = "the latest shows";
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/show-list") {
    presenceData.details = "Browsing through";
    presenceData.state = "a list of all shows";
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/category/")) {
    views = document.querySelector(
      "#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div.content-list.z-depth-1 > h5"
    );

    presenceData.details = "Browsing through all episodes of:";
    presenceData.state = views.innerText
      .replace("CATEGORY: ", "")
      .replace("▼", "");
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search/")) {
    views = document.querySelector(
      "#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div.content-list.z-depth-1 > h5"
    );

    presenceData.details = "Searching for:";
    presenceData.state = views.innerText
      .replace("Search by Keywords: ", "")
      .replace("▼", "");
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "search";
    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
