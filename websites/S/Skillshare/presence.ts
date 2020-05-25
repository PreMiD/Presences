var presence = new Presence({
    clientId: "642122988925485086"
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

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "sh"
  };

  if (document.location.hostname == "www.skillshare.com") {
    if (
      document.location.pathname == "/" ||
      document.location.pathname == "/home"
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/classes/")) {
      var currentTime: any,
        duration: any,
        paused: any,
        timestamps: any,
        video: HTMLVideoElement;
      video = document.querySelector("#vjs_video_3_html5_api");
      if (video == null) {
        video = document.querySelector(".video-player-module > div > video");
      }
      title = document
        .querySelector(".class-details-header-name")
        .textContent.trim();
      user = document
        .querySelector(".class-details-header-teacher")
        .textContent.trim()
        .replace(
          document.querySelector(".follow-button-wrapper-class-details")
            .textContent,
          ""
        );

      if (video !== null) {
        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
      }
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
        presenceData.details = "Viewing class:";
        presenceData.state = title;
        presenceData.smallImageKey = "reading";
      }
    } else if (document.location.pathname.includes("/profile/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing profile of:";
      presenceData.state = document.querySelector(".full-name").textContent;
    } else if (document.location.pathname.includes("/workshops/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing workshop:";
      presenceData.state = document.querySelector(".header-text").textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/workshops")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for workshops...";
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/browse")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing in type:";
      presenceData.state = document.querySelector(".main-header").textContent;
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/search")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = document.querySelector(
        "#search-form > div > div > div.search-input-wrapper.clear > div.ellipsis.query-placeholder.left"
      ).textContent;
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/your-classes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their classes";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/my-workshops")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their workshops";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/teach")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Writing their teacher application";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/lists/saved-classes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their saved classes";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/lists/watch-history")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their watch history";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/settings")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Changing their settings...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
