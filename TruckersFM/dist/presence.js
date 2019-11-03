var presence = new Presence({
    clientId: "638884787733659648",
    mediaKeys: true
});

var song;
var dj;

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "TFMLogo"
    }

    title = `${document.querySelector(".player-title-text").innerText} - ${document.querySelector(".player-artist-text").innerText} `;
    dj = document.querySelector(".live-name").innerText;

    presenceData.details = title;
    presenceData.state = "Listening to TruckersFM";

    let pageName = (document.title).slice(13);
	
    presenceData.details = "Viewing a page";
    pageName = (document.title).slice(13);
    presenceData.state = pageName;
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
