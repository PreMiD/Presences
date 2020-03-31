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
    if (!strings)
        strings = await presence.getStrings({
            play: "presence.playback.playing",
            pause: "presence.playback.paused"
        });
    if (document.location.pathname.startsWith("/audios") ||
        document.querySelector(".audio_layer_container")) {
        var title = document.querySelector(".audio_page_player_title_song").textContent, author = document.querySelector(".audio_page_player_title_performer a").textContent, isPlaying;
        if (document.querySelector(".audio_playing") == null) {
            isPlaying = true;
        }
        else {
            isPlaying = false;
        }
        var timestamps = getTimestamps(Math.floor(Number(getVKTrackTimePassed()[0]) * 60 +
            Number(getVKTrackTimePassed()[1])), Math.floor(Number(getVKTrackLength()[0]) * 60 + Number(getVKTrackLength()[1])));
        var presenceData = {
            details: title,
            state: author,
            largeImageKey: "vk_logo",
            smallImageKey: isPlaying ? "pause" : "play",
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: isPlaying ? null : timestamps[0],
            endTimestamp: isPlaying ? null : timestamps[1]
        };
        presence.setActivity(presenceData, true);
    }
    else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
        var isPlaying;
        document.querySelector(".videoplayer_ui").getAttribute("data-state") ==
            "paused"
            ? (isPlaying = true)
            : (isPlaying = false);
        var videoTitle = document.querySelector(".mv_title")
            .innerText, videoCurrentTime = document.querySelector("._time_current").innerText.split(":"), videoDuration = document.querySelector("._time_duration").innerText.split(":"), videoAuthor = document.querySelector(".mv_author_name a")
            .innerText;
        var timestamps = getTimestamps(Math.floor(Number(videoCurrentTime[0]) * 60 + Number(videoCurrentTime[1])), Math.floor(Number(videoDuration[0]) * 60 + Number(videoDuration[1])));
        var presenceData = {
            details: getLocalizedString("Watching") + " " + videoTitle,
            state: videoAuthor,
            largeImageKey: "vk_logo",
            smallImageKey: isPlaying ? "pause" : "play",
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: isPlaying ? null : timestamps[0],
            endTimestamp: isPlaying ? null : timestamps[1]
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.querySelector(".page_name") !== null) {
        var page_title = document.querySelector(".page_name")
            .innerText;
        var presenceData = {
            details: page_title,
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/feed")) {
        var presenceData = {
            details: getLocalizedString("BrowsingFeed"),
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/im")) {
        var presenceData = {
            details: getLocalizedString("Chatting"),
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLENBQUM7QUFFVixJQUFJLGFBQWEsR0FBRztJQUNsQixFQUFFLEVBQUU7UUFDRixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFlBQVksRUFBRSxrQkFBa0I7S0FDakM7SUFDRCxFQUFFLEVBQUU7UUFDRixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFlBQVksRUFBRSxrQkFBa0I7S0FDakM7Q0FDRixDQUFDO0FBRUYsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuRSxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3BDLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ3hELE9BQU8sYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0M7U0FBTTtRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFVBQVUsa0JBQWtCLENBQUMsQ0FBQztRQUM1RCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUM7QUFFRCxTQUFTLGtCQUFrQjtJQUN6QixJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6Qyw2QkFBNkIsQ0FD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