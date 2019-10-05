
var presence = new Presence({
    clientId: "629819064642043925",
    mediaKeys: false
});
var play, artist, track, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "bouncelogo"
    };
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
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
	presenceData.details = data.track +" - "+ data.artist
	presenceData.state = data.dj +" - "+ data.listeners + " listeners"
	presence.setActivity(presenceData)
    }
  };
  xhttp.open('GET', 'https://wearebounce.net/api/index.php?stats2=1&key=GivemeaccessBitCH!', true);
  xhttp.send();



        }
    } else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
