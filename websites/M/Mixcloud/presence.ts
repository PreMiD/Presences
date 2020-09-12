{
  const presence = new Presence({
    clientId: "610102236374368267"
  });
  const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  presence.on("UpdateData", async () => {
    const player = document.querySelector(".playerQueue__PlayerWrapper-sc-1t5b3u2-0");
    if (player) {
      const title = player.querySelector(".PlayerControls__ShowTitle-vo7mt3-0").textContent;
      const author = player.querySelector(".PlayerControls__ShowOwnerName-vo7mt3-2")
        .textContent;

      const elapsed = player
        .querySelector(".PlayerSliderComponent__StartTime-z3gy2f-1")
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

      const isPlaying = player.querySelector(".PlayButton__PlayButtonIcon-rvh8d9-2") ? true : false;

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
