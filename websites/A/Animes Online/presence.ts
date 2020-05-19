var presence = new Presence({
    clientId: "641243628903333900"
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
    largeImageKey: "ao"
  };

  if (document.location.hostname == "www.animesonline.cz") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/animes-dublado/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(
        "#wrapper > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div.panel.panel-primary > div.panel-heading > h1 > span"
      );
      presenceData.details = "Viewing anime dubbed:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/animes-dublado")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for anime dubbeds...";
    } else if (document.location.pathname.includes("/anime/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(
        "#wrapper > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div.panel.panel-primary > div.panel-heading > h1 > span"
      );
      presenceData.details = "Viewing anime:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/anime")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for anime...";
    } else if (document.location.pathname.includes("/genero")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing a genre...";
    } else if (document.location.pathname.includes("/videos/")) {
      var currentTime: any,
        duration: any,
        paused: any,
        timestamps: any,
        video: HTMLVideoElement;
      video = document.querySelector(
        "#playersdbeta > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      );
      title = document.querySelector(
        "#wrapper > div.container > div:nth-child(1) > div:nth-child(2) > h1"
      ).textContent;
      currentTime = video.currentTime;
      duration = video.duration;
      paused = video.paused;
      timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = title.split("-")[0];
        presenceData.state = title.replace(title.split("-")[0] + "- ", "");

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looing at:";
        presenceData.state = title;
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
