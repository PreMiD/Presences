const presence = new Presence({ clientId: "692781164456575107" });
let ssong, slisteners, sdj;

async function newStats(): Promise<void> {
  const data = await window
    .fetch("https://radio.expressradio.co/api/nowplaying/1")
    .then((res) => res.json());
  ssong = data.now_playing.song.text;
  sdj = data.live.is_live ? "DJ " + data.live.streamer_name : "AutoDJ";
  slisteners = data.listeners.unique + " Listeners";
}

setInterval(newStats, 5000);
newStats();

const stamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const info: PresenceData = {
    largeImageKey: "expresslogo",
    details: `${sdj} • ${slisteners || "Loading statistics"}`,
    state: `${ssong || "Loading song"}`,
    startTimestamp: stamp
  };
  presence.setActivity(info);
});
