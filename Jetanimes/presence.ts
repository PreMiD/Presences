var presence = new Presence({
    clientId: "659472130739535903",
    mediaKeys: false
}),
    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
}),
    tv: any, 
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
        largeImageKey: "ja"
    };

    if(video != null && !isNaN(video.duration) && video.duration > 0 && (document.location.pathname.includes("/films") || document.location.pathname.includes("/episodes"))) {

        var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));

        if(document.querySelector("#info > h1")) {
            data.details = document.querySelector("#info > h1").textContent.substr(0, document.querySelector("#info > h1").textContent.lastIndexOf(': Saison'));
            data.state = document.querySelector("#info > h1").textContent.split(':').pop();
        }
        else {
            data.details = document.querySelector("#single div.data > h1").textContent;
        }

        data.smallImageKey = video.paused ? "pause" : "play";
        data.smallImageText = video.paused ? (await strings).pause : (await strings).play;
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];

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

        switch(document.location.pathname) {
          case "/episodes/":
            data.state = "En cours";
            break;
          case "/films/":
            data.state = "Films";
            break;
          case "/serie/":
            data.state = "Animes";
            break;
          case "/evenements/":
            data.state = "Calendrier";
            break;
          default:
            data.state = "Page d'accueil";
        }

        presence.setActivity(data);
    }

});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}