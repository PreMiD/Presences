var presence = new Presence({
    clientId: "814910404429217852" // CLIENT ID FOR YOUR PRESENCE
  }), 
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any, views: any, air: any, search: any;
var iFrameVideo: boolean, currentTime: any, duration: any, paused: any;

var lastPlaybackState = null;
var playback;

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", (data: any) => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

 
presence.on("UpdateData", async () => {
	  var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
    presenceData: PresenceData = {
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
      startTimestamp: timestamps[0],
	  largeImageKey: "favicon",
      endTimestamp: timestamps[1] 
    };
	
 
   if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      } 
	  
  else if (document.location.pathname.includes("/anime-list")) {
	const title = document.querySelector(".lahead").textContent.trim();
    presenceData.details = title;
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } 

  else if (document.location.pathname.includes("/anschauen/")) {
	const title = document.querySelector(".navmiddle").textContent.trim();
    presenceData.details = "Schaut : " + title;
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
	presenceData.buttons = [
        {
          label: "View " + title,
          url: document.URL
        }
	 ]
  } 

  else if (document.location.pathname.includes("/anime-top100")) {
    presenceData.details = "Schaut welche Animes sich in der Top 100 befindet.";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } 

  else if (document.location.pathname.includes("/info/")) {
	const title = document.querySelector("animename").textContent.trim();
    presenceData.details = title + " | Anime Info";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  }

  else if (document.location.pathname.includes("/anime/")) {
	const title = document.querySelector("animename").textContent.trim();
    presenceData.details = title + " | Anime Info";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
		presenceData.buttons = [
        {
          label: "Zum Anime ",
          url: document.URL
        }
	 ];
  } 
   else if (document.location.pathname == "/site/faq") {
    presenceData.details = "Schaut sich die FAQ's an.";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } 
  else if (document.location.pathname == "/anime-kalender") {
    presenceData.details = "Schaut sich den Kalender an.";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/") {
    presenceData.details = "Chillt auf der Startseite";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else {
    presenceData.details = "Chillt irgendwo auf der Seite.";
    delete presenceData.state;
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.smallImageText;
    presence.setActivity(presenceData);
  }

});
 

 