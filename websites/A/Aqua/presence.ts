const presence = new Presence({
  clientId: "806984559308046336"
});

let sname: string,
  sartist: string,
  aqualisteners: string,
  aquapresenter: string;

function metadataListener(): void {
  const data = JSON.parse(this.responseText);
  sname = data.nowplaying.title;
  sartist = data.nowplaying.artist;
  aqualisteners = data.listeners.total;
  aquapresenter = data.presenter.name;
}

function updateMetaData(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", metadataListener);
  xhttp.open("GET", "https://api.itsaqua.net/stats", true);
  xhttp.send();
}

setInterval(updateMetaData, 10000);
window.onload = function (): void {
  updateMetaData();
};

let lastTitle: string,
  lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
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
  } else if (!aquapresenter) {
    aquapresenter = "Loading...";
  } else if (!aqualisteners) {
    aqualisteners = "Loading...";
  }

  if (aquapresenter !== "AutoDJ") {
    if (changedetails) {
      presenceData.details = changedetails
        .replace("%song%", sname)
        .replace("%artist%", sartist);
    } else {
      presenceData.details = "🎵 | " + sartist + " - " + sname;
    }
    if (changestate) {
      presenceData.state = changestate.replace("%presenter%", aquapresenter);
    } else {
      presenceData.state = "🎙️ | " + aquapresenter;
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
      aqualisteners
    );
  } else {
    presenceData.smallImageText = "Listeners: " + aqualisteners;
  }

  presence.setActivity(presenceData, true);
  presence.setTrayTitle();
});
