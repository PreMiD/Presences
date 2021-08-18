const Anipresence = new Presence({
    clientId: "877640464151494676" //The client ID of the Application created at https://discordapp.com/developers/applications
}),

 browsingStamp = Math.floor(Date.now() / 1000);

Anipresence.on("UpdateData", async () => {

    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
      It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
    const presenceData: PresenceData = {
        largeImageKey:
            "icon"
    };

    if (document.location.hostname === "anistream.de") {
        if (document.location.pathname === "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Startseite";
        } else if (document.location.pathname.includes("/serie/")) {

            /*presenceData.startTimestamp = browsingStamp;*/

            const epNr = document.querySelector(".tab-pane.show.active > .active > .episode");
            epName = document.querySelector(".tab-pane.show.active > .active > .name");


            if (epName && epNr) {
                presenceData.details = epName.innerHTML;
                presenceData.state = epNr.innerHTML;
            } else {
                const title = document.querySelector("h1");
                presenceData.details = title.innerText;
                const staffel = document.querySelector(".nav-link.active");
                presenceData.state = staffel.innerHTML;
            }

        }
    }

    if (presenceData.details === null) {
        //This will fire if you do not set presence details
        Anipresence.setTrayTitle(); //Clears the tray title for mac users
        Anipresence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        Anipresence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});