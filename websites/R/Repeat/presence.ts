const presence = new Presence({ clientId: "729087463452049559" });
let sartist, strack, slisteners, sdj;

function newStats(): Promise<void> {
  window
    .fetch("https://repeatradio.net/api/v1/stats")
    .then((res) => res.json())
    .then((data) => {
      strack = data.song.track;
      sartist = data.song.artist;
      sdj = data.presenter.name.replace("Repeat", "AutoDJ");
      slisteners = data.listeners.total;
    });
}

setInterval(newStats, 10000);
newStats();

const stamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "repeatlogo",
    details: `Streaming to ${slisteners || 0} listeners`,
    state: `${strack || "Title"} - ${sartist || "Artist"}`,
    smallImageText: `${sdj || "AutoDJ"} is live!`,
    startTimestamp: stamp
  };

  if (sdj !== "AutoDJ") presenceData.smallImageKey = "bouncelive";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});
