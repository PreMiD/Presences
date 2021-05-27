{
  const presence = new Presence({
    clientId: "610850440266907648"
  });
  const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  function getTimesec(
    elapsedString = "00:00",
    durationString = "00:00",
    separator = ":"
  ): { elapsedSec: number; durationSec: number } {
    const elapsed = elapsedString.split(separator);
    const duration = durationString.split(separator);

    let elapsedSec: number, durationSec: number;

    switch (elapsed.length) {
      case 3: {
        elapsedSec =
          parseInt(elapsed[0]) * 60 * 60 +
          parseInt(elapsed[1]) * 60 +
          parseInt(elapsed[2]);
        break;
      }
      case 2: {
        elapsedSec = parseInt(elapsed[0]) * 60 + parseInt(elapsed[1]);
        break;
      }
      case 1: {
        elapsedSec = parseInt(elapsed[0]);
        break;
      }
    }

    switch (duration.length) {
      case 3: {
        durationSec =
          parseInt(duration[0]) * 60 * 60 +
          parseInt(duration[1]) * 60 +
          parseInt(duration[2]);
        break;
      }
      case 2: {
        durationSec = parseInt(duration[0]) * 60 + parseInt(duration[1]);
        break;
      }
      case 1: {
        durationSec = parseInt(duration[0]);
        break;
      }
    }

    return { elapsedSec: elapsedSec, durationSec: durationSec };
  }

  presence.on("UpdateData", async () => {
    if (
      location.pathname.startsWith("/music/listen") &&
      document.querySelector(".now-playing-info-wrapper")
    ) {
      const title = document.querySelector(
        "#currently-playing-title"
      ).textContent;
      const artist =
        document.querySelector("#player-artist").textContent ||
        document
          .querySelector(
            "#music-content > div.g-content.view-transition > div > table > tbody > tr.song-row.currently-playing > td:nth-child(1) > span"
          )
          .textContent.split(" - ")[1];
      const album =
        document.querySelector(".player-album").textContent ||
        document
          .querySelector(
            "#music-content > div.g-content.view-transition > div > table > tbody > tr.song-row.currently-playing > td:nth-child(1) > span"
          )
          .textContent.split(" - ")[0];

      const isPlaying = !!document.querySelector(
        "#player-bar-play-pause.playing"
      );

      const presenceData: PresenceData = {
        details: title,
        state: `${artist} - ${album}`,
        largeImageKey: "gpm",
        smallImageKey: isPlaying ? "play" : "pause",
        smallImageText: isPlaying ? (await strings).play : (await strings).pause
      };

      if (!document.hidden) {
        const elapsed = document.querySelector(
          "#time_container_current"
        ).textContent;
        presenceData.startTimestamp =
          Math.floor(Date.now() / 1000) - getTimesec(elapsed).elapsedSec;
      }

      if (isPlaying) {
        presence.setTrayTitle(title);
      } else {
        delete presenceData.startTimestamp;
      }

      presence.setActivity(presenceData);
    }
  });
}
