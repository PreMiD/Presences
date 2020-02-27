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
    en: {
        Chatting: "Browsing PM's...",
        Watching: 'Watching',
        Browsing: 'Browsing',
        BrowsingFeed: 'Browsing feed...',
    },
    ru: {
        Chatting: 'Смотрит сообщения...',
        Watching: 'Смотрит',
        Browsing: 'Просматривает',
        BrowsingFeed: 'Смотрит ленту...',
    },
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
        var title = document.querySelector(".audio_page_player_title_song").textContent, author = document.querySelector(".audio_page_player_title_performer a").textContent, isPlaying;
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
            largeImageKey: 'vk_logo',
            smallImageKey: isPlaying ? 'pause' : 'play',
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: isPlaying ? null : timestamps[0],
            endTimestamp: isPlaying ? null : timestamps[1],
        };
        presence.setActivity(presenceData, true);
    }
    else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
        var isPlaying;
        document.querySelector('.videoplayer_ui').getAttribute('data-state') == 'paused'
            ? (isPlaying = true)
            : (isPlaying = false);
        var videoTitle = document.querySelector(".mv_title").innerText, videoCurrentTime = document.querySelector("._time_current").innerText.split(":"), videoDuration = document.querySelector("._time_duration").innerText.split(":"), videoAuthor = document.querySelector(".mv_author_name a").innerText;
        var timestamps = getTimestamps(Math.floor((Number(videoCurrentTime[0]) * 60) + Number(videoCurrentTime[1])), Math.floor((Number(videoDuration[0]) * 60) + Number(videoDuration[1])));
        var presenceData = {
            details: getLocalizedString('Watching') + " " + videoTitle,
            state: videoAuthor,
            largeImageKey: 'vk_logo',
            smallImageKey: isPlaying ? 'pause' : 'play',
            smallImageText: isPlaying ? strings.pause : strings.play,
            startTimestamp: isPlaying ? null : timestamps[0],
            endTimestamp: isPlaying ? null : timestamps[1],
        };
        presence.setActivity(presenceData, true);
    }
    else if (document.querySelector(".page_name") !== null) {
        var page_title = document.querySelector(".page_name").innerText;
        var presenceData = {
            details: page_title,
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
    else if (document.location.pathname.startsWith("/im")) {
        var presenceData = {
            details: getLocalizedString('Chatting'),
            largeImageKey: 'vk_logo',
            startTimestamp: browsingTimestamp,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ3BCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxFQUNGLE9BQU8sQ0FBQztBQUVaLElBQUksYUFBYSxHQUFHO0lBQ2xCLEVBQUUsRUFBRTtRQUNGLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsWUFBWSxFQUFFLGtCQUFrQjtLQUNqQztJQUNELEVBQUUsRUFBRTtRQUNGLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFLGVBQWU7UUFDekIsWUFBWSxFQUFFLGtCQUFrQjtLQUNqQztDQUNGLENBQUE7QUFFRCxTQUFTLFNBQVM7SUFDZCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDckUsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsVUFBVTtJQUNsQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN0RCxPQUFPLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixVQUFVLGtCQUFrQixDQUFDLENBQUM7UUFDNUQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDMUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxrQkFBa0I7SUFDdkIsSUFBSSxjQUFjLEdBQUcsUUFB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