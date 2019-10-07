var presence = new Presence({
  clientId: "630771716058120192",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
}), presenceData: presenceData = {
  largeImageKey: "logo"
};

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

var video: HTMLVideoElement = document.querySelector("#picarto-player-1_html5_api");
if (video !== null && !isNaN(video.duration)) {
  var title:any, uploader:any, timestamps:any, live:boolean;

    title = document.querySelector(".d-flex h4");
    uploader = document.querySelector("#userbar-name .d-flex .d-inline-block");
    timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.details = (title as HTMLElement).innerText;
      presenceData.state = (uploader as HTMLElement).textContent;
      presenceData.largeImageKey = "logo";
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused  ? (await strings).pause : (await strings).play;
      presenceData.startTimestamp = browsingStamp;

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