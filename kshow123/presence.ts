var presence = new Presence({
    clientId: "614388233886760972", // CLIENT ID FOR YOUR PRESENCE
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
  });

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any, views: any, air: any, air2: any;
var iFrameVideo: boolean, currentTime: any, duration: any, paused: any;

// the video variable is a html video element
var video: HTMLVideoElement, videoDuration: any, videoCurrentTime: any;

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

if (document.location.pathname.includes(".html")) {
  presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;

    //console.log(data.iframe_video);
    //console.log(document.location.pathname);

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
  video = document.querySelector(
    "#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
  );

  // Check if it can find the video
  if (
    document.location.pathname.includes(".html") &&
    document.location.pathname.includes("/pages/")
  ) {
    presence.setActivity();
    presence.setTrayTitle();
  } else if (document.location.pathname.includes(".html")) {
    if (iFrameVideo == true && !isNaN(duration)) {
      var timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        pdata: presenceData = {
          largeImageKey: "ksow123stack",
          smallImageKey: paused ? "pause" : "play",
          smallImageText: paused ? (await strings).pause : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1],
        };

      title = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
      );
      views = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)"
      );
      pdata.details = title.innerText;

      air = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)"
      );
      air2 = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)"
      );

      if (air !== null && air.innerText.includes("Air on:")) {
        pdata.state =
          views.innerText.replace("Status: ", "") + ", " + air.innerText;
      } else if (air2 !== null && air2.innerText.includes("Air on:")) {
        pdata.state =
          views.innerText.replace("Status: ", "") + ", " + air2.innerText;
      } else {
        pdata.state = views.innerText;
      }

      // Set presence state to views value

      if (paused) {
        delete pdata.startTimestamp;
        delete pdata.endTimestamp;
      }

      presence.setActivity(pdata);
    } else if (iFrameVideo == null && isNaN(duration)) {
      title = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
      );

      var timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        pdata: presenceData = {
          largeImageKey: "ksow123stack",
          smallImageKey: paused ? "pause" : "play",
          smallImageText: paused ? (await strings).pause : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1],
        };

      delete pdata.endTimestamp;
      pdata.startTimestamp = browsingStamp;
      pdata.details = "Looking at: ";
      pdata.state = title.innerText;
      delete pdata.smallImageText;
      pdata.smallImageKey = "reading";

      presence.setActivity(pdata);
    }
  } else if (document.location.pathname == "/") {

    pdata.largeImageKey = "ksow123stack";
    pdata.details = "Browsing through";
    pdata.state = "the main page";
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "reading";

    presence.setActivity(pdata);
  } else if (document.location.pathname == "/show/latest/") {
    var pdata: presenceData = {
      largeImageKey: "ksow123stack",
    };

    pdata.details = "Browsing through";
    pdata.state = "the latest shows";
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "reading";

    presence.setActivity(pdata);
  } else if (document.location.pathname == "/show/popular/") {
    var pdata: presenceData = {
      largeImageKey: "ksow123stack",
    };

    pdata.details = "Browsing through";
    pdata.state = "the most popular shows";
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "reading";

    presence.setActivity(pdata);
  } else if (document.location.pathname == "/show/rated/") {
    var pdata: presenceData = {
      largeImageKey: "ksow123stack",
    };

    pdata.details = "Browsing through";
    pdata.state = "the highest rated shows";
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "reading";

    presence.setActivity(pdata);
  } else if (document.location.pathname == "/show/") {
    var pdata: presenceData = {
      largeImageKey: "ksow123stack",
    };

    pdata.details = "Browsing through";
    pdata.state = "a list of all shows";
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "reading";

    presence.setActivity(pdata);
  } else if (document.location.pathname.includes("/show/")) {
    var pdata: presenceData = {
      largeImageKey: "ksow123stack",
    };

    views = document.querySelector("#info > div.media > div > h1 > a");

    pdata.details = "Browsing through all episodes of:";
    pdata.state = views.innerText;
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "reading";

    presence.setActivity(pdata);
  } else if (document.location.pathname.includes("/search/")) {
    var pdata: presenceData = {
      largeImageKey: "ksow123stack",
    };

    views = document.querySelector("#featured > div.page-header > h3");

    pdata.details = "Searching for:";
    pdata.state = views.innerText;
    delete pdata.endTimestamp;
    pdata.startTimestamp = browsingStamp;
    delete pdata.smallImageText;
    pdata.smallImageKey = "search";
    presence.setActivity(pdata);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
