const iframe = new iFrame();

setInterval(function () {
    let video = document.querySelector("video");

    if (!video || !video.duration || video.paused == undefined || !video.currentTime || video && isNaN(video.duration)) {
        iframe.send({
            error: true
        });
    };

    if (document.location.hostname == "lb.dizilabapi.com") {
        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    } else if (document.location.hostname == "vidmoly.to") {
        video = document.querySelectorAll("video")[1];

        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    } else if (document.location.hostname == "rapidvid.to") {
        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    } else if (video && video.currentTime && video.duration && video.paused !== undefined) {
        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    }
}, 100);