const presence = new Presence({
    clientId: "815653970445205544"
});
let playback,lastPlaybackState=null,browsingStamp=Math.floor(Date.now()/1e3),video={duration:0,currentTime:0};
presence.getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
if (lastPlaybackState !== playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("iFrameData", (data) => {
    video = data;
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "tioanime"
    };
    if (video != null &&
        document.location.pathname.includes("/ver")) {
const videoTitle=document.evaluate("//body//h1[1]",document).iterateNext(),episode=videoTitle.textContent.split(/(\w+)$/);
        if (!video.paused) {
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        presenceData.smallImageKey = video.paused ? "paused" : "playing";
        presenceData.smallImageText = video.paused ? "Paused" : "Playing";
        presenceData.details =
            episode[0] !== null ? episode[0] : "Title not found...";
        presenceData.state =
            episode[2] !== null ? "Episode " + episode[1] : "Episode not found...";
        presence.setActivity(presenceData, !video.paused);
    }
    else {
        presenceData.details = "Searching...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, false);
    }
});
