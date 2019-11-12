const iframe = new iFrame();

setInterval(function () {
    let video = document.querySelector("video");

    if (video && video.currentTime && video.duration && video.paused !== undefined) {
        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    } else {
        iframe.send({
            error: true
        });
    };
}, 100);