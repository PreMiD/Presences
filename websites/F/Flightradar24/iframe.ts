const iframe = new iFrame();
let total: string,
  elapsed: string,
  isPlaying: boolean,
  currentTime: number,
  duration: number,
  paused: boolean;

if (document.location.href.includes("player.blubrry.com")) {
  iframe.on("UpdateData", async () => {
    //Get all the data you need out of the iFrame save them in variables and then send them using iframe.send
    if (document.querySelector(".sm2-inline-duration.time-total")) {
      total = document.querySelector(
        ".sm2-inline-duration.time-total"
      ).textContent;
    }
    if (document.querySelector(".time-elapsed"))
      elapsed = document.querySelector(".time-elapsed").textContent;

    if (document.querySelector("i.is-playing")) isPlaying = true;
    else isPlaying = false;

    iframe.send({
      //sending data
      elapsed,
      total,
      isPlaying
    });
  });
}

if (document.location.href.includes("www.youtube.com")) {
  iframe.on("UpdateData", async () => {
    //Get all the data you need out of the iFrame save them in variables and then send them using iframe.send
    if (document.querySelector("video.video-stream.html5-main-video")) {
      ({ currentTime } = document.querySelector<HTMLVideoElement>(
        "video.video-stream.html5-main-video"
      ));
      ({ duration } = document.querySelector<HTMLVideoElement>(
        "video.video-stream.html5-main-video"
      ));
      ({ paused } = document.querySelector<HTMLVideoElement>(
        "video.video-stream.html5-main-video"
      ));
    }

    iframe.send({
      //sending data
      currentTime,
      duration,
      paused
    });
  });
}
