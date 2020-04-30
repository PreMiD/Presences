var presence = new Presence({ clientId: "705189441484095508" });

let ssong, slisteners, spresenter, strack;

setInterval(newStats, 2500);
newStats();


async function newStats() {
    let data = await window
        .fetch("https://radio.complexr.pw/api/nowplaying/1")
        .then((res) => res.json());
    ssong = data.now_playing.song.text;
    spresenter = data.live.is_live ? "Presenter " + data.live.streamer_name : "AutoDJ";
    slisteners = data.listeners.unique + " Listeners";
}

presence.on("UpdateData", () => {
    let stamp = Math.floor(Date.now());
    let info:presenceData = {
        largeImageKey: "complexlogo",
        details: `${spresenter} • ${slisteners || "Loading statistics"}`,
        state: `${ssong || "Loading song"}`,
        startTimestamp: stamp
    };
    presence.setActivity(info);
});