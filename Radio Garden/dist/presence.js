var presence = new Presence({
    clientId: "687070418804408445", //The client ID of the Application created at https://discordapp.com/developers/applications
    mediaKeys: false //Enable use and detection of media key presses
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if(!document.title.includes("Explore live radio by rotating")){
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
            presenceData.smallImageText = "Tuning";
            delete presenceData.startTimestamp;
        }
        else if(document.getElementsByClassName('ListItem_isPaused__3xqrt').length == 1){
            presenceData.smallImageKey = "statusstop";
            presenceData.smallImageText = "Stopped";
            delete presenceData.startTimestamp;
        };
//        This could work with some tweaks. It detects when youre not tuned into anything, but trips if radio youre tuned into is not in view...
//        else {
//            presenceData.smallImageKey = "statusstop";
//            presenceData.smallImageText = "Tuning";
//            presenceData.details = "Tuning";
//            delete presenceData.state;
//            delete presenceData.startTimestamp;
//            console.log("broke")
//        };
        presence.setActivity(presenceData)
}}));