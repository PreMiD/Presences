var presence = new Presence({
    clientId: "640289470855380992",
    mediaKeys: false
}),
    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});

presence.on("UpdateData", async () => {

    var data: presenceData = {
        largeImageKey: "anlg"
    };

    var playback = document.querySelector("anghami-player anghami-icon.icon.play").className.includes("show");

    if(playback != null && (document.querySelector("anghami-player .player-actions") != null &&
     document.querySelector("anghami-player .player-actions").textContent.length > 1)) {

      	var timestamps = getTimestamps(document.querySelector("anghami-player .player-actions").textContent.split("/")[0], 
      		document.querySelector("anghami-player .player-actions").textContent.split("/")[1]);

        data.details = document.querySelector("anghami-player .action-title .trim").textContent;
        data.state = document.querySelector("anghami-player .action-artist .trim").textContent;

        data.smallImageKey = !playback ? "pause" : "play",
        data.smallImageText = !playback ? (await strings).pause : (await strings).play,
        data.startTimestamp = timestamps[0],
        data.endTimestamp = timestamps[1]

    	if (!playback) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        presence.setActivity(data, playback);
    }

   	else {
   		data.details = (await strings).browsing;
   		data.smallImageKey = "search";
   		data.smallImageText = (await strings).browsing;
   		presence.setActivity(data);
   	}
});

function getTimestamps(audioTime: any, audioDuration: any) {
  audioTime = getTime(audioTime.split(':').reverse());
  audioDuration = getTime(audioDuration.split(':').reverse());

  var endTime = Math.floor(Date.now() / 1000) - audioTime + audioDuration;

  return [Math.floor(Date.now() / 1000), endTime];
}

function getTime(list: string[]) {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}