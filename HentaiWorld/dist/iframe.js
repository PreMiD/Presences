var iframe = new iFrame();
iframe.on("UpdateData", () => {
    if (document.querySelector("video#video-player") !== null) {
    var hentai = document.querySelector("video#video-player");
    if (hentai !== isNaN) {
        var currentTime = hentai.currentTime;
        var duration = hentai.duration;
        var pause = hentai.paused;
        iframe.send({
            iframe_video: {
                iFrameVideo: true,
                currTime: currentTime,
                duration: duration,
                paused: pause
                }});
            }
        } else
        iframe.send({
            iframe_video: {
                iFrameVideo: false
                }});
    }
);
