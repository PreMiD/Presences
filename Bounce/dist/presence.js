var presence = new Presence({
    clientId: "629819064642043925",
    mediaKeys: false
});
var play, artist, track, title;
var browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sdj;
setInterval(newStats, 5000)
newStats();

function newStats() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            strack = data.track;
            sartist = data.artist;
            sdj = data.dj;
            slisteners = data.listeners;
        }
    };
    xhttp.open('GET', 'https://callumdev.wearebounce.net/premidStats', true);
    xhttp.send();

}



presence.on("UpdateData", () => {


    let presenceData = {
        largeImageKey: "bouncelogo",
        startTimestamp: browsingStamp
    };
if(window.location.pathname.startsWith("/staff")) {
    switch(window.location.pathname.split("/staff/")[1]) {
        case "user.home":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "User • Homepage"
            presence.setActivity(presenceData)
        break;
        case "user.postaway": 
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "User • Post Away"
            presence.setActivity(presenceData)
        break;
        case "user.contactinfo":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Staff • Contact Info"
            presence.setActivity(presenceData)
        break;
        case "user.handbooks":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Staff • Handbooks"
            presence.setActivity(presenceData)
        break;
        case "user.myreputation": 
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "User • Reputation"
            presence.setActivity(presenceData)
        break;
        case "user.rules":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Staff • Rules"
            presence.setActivity(presenceData)
        break;
    }
} else if(window.location.pathname.startsWith("/countdown") || window.location.pathname.startsWith("/mobile")) {
    presenceData.details = (strack || "Loading...") + " - " + (sartist || "Loading...");
    presenceData.state = (sdj || "Loading...") + " • " + (slisteners + " Listeners"|| "Loading...");
    presence.setActivity(presenceData);
}
});
