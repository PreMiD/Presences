// Note: Alternate hosts (openload, streammango) are currently disabled on the site (can't switch to them),
//       if this changes or they switch their main host, this will need to be updated.

var iframe = new iFrame();

const video: HTMLVideoElement = document.querySelector("#kwikPlayer");

iframe.send({
  current_time: video.currentTime,
  duration: video.duration,
  paused: video.paused
});
