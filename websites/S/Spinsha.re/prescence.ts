var presence = new Presence({
    clientId: "752151960743837817" //The client ID of the Application created at https://discordapp.com/developers/applications
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
    const { pathname } = window.location;
    const presenceData: PresenceData = {
        largeImageKey: "logo"
    };
    console.log(pathname, presenceData)

    // if (presenceData.details == null) {
    //     //This will fire if you do not set presence details
    //     presence.setTrayTitle(); //Clears the tray title for mac users
    //     presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    // } else {
    //     //This will fire if you set presence details
    //     presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    // }
});