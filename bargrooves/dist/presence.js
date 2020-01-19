var presence = new Presence({
    clientId: "641955799869947914", //The client ID of the Application created at https://discordapp.com/developers/applications
    mediaKeys: true //Enable use and detection of media key presses
});

presence.on("UpdateData", () => {
    //UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    //It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.
    var presenceData = {
        largeImageKey: "default", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageKey: "logo-square", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageText: "bargrooves.live", //The text which is displayed when hovering over the small image
        largeImageText: "bargrooves.live",
        spectateSecret: "MTIzNDV8MTIzNDV8MTMyNDU0",
        details: "null", //The upper section of the presence text
        state: "null", //The lower section of the presence text
        startTimestamp: 0, //The unix epoch timestamp for when to start counting from
        endTimestamp: 0 //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
    }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

    if (window.location.pathname == "/") {
        presenceData.details = "Listening to the radio";
        presenceData.state = document.getElementById("song").innerHTML + " - " + document.getElementById("artist").innerHTML;
    } else if (window.location.pathname == "/player/") {
        presenceData.details = "Listening to the player";
        presenceData.state = document.getElementById("csong").innerHTML + " - " + document.getElementById("cartist").innerHTML;
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