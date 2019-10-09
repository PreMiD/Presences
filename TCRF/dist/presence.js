let presence = new Presence({
    clientId: "631259475038175232" 
});


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/The_Cutting_Room_Floor") {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "browsing TCRF",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);
    }

    else if(["/Help:Contents","/Category:To_do","/Special:RecentChanges"].includes(document.location.pathname)){
        elapsed =  Math.floor(Date.now() / 1000)
        var d = document.location.pathname.replace("/",'').split(":")
        let presenceData = {
            details: `browsing ${d[0]}`,
            state: `at ${d[1]}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);
    }

    else if(document.location.pathname.startsWith("/Help:Contents/")){
        var help = document.location.pathname.split("/")
        elapsed =  Math.floor(Date.now() / 1000)
        d = help[1].split(":")
        let presenceData = {
            details: `getting ${d[0]}`,
            state: `${d[1]}: ${help[2].replace("%26",'&').split("_").join(" ")}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);

    }


    else {
        var name = document.getElementById("firstHeading").innerText.replace(")",'').split("(")
        if(name[0].startsWith("Prerelease:")){
            d = name[0].split(":")
            var x = `Game: ${d[1]}(${d[0]})`
        }
        else{
            var x = `Game: ${name[0]}` 
        }
        if (name[1]==undefined){stated = 'Platform: Multiple'} else {stated = `Platform: ${name[1]} `}
        elapsed =  Math.floor(Date.now() / 1000)
        //var year = document.getElementsByClassName("mw-headline")[1].innerText
        let presenceData = {
            details: `${x}`,
            state: stated,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);

    }

    



}));