var presence = new Presence({
    clientId: "687845217109409841", 
});

setInterval(getSongData, 10000);
getSongData();


function getSongData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            dSong = data.now_playing.name;
            dArtist = data.now_playing.artist;
            dListeners = data.listeners;
            dStart = data.time.start;
            dFinish = data.time.finish;
            dDJ = data.dj.name
        }
    };
    xhttp.open('GET', 'https://panel.simulator.fm/api/v4/current-song', true);
    xhttp.withCredentials = true;
    xhttp.send();
}

presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "sfmlogo",
        smallImageKey: "play",
        smallImageText: dListeners + " Listeners",
        details: dSong + " - " + dArtist,
        state: "DJ: " + dDJ,
        startTimestamp: dStart,
        endTimestamp: dFinish
    };

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity(); 
    } else {
        presence.setActivity(presenceData); 
    }
});