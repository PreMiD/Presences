var presence = new Presence({
    clientId: "629819064642043925",
    mediaKeys: false
});
var play, artist, track, title;
var browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sdj;
setInterval(newStats, 6000)
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
        largeImageKey: "bouncelogo"
    };
    presenceData.startTimestamp = browsingStamp;


    switch (document.location.hash.replace("#", "")) {
        case "Bounce.Home":
            play = document.querySelector("body > div.web > div > div > div > div > div.player > div.stats-p > div > div.buttons > center > div > i");
            play = play.className;
            switch (play) {
                case "togl fa fa-play":
                    presenceData.smallImageKey = "pause";
                    presenceData.details = "Viewing the home page";
                    break;
                case "togl fa fa-pause":
                    presenceData.smallImageKey = "play";
                    presenceData.details = strack || "Loading..." + " - " + sartist || "Loading..."
                    presenceData.state = sdj || "Loading..."
                    presenceData.smallImageText = slisteners || "Loading..." + " Listeners"
            }
            break;
        case "Bounce.Login":
            presenceData.details = "Logging in"
    }


    if (document.location.hash.includes("Bounce.Timetable")) {
        let day;
        switch (document.location.hash.replace("Bounce.Timetable.", "").replace("#", "")) {

            case "1":
                day = "Monday"
                break;
            case "2":
                day = "Tuesday"
                break;
            case "3":
                day = "Wednesday"
                break;
            case "4":
                day = "Thursday"
                break;
            case "5":
                day = "Friday"
                break;
            case "6":
                day = "Saturday"
                break;
            case "7":
                day = "Sunday"
                break;
        }
        presenceData.details = "Viewing the timetable";
        presenceData.state = "Day: " + day;
        presence.setActivity(presenceData)

    }
    if (document.location.hash.includes("Bounce.BookSlots")) {
        let day;
        switch (document.location.hash.replace("Bounce.BookSlots.", "").replace("#", "")) {
            case "1":
                day = "Monday"
                break;
            case "2":
                day = "Tuesday"
                break;
            case "3":
                day = "Wednesday"
                break;
            case "4":
                day = "Thursday"
                break;
            case "5":
                day = "Friday"
                break;
            case "6":
                day = "Saturday"
                break;
            case "7":
                day = "Sunday"
                break;
        }
        presenceData.details = "Booking a slot";
        presenceData.state = "Day: " + day;
    }
     else if(document.location.pathname.startsWith("/portal")) {
      presenceData.state = "Browsing Staff Panel";
      presenceData.details = "Logging in" 
     switch (document.location.hash.replace("#", "")) {   
         break;
         case "user.home":
            presenceData.details = "Viewing Homepage"
         break;
         case "user.rules":
            presenceData.details = "Viewing Rules"
         break;
         case "user.bookaway":
            presenceData.details = "Booking Away"
         break;
         case "news.create":
            presenceData.details = "Creating Article"
         break;
         case "editor.allstories":
            presenceData.details = "Viewing Articles"
         break;
         case "manager.modifyaccounts":
            presenceData.details = "Updating Account"
         break;
         case "manager.createaccount":
            presenceData.details = "Creating Account"   
         break;
         case "presenter.resources":
            presenceData.details = "Viewing Resources" 
}   

    if (document.location.hash.includes("Bounce.News")) {
        title = document.querySelector("body > div.web > div > div > div > div > div.pageajax > div.leftnews1 > center > b:nth-child(1)");
        presenceData.details = "Reading article:";
        if (title.innerText.length > 128) {
            presenceData.state = title.innerText.substring(0, 125) + "...";
        } else {
            presenceData.state = title.innerText;
        }
        presenceData.smallImageKey = "reading";
    }
    presence.setActivity(presenceData)
});
