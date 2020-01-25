var presence = new Presence({
    clientId: "640914619082211338",
    mediaKeys: true
});

var song;
var dj;

presence.on("UpdateData", () => {

    title = `${document.querySelector(".player-artist-text").innerText} - ${document.querySelector(".player-title-text").innerText} `;
    dj = document.querySelector(".live-name").innerText;
    liveTill = document.querySelector(".live-time").innerText;
    let pageName = (document.title).slice(13);
    liveTime = liveTill.slice(6)
    let presenceData = {
        largeImageKey: "tfmlogo",
        smallImageKey: "smalltfmlogo",
        smallImageText: `Viewing: ${pageName}`,
    }    
	
    presenceData.details = `${title}`;
    presenceData.state = `${dj} till ${liveTime}`;
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
