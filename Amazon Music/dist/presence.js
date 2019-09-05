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
    clientId: "619041735795802112",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var player = document.querySelector(".playbackActive");
    if (player) {
        var title = document.querySelector(".trackTitle span").textContent;
        var artist = document.querySelector(".trackArtist span").textContent;
        var durationTime = document.querySelector(".listViewDurationContextButton .listViewDuration").textContent;
        var timestamps = getTimestamps(durationTime.replace("-", ""));
        const paused = document.querySelector(".playbackControls span.playerIconPause") ? false : true;
        var data = {
            details: title,
            state: artist,
            largeImageKey: "amazonmusic-logo",
            smallImageKey: paused ? "pause" : "play",
            smallImageText: paused ? (yield strings).pause : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        if (title !== null && artist !== null) {
            presence.setActivity(data, !paused);
        }
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
