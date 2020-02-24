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
        case "radio.requests":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Radio • Requests"
            presence.setActivity(presenceData)
        break;
        case "radio.schedule":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Radio • Schedule"
            presence.setActivity(presenceData)
        break;
        case "radio.resources":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Radio • Resources"
            presence.setActivity(presenceData)
        break;
        case "radio.connectioninformation":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Radio • Connection Information"
            presence.setActivity(presenceData)
        break;
        case "radio.bannedsongs":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Radio • Banned Songs"
            presence.setActivity(presenceData)
        break;
        case "radio.testradioserver":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Radio • Test Radio Server"
            presence.setActivity(presenceData)
        break;
        case "news.createarticle":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "News • Create Article"
            presence.setActivity(presenceData)
        break;
        case "news.allarticles":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "News • Articles"
            presence.setActivity(presenceData)
        break;
        case "news.ideas":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "News • Ideas"
            presence.setActivity(presenceData)
        break;
        case "seniorpresenter.resetconnectioninformation":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Senior Presenter • Reset Connection Information"
            presence.setActivity(presenceData)
        break;
        case "seniorpresenter.updatebannedsongs":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Senior Presenter • Update banned songs"
            presence.setActivity(presenceData)
        break;
        case "seniorreporter.newarticles":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Senior Reporter • New Articles"
            presence.setActivity(presenceData)
        break;
        case "manager.createaccount":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Manager • Create Account"
            presence.setActivity(presenceData)
        break;
        case "manager.allusers":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Manager • All Users"
            presence.setActivity(presenceData)
        break;
        case "manager.bookedaway":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Manager • Booked Away"
            presence.setActivity(presenceData)
        break;
        case "manager.apps":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Manager • Applications"
            presence.setActivity(presenceData)
        break;
        case "manager.addreputation":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "Manager • Add Repution"
            presence.setActivity(presenceData)
        break;
        case "user.editprofile":
            presenceData.details = "Viewing • Staff Panel"
            presenceData.state = "User • Edit Profile"
            presence.setActivity(presenceData)
        break;
    }
} else if(window.location.pathname.startsWith("/countdown") || window.location.pathname.startsWith("/mobile")) {
    if(!slisteners || slisteners === 0) return presenceData.details = "Fetching stats from API", presenceData.state = "Loading...";
    presenceData.details = (strack || "Loading...") + " - " + (sartist || "Loading...");
    presenceData.state = (sdj || "Loading...") + " • " + (slisteners + " Listeners"|| "Loading...");
    presence.setActivity(presenceData);
}
});
