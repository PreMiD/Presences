var presence = new Presence({
    clientId: "629818846433247232", // CLIENT ID FOR YOUR PRESENCE
    mediaKeys: false
  })
  
  var play: any, artist: any, track: any, title: any;
  
  var browsingStamp = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", async () => {
  
    let presenceData: presenceData = {
      largeImageKey: "bounce"
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
                presenceData.details = "Viewing the home page";
                presence.setActivity(presenceData);
                break;
            case "togl fa fa-pause":
        var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
          presence.setActivity(presenceData);	    if (this.readyState == 4 && this.status == 200) {
           var data = JSON.parse(this.responseText);
           presenceData.setActivity = data.track + " (Artist: " + data.artist + ")";
          presence.state(data.dj + " - " + data.listeners + " listeners");
    }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
    
  });
