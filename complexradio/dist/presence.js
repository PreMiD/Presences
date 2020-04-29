var presence = new Presence({ clientId: "705189441484095508" });

var song, listeners, presenter;

setInterval(radiostats, 2500);
radiostats();

async function radiostats() {
  var data = await window
    .fetch("https://radio.complexr.pw/api/nowplaying/1")
    .then((res) => res.json());
  ssong = data.now_playing.song.text;
  presenter = data.live.is_live ? "Presenter " + data.live.streamer_name : "AutoDJ";
  listeners = data.listeners.unique + " Listeners";
}

var stamp = Math.floor(Date.now());
presence.on("UpdateData", () => {
  var info = {
    largeImageKey: "complexlogo",
    details: `${presenter} • ${listeners || "Loading statistics"}`,
    state: `${song || "Loading song"}`,
    startTimestamp: stamp
  };
  presence.setActivity(info);
});