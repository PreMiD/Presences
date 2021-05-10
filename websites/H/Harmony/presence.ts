var presence = new Presence({ clientId: "841391606593486918" });

var ssong:any, slisteners:any, spresenter:any, simage: any;;

async function newStats(): Promise<void> {
  var data = await window
    .fetch("https://staff.weareharmony.net/api/nowplaying")
    .then((res) => res.json());
  ssong = data.song.title + ' • ' + data.song.artist;
  spresenter = data.onAir.name
    ? data.onAir.name
    : "AutoDJ";
  slisteners = data.listeners + " Listeners";
  simage = data.song.cover;
}

setInterval(newStats, 2500);
newStats();

presence.on("UpdateData", async () => {
  var stamp = Math.floor(Date.now());
  const info: PresenceData = {
    largeImageKey: "harm",
    smallImageKey: "harm",
    smallImageText: "https://weareharmony.net",
    details: `${spresenter} • ${slisteners || "Loading statistics"}`,
    state: `${ssong || "Loading song"}`,
    startTimestamp: stamp
  };
  presence.setActivity(info);
});
