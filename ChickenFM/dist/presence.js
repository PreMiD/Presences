var presence = new Presence({
    clientId: "614154889206956043",
    mediaKeys: false
})
var loadTimeStamp = Math.floor(Date.now() / 1000);
let trackTitle, trackArtist, stationName;
setInterval(getData, 1000)
function getData() {
    var apiId = document.getElementById("premidstationname").innerHTML
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var api = JSON.parse(this.responseText);
            trackTitle = api.now_playing.song.title;
            trackArtist = api.now_playing.song.artist;
            stationName = api.station.name;
        }
    };
    xhttp.open("GET", `https://radio.chickenfm.com/api/nowplaying/${apiId}`, true);
    xhttp.send();
}
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "default"
    };
    //presenceData.smallImageKey = "play";
    presenceData.details = trackArtist + " - " + trackTitle;
    presenceData.state = stationName;
    presenceData.smallImageText = "Playing";
    presenceData.startTimestamp = loadTimeStamp;
    presence.setActivity(presenceData);
});