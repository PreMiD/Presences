var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "514771696134389760",
    mediaKeys: true
}), strings;
var localeStrings = {
    "en": {
        "Browsing": "Browsing",
        "BrowsingFeed": "Browsing feed..."
    },
    "ru": {
        "Browsing": "Просматривает",
        "BrowsingFeed": "Смотрит ленту..."
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
        return localeStrings['en'][stringPath];
    }
}
function getVKTrackTimeLeft() {
    let playerDuration = document.querySelector(".audio_page_player_duration");
    var timeLeft;
    if (playerDuration.innerText.startsWith('-')) {
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
    if (!playerDuration.innerText.startsWith('-')) {
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
    overallTime = [(Number(timePassed[0]) + Number(timeLeft[0])), (Number(timePassed[1]) + Number(timeLeft[1]))];
    if (Number(overallTime[1]) > 60) {
        var t1 = overallTime[0] + 1;
        var t2 = overallTime[1] - 60;
        overallTime = [t1, t2];
    }
    return overallTime;
}
var browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (!strings)
        strings = yield presence.getStrings({
            play: "presence.playback.playing",
            pause: "presence.playback.paused"
        });
    if (document.location.pathname.startsWith("/audios") || document.querySelector(".audio_layer_container")) {
        var title = document.querySelector(".audio_page_player_title_song").innerText, author = document.querySelector(".audio_page_player_title_performer a").innerText, isPlaying;
        if (document.querySelector(".audio_playing") == null) {
            isPlaying = true;
        }
        else {
            isPlaying = false;
        }
        var timestamps = getTimestamps(Math.floor((Number(getVKTrackTimePassed()[0]) * 60) + Number(getVKTrackTimePassed()[1])), Math.floor((Number(getVKTrackLength()[0]) * 60) + Number(getVKTrackLength()[1])));
        var presenceData = {
            details: title,
            state: author,
            largeImageKey: "vk_logo",
            smallImageKey: isPlaying ? "pause" : "play",
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setActivity(presenceData, true);
    }
    else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
        var isPlaying;
        (document.querySelector(".videoplayer_btn_play")) ? isPlaying = true : isPlaying = false;
        var videoTitle = document.querySelector(".mv_title").innerText, videoCurrentTime = document.querySelector("._time_current").innerText.split(":"), videoDuration = document.querySelector("._time_duration").innerText.split(":"), videoAuthor = document.querySelector(".mv_author_name a").innerText;
        var timestamps = getTimestamps(Math.floor((Number(videoCurrentTime[0]) * 60) + Number(videoCurrentTime[1])), Math.floor((Number(videoDuration[0]) * 60) + Number(videoDuration[1])));
        var presenceData = {
            details: videoTitle,
            state: videoAuthor,
            largeImageKey: "vk_logo",
            smallImageKey: isPlaying ? "pause" : "play",
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.querySelector(".page_name") !== null) {
        var page_title = document.querySelector(".page_name").innerText;
        var presenceData = {
            details: getLocalizedString('Browsing'),
            state: page_title,
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.location.pathname.startsWith("/feed")) {
        var presenceData = {
            details: getLocalizedString('BrowsingFeed'),
            largeImageKey: "vk_logo",
            startTimestamp: browsingTimestamp
        };
        presence.setActivity(presenceData, true);
    }
    else {
        browsingTimestamp = Math.floor(Date.now() / 1000);
        presence.clearActivity();
    }
}));
presence.on("MediaKeys", key => {
    switch (key) {
        case "pause":
            document.querySelector(".audio_page_player_play").click();
            break;
        case "nextTrack":
            document.querySelector(".audio_page_player_next").click();
            break;
        case "previousTrack":
            document.querySelector(".audio_page_player_prev").click();
            break;
    }
});
function getTimestamps(currentTime, overallTime) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - currentTime + overallTime;
    return [Math.floor(startTime / 1000), endTime];
}
