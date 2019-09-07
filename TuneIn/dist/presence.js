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
    clientId: "619817171928743938",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: 'presence.activity.live'
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "tunein-logo",
    };
    var playerCheck = document.querySelector(".player__playerContainer___JEJ2U") ? true : false;
    if (playerCheck) {
        var liveCheck = document.querySelector("#scrubberElapsed").textContent == "LIVE" ? true : false;
        if (liveCheck) {
            var playCheck = document.querySelector(".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-playing']") ? true : false;
            if (playCheck) {
                var title = document.querySelector("#playerTitle").textContent;
                var author = document.querySelector("#playerSubtitle").textContent;
                data.details = title;
                if (title.length > 128) {
                    data.details = title.substring(0, 125) + "...";
                }
                data.state = author;
                if (author.length > 128) {
                    data.state = author.substring(0, 125) + "...";
                }
                data.smallImageKey = "live";
                data.smallImageText = (yield strings).live;
                if (elapsed === null) {
                    elapsed = Math.floor(Date.now() / 1000);
                }
                data.startTimestamp = elapsed;
                presence.setActivity(data);
            }
            else {
                elapsed = null;
                presence.clearActivity();
            }
        }
        else {
            var title = document.querySelector("#playerTitle").textContent;
            var author = document.querySelector("#playerSubtitle").textContent;
            var audioTime = document.querySelector("#scrubberElapsed").textContent;
            var audioDuration = document.querySelector("#scrubberDuration").textContent;
            var timestamps = getTimestamps(audioTime, audioDuration);
            const paused = document.querySelector(".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-paused']") ? true : false;
            data.details = title;
            if (title.length > 128) {
                data.details = title.substring(0, 125) + "...";
            }
            data.state = author;
            if (author.length > 128) {
                data.state = author.substring(0, 125) + "...";
            }
            data.smallImageKey = paused ? "pause" : "play",
                data.smallImageText = paused
                    ? (yield strings).pause
                    : (yield strings).play,
                data.startTimestamp = timestamps[0],
                data.endTimestamp = timestamps[1];
            if (paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            presence.setActivity(data);
        }
    }
    else {
        presence.clearActivity();
    }
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
}));
