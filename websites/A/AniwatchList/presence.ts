const presence = new Presence({
  clientId: "806351411607896085" //The client ID of the Application created at https://discordapp.com/developers/applications
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

let title: String;
let cutTitle: String;
let cutTitleArray: String[];

presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
  title = document.title;
  const presenceData: PresenceData = {
    largeImageKey:
      "aniwatchlist_logo_grey_bg" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    details: "Viewing the Home Page" //The upper section of the presence text
  }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

  if(title.includes("Watchlist")) {
    cutTitle = title.slice(15);
    cutTitleArray = cutTitle.split(" ");
    presenceData.details = "Viewing " + cutTitleArray[0] + " Watchlist";
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