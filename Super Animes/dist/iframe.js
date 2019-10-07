
setInterval(function () {
    if (document.location.hostname == "www.openload.com") {
        var video = document.querySelector('video#olvideo_html5_api.vjs-tech'); 
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: video,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.location.hostname == "verystream.com") {
        var video = document.querySelector("#dogevideo");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: video,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else {
        var video = document.querySelector("#dogevideo");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: video,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
}, 100);
