{
  const presence = new Presence({
    clientId: "610102236374368267"
  });
  const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  presence.on("UpdateData", async () => {
    const player = document.querySelector(".player");
    if (player) {
      const title = player.querySelector(".player-cloudcast-title").textContent;
      const author = player.querySelector(".player-cloudcast-author-link")
        .textContent;

      const elapsed = player
        .querySelector(".player-time")
        .textContent.split(":");
      let elapsedSec;
      if (elapsed.length === 3) {
        elapsedSec =
          parseInt(elapsed[0]) * 60 * 60 +
          parseInt(elapsed[1]) * 60 +
          parseInt(elapsed[2]);
      } else {
        elapsedSec = parseInt(elapsed[0]) * 60 + parseInt(elapsed[1]);
      }

      const isPlaying = player.querySelector(".pause-state") ? true : false;

      const presenceData: PresenceData = {
        details: title,
        state: author,
        largeImageKey: "mixcloud",
        smallImageKey: isPlaying ? "play" : "pause",
        smallImageText: isPlaying
          ? (await strings).play
          : (await strings).pause,
        startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
      };

      if (isPlaying) {
        presence.setTrayTitle(title);
      } else {
        delete presenceData.startTimestamp;
      }

      presence.setActivity(presenceData);
    } else {
      presence.clearActivity();
    }
  });
}
