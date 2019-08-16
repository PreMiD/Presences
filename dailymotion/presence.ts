var presence = new Presence({
  clientId: "611668948131512321",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
}), presenceData: presenceData = {
  largeImageKey: "logo"
};

presence.on("UpdateData", async () => {

var video: HTMLVideoElement = document.querySelector("#dmp_Video");
if (video !== null && !isNaN(video.duration)) {
  var title:any, uploader:any, timestamps:any, live:boolean;

    title = document.querySelector(".VideoInfoTitle__videoTitle___3WLlw")
    uploader = document.querySelector(".ChannelLine__channelName___3JE1B")
    timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      )
      presenceData.details = (title as HTMLElement).innerText
      presenceData.state = (uploader as HTMLElement).textContent
      presenceData.largeImageKey = "logo"
      presenceData.smallImageKey = video.paused ? "pause" : "play"
      presenceData.smallImageText = video.paused  ? (await strings).pause : (await strings).play
      presenceData.startTimestamp = timestamps[0]
      presenceData.endTimestamp = timestamps[1]    

  presence.setTrayTitle(video.paused ? "" : title.innerText);

  if (video.paused) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  if (video && title !== null && uploader !== null) {
    presence.setActivity(presenceData, !video.paused);
  }
} else {

  var pageData: presenceData = {
    details: "Browsing..",
    largeImageKey: "logo"
  };
  presence.setActivity(pageData);
  }
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