setInterval(function() {

    if(document.location.hostname == "www.mega.nz/embed#") {

        var video : HTMLVideoElement = document.querySelector('#video');;

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

    } else {

        var video : HTMLVideoElement = document.querySelector('video');

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
