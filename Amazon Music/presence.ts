var presence = new Presence({
    clientId: "619041735795802112",
    mediaKeys: true
}),

    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
    var player = document.querySelector(".playbackActive");
    if (player) {
        var title = document.querySelector(".trackTitle span").textContent;
        var artist = document.querySelector(".trackArtist span").textContent;
        var durationTime = document.querySelector(".listViewDurationContextButton .listViewDuration").textContent;
        var timestamps = getTimestamps(durationTime.replace("-", ""));
        const paused = document.querySelector(".playbackControls span.playerIconPause") ? false : true;

        var data: presenceData = {
            details: title,
            state: artist,
            largeImageKey: "amazonmusic-logo",
            smallImageKey: paused ? "pause" : "play",
            smallImageText: paused ? (await strings).pause : (await strings).play,
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
    } else {
        presence.clearActivity();
    }
});

function getTimestamps(audioDuration: string) {
    var splitAudioDuration = audioDuration.split(":").reverse();

    var parsedAudioDuration = getTime(splitAudioDuration);

    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
  
function getTime(list: string[]) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
      ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}