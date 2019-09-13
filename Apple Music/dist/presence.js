var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "621819308481445934",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "applemusic-logo",
    };
    var playerCheck = document.querySelector(".web-chrome-playback-lcd__playback-description") ? true : false;
    if (playerCheck) {
        var title = document.querySelector(".web-chrome-playback-lcd__song-name").textContent;
        var author = document.querySelector(".web-chrome-playback-lcd__sub-copy").textContent;
        var audioTime = document.querySelector(".web-chrome-playback-lcd__time-remaining").textContent;
        var timestamps = getTimestamps(audioTime);
        var paused = document.querySelector(".web-chrome-playback-controls__playback-btn[aria-label='Play']") ? true : false;
        data.details = title;
        data.state = author;
        data.smallImageKey = paused ? "pause" : "play",
            data.smallImageText = paused ? (yield strings).pause : (yield strings).play,
            data.startTimestamp = timestamps[0],
            data.endTimestamp = timestamps[1];
        if (paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data);
    }
    else {
        presence.clearActivity();
    }
}));
function getTimestamps(audioDuration) {
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * Math.pow(60, index);
    }
    return ret;
}
