var iframe = new iFrame();

iframe.on("UpdateData", async () => {
    if (document.querySelector("#play0") != null) {
        const video: HTMLVideoElement = document.querySelector("#play0");
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    }

    if (document.querySelector("#play1_html5_api") != null) {
        const video: HTMLVideoElement = document.querySelector("#play1_html5_api");
        if (video != null) {
            const played = video.duration != 0;
            iframe.send ({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    }

    if (document.querySelector("#video") != null) {
        const video: HTMLVideoElement = document.querySelector("#video");
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    }

    if (document.querySelector("#video-js-video_html5_api") != null) {
        const video: HTMLVideoElement = document.querySelector("#video-js-video_html5_api");
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    }

    if (document.querySelector("video") != null) {
        const video: HTMLVideoElement = document.querySelector("video");
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    }

    if (document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") != null) {
        const video: HTMLVideoElement = document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                currentTime: video.currentTime,
                duration: video.duration,
                played,
                paused: video.paused
            });
        }
    }
});