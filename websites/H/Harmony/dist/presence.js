const presence = new Presence({
    clientId: "529569623406936065"
});
let title, artist, dj, listeners;
function getData() {
    window
        .fetch("https://api.harmonyradio.pw/stats")
        .then((res) => res.json())
        .then((res) => {
        title = res.song.title || "Loading..";
        dj = res.dj.livedj || "Loading..";
        artist = res.song.artist || "Loading...";
    });
}
getData();
setInterval(getData, 5000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "premid",
        smallImageKey: "live"
    };
    if (document.location.hostname === "harmonyradio.pw") {
        presenceData.details = `💿 | ${title} by ${artist}`;
        presenceData.state = `🎙️ | ${dj}`;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
