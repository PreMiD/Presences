{
  const presence = new Presence({
      clientId: "611012705306017792"
    }),
    strings = presence.getStrings({
      play: "presence.playback.playing",
      pause: "presence.playback.paused"
    });

  presence.on("UpdateData", async () => {
    if (
      location.pathname.startsWith("/animestore/sc_d_pc") &&
      document.querySelector("#video")
    ) {
      const video: HTMLVideoElement = document.querySelector("#video"),
        title = document.querySelector(".backInfoTxt1").textContent,
        episode = document.querySelector(".backInfoTxt2").textContent,
        epName = document.querySelector(".backInfoTxt3").textContent,
        isPlaying = !video.paused,
        elapsedSec = Math.floor(video.currentTime),
        presenceData: PresenceData = {
          details: `${title} - ${episode}`,
          state: epName,
          largeImageKey: "danime",
          smallImageKey: isPlaying ? "play" : "pause",
          smallImageText: isPlaying
            ? (await strings).play
            : (await strings).pause,
          startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
        };

      if (isPlaying) presence.setTrayTitle(title);
      else delete presenceData.startTimestamp;

      presence.setActivity(presenceData);
    }
  });
}
