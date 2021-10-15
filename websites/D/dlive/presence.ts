const presence = new Presence({
  clientId: "609531561389588480"
});
let lastPlaybackState = null,
  playback: boolean,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  playback =
    document.querySelector("video.dplayer-video.dplayer-video-current") !== null
      ? true
      : false;

  if (!playback) {
    const presenceData: PresenceData = {
      largeImageKey: "lg"
    };

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    presence.setActivity(presenceData, true);
  }

  const video: HTMLVideoElement = document.querySelector(
    "video.dplayer-video.dplayer-video-current"
  );

  if (video !== null) {
    const videoTitle = document.querySelector<HTMLElement>(
        ".info-line-left.flex-box .flex-column.flex-justify-center div"
      ),
      streamer = document.querySelector<HTMLElement>(
        "div.channel-header span.dlive-name span.overflow-ellipsis"
      ),
      presenceData: PresenceData = {
        largeImageKey: "lg",
        smallImageKey: "live"
      };

    presence.setTrayTitle(videoTitle.innerText);

    presenceData.details = videoTitle.innerText;
    presenceData.state = streamer.innerText;
    presenceData.startTimestamp = browsingStamp;

    presence.setActivity(presenceData, true);
  }
});
