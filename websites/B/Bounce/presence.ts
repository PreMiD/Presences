const presence = new Presence({ clientId: "729087463452049559" });
let sartist, strack, slisteners, sdj;

async function newStats(): Promise<void> {
  const data = await window
    .fetch("https://stats.boun.cc")
    .then((res) => res.json());
  strack = data.song.track;
  sartist = data.song.artist;
  sdj = data.presenter.name.replace("Bounce", "AutoDJ");
  slisteners = data.listeners;
}

setInterval(newStats, 10000);
newStats();

const stamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
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
