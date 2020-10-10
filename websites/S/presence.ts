const presence = new Presence({
    clientId: "764480822580871198"
  });
  
  let sname, sartist, duallisteners, dualislive, dualpresenter;
  
  function metadataListener(): void {
    const data = JSON.parse(this.responseText);
    sname = data.currentsong.song;
    sartist = data.currentsong.artist;
    duallisteners = data.listeners.current;
    dualislive = data.presenter.isencoderon;
    dualpresenter = data.presenter.djname;
  }
  
  function updateMetaData(): void {
    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", metadataListener);
    xhttp.open("GET", "https://scradio.pw/api/nowplaying.json", true);
    xhttp.send();
  }
  
  setInterval(updateMetaData, 10000);
  window.onload = function (): void {
    updateMetaData();
  };
  
  let lastTitle,
    lastTimeStart = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "scr_rich",
        smallImageKey: "listeners"
      },
      changedetails = await presence.getSetting("changedetails"),
      changestate = await presence.getSetting("changestate"),
      changesmalltext = await presence.getSetting("changesmalltext");
  
    if (lastTitle != sname) {
      lastTitle = sname;
      lastTimeStart = Math.floor(Date.now() / 1000);
    }
  
    presenceData.startTimestamp = lastTimeStart;
  
    if (!sname) {
      lastTitle = "Loading...";
      sname = "Loading...";
    } else if (!sartist) {
      sartist = "Loading...";
    } else if (!dualpresenter) {
      dualpresenter = "Loading...";
    } else if (!duallisteners) {
      duallisteners = "Loading...";
    }
  
    if (!dualislive) {
      if (changedetails) {
        presenceData.details = changedetails
          .replace("%song%", sname)
          .replace("%artist%", sartist);
      } else {
        presenceData.details = "🎵 | " + sartist + " - " + sname;
      }
      if (changestate) {
        presenceData.state = changestate.replace("%presenter%", dualpresenter);
      } else {
        presenceData.state = "🎙️ | " + dualpresenter;
      }
    } else {
      if (changedetails) {
        presenceData.details = changedetails
          .replace("%song%", sname)
          .replace("%artist%", sartist);
      } else {
        presenceData.details = "🎵 | " + sartist + " - " + sname;
      }
      if (changestate) {
        presenceData.state = changestate.replace("%presenter%", "AutoDJ");
      } else {
        presenceData.state = "🎙️ | " + "AutoDJ";
      }
    }
  
    if (changesmalltext) {
      presenceData.smallImageText = changesmalltext.replace(
        "%listeners%",
        duallisteners
      );
    } else {
      presenceData.smallImageText = "Listeners: " + duallisteners;
    }
  
    presence.setActivity(presenceData, true);
    presence.setTrayTitle();
  });
  