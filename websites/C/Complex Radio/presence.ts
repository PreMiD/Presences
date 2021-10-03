let presence = new Presence({ clientId: "705189441484095508" }),

 ssong, slisteners, spresenter;

async function newStats(): Promise<void> {
  const data = await window
    .fetch("https://radio.complexr.pw/api/nowplaying/1")
    .then((res) => res.json());
  ssong = data.now_playing.song.text;
  spresenter = data.live.is_live
    ? `Presenter ${data.live.streamer_name}`
    : "AutoDJ";
  slisteners = `${data.listeners.unique} Listeners`;
}

setInterval(newStats, 2500);
newStats();

presence.on("UpdateData", async () => {
  const stamp = Math.floor(Date.now()),
   info: PresenceData = {
    largeImageKey: "complexlogo",
    details: `${spresenter} • ${slisteners || "Loading statistics"}`,
    state: `${ssong || "Loading song"}`,
    startTimestamp: stamp
  };
  presence.setActivity(info);
});
