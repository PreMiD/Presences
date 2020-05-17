const presence = new Presence({ clientId: "545248528750870530" });
let sartist, strack, slisteners, sdj;

async function newStats(): Promise<void> {
  const data = await window
    .fetch("https://panelapi.boun.cc/v1/premidStats")
    .then((res) => res.json());
  strack = data.song.track;
  sartist = data.song.artist;
  sdj = data.presenter.name;
  slisteners = data.listeners.unique;
}

setInterval(newStats, 10000);
newStats();

const stamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "bouncelogo",
    details: `Streaming to ${slisteners} listeners`,
    state: `${strack || "Loading"} - ${sartist || "Loading"}`,
    smallImageText: `${sdj || "Loading"} is live!`,
    startTimestamp: stamp
  };
  if (sdj !== "AutoDJ") {
    presenceData.smallImageKey = "bouncelive";
  } else {
    delete presenceData.smallImageText;
  }
  presence.setActivity(presenceData);
});
