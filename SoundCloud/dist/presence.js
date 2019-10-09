var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '607697998490894356',
    mediaKeys: true
});
var strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused'
});
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var player = document.querySelector('.playControls__elements');
    if (player) {
        var player_button = document.querySelector('.playControls__play');
        var paused = player_button.classList.contains('playing') === false;
        try {
            var title = document.querySelector('.playbackSoundBadge__titleLink > span:nth-child(2)').textContent;
            var author = document.querySelector('.playbackSoundBadge__lightLink')
                .textContent;
            var audioTime = document.querySelector("#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div > div > div > div.playbackTimeline__timePassed > span:nth-child(2)").textContent;
            var audioDuration = document.querySelector("#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div > div > div > div.playbackTimeline__duration > span:nth-child(2)").textContent;
            var timestamps = getTimestamps(audioTime, audioDuration);
        }
        catch (err) { }
        var data = {
            details: title,
            state: author,
            largeImageKey: 'soundcloud',
            smallImageKey: paused ? 'pause' : 'play',
            smallImageText: paused ? (yield strings).pause : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null && author !== null) {
            presence.setActivity(data, !paused);
        }
    }
    else {
        presence.clearActivity();
    }
}));
presence.on('MediaKeys', (key) => {
    switch (key) {
        case 'pause':
            var pause_button = document.querySelector('.playControls__play');
            pause_button.click();
            break;
        case 'nextTrack':
            var next_button = document.querySelector('.skipControl__next');
            next_button.click();
            break;
        case 'previousTrack':
            var prev_button = document.querySelector('.skipControl__previous');
            prev_button.click();
            break;
    }
});
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(':').reverse();
    var splitAudioDuration = audioDuration.split(':').reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * Math.pow(60, index);
    }
    return ret;
}
