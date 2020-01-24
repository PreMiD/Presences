var presence = new Presence({
    clientId: "630447400716206114",
    mediaKeys: true
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "upbeatlogo"
    }

    let pageName = (document.title).slice(9);
	
    if (window.location.pathname.includes("News.Article")) {
        presenceData.details = "Reading an article";

        let newsArticleName = (document.title).slice(9);
        presenceData.state = newsArticleName;
    }  else if(pageName === "Home") {
        let songArtist = document.querySelector(".stats-artist").innerHTML;
        let songName = document.querySelector(".stats-song").innerHTML;

        presenceData.details = songName;
        presenceData.state = songArtist;
        
    } else {
        presenceData.details = "Viewing a page";
        pageName = (document.title).slice(9);
        presenceData.state = pageName;
      }
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
