const iframe = new iFrame();
iframe.on("UpdateData", async () => {
    const video = document.querySelector("#videojs-player_html5_api");
    if (video !== null) {
        iframe.send({
            currentTime: video.currentTime,
            paused: video.paused,
            duration: video.duration
        });
    }
});
