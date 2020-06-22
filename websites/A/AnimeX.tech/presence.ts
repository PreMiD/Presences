const presence = new Presence({
  clientId: "663821800014348300"
});

let lastPlaybackState = null;
let playback;
let browsingStamp = Math.floor(Date.now() / 1000);

/**
 * Get Formatted Time In Seconds
 * @param {string} formattedTime Time formatted as HH:MM:SS or MM:SS
 */
function formattedTimeToSeconds(formattedTime: string): number {
  var b = formattedTime.split(":");
  if (b.length === 3) {
    return +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
  } else {
    return +b[0] * 60 + +b[1];
  }
}

/**
 * Get Timestamps
 * @param {string} videoTimeFormatted Current video time formatted as HH:MM:SS or MM:SS
 * @param {string} videoDurationFormatted Video duration formatted as HH:MM:SS or MM:SS
 */
function getTimestamps(
  videoTimeFormatted: string,
  videoDurationFormatted: string
): Array<number> {
  var videoTime = formattedTimeToSeconds(videoTimeFormatted);
  var videoDuration = formattedTimeToSeconds(videoDurationFormatted);
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const re = new RegExp("https://animex.tech/anime/(.*)/(.*)", "g");
  playback = re.exec(window.location.href) !== null ? true : false;
  const presenceData: PresenceData = {
    largeImageKey: "animex"
  };

  if (playback === false) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.state;
    delete presenceData.smallImageKey;
    presence.setActivity(presenceData, true);
  } else {
    const paused =
      document.querySelector("#animeme").classList[2] !== "jw-state-playing";
    const videoTitle: Node = document
      .evaluate("//body//h1[1]", document)
      .iterateNext();
    const episode: Array<string> = videoTitle.textContent.split(" - Episode ");
    const currentTime: string = document
      .evaluate(
        "//div[@class='jw-icon jw-icon-inline jw-text jw-reset jw-text-elapsed']",
        document
      )
      .iterateNext().textContent;
    const duration: string = document
      .evaluate(
        "//div[@class='jw-icon jw-icon-inline jw-text jw-reset jw-text-duration']",
        document
      )
      .iterateNext().textContent;
    if (!paused) {
      let timestamps: Array<number> = getTimestamps(currentTime, duration);
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presenceData.smallImageKey = paused ? "paused" : "playing";
    presenceData.smallImageText = paused ? "Paused" : "Playing";

    presenceData.details =
      episode[0] !== null ? episode[0] : "Title not found...";
    presenceData.state =
      episode[1] !== null ? "Episode " + episode[1] : "Episode not found...";

    presence.setActivity(presenceData, !paused);
  }
});
