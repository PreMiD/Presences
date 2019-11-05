var presence = new Presence({
    clientId: "641282431881838613",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sduration, selapsed, timestamps;
setInterval(newStats, 1000)
newStats();

function newStats() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            strack = data.now_playing.song.title;
            sartist = data.now_playing.song.artist;
            slisteners = data.listeners.total;
            sduration = data.now_playing.duration;
            selapsed = data.now_playing.elapsed;
        }
    };
    xhttp.open('GET', 'https://azuracast.freightfm.com/api/nowplaying/1', true);
    xhttp.send();

}



presence.on("UpdateData", () => {


    let presenceData = {
        largeImageKey: "ffm"
    };

    if (document.querySelector("#player_playpause2").className == "play__box--icon fas fa-pause") {
        timestamps = getTimestamps(Math.floor(selapsed),Math.floor(sduration));
        presenceData.smallImageKey = "play";
        presenceData.details = sartist + " - " + strack;
        presenceData.state = slisteners + " Listeners";
        presenceData.smallImageText = "Playing";
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
    } else if (document.location.pathname.includes("/home")) { 
        presenceData.details = "Viewing the home page";
        presenceData.startTimestamp = browsingStamp; 
    } else if (document.location.pathname.includes("/about")) {
        presenceData.details = "Reading about FreightFM";
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/about")) {
        presenceData.details = "Meeting the";
        presenceData.state = "FreightFM team";
        presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/show")) {
        presenceData.details = "Viewing the";
        presenceData.state = "upcoming shows";
        presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/contact")) {
        presenceData.details = "Contacting FreightFM";
        presenceData.smallImageKey = "writing";
        presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/apply")) {
        presenceData.details = "Applying for staff";
        presenceData.smallImageKey = "writing";
        presenceData.startTimestamp = browsingStamp;
    }


    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity()
    } else {
        presence.setActivity(presenceData);
    }
});

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}