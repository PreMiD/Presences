setInterval(function() {

    if(document.location.hostname == "www.newgrounds.com") {

        var video : HTMLVideoElement = document.querySelector("#ngVideoPlayer_html5_api");

        if(video != undefined && !isNaN(video.duration)) {

            iframe.send(
            {
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
