const presence = new Presence({
    clientId: "782853565550034954"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  getTimestamps = (videoTime: number, videoDuration: number): number[] => {
    const startTime = Date.now();
    return [
      Math.floor(startTime / 1000),
      Math.floor(startTime / 1000) - videoTime + videoDuration
    ];
  },
  stationIDMap: { [key: string]: string } = {
    outerspace: "Outer Space",
    classic: "Classic",
    future: "Future",
    ultraremixes: "Ultra Remixes",
    garage: "The Garage",
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
    chiptunes: "Chiptunes",
    retroremix: "Retro Remix",
    classical: "Classical Remix",
    revolution: "Revolution",
    endofdays: "End of Days",
    silvagunner: "SilvaGunner x JSR",
    futuregeneration: "Future Generation",
    jetmashradio: "Jet Mash Radio",
    crazytaxi: "Crazy Taxi",
    ollieking: "Ollie King",
    toejamandearl: "Toe Jam & Earl",
    hover: "Hover",
    butterflies: "Butterflies",
    bonafidebloom: "BonafideBloom",
    djchidow: "DJ Chidow",
    verafx: "VeraFX",
    summer: "Summer",
    halloween: "Halloween",
    christmas: "Christmas",
    snowfi: "Snow-Fi"
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "jsrl"
    },
    audio = document.querySelector<HTMLAudioElement>("#audioPlayer"),
    songName = document.querySelector(
      "#programInformationText.objectSettings.touchableOff"
    ),
    buttons = await presence.getSetting<boolean>("buttons");

  if (songName.textContent.length < 1 || !audio) {
    presenceData.details = "Not tuned in.";
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = (await strings).pause;
  } else {
    const [, , , , , stationID] = document
      .querySelector<HTMLImageElement>("#graffitiSoul")
      .src.split("/");
    presenceData.largeImageKey = stationID;
    presenceData.state = stationIDMap[stationID];
    if (
      !audio.paused &&
      !document.querySelector('#loadingTrackCircle:not([style*="hidden"])')
    ) {
      if (await presence.getSetting<boolean>("song"))
        presenceData.details = songName.textContent;
      if (await presence.getSetting<boolean>("timestamp")) {
        [presenceData.startTimestamp, presenceData.endTimestamp] =
          getTimestamps(
            Math.floor(audio.currentTime),
            Math.floor(audio.duration)
          );
      }
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = (await strings).play;
    } else {
      presenceData.details = "Paused";
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = (await strings).pause;
    }

    if (buttons) {
      presenceData.buttons = [
        {
          label: "Tune In",
          url: document.URL
        }
      ];
    }
  }

  if (!presenceData.details && presenceData.state) presence.setActivity();
  else presence.setActivity(presenceData);
});
