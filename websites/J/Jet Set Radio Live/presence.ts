const presence = new Presence({
    clientId: "782853565550034954"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  getTimestamps = (videoTime: number, videoDuration: number): Array<number> => {
    const startTime = Date.now(),
      endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  },
  stationIDMap: { [key: string]: string } = {
    classic: "Classic",
    future: "Future",
    ultraremixes: "Ultra Remixes",
    ggs: "GG's",
    noisetanks: "Noise Tanks",
    poisonjam: "Poison Jam",
    rapid99: "Rapid 99",
    loveshockers: "Love Shockers",
    immortals: "The Immortals",
    doomriders: "Doom Riders",
    goldenrhinos: "Golden Rhinos",
    ganjah: "Ganjah",
    lofi: "Lo-Fi",
    siivagunner: "SilvaGunner x JSR",
    silvagunner: "SilvaGunner x JSR",
    futuregeneration: "Future Generation",
    jetmashradio: "Jet Mash Radio",
    djchidow: "DJ Chidow",
    hover: "Hover",
    butterflies: "Butterflies",
    toejamandearl: "Toe Jam & Earl",
    ollieking: "Ollie King",
    crazytaxi: "Crazy Taxi",
    revolution: "Revolution",
    endofdays: "End of Days"
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "jsrl"
    },
    audio: HTMLAudioElement = document.querySelector("#audioPlayer"),
    songName = document.querySelector(
      "#programInformationText.objectSettings.touchableOff"
    ),
    loadingSong = document.querySelector(
      '#loadingTrackCircle:not([style*="hidden"])'
    ),
    buttons = await presence.getSetting("buttons");

  if (songName.textContent.length < 1 || !audio) {
    presenceData.details = "Not tuned in.";
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = (await strings).pause;
  } else {
    const stationID = (<HTMLImageElement>(
        document.querySelector("#graffitiSoul")
      )).src.split("/")[5],
      timestamps = getTimestamps(
        Math.floor(audio.currentTime),
        Math.floor(audio.duration)
      );
    presenceData.largeImageKey = stationID;
    presenceData.state = stationIDMap[stationID];
    if (!audio.paused && !loadingSong) {
      if (await presence.getSetting("song"))
        presenceData.details = songName.textContent;
      if (await presence.getSetting("timestamp")) {
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      }
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = (await strings).play;
    } else {
      presenceData.details = "Paused";
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = (await strings).pause;
    }

    if (buttons)
      presenceData.buttons = [
        {
          label: "Tune In",
          url: document.URL
        }
      ];
  }

  if (presenceData.details == null && presenceData.state == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
