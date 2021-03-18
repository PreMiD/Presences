const presence = new Presence({
  clientId: "822176609753628742"
}),
monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        details: "An overview of the Trackmania Live Services.",
        largeImageKey: "logo",
        state: `Unsupported page (${window.location.hash})`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    
    if (window.location.hash.startsWith("#")){
        if (window.location.hash.startsWith("#/totd")) {
            presenceData.details = "Track Of The Day";
            if (!window.location.hash.includes("leaderboard")) {
                const title = document.getElementsByClassName("title")[1].textContent,
                month = title.substring(
                    title.indexOf("-") + 2,
                    title.length
                );
                presenceData.state = month;
            } else {
                const trackName = document.getElementsByClassName("game-text")[0].textContent;
                presenceData.state = `Leaderboard - ${trackName}`;
            }
        } else if (window.location.hash.startsWith("#/cotd")) {
            presenceData.state = "Cup Of The Day";
            if (!window.location.hash.endsWith("cotd")){
                presenceData.details = "Cup Of The Day";
                const text = document.getElementsByClassName("game-text")[0].textContent,
                cotd = text.substring(
                    presenceData.details.length,
                    text.length
                ),
                cotdDate = new Date(cotd),
                month = monthsList[cotdDate.getMonth()];
    
                presenceData.state = `${month} ${cotdDate.getDate()}, ${cotdDate.getFullYear()}`;
            }
        } else if (window.location.hash.startsWith("#/campaigns")) {
            presenceData.state = "Campaigns";
            if (!window.location.hash.endsWith("campaigns")){
                if (!window.location.hash.includes("leaderboard")){
                    presenceData.details = "Campaign";
                    const mapName = document.getElementsByClassName("game-text")[0].textContent;
        
                    presenceData.state = mapName;
                } else {
                    presenceData.details = "Leaderboard";
                    const campaignName = document.getElementsByClassName("game-text")[0].textContent,
                    mapperName = document.getElementsByClassName("subtitle")[0].textContent;
        
                    presenceData.state = `${campaignName} (${mapperName})`;
                }
            }
        } else if (window.location.hash.startsWith("#/rooms")) {
            presenceData.state = "Club Rooms";
            if (!window.location.hash.endsWith("rooms")){
                presenceData.details = "Club Room";
                const text = document.getElementsByClassName("game-text")[0].textContent,
                players = document.getElementsByClassName("subtitle")[0].textContent;
    
                presenceData.state = `${text} (${players})`;
            }
        } else if (window.location.hash.startsWith("#/clubs")) {
            presenceData.state = "Clubs";
            if (!window.location.hash.endsWith("clubs")){
                presenceData.details = "Club";
                const text = document.getElementsByClassName("game-text")[0].textContent,
                members = document.getElementsByClassName("subtitle")[0].textContent;
    
                presenceData.state = `${text} (${members})`;
            }
        } else if (window.location.hash.startsWith("#/competitions")) {
            presenceData.state = "Events";
            if (!window.location.hash.endsWith("competitions")){
                presenceData.details = "Event";
                const text = document.getElementsByClassName("game-text")[0].textContent,
                members = document.getElementsByClassName("subtitle")[0].textContent;
    
                presenceData.state = `${text} (${members})`;
            }
        } else if (window.location.hash.startsWith("#/matchmaking")) {
            const text = document.getElementsByClassName("title")[1]
                .textContent;
            presenceData.details = text;
            presenceData.state = "Leaderboard";
        } else if (window.location.hash.startsWith("#/matches")) {
            presenceData.state = "Matches";
        } else if (window.location.hash.startsWith("#/match")) {
            presenceData.state = "Matches";
            if (!window.location.hash.endsWith("match")){
                presenceData.details = "Match";
                const text = document.getElementsByClassName("title")[1].textContent;
    
                presenceData.state = `${text}`;
            }
        } else if (window.location.hash.startsWith("#/players")) {
            presenceData.state = "Player search";
            if (!window.location.hash.endsWith("players") || !window.location.hash.endsWith("players/")){
                presenceData.details = "Player search";
                const text = window.location.hash,
                name = text.substring(text.lastIndexOf("/")+1),
                nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    
                presenceData.state = nameCapitalized;
            }
        } else if (window.location.hash.startsWith("#/player")) {
            presenceData.state = "Player";
            if (!window.location.hash.endsWith("player")){
                presenceData.details = "Player";
                const text = document.getElementsByClassName("title")[1].textContent;
    
                presenceData.state = text;
            }
        } else if (window.location.hash.startsWith("#/news")) {
            const text = document.getElementsByClassName("title")[1].textContent;
    
            presenceData.state = text;
        }
    } else if (window.location.pathname.startsWith("/api")){
        presenceData.state = `Viewing API (${window.location.pathname.substr("/api/".length)})`;
    }
    
    if (presenceData.details == null) {
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});