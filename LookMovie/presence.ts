let presence = new Presence({
    clientId: "630349560501370900",
    mediaKeys: false
}),
    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});

presence.on("UpdateData", async () => {
    let data: presenceData = {
        largeImageKey: "lm"
    };

    var video: HTMLVideoElement = document.querySelector("#video_player_html5_api");

    if(video != null && !isNaN(video.duration)) {
    	var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

	    if(document.location.pathname.includes("/shows/view")) {
	    	data.details = document.querySelector(".watch-heading > h1 > span").previousSibling.textContent + "(" + document.querySelector(".watch-heading > h1 > span").textContent + ")";
	    	data.state = document.querySelector(".seasons-switcher > span").textContent + " " + document.querySelector(".episodes-switcher > span").textContent;
	   	}
	   	else if(document.location.pathname.includes("/movies/view")) {
	    	data.details = document.querySelector(".watch-heading > h1 > span").previousSibling.textContent;
	    	data.state = document.querySelector(".watch-heading > h1 > span").textContent;
	   	}
		data.smallImageKey = video.paused ? "pause" : "play",
        data.smallImageText = video.paused ? (await strings).pause : (await strings).play,
        data.startTimestamp = timestamps[0],
        data.endTimestamp = timestamps[1]

		if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        presence.setActivity(data, !video.paused);
	}
   	else {
   		data.details = (await strings).browsing;
   		data.smallImageKey = "search";
   		data.smallImageText = (await strings).browsing;
   		presence.setActivity(data);
   	}
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}