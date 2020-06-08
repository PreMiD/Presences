var presence = new Presence({
    clientId: "719287231893864469" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

function getTime(list: string[]): number {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
};

function getTimestamps(audioTime: string, audioDuration: string): Array<number> {

    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();

    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);

    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;

    return [Math.floor(startTime / 1000), endTime]; 
}


presence.on("UpdateData", async () => {

	var paused = document.querySelector(
		".player-controls__btn_play"
	).classList.contains(
		"player-controls__btn_pause"
	) === false;
	

    try {
      var title = document.querySelector(
        ".track__title"
      ).textContent;
      var author = document.querySelector(
        ".track__artists > .d-artists"
      ).textContent;

      var audioTime = document.querySelector(
        ".progress__bar > .progress__left"
      ).textContent;
      var audioDuration = document.querySelector(
        ".progress__bar > .progress__right"
      ).textContent;
      var timestamps = getTimestamps(audioTime, audioDuration);

    } catch (err) {
      console.log(
        "An unusual error occured. Please contact the developer of this presence and screenshot the following error:"
      );
      console.error(err);
    };

    var data: PresenceData = {

        largeImageKey: "yandexmusic", 
        smallImageKey: paused ? "pause" : "play", 
        smallImageText: paused ? (await strings).pause : (await strings).play, 

        details: title, 
        state: author, 

        startTimestamp: timestamps[0], 
        endTimestamp: timestamps[1] 
    };
	
	if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }
	
    if (data.details == null && data.state == null) {
        presence.setTrayTitle();
        presence.clearActivity();
    } else {
        presence.setActivity(data); 
    }
});