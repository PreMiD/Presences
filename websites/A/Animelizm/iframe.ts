var iframe = new iFrame();

iframe.on("UpdateData", async () => {
    var video: HTMLVideoElement;

    if (document.querySelector(".jw-video") !== null) {
        video = document.querySelector(".jw-video");
    } else if (document.querySelector("#player") !== null) {
        video = document.querySelector("#player");
    }

    if (video != undefined && !isNaN(video.duration)) {
        iframe.send({
            current: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    }
});