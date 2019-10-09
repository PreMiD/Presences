let presence = new Presence({
    clientId: "631543282601558046" 
});



presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Starting Akinator",
            //largeImageKey: "banner",
            largeImageKey: "akinator",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }

    else if(document.location.pathname=="/theme-selection"){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Selecting Theme",
            //largeImageKey: "banner",
            largeImageKey: "akinator",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }

    else if(document.location.pathname=="/game"){
        
        elapsed =  Math.floor(Date.now() / 1000)
        var current = document.getElementsByClassName("bubble-body")[0].innerText
        var hover = document.querySelectorAll( ":hover" )[12].innerText
        let presenceData = {
            details: `Q: ${current}`,
            state: `Selecting: ${(hover!=undefined)?hover:"Still Thinking"}`,
            //largeImageKey: "banner",
            largeImageKey: "akinator",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }

}));