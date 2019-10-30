var presence = new Presence({
    clientId: "638884787733659648",
    mediaKeys: true
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "TFMLogo"
    }

    let pageName = (document.title).slice(13);
	
    presenceData.details = "Viewing a page";
    pageName = (document.title).slice(13);
    presenceData.state = pageName;
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
