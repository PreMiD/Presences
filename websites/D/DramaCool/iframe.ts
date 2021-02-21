const iframe = new iFrame();

iframe.on("UpdateData", async () => {
    if (document.querySelector("div.jw-media.jw-reset > video")) {
        const video: HTMLVideoElement = document.querySelector("div.jw-media.jw-reset > video");

        if (video && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                currTime: video.currentTime,
                dur: video.duration,
                paused: video.paused }});
        }
    }
});
