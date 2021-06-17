const presence = new Presence({
    clientId: "854736482883338300"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
  title: Element,
  air: Element,
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  time_st1: Element,
  paused: boolean,
  lastPlaybackState: boolean = null,
  playback,
  search: Element;

presence.on(
  "iFrameData",
  (data: {
    iframe_video: {
      iFrameVideo: boolean;
      currTime: number;
      dur: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframe_video.dur !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.dur;
      paused = data.iframe_video.paused;
    }
    if (lastPlaybackState != playback) {
      lastPlaybackState = playback;
      browsingStamp = Math.floor(Date.now() / 1000);
    }
  }
);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "sibnet"
    };
  if (document.location.href.match(/\/shell\.php\?videoid=\d*/)[0]) {
    let title = document.querySelector("head > meta:nth-child(2)");
    presenceData.details = "Смотрит: \n";
    presenceData.state = title.getAttribute("content");
    
    presenceData.smallImageText =  String((currentTime / 60).toFixed(2).replace(".",":"))+"/"+String((duration / 60).toFixed(2).replace(".",":"));
  if (paused) {
  	presenceData.smallImageKey = "pause";
  } else {
    presenceData.smallImageKey = "play";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
}});
