var iframe = new iFrame();

iframe.on("UpdateData", async () => {
    if (document.querySelector("video.jw-video.jw-reset") != null) {
        const video: HTMLVideoElement = document.querySelector("video.jw-video.jw-reset");
        const played = video.duration != 0;
        if (video != null) {
            iframe.send({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    };
});