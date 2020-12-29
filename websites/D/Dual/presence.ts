const presence = new Presence({
  clientId: "741011161079873713"
});

let sname: string,
  sartist: string,
  duallisteners: string,
  dualislive: string,
  dualpresenter: string;

function metadataListener(): void {
  const data = JSON.parse(this.responseText);
  sname = data.song.title;
  sartist = data.song.artist;
  duallisteners = data.listeners.current;
  dualislive = data.dj.autoDJ;
  dualpresenter = data.dj.livedj;
}

function updateMetaData(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", metadataListener);
  xhttp.open("GET", "https://api.dual.pw/stats", true);
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
      largeImageKey: "logo",
      smallImageKey: "dualfm-play-v2"
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
