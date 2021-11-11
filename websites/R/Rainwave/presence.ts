const presence = new Presence({
    clientId: "618233809481236491"
  }),
  timeElapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/pages/playback_history")) {
    presence.setActivity({
      details: "Looking at playback history...",
      largeImageKey: "rainwv"
    });
  } else if (document.location.pathname.startsWith("/forums")) {
    presence.setActivity({
      details: "Browsing the forums...",
      largeImageKey: "rainwv"
    });
  } else if (document.location.pathname.startsWith("/api4")) {
    presence.setActivity({
      details: "Looking at the API...",
      largeImageKey: "rainwv"
    });
  } else if (
    document.querySelector("div#r4_audio_player.unselectable.playing") === null
  ) {
    presence.setActivity({
      details: "Not listening.",
      largeImageKey: "rainwv",
      smallImageKey: "pause"
    });
  } else {
    presence.setActivity({
      details: `${
        document.querySelector(
          "div.song.now_playing > div.song_content > div.title"
        ) as HTMLDivElement.textContent
      } by ${
        document.querySelector(
          "div.song.now_playing > div.song_content > div.artist"
        ) as HTMLDivElement.textContent
      }`,
      state: `Listening on ${
        document.querySelector(
          "a.station.selected_station > div.station_details > div.station_name"
        ).textContent
      }`,
      largeImageKey: "rainwv",
      smallImageKey: "live",
      startTimestamp: timeElapsed
    });
  }
});
