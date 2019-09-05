var presence = new Presence({
    clientId: "618822781404053505",
    mediaKeys: true
}),

    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
    var player = document.querySelector(".footerPlayer--2d1-L");
    if (player) {
        var title = document.querySelector(".footerPlayer--2d1-L .mediaInformation--1dAUh span").textContent;
        var artist = document.querySelector(".footerPlayer--2d1-L .mediaArtists--3UIyd").textContent;
        var currentTime = document.querySelector(".footerPlayer--2d1-L .currentTime--2fCqA").textContent;
        var durationTime = document.querySelector(".footerPlayer--2d1-L .duration--3f3-B").textContent;
        var timestamps = getTimestamps(currentTime, durationTime);
        var paused = document.querySelector(".playbackToggle--1eQO2[title]").getAttribute("title");
        var smallImageKey;
        if (paused !== "Pause") {
            smallImageKey = "pause";
        } else {
            smallImageKey = "play";
        }

        var data: presenceData = {
            details: title,
            state: artist,
            largeImageKey: "tidal-logo",
            smallImageKey: smallImageKey,
            smallImageText: paused ? (await strings).pause : (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };

        if (paused !== "Pause") {
            delete data.startTimestamp;
            delete data.endTimestamp;
            smallImageKey = "pause";
        } else {
            smallImageKey = "play";
        }

        if (title !== null && artist !== null) {
            presence.setActivity(data, paused);
        }

    } else {
        presence.clearActivity();
    }
});
  
function getTimestamps(audioTime: string, audioDuration: string) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();

    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);

    var startTime = Date.now();
    var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
  
function getTime(list: string[]) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
      ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}