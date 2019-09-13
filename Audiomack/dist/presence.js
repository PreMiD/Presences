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
    clientId: "621808181877669904",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "audiomack-logo",
    };
    var playerCheck = document.querySelector(".player--active") ? true : false;
    if (playerCheck) {
        var playCheck = document.querySelector(".player__controls button.play-button--playing") ? true : false;
        var title = document.querySelector(".player__title").textContent;
        var author = document.querySelector(".player__artist").textContent;
        var audioTime = document.querySelector(".waveform__elapsed").textContent;
        var audioDuration = document.querySelector(".waveform__duration").textContent;
        var timestamps = getTimestamps(audioTime, audioDuration);
        data.details = title;
        var featureCheck = document.querySelector(".player__featuring") ? true : false;
        if (featureCheck) {
            var feature = document.querySelector(".player__featuring").textContent;
            data.state = author + " " + feature;
        }
        else {
            data.state = author;
        }
        data.smallImageKey = !playCheck ? "pause" : "play",
            data.smallImageText = !playCheck ? (yield strings).pause : (yield strings).play,
            data.startTimestamp = timestamps[0],
            data.endTimestamp = timestamps[1];
        if (!playCheck) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data);
    }
    else {
        presence.clearActivity();
    }
}));
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();
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
