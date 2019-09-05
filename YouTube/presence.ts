var presence = new Presence({
    clientId: "463097721130188830",
    mediaKeys: true
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

var pattern = "•";
var truncateAfter = function (str, pattern) {
  return str.slice(0, str.indexOf(pattern));
} 

presence.on("UpdateData", async () => {
  //* If user is on /watch?v=...
  var video: HTMLVideoElement = document.querySelector(".video-stream");
  if (video !== null && !isNaN(video.duration)) {
    //* Get required tags
    var oldYouTube: boolean = null;
    var YouTubeTV: boolean = null;
    var title;

    //* Checking if user has old YT layout.
    document.querySelector(".watch-title") !== null
      ? (oldYouTube = true)
      : (oldYouTube = false);

    document.querySelector(".player-video-title") !== null
      ? (YouTubeTV = true)
      : (YouTubeTV = false)

    //* Due to differences between old and new YouTube, we should add different selectors.
    if (!oldYouTube && !YouTubeTV) {
      title =
        document.location.pathname !== "/watch"
          ? document.querySelector(".ytd-miniplayer .title")
          : document.querySelector("h1 yt-formatted-string.ytd-video-primary-info-renderer");
    } else {
      if(oldYouTube) {
        if (document.location.pathname == "/watch")
          title = document.querySelector(".watch-title");
      } else if(YouTubeTV) {
        title = document.querySelector(".player-video-title");
      }
    }

    var uploaderTV : any, uploaderMiniPlayer : any, uploader2 : any, edited : boolean;

    edited = false;

    uploaderTV = document.querySelector(".player-video-details");

    uploaderMiniPlayer = document.querySelector("yt-formatted-string#owner-name");

    if(uploaderMiniPlayer !== null) {

      if(uploaderMiniPlayer.innerText == "YouTube") {

        edited = true;

        uploaderMiniPlayer.setAttribute("premid-value", "Listening to a playlist");
        
      }

    }
    uploader2 = document.querySelector("#owner-name a");

    var uploader : any =
      uploaderMiniPlayer !== null && uploaderMiniPlayer.innerText.length > 0
          ? uploaderMiniPlayer
          : uploader2 !== null && uploader2.innerText.length > 0
            ? uploader2
            : document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a") !== null 
              ? document.querySelector("#upload-info yt-formatted-string.ytd-channel-name a")
              : uploaderTV = truncateAfter(uploaderTV.innerText, pattern),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      live = Boolean(document.querySelector(".ytp-live")),
      presenceData: presenceData = {
        details: title.innerText,
        state: edited == true
        ? uploaderMiniPlayer.getAttribute("premid-value")
        : uploaderTV !== null
          ? uploaderTV
          : uploader.innerText,
        largeImageKey: "yt_lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    //* Remove timestamps if paused
    if (video.paused || live) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;

      if (live) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
      }
    }

    //* If tags are not "null"
    if (video && title !== null && uploader !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(".video-stream") as HTMLVideoElement;
      video.paused ? video.play() : video.pause();
      break;
    case "nextTrack":
      (document.querySelector(".ytp-next-button") as HTMLAnchorElement).click();
      break;
    case "previousTrack":
      (document.querySelector(".ytp-prev-button") as HTMLAnchorElement).click();
      break;
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