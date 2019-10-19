var presence = new Presence({
    clientId: "630480553694593025",
    mediaKeys: false // TODO: change it to true after Timeraa fixes the media keys issue
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});

presence.on("UpdateData", async () => {
    let data: presenceData = {
        largeImageKey: "netflix-logo"
    };

    if (document.location.pathname.includes("/watch")) {
        var video: HTMLVideoElement = document.querySelector(".VideoContainer video");
        if (video && !isNaN(video.duration)) {
            var showCheck = document.querySelector(".ellipsize-text span") ? true : false;

            var title = document.querySelector(".video-title h4").textContent;
            var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

            data.details = " " + title;

            if (showCheck) {
                var season = document.querySelector(".video-title span").textContent;
                var episodeName;
                try {
                    episodeName = document.querySelector(".video-title span:nth-child(3)").textContent;
                    data.state = season + " " + episodeName
                } catch {
                    episodeName = document.querySelector(".video-title span").textContent;
                    data.state = episodeName
                }
            } else {
                data.state = "Movie"
            }

            data.smallImageKey = video.paused ? "pause" : "play",
            data.smallImageText = video.paused ? (await strings).pause : (await strings).play,
            data.startTimestamp = timestamps[0],
            data.endTimestamp = timestamps[1]
    
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
    
            if (title !== null && season !== null && episodeName !== null) {
                presence.setActivity(data, !video.paused);
            }
        }
    } else {
        data.details = (await strings).browsing,
        presence.setActivity(data);
    }
});

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}