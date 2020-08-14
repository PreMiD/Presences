const presence = new Presence({
  clientId: "741011161079873713"
});

let sname, sartist, duallisteners, dualislive, dualpresenter;

function metadataListener(): void {
      const data = JSON.parse(this.responseText);
      sname = data.now.song;
      sartist = data.now.artist;
      duallisteners = data.listeners.current;
      dualislive = data.presenter.autoDJ;
      dualpresenter = data.presenter.username;
}

function updateMetaData(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", metadataListener);
  xhttp.open("GET", "https://api.dualfm.net/stats", true);
  xhttp.send();
}

setInterval(updateMetaData, 10000);
window.onload = function(): void {updateMetaData()};

let lastTitle;
let lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "dualfm-play-v2"
  };

  const toggleelaspe = await presence.getSetting("toggleelapse") || true;
  const changedetails = await presence.getSetting("changedetails");
  const changestate = await presence.getSetting("changestate");
  const changesmalltext = await presence.getSetting("changesmalltext");

  if (toggleelaspe) {
    if (lastTitle != sname) {
      lastTitle = sname;
      lastTimeStart = Math.floor(Date.now() / 1000);
    }

    presenceData.startTimestamp = lastTimeStart;
  } else {
    presenceData.startTimestamp = false;
  }

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
      presenceData.details = changedetails.replace('%song%', sname).replace('%artist%', sartist);
    } else {
      presenceData.details = "🎵 | " + sartist + " - " + sname;
    }
    if (changestate) {
      presenceData.state = changestate.replace('%presenter%', dualpresenter);
    } else {
      presenceData.state = "🎙️ | " + dualpresenter;
    }
  } else {
    if (changedetails) {
      presenceData.details = changedetails.replace('%song%', sname).replace('%artist%', sartist);
    } else {
      presenceData.details = "🎵 | " + sartist + " - " + sname;
    }
    if (changestate) {
      presenceData.state = changestate.replace('%presenter%', "AutoDJ");
    } else {
      presenceData.state = "🎙️ | " + "AutoDJ";
    }
  }

  if (changesmalltext) {
    presenceData.smallImageText = changesmalltext.replace('%listeners%', duallisteners);
  } else {
    presenceData.smallImageText = "Listeners: " + duallisteners;
  }

    presence.setActivity(presenceData, true);
    presence.setTrayTitle();
});