const presence = new Presence({
    clientId: "793575533605945344"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "pfp"
  };

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching ascii animations";
  } else if (document.location.pathname.includes("cozyvec")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Making a cozyvec plot";
  } else if (document.location.pathname.includes("ripmixnames")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing rip statistics";
  } else if (document.location.pathname.includes("randomsiiva")) {
    const currentChannel = document.querySelector("#author").textContent || 'SiIvaGunner',
    currentTitle = document.querySelector("#nowplaying").textContent || null,
    timeOver = Math.floor(parseInt(document.querySelector("#timeover").textContent)) || null;
    presenceData.state = "Random " + currentChannel + " rip";
    presenceData.details = currentTitle;
    if (currentChannel == 'SiIvaGunner') {
      presenceData.largeImageKey = "siiva";
    } else if (currentChannel == "TimmyTurnersGrandDad") {
      presenceData.largeImageKey = "ttgd";
    } else if (currentChannel == "VvvvvaVvvvvvr") {
      presenceData.largeImageKey = "vavr";
    } else {
      presenceData.largeImageKey = "mm2wood";
    }
    if (!isNaN(timeOver)) {
      presenceData.endTimestamp = timeOver;
      if (!timeOver) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
      } else {
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).play;
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
