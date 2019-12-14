var presence = new Presence({
    clientId: "648181559840735232",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners;
setInterval(newStats, 1000)
newStats();
function newStats() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let dataa = JSON.parse(this.responseText);
            strack = dataa.data[0].track.title;
            sartist = dataa.data[0].track.artist;
            slisteners = dataa.data[0].listenertotal;
        }
    };
    xhttp.open('GET', 'https://centauri.shoutca.st/rpc/flareradio/streaminfo.get', true);
    xhttp.send();
}
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "flare"
    };
    presenceData.smallImageKey = "play";
    presenceData.details = sartist + " - " + strack;
    presenceData.state = slisteners + " Listeners";
    presenceData.smallImageText = "Playing";
    presence.setActivity(presenceData);
});