var presence = new Presence({
    clientId: "630857591744102461",
    mediaKeys: false
}),
    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
}),
    tv: boolean = false, 
    video = {
        duration: 0,
        currentTime: 0,
        paused: true
};

presence.on("iFrameData", data => {
    video = data;
})

presence.on("UpdateData", async () => {

    var data: presenceData = {
        largeImageKey: "fml"
    };

    if(video != null && !isNaN(video.duration) && document.location.pathname.includes("/film")) {

        tv = document.querySelector("#movie li:nth-child(2) span") 
         && document.querySelector("#movie li:nth-child(2) span").textContent.includes("TV") ? true : false;

      	var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

        if(tv) {
            let name = document.querySelector("#movie li.active span").textContent;
            let date = document.querySelector("#info  div dl:nth-child(2) > dd:nth-child(4)").textContent;
            data.details = name.slice(0, name.lastIndexOf(' ')) + " (" + date.slice(0, date.indexOf('-')) + ")";
            data.state = "S" + document.querySelector("#movie li.active span").textContent.split(' ').pop() + ":E" + document.querySelector("#servers li a.active").textContent;
        }
        else {
            let date = document.querySelector("#info  div dl:nth-child(2) > dd:nth-child(4)").textContent;
            data.details = document.querySelector("#movie li.active span").textContent;
            data.state = date.slice(0, date.indexOf('-'));
        }

        data.smallImageKey = video.paused ? "pause" : "play",
        data.smallImageText = video.paused ? (await strings).pause : (await strings).play,
        data.startTimestamp = timestamps[0],
        data.endTimestamp = timestamps[1]

    	if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }

        presence.setActivity(data, !video.paused);
    }

   	else {
   		data.details = (await strings).browsing;
   		data.smallImageKey = "search";
   		data.smallImageText = (await strings).browsing;
   		presence.setActivity(data);
   	}
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}