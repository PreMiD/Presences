const presence = new Presence({
    clientId: "845851140293656586"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
let video = {
    duration: 0,
    currentTime: 0,
    paused: true
};
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", (data) => {
    video = data;
});
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "tioanime"
    };
    if (video != null &&
        !isNaN(video.duration) &&
        document.location.pathname.includes("/ver")) {
        const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        var anime = document.querySelector(".anime-title").textContent;
        var titulo = anime.substring(0, anime.lastIndexOf(" "));
        var episodio = anime.split(" ");
        data.details = "Viendo " + titulo;
        data.state = "Episodio " + episodio[episodio.length - 1];
        data.buttons = [
            {
                label: "Ver Episodio",
                url: document.baseURI
            }
        ];
        (data.smallImageKey = video.paused ? "pause" : "play"),
            (data.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play),
            (data.startTimestamp = timestamps[0]),
            (data.endTimestamp = timestamps[1]);
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data, !video.paused);
    }
    else {
        data.details = (await strings).browsing;
        data.smallImageKey = "search";
        data.smallImageText = (await strings).browsing;
        data.buttons = [
            {
                label: "Ir al sitio web",
                url: document.baseURI
            }
        ];
        presence.setActivity(data);
    }
});
