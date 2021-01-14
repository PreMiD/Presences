const presence = new Presence({
  clientId: "701157425318854756"
});

let sname, sartist, keylisteners, keyislive, keypresenter;

function metadataListener(): void {
  const data = JSON.parse(this.responseText);
  sname = data.playing.song;
  sartist = data.playing.artist;
  keylisteners = data.listeners.current;
  keyislive = data.currentDJ.autoDJ;
  keypresenter = data.currentDJ.username;
}

function updateMetaData(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", metadataListener);
  xhttp.open("GET", "https://api.keyfm.net/stats", true);
  xhttp.send();
}

setInterval(updateMetaData, 10000);
window.onload = function (): void {
  updateMetaData();
};

let lastTitle;
let lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "keyfm",
    smallImageKey: "keyfm-play"
  };

  const toggleelaspe = await presence.getSetting("toggleelapse");
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
  } else if (!keypresenter) {
    keypresenter = "Loading...";
  } else if (!keylisteners) {
    keylisteners = "Loading...";
  }

  if (!keyislive) {
    if (changedetails) {
      presenceData.details = changedetails
        .replace("%song%", sname)
        .replace("%artist%", sartist);
    } else {
      presenceData.details = "🎵 | " + sartist + " - " + sname;
    }
    if (changestate) {
      presenceData.state = changestate.replace("%presenter%", keypresenter);
    } else {
      presenceData.state = "🎙️ | " + keypresenter;
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
      keylisteners
    );
  } else {
    presenceData.smallImageText = "Listeners: " + keylisteners;
  }

  presence.setActivity(presenceData, true);
  presence.setTrayTitle();
});
