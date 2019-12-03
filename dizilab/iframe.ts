const iframe = new iFrame();

setInterval(function () {
    let video;

    switch (document.location.hostname) {
        case "vidmoly.to":
            video = document.querySelector("video.jw-video");
            break;
        default:
            video = document.querySelector("video");
            break;
    }

    if (!video || !video.duration || video.paused == undefined || !video.currentTime || video && isNaN(video.duration)) {
        iframe.send({
            error: true
        });
    } else if (document.location.hostname == "vidmoly.to") {
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