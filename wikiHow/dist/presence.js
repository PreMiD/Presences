let presence = new Presence({
    clientId: "630570838084812801" 
});


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/Main-Page") {
        
        let presenceData = {
            details: "Browing How to",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: "browsing"
        };

        presence.setActivity(presenceData);
    }

    else if (document.location.pathname=="/index.php"){
        var topic = document.getElementsByClassName("firstHeading")[0].innerText

        let presenceData = {
            details: "Editing/Writing How to",
            state: `Topic: ${topic} `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href
        };

        presence.setActivity(presenceData);

    }
    else if (document.location.pathname=="/wikiHowTo"){
        var topic = document.location.search.replace("?search=",'')
        let presenceData = {
            details: `Searching...`,
            state: `topic: ${topic}`,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: "searching"
        };

        presence.setActivity(presenceData);

    }

    else {
        var topic = document.getElementById("intro").firstElementChild.innerText
        var author = document.getElementById("expert_coauthor").children[0].innerText
        var date = document.getElementById("expert_coauthor").children[1].innerText
        
        let presenceData = {
            details: topic,
            state: `by ${author} (${date}) `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href
        };

        presence.setActivity(presenceData);


    }



}));