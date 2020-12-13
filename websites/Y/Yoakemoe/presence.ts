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
  playback = document.getElementById("title") !== null || (document.getElementsByTagName('video').length !== 0 && document.getElementsByTagName('video')[0].className !== "previewVideo") ? true : false;
  var presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (!playback) {
	var curPath = document.location.pathname;
	if (curPath.startsWith("/entity.php"))
		presenceData.details = "Đang chọn tập...";
	else if (curPath.startsWith("/profile.php"))
		presenceData.details = "Đang xem profile...";
	else if (curPath.startsWith("/search.php"))
		presenceData.details = "Đang tìm kiếm...";
	else
		presenceData.details = "Đang xem trang chủ...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
	return;
  }

  const video = document.getElementsByTagName('video')[0];

  if (video !== null && !isNaN(video.duration)) {
    var titleArr = (document.getElementById("title") !== null ? document.getElementById("title").innerHTML : "Không thấy tên phim!... - Tập ?").split(' - ');

    var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : titleArr[0]);

    presenceData.details = "Đang xem: " + titleArr[0];
    presenceData.state = titleArr[1];
	
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presence.setActivity(presenceData, true);
  }
});
