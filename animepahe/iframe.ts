// Note: Alternate hosts (openload, streammango) are currently disabled on the site (can't switch to them),
//       if this changes or they switch their main host, this will need to be updated.

var iframe = new iFrame();

let video: HTMLVideoElement = document.querySelector("#kwikPlayer");

video.ondurationchange = () => {
    iframe.send({
        current_time: video.currentTime,
        duration: video.duration,
        paused: video.paused
    })
}

video.ontimeupdate = () => {
    iframe.send({
        current_time: video.currentTime,
        duration: video.duration,
        paused: video.paused
    })
}