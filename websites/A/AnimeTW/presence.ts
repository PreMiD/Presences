const presence = new Presence({
    clientId: "523553075680772106",
    mediaKeys: false
}),
    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
}),
    tv: any;
    video = {
        duration: 0,
        currentTime: 0,
        paused: true
};

presence.on("iFrameData", data => {
    video = data;
});

presence.on("UpdateData", async () => {

    const data: presenceData = {
        largeImageKey: "animetw"
    };

    if(video != null && !isNaN(video.duration) && document.location.pathname.includes("/watch")) {

const timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

        data.details = document.querySelector("head > title").textContent;

        data.smallImageKey = video.paused ? "pause" : "play",
        data.smallImageText = video.paused ? (await strings).pause : (await strings).play,
        data.startTimestamp = timestamps[0],
        data.endTimestamp = timestamps[1];

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
		presence.setActivity(data);}
});

function getTimestamps(videoTime: number, videoDuration: number) {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}