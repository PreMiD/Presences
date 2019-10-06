var presence = new Presence({
    clientId: "630447400716206114",
    mediaKeys: true
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "upbeatlogo"
    };
	
    if (window.location.pathname.includes("News.Article")) {
        presenceData.details = "Reading an article";

        let newsArticleName = (document.title).slice(9);
        presenceData.state = newsArticleName;
    }  else {
        presenceData.details = "Viewing a page";
        let pageName = (document.title).slice(9);
        presenceData.state = pageName;
      }
	  
      presence.setActivity(presenceData);
      presence.setTrayTitle();
});
