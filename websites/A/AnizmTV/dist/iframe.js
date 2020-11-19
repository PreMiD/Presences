const iframe = new iFrame();
iframe.on("UpdateData", async () => {
    const video = document.querySelector("video");
    if (video) {
        const videoMessage = {
            paused: video.paused,
            duration: video.duration,
            currentTime: video.currentTime
        };
        iframe.send(videoMessage);
    }
});
