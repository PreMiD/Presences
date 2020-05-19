var presence = new Presence({ clientId: "705189441484095508" });

var ssong, slisteners, spresenter;

async function newStats(): Promise<void> {
  var data = await window
    .fetch("https://radio.complexr.pw/api/nowplaying/1")
    .then((res) => res.json());
  ssong = data.now_playing.song.text;
  spresenter = data.live.is_live
    ? "Presenter " + data.live.streamer_name
    : "AutoDJ";
  slisteners = data.listeners.unique + " Listeners";
}

setInterval(newStats, 2500);
newStats();

presence.on("UpdateData", async () => {
  var stamp = Math.floor(Date.now());
  const info: presenceData = {
    largeImageKey: "complexlogo",
    details: `${spresenter} • ${slisteners || "Loading statistics"}`,
    state: `${ssong || "Loading song"}`,
    startTimestamp: stamp
  };
  presence.setActivity(info);
});
