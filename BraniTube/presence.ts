const presence = new Presence({
  clientId: "611657413350654010",
  mediaKeys: true
});
const stringsPromise = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});
const startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "lg"
  };
  const videoElement: HTMLVideoElement = document.querySelector(
    "#player > div.jw-media.jw-reset > video"
  );

  if (videoElement !== null) {
    const videoTitle: HTMLDivElement = document.querySelector(
      "div.playlistAssistir > div.infosAtulEpisodio > div.nomeAnime"
    );
    const episode: HTMLDivElement = document.querySelector(
      "div.playlistAssistir > div.infosAtulEpisodio > div.epEpisodio"
    );
    const timestamps = getTimestamps(
      Math.floor(videoElement.currentTime),
      Math.floor(videoElement.duration)
    );

    const strings = await stringsPromise;

    presenceData.details = videoTitle.innerText;
    presenceData.state = episode.innerText;
    presenceData.smallImageKey = videoElement.paused ? "pause" : "play";
    presenceData.smallImageText =
      strings[videoElement.paused ? "pause" : "play"];
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(videoTitle.innerText);
  } else {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = startTimestamp;

    presence.setTrayTitle();
  }

  presence.setActivity(presenceData, true);
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(
        "#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      ) as HTMLVideoElement;
      video.paused ? video.play() : video.pause();
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
