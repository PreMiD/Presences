const presence = new Presence({
    clientId: "821059536768335902" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
    timebrowsed = Math.floor(Date.now() / 1000);

console.log('qwq #1')

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
    console.log('qwq', document.location.pathname)
    //const moodleHost = document.location.hostname;
    const pathName = document.location.pathname

    const presenceData: PresenceData = {
        largeImageKey:
            "smallimage" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
        smallImageKey:
            "smallimage" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
        smallImageText: 'reading I guess', //The text which is displayed when hovering over the small image
        details: pathName, //The upper section of the presence text
        //state: "Reading something . . .", //The lower section of the presence text
        startTimestamp: timebrowsed,
    }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

    if (pathName.includes('course')) {
        const courseName = document.getElementById("page-header-headings");
        console.log(courseName)
        presenceData.details = 'Viewing Course'
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