var presence = new Presence({
    clientId: "656175238412763163",
    
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    const browsingStamp = Math.floor(Date.now() / 1000);
	const page = window.location.pathname
	
	 if (page.includes("search")) {
        presenceData.details = "Searching something";
        presenceData.startTimestamp = browsingStamp;
    }
 	 else if (page.endsWith("/add")) {
        presenceData.details = "Adding a new bot";
        presenceData.startTimestamp = browsingStamp;   
   }  	
	else if (page.startsWith("/bots/")) {
        presenceData.details = "Viewing a bot:";
        presenceData.state=document.querySelector("#__layout > div > main > div > section.bot__header > div > div > div > div.bot__name").textContent
        presenceData.startTimestamp = browsingStamp;   
   }
   	else if (page.includes("profile")) {
        presenceData.details = "Viewing a profile:";
        presenceData.state=document.querySelector("#__layout > div > main > div > section.profile__header > div > div > div").textContent
		presenceData.startTimestamp = browsingStamp;
    }
        else if (page.includes("terms")) {
       presenceData.details = "Viewing a page:";
        presenceData.state = "Terms of Service";
		presenceData.startTimestamp = browsingStamp;
    }
 	else if (page.startsWith("/about")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "About";
        presenceData.startTimestamp = browsingStamp;   
   }	
 else if (page.includes("docs")) {
         presenceData.details = "Viewing a page:";
        presenceData.state = "API Documentation";
        presenceData.startTimestamp = browsingStamp;
    }   
   if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
