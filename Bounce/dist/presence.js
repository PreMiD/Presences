
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
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
	strack = data.track;
	sartist = data.artist;
	sdj = data.dj;
	slisteners= data.listeners;
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

    if (document.URL.includes("#Bounce.News")) {
        title = document.querySelector("body > div.web > div > div > div > div > div.pageajax > div.leftnews1 > center > b:nth-child(1)");
        presenceData.details = "Reading article:";
        if (title.innerText.length > 128) {
            presenceData.state = title.innerText.substring(0, 125) + "...";
        } else {
            presenceData.state = title.innerText;
        }
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    } else if (document.URL.includes("#Bounce.Timetable")) {
        presenceData.details = "Viewing the timetable";
        presence.setActivity(presenceData);
    } else if (document.URL.includes("#Bounce.Home")) {
        play = document.querySelector("body > div.web > div > div > div > div > div.player > div.stats-p > div > div.buttons > center > div > i");
        play = play.className;
        switch (play) {
            case "togl fa fa-play":
presenceData.smallImageKey = "pause";
                presenceData.details = "Viewing the home page";
                presence.setActivity(presenceData);
                break;
            case "togl fa fa-pause":
presenceData.smallImageKey = "play";
	presenceData.details = strack +" - "+ sartist
	presenceData.state = sdj +" - "+ slisteners + " listeners"
	presence.setActivity(presenceData)




        }
    } else {
	presenceData.smallImageKey = "play";
	presenceData.details = strack +" - "+ sartist
	presenceData.state = sdj +" - "+ slisteners + " listeners"
    }
	presence.setActivity(presenceData)
});
