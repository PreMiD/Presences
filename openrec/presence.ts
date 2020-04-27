var presence = new Presence({
    clientId: "612652426180296849"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  }),
  presenceData: presenceData = {
    largeImageKey: "logo"
  };

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

presence.on("UpdateData", async () => {
  var live: boolean =
    document.querySelector(".MovieTitle__Title-s181dg2v-4") != null;
  var video: HTMLVideoElement = document.querySelector(
    live ? ".openrec-video" : "#capture-play"
  );
  if (video !== null && !isNaN(video.duration)) {
    var title: any, game: any, timestamps: any;

    title = document.querySelector(
      live
        ? ".MovieTitle__Title-s181dg2v-4"
        : ".Component__CaptureTitle-s1nip9ch-16"
    );
    game = document.querySelector(
      live ? ".TagButton__Button-otjf40-0" : ".text-hover"
    );

    timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    presenceData.details =
      title !== null ? (title as HTMLElement).innerText : "Title not found...";
    presenceData.state =
      game !== null ? (game as HTMLElement).innerText : "Game not found...";
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = live
      ? "live"
      : video.paused
      ? "pause"
      : "play";
    presenceData.smallImageText = live
      ? (await strings).live
      : video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    if (video.paused || live) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (title !== null && game !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    var pageData: presenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
