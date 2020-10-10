const presence = new Presence({
  clientId: "764480822580871198"
});

let sname, sartist, listeners, islive, presenter;

function metadataListener(): void {
  const data = JSON.parse(this.responseText);
  sname = data.currentsong.song;
  sartist = data.currentsong.artist;
  listeners = data.listeners.current;
  islive = data.presenter.isencoderon;
  presenter = data.presenter.djname;
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
  } else if (!presenter) {
    presenter = "Loading...";
  } else if (!listeners) {
    listeners = "Loading...";
  }

  if (!islive) {
    if (changedetails) {
      presenceData.details = changedetails
        .replace("%song%", sname)
        .replace("%artist%", sartist);
    } else {
      presenceData.details = "🎵 | " + sartist + " - " + sname;
    }
    if (changestate) {
      presenceData.state = changestate.replace("%presenter%", presenter);
    } else {
      presenceData.state = "🎙️ | " + presenter;
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
      listeners
    );
  } else {
    presenceData.smallImageText = "Listeners: " + listeners;
  }

  presence.setActivity(presenceData, true);
  presence.setTrayTitle();
});
