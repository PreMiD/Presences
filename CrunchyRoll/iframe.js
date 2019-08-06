setInterval(function () {
    if (document.location.hostname == "static.crunchyroll.com") {
        var video = document.querySelector('div#player video#player_html5_api');
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
        else {
            iframe.send({
                iframe_video: {
                    iFrameVideo: null,
                    currTime: null,
                    dur: null,
                    paused: null
                }
            });
        }
    }
}, 100);
