var presence = new Presence({ clientId: "545248528750870530" });
let sartist, strack, slisteners, sdj;
setInterval(newStats, 10000);
newStats();

async function newStats() {
  let data = await window
    .fetch("https://panelapi.boun.cc/v1/premidStats")
    .then((res) => res.json());
  strack = data.song.track;
  sartist = data.song.artist;
  sdj = data.presenter.name;
  slisteners = data.listeners.unique;
}

let stamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  let info = {
    largeImageKey: "bouncelogo",
    details: `Streaming to ${slisteners} listeners`,
    state: `${strack || "Loading"} - ${sartist || "Loading"}`,
    smallImageText: `${sdj || "Loading"} is live!`,
    startTimestamp: stamp,
  };
  if (sdj !== "AutoDJ") {
    info.smallImageKey = "bouncelive";
  } else {
    delete smallImageKey;
  }
  presence.setActivity(info);
});
