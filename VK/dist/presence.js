const presence = new Presence({
    clientId: "514771696134389760"
});
var localeStrings = {
    en: {
        Chatting: "Browsing PM's...",
        Watching: "Watching",
        Browsing: "Browsing",
        BrowsingFeed: "Browsing feed..."
    },
    ru: {
        Chatting: "Смотрит сообщения...",
        Watching: "Смотрит",
        Browsing: "Просматривает",
        BrowsingFeed: "Смотрит ленту..."
    }
};
var isPlaying;
var timestamps;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getLocale() {
    return window.navigator.language.replace("-", "_").toLowerCase();
}
function getLocalizedString(stringPath) {
    if (localeStrings[getLocale()][stringPath] !== undefined) {
        return localeStrings[getLocale()][stringPath];
    }
    else {
        console.warn(`Language for [${stringPath}] was not found!`);
        return localeStrings["en"][stringPath];
    }
}
function getVKTrackTimeLeft() {
    const playerDuration = document.querySelector(".audio_page_player_duration");
    var timeLeft;
    if (playerDuration.innerText.startsWith("-")) {
        timeLeft = playerDuration.innerText;
    }
    else {
        playerDuration.click();
        timeLeft = playerDuration.innerText;
        playerDuration.click();
    }
    timeLeft = timeLeft.slice(1);
    return timeLeft.split(":");
}
function getVKTrackTimePassed() {
    const playerDuration = document.querySelector(".audio_page_player_duration");
    var timePassed;
    if (!playerDuration.innerText.startsWith("-")) {
        timePassed = playerDuration.innerText;
    }
    else {
        playerDuration.click();
        timePassed = playerDuration.innerText;
        playerDuration.click();
    }
    return timePassed.split(":");
}
function getVKTrackLength() {
    var timeLeft, timePassed, overallTime;
    timeLeft = getVKTrackTimeLeft();
    timePassed = getVKTrackTimePassed();
    overallTime = [
        Number(timePassed[0]) + Number(timeLeft[0]),
        Number(timePassed[1]) + Number(timeLeft[1])
    ];
    if (Number(overallTime[1]) > 60) {
        var t1 = overallTime[0] + 1;
        var t2 = overallTime[1] - 60;
        overallTime = [t1, t2];
    }
    return overallTime;
}
var browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "vk_logo"
    };
    const gstrings = await presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    if (document.location.pathname.startsWith("/audios") ||
        document.querySelector(".audio_layer_container")) {
        var title = document.querySelector(".audio_page_player_title_song").textContent, author = document.querySelector(".audio_page_player_title_performer a").textContent;
        if (document.querySelector(".audio_playing") == null) {
            isPlaying = true;
        }
        else {
            isPlaying = false;
        }
        timestamps = getTimestamps(Math.floor(Number(getVKTrackTimePassed()[0]) * 60 +
            Number(getVKTrackTimePassed()[1])), Math.floor(Number(getVKTrackLength()[0]) * 60 + Number(getVKTrackLength()[1])));
        presenceData.details = title;
        presenceData.state = author;
        presenceData.smallImageKey = isPlaying ? "pause" : "play";
        presenceData.smallImageText = isPlaying ? gstrings.pause : gstrings.play;
        presenceData.startTimestamp = isPlaying ? null : timestamps[0];
        presenceData.endTimestamp = isPlaying ? null : timestamps[1];
        presence.setActivity(presenceData, true);
    }
    else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
        document.querySelector(".videoplayer_ui").getAttribute("data-state") ==
            "paused"
            ? (isPlaying = true)
            : (isPlaying = false);
        var videoTitle = document.querySelector(".mv_title")
            .innerText, videoCurrentTime = document.querySelector("._time_current").innerText.split(":"), videoDuration = document.querySelector("._time_duration").innerText.split(":"), videoAuthor = document.querySelector(".mv_author_name a")
            .innerText;
        timestamps = getTimestamps(Math.floor(Number(videoCurrentTime[0]) * 60 + Number(videoCurrentTime[1])), Math.floor(Number(videoDuration[0]) * 60 + Number(videoDuration[1])));
        presenceData.details = getLocalizedString("Watching") + " " + videoTitle;
        presenceData.state = videoAuthor;
        presenceData.smallImageKey = isPlaying ? "pause" : "play";
        presenceData.smallImageText = isPlaying ? gstrings.pause : gstrings.play;
        presenceData.startTimestamp = isPlaying ? null : timestamps[0];
        presenceData.endTimestamp = isPlaying ? null : timestamps[1];
        presence.setActivity(presenceData, true);
    }
    else if (document.querySelector(".page_name") !== null) {
        var page_title = document.querySelector(".page_name")
            .innerText;
        presenceData.details = page_title;
        presenceData.startTimestamp = browsingTimestamp;
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/feed")) {
        presenceData.details = getLocalizedString("BrowsingFeed");
        presenceData.startTimestamp = browsingTimestamp;
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/im")) {
        presenceData.details = getLocalizedString("Chatting");
        presenceData.startTimestamp = browsingTimestamp;
        presence.setActivity(presenceData, true);
    }
    else {
        browsingTimestamp = Math.floor(Date.now() / 1000);
        presence.clearActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHO0lBQ2xCLEVBQUUsRUFBRTtRQUNGLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsWUFBWSxFQUFFLGtCQUFrQjtLQUNqQztJQUNELEVBQUUsRUFBRTtRQUNGLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFLGVBQWU7UUFDekIsWUFBWSxFQUFFLGtCQUFrQjtLQUNqQztDQUNGLENBQUM7QUFFRixJQUFJLFNBQWtCLENBQUM7QUFDdkIsSUFBSSxVQUFVLENBQUM7QUFPZixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDaEIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25FLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLFVBQVU7SUFDcEMsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLENB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