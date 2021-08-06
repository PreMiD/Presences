const presence = new Presence({
    clientId: "872606127358091294" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });
console.log("isrtg working ");

var browsingStamp = Math.floor(Date.now() / 1000);

//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up
presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  const presenceData: PresenceData = {
    largeImageKey:
      "logo" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageText: "Some hover text", //The text which is displayed when hovering over the small image
    details: "Browsing Page Name", //The upper section of the presence text
    state: "Reading section A" //The lower section of the presence textt
  }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname === "/")
    presenceData.details = "Viewing the homepage";
  else if (document.location.pathname.startsWith("/events")) {
    const [, , pathName] = document.location.pathname.split("/");
    presenceData.details = "Viewing a event";
    presenceData.state = pathName;
  } else if (document.location.pathname.startsWith("/profile")) {
    presenceData.details = "Profile";
    presenceData.state = "Looking at their profile";
  } else if (document.location.pathname.startsWith("/about"))
    presenceData.details = "Viewing the about page";
  else if (document.location.pathname.startsWith("/roster"))
    presenceData.details = "Looking at the clan members";
  else if (document.location.pathname.startsWith("/tutorials"))
    presenceData.details = "Viewing tutorials";
  else if (
    document.location.pathname.startsWith("/direct/inbox") ||
    document.location.pathname.startsWith("/direct/t")
  )
    presenceData.details = "Direct Messages";
  else {
    // TODO: Check if the page is really a profile
    const [, pathName] = document.location.pathname.split("/");
    presenceData.details = "Viewing a profile";
    presenceData.state = pathName;
  }
  presence.setActivity(presenceData);
});
