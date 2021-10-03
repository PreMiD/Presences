const presence = new Presence({
    clientId: "618233809481236491"
  }),
  timeElapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/pages/playback_history")) {
    const presenceData: PresenceData = {
      details: "Looking at playback history...",
      largeImageKey: "rainwv"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/forums")) {
    const presenceData: PresenceData = {
      details: "Browsing the forums...",
      largeImageKey: "rainwv"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/api4")) {
    const presenceData: PresenceData = {
      details: "Looking at the API...",
      largeImageKey: "rainwv"
    };
    presence.setActivity(presenceData);
  } else {
    const stationName = document.querySelector(
        "a.station.selected_station > div.station_details > div.station_name"
      ),
      songName = document.querySelector(
        "div.song.now_playing > div.song_content > div.title"
      ) as HTMLDivElement,
      artistName = document.querySelector(
        "div.song.now_playing > div.song_content > div.artist"
      ) as HTMLDivElement,
      playCheck = document.querySelector(
        "div#r4_audio_player.unselectable.playing"
      );
    if (playCheck === null) {
      const presenceData: PresenceData = {
        details: "Not listening.",
        largeImageKey: "rainwv",
        smallImageKey: "pause"
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: PresenceData = {
        details: `${songName.innerText} by ${artistName.innerText}`,
        state: `Listening on ${stationName.textContent}`,
        largeImageKey: "rainwv",
        smallImageKey: "live",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    }
  }
});
