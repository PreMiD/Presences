var presence = new Presence({
    clientId: "687070418804408445", //The client ID of the Application created at https://discordapp.com/developers/applications
    mediaKeys: false //Enable use and detection of media key presses
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if(document.location.pathname.startsWith("/listen/")){
        elapsed =  Math.floor(Date.now() / 1000)
        //var container = document.querySelector(".channel-list")
        //console.log(document.querySelector("div.mod-active").innerText)
        let presenceData = {
            details: `${document.querySelector("div.mod-active").innerText}`,
            state: `${document.querySelector(".location-info-location").innerText}`,
            largeImageKey: "bigglobe",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData)
}}));