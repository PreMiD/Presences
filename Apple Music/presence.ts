var presence = new Presence({
    clientId: "621819308481445934",
    mediaKeys: false
}),
 strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "applemusic-logo",
    };
    
    var playerCheck = document.querySelector(".web-chrome-playback-controls__playback-btn[disabled]") ? false : true;
    if (playerCheck) {
        var title = document.querySelector(".web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper").textContent.trim();
        var author = document.querySelector(".web-chrome-playback-lcd__sub-copy-scroll").textContent.split("—")[0];
        var audioTime = document.querySelector(".web-chrome-playback-lcd__time-remaining").textContent;
        var timestamps = getTimestamps(audioTime);
        var paused = document.querySelector(".web-chrome-playback-controls__playback-btn[aria-label='Play']") ? true : false;

        data.details = title;
        data.state = author;
        data.smallImageKey = paused ? "pause" : "play",
        data.smallImageText = paused ? (await strings).pause : (await strings).play,
        data.startTimestamp = timestamps[0],
        data.endTimestamp = timestamps[1]

        if (paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        presence.setActivity(data);
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