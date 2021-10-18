const presence = new Presence({
  clientId: "701157425318854756"
});

let sname: string,
  sartist: string,
  keylisteners: string,
  keyislive: boolean,
  keypresenter: string;

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

let lastTitle: string,
  lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "keyfm",
      smallImageKey: "keyfm-play"
    },
    toggleelaspe = await presence.getSetting("toggleelapse"),
    changedetails = await presence.getSetting("changedetails"),
    changestate = await presence.getSetting("changestate"),
    changesmalltext = await presence.getSetting("changesmalltext");

  if (toggleelaspe) {
    if (lastTitle !== sname) {
      lastTitle = sname;
      lastTimeStart = Math.floor(Date.now() / 1000);
    }

    presenceData.startTimestamp = lastTimeStart;
  } else delete presenceData.startTimestamp;

  if (!sname) {
    lastTitle = "Loading...";
    sname = "Loading...";
  }
  sartist ??= "Loading...";
  keypresenter ??= "Loading...";
  keylisteners ??= "Loading...";

  if (!keyislive) {
    if (changedetails) {
      presenceData.details = changedetails
        .replace("%song%", sname)
        .replace("%artist%", sartist);
    } else presenceData.details = `🎵 | ${sartist} - ${sname}`;

    if (changestate)
      presenceData.state = changestate.replace("%presenter%", keypresenter);
    else presenceData.state = `🎙️ | ${keypresenter}`;
  } else {
    if (changedetails) {
      presenceData.details = changedetails
        .replace("%song%", sname)
        .replace("%artist%", sartist);
    } else presenceData.details = `🎵 | ${sartist} - ${sname}`;

    if (changestate)
      presenceData.state = changestate.replace("%presenter%", "AutoDJ");
    else presenceData.state = "🎙️ | " + "AutoDJ";
  }

  if (changesmalltext) {
    presenceData.smallImageText = changesmalltext.replace(
      "%listeners%",
      keylisteners
    );
  } else presenceData.smallImageText = `Listeners: ${keylisteners}`;

  presence.setActivity(presenceData, true);
  presence.setTrayTitle();
});
