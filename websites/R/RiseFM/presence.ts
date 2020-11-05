const presence = new Presence({
  clientId: "773701779434897419"
});

function metadataListener(): void {
  const data = JSON.parse(this.responseText);
  const rname = data.now.title;
  const rartist = data.now.artist;
  const listeners = data.listeners.current;
  const islive = data.live.autoDJ;
  const presenter = data.live.userrname;
}

function doMeta(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", metadataListener);
  xhttp.open("GET", "https://api.risefm.pw/stats", true);
  xhttp.send();
}

setInterval(doMeta, 10000);
let ltStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {

const toggleelapse = await presence.getSetting("elapse");
const details = await presence.getSetting("details");
const state = await presence.getSetting("state");
const small = await presence.getSetting("changesmalltext");

  const presenceData: PresenceData = {
    largeImageKey: "rise",
    smallImageKey: "rplay",
    startTimestamp: toggleelapse ? ltStart : null
  };


  if (!rname) {
    lTitle = "Loading!";
    rname = "Loading!";
  } else if (!rartist) rartist = "Loading!";
  else if (!presenter) presenter = "Loading!";
  else if (!listeners) listeners = "Loading!";


  if (!islive) {
    if (details) presenceData.details = details.replace("%song%", rname).replace("%artist%", rartist);
    else presenceData.details = "🎵 " + rartist + " - " + rname;
    if (state) presenceData.state = state.replace("%presenter%", presenter);
    else presenceData.state = "️🎤 " + presenter;
  } else {
    if (details) presenceData.details = details.replace("%song%", rname).replace("%artist%", rartist);
    else presenceData.details = "🎵 " + rartist + " - " + rname;
    if (state) presenceData.state = state.replace("%presenter%", "AutoDJ");
    else presenceData.state = "🎤️ " + "AutoDJ";
  }

  if (small) presenceData.smallImageText = small.replace("%listeners%", listeners);
  else presenceData.smallImageText = "Listeners: " + listeners;

  presence.setActivity(presenceData);
});
