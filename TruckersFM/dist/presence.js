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
    
    let stateText = "";
    if(liveTill !== null) {
       stateText = `${dj} till ${liveTime}`;
    } else {
       stateText = `${dj}`;
    }
	
    presenceData.details = `${title}`;
    presenceData.state = `${stateText}`;
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
