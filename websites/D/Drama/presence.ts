const presence = new Presence({
  clientId: "852245069984825394" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
  //You can use this to get translated strings in their browser language
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

  var article_title = document.querySelector("h2.DiscussionHero-title").textContent;
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

  It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  
  var presenceData: PresenceData = {
    largeImageKey:
      "dramagg" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageKey:
      "reading" /*The key (file name) of the Small Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageText: "Reading a thread", //The text which is displayed when hovering over the small image
    details: "Looking at some Drama!", //The upper section of the presence text
    state: `Reading ${article_title}`, //The lower section of the presence text
  }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/
  


if (presenceData.details == null) {
  //This will fire if you do not set presence details
  presence.setTrayTitle(); //Clears the tray title for mac users
  presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
} else {
  //This will fire if you set presence details
  presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
}
});