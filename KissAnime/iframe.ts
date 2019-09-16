var iframe = new iFrame()

setInterval(function() {

    if(document.location.hostname == "www.rapidvid.to" || document.location.hostname == "www.mp4upload.com") {

        var video : HTMLVideoElement = document.querySelector('video.vjs-tech');

        if(video != undefined && !isNaN(video.duration)) {

            iframe.send(
            {
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });


        }

    } else if(document.location.hostname == "www.novelplanet.me") {

        var video : HTMLVideoElement = document.querySelector('video.jw-video.jw-reset');
    
        if(video != undefined && !isNaN(video.duration)) {
    
            iframe.send(
            {
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
    
    
        }
    } else {

        var video : HTMLVideoElement = document.querySelector('video.vjs-tech');

        if(video != undefined && !isNaN(video.duration)) {

            iframe.send(
            {
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });


        }

    }

}, 100);
