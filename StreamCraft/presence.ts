var presence = new Presence({
    clientId: "611670021986320394",
    mediaKeys: false
  }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);
  var gameName : any;
  var videoTitle : any, streamer : any;

  if(lastPlaybackState != playback) {

      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
      
  }

presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    largeImageKey: "lg"
  };

  var video: HTMLVideoElement = document.querySelector("div.player-wrap > div.player-box > div > video");

  if(!document.location.pathname || document.location.pathname == "/") {

    presenceData.details = "Home";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;

  } else if(document.location.pathname == "/games") {

    presenceData.details = "Games";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;

  } else if(document.location.pathname == "/ranking") {

    presenceData.details = "Rankings";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;

  } else if(document.location.pathname.includes("/gamelists/")) {

    gameName = document.querySelector("body > div > div.wrap.list-wrap > div.game-title > h1");

    presenceData.details = "Games";
    presenceData.state = gameName.innerText;
    presenceData.startTimestamp = browsingStamp;

  } else if (video !== null && document.location.pathname.startsWith("/user/")) {

    videoTitle = document.querySelector("div.channel > div.others > div.player-footer > div.video-info > h1.title");
    streamer = document.querySelector("div.side-bar > div.anchor-bar.sider-tab > p.nick-bar > span");

    presence.setTrayTitle(videoTitle.innerText);

    presenceData.details = videoTitle.innerText;
    presenceData.state = streamer.innerText;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "live";
  
  } else {

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;
    
    delete presenceData.state;

  }

  presence.setActivity(presenceData);


});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}