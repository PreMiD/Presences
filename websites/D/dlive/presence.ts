let presence = new Presence({
  clientId: "609531561389588480"
}),

 lastPlaybackState = null,
 playback,
 browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
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
    let videoTitle: any, streamer: any;

    videoTitle = document.querySelector(
      ".info-line-left.flex-box .flex-column.flex-justify-center div"
    );
    streamer = document.querySelector(
      "div.channel-header span.dlive-name span.overflow-ellipsis"
    );

    const presenceData: PresenceData = {
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
