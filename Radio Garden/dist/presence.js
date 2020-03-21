var presence = new Presence({
    clientId: "687070418804408445", //The client ID of the Application created at https://discordapp.com/developers/applications
    mediaKeys: false //Enable use and detection of media key presses
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if(!document.title.includes("Explore live radio by rotating")){
        //var container = document.querySelector(".channel-list")
        //console.log(document.querySelector("div.mod-active").innerText)
        var elapsed =  Math.floor(Date.now() / 1000)
        var presenceData
        presenceData = {
            details: `${document.querySelector(".ChannelTitle_title__2QQj5").innerText}`,
            state: `${document.querySelector(".ChannelTitle_subtitle__DZ_ZQ").innerText}`,
            largeImageKey: "bigglobe",
            startTimestamp: elapsed
        };
        if(document.getElementsByClassName('ListItem_isPlaying__E3wWB').length == 1){
            presenceData.smallImageKey = "statusplay";
            presenceData.smallImageText = "Playing";
            presenceData.startTimestamp = elapsed;
        }
        else if(document.getElementsByClassName('ListItem_isLoading__2rDhr').length == 1){
            presenceData.smallImageKey = "statusplay";
            presenceData.smallImageText = "Loading";
            delete presenceData.startTimestamp;
        }
        else if(document.getElementsByClassName('ListItem_isPaused__3xqrt').length == 1){
            presenceData.smallImageKey = "statusstop";
            presenceData.smallImageText = "Stopped";
            delete presenceData.startTimestamp;
        }
        else {
            console.log("broke")
        }
        console.log(presenceData)
        //presenceData.smallImageText = "smallImageText"
        //delete presenceData.startTimestamp
        presence.setActivity(presenceData)
}}));