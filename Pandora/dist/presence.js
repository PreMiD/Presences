var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: '608109837657702566',
    mediaKeys: true
});
const strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused'
});
var state;
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var title, artist, smallImageKey, smallImageText, audioTime, audioDuration;
    var audioElement = document.querySelector('audio:last-child');
    audioElement === null
        ? (audioElement = document.querySelector('audio'))
        : null;
    var audioBar = document.querySelector('.Tuner__Audio__NowPlayingHitArea');
    audioElement && audioBar ? (state = 'music') : (state = null);
    switch (state) {
        case 'music':
            title = document.querySelector('.Tuner__Audio__TrackDetail__title');
            artist = document.querySelector('.Tuner__Audio__TrackDetail__artist');
            if (title === null && artist === null) {
                return;
            }
            else {
                title = stripText(title, 'Title');
                artist = stripText(artist, 'Title');
            }
            smallImageKey = 'play';
            smallImageText = (yield strings).play;
            var timestamps = getTimestamps(Math.floor(audioElement.currentTime), Math.floor(audioElement.duration));
            audioTime = timestamps[0];
            audioDuration = timestamps[1];
            break;
        default:
            title = 'Browsing...';
            break;
    }
    var data = {
        details: title,
        state: artist,
        largeImageKey: 'pandora',
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: audioTime,
        endTimestamp: audioDuration
    };
    if (state && audioElement && audioElement.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
        data.smallImageKey = 'pause';
        data.smallImageText = (yield strings).pause;
    }
    presence.setActivity(data, audioElement ? !audioElement.paused : true);
}));
presence.on('MediaKeys', (key) => {
    if (state) {
        switch (key) {
            case 'pause':
                var pauseButton = document.querySelector('.Tuner__Control__Play__Button');
                pauseButton.click();
                break;
            case 'nextTrack':
                var nextButton = document.querySelector('.Tuner__Control__Skip__Button');
                nextButton.click();
                break;
        }
    }
});
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function stripText(element, id = 'None', log = true) {
    if (element && element.firstChild) {
        return element.firstChild.textContent;
    }
    else {
        if (log)
            console.log('%cPandora%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: ' +
                id, 'font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;', 'font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;', 'color: unset;');
        return null;
    }
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
