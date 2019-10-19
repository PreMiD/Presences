let presence = new Presence({
    clientId: "630507230852022273" 
});


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        
        let presenceData = {
            details: "Browsing Gifs...",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "giphy_big",
            smallImageKey: "browsing",
            smallImageText: "browsing"
        };

        presence.setActivity(presenceData);
    }

    else if (document.location.pathname.includes("create/gifmaker") ){
        let presenceData = {
            details: "Creating a Gif",
            state:"at Creation page",
            //largeImageKey: "banner",
            largeImageKey: "giphy_big",
            smallImageKey: "creating",
            smallImageText: "creating"
        };

        presence.setActivity(presenceData);
    }
 

    else {
        var at = document.location.pathname

        if (at.includes("entertainment")){
            var doing = "Entertainment"
        }
        else if (at.includes("sports")){
            var doing = "Sports"
        }
        else if (at.includes("stickers")){
            var doing = "Stickers"
        }
        else if (at.includes("artist")){
            var doing = "Artists"
        }
        else if (at.includes("reaction")){
            var doing = "Reactions"
        }
        let presenceData = {
            details: "Browsing Gifs...",
            state: `at ${doing} page`,
            //largeImageKey: "banner",
            largeImageKey: "giphy_big",
            smallImageKey: "browsing",
            smallImageText: "browsing"
        };
        presence.setActivity(presenceData);
    }

}));