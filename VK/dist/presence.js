var presence = new Presence({
    clientId: "514771696134389760"
}), strings;
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
    let playerDuration = document.querySelector(".audio_page_player_duration");
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
    let playerDuration = document.querySelector(".audio_page_player_duration");
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
    if (!strings)
        strings = await presence.getStrings({
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
        presenceData.smallImageText = isPlaying ? strings.pause : strings.play;
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
        presenceData.smallImageText = isPlaying ? strings.pause : strings.play;
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
function getTimestamps(currentTime, overallTime) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - currentTime + overallTime;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLENBQUM7QUFFVixJQUFJLGFBQWEsR0FBRztJQUNsQixFQUFFLEVBQUU7UUFDRixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFlBQVksRUFBRSxrQkFBa0I7S0FDakM7SUFDRCxFQUFFLEVBQUU7UUFDRixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFlBQVksRUFBRSxrQkFBa0I7S0FDakM7Q0FDRixDQUFDO0FBRUYsSUFBSSxTQUFrQixDQUFDO0FBQ3ZCLElBQUksVUFBVSxDQUFDO0FBRWYsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuRSxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3BDLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ3hELE9BQU8sYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0M7U0FBTTtRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFVBQVUsa0JBQWtCLENBQUMsQ0FBQztRQUM1RCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUM7QUFFRCxTQUFTLGtCQUFrQjtJQUN6QixJQUFJ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