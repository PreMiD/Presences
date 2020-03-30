const presence = new Presence({
    clientId: "691534544301457449",
    
});

presence.on("UpdateData", () => {
    let presenceData = { 
        largeImageKey: "logo" 
    }

    if (document.URL === "https://duckduckgo.com/" || document.URL === "https://duckduckgo.com" || document.location.href.includes("/&t=h_")) {
        presenceData.details = "Chilling on the homepage";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.location.href.includes("/settings")) {
        presenceData.details = "Changing my settings!";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.location.href.includes("?q=")) {
        presenceData.state = document.getElementById("search_form_input").value;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);

        if (document.location.href.includes("iaxm=maps")) {
            presenceData.details = "Examining the map for...";
        } else if (document.location.href.includes("iax=images")) {
            presenceData.details = "Exploring images in search for...";
        } else if (document.location.href.includes("iax=videos")) {
            presenceData.details = "Probing videos for...";
        } else if (document.location.href.includes("iar=news")) {
            presenceData.details = "Inquiring the news about...";
        } else if (document.location.href.includes("ia=meanings")) {
            presenceData.details = "Reading the meanings for...";
        } else if (document.location.href.includes("ia=definition")) {
            presenceData.details = "Reading the definition for...";
        } else if (document.location.href.includes("ia=shopping")) {
            presenceData.details = "Browsing the shops for...";
        } else if (document.location.href.includes("ia=recipes")) {
            presenceData.details = "Finding some yummy recipies for..."
        } else {
            presenceData.details = "Searching the interwebz for...";
        }
    }

    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
