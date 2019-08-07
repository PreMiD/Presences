var iv = { 
    iFrameVideo: null, 
    currTime: null, 
    dur: null, 
    paused: true
};

setInterval(function() {

if(document.location.hostname == "player.hanime.tv") {

    var video : HTMLVideoElement;

    video = document.querySelector("#primary_video_html5_api");

    if(video.duration) {

        iv.iFrameVideo = video;
        iv.currTime = video.currentTime;
        iv.dur = video.duration;
        iv.paused = video.paused;

    } else {

        iv.iFrameVideo = null;
        iv.currTime = null;
        iv.dur = null;
        iv.paused = true;

    }


    iframe.send( { iv } );

}

}, 100);

/*setInterval(function() {

   if(document.location.hostname == "player.hanime.tv") {

        video = document.querySelector("#primary_video_html5_api")

        if(video[0]) {

            iv.iFrameVideo = '1';
            iv.currTime = '2';
            iv.dur = '3';
            iv.paused = false;


        }


        } else {

            iv.iFrameVideo = null;
            iv.currTime = null;
            iv.dur = null;
            iv.paused = true;


        }

    iframe.send(iv);

    }, 1000);*/