var presence = new Presence({
    clientId: "739615293474603068" //The client ID of the Application created at https://discordapp.com/developers/applications
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings
});

/*

function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/


presence.on("UpdateData", async () => {
    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

    var needState = false
    var browsingStamp = Math.floor(Date.now() / 1000);

    const titleArray = document.title.split("|")
    var titlenName = ""
    if(titleArray[1] == " Your Discord Bot List") {
        titlenName = "main page"
    } else if(titleArray[0] == "Partner") {
        titlenName = "partner page"
    } else if(titleArray[0] == "Login ") {
        titlenName = "login page"
    } else if(titleArray[0] == "Submit your Bot") {
        titlenName = "submit page"
    } else if(titleArray[1] == " All Bots") {
        titlenName = "all bots"
    } else if(titleArray[1] == " LPTP1.de") {
        titlenName = "status page"
    } else if(document.title.split("-")[1]) {
        const botTitleArray = document.title.split("-")
        titlenName = botTitleArray[0]
    } else if(titleArray[1] == " Vote") {
        needState = true
        titlenName = titleArray[0]
    } else {
        titlenName = "a page"
    }

    if(!needState) {
        var presenceData: PresenceData = {
            largeImageKey: "dbl_eu-logo", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
            details: "Viewing "+titlenName, //The upper section of the presence text
            startTimestamp: browsingStamp, //The unix epoch timestamp for when to start counting from
        }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/
    
    } else {
        var presenceData: PresenceData = {
            largeImageKey: "dbl_eu-logo", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
            details: "Viewing "+titlenName, //The upper section of the presence text
            state: "Vote",
            startTimestamp: browsingStamp, //The unix epoch timestamp for when to start counting from
        }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/
    
    }

    if (presenceData.details == null) {
        //This will fire if you do not set presence details
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});
