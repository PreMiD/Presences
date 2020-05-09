// Note: Domain not restricted because cytube allows custom urls and a boatload of supported services

var iframe = new iFrame();

let sendback;

function send(): void {
  iframe.send(sendback);
}

iframe.on("UpdateData", () => {
  const link = document.location;

  if (document.getElementsByTagName("video").length != 0) {
    const video: HTMLVideoElement = document.getElementsByTagName("video")[0];
    sendback = {
      audio: false,
      current_time: video.currentTime,
      duration: video.duration,
      paused: video.paused,
      site: link.href
    };
  }
  send();
});

/*if (document.getElementsByTagName('video')[0]) {
} else if (document.getElementsByTagName('audio')[0]) {
    let audio: HTMLAudioElement = document.getElementsByTagName('audio')[0];
    audio.ondurationchange = () => {
        iframe.send({
            audio: true,
            current_time: audio.currentTime,
            duration: audio.duration,
            paused: audio.paused,
            site: link
        })
    }

    audio.ontimeupdate = () => {
        iframe.send({
            audio: true,
            current_time: audio.currentTime,
            duration: audio.duration,
            paused: audio.paused,
            site: link
        })
    }
}*/
