var presence = new Presence({
    clientId: "787715073007026187"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTimestamps(videoTime: number, videoDuration: number): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
  playback = document.getElementById("title") !== null || document.getElementsByTagName('video')[0].className !== "previewVideo" ? true : false;
  var presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (!playback) {
    presenceData.details = "Đang tìm kiếm...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
	return;
  }

  const video = document.getElementsByTagName('video')[0];

  if (video !== null && !isNaN(video.duration)) {
    var videoTitle = (document.getElementById("title").innerHTML !== null ? document.getElementById("title").innerHTML : "Không thấy tên phim!... - Tập ?!").split(' - ');

    var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : videoTitle[0]);

    presenceData.details = "Đang xem: " + videoTitle[0];
    presenceData.state = videoTitle[1];
	
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presence.setActivity(presenceData, true);
  }
});
