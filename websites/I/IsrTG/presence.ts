const presence = new Presence({
    clientId: "872606127358091294" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });

const browsingStamp = Math.floor(Date.now() / 1000);
const eventName = document.querySelector("#app > div > div >div > h2");
const user = document.querySelector("#app > div > div >div >h2 ").firstChild;

presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  const presenceData: PresenceData = {
    largeImageKey:
      "logo" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageKey: "",
    smallImageText: "Some hover text", //The text which is displayed when hovering over the small image
    details: "Browsing Page Name", //The upper section of the presence text
    state: "Reading section A" //The lower section of the presence textt
  }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname === "/") {
    presenceData.details = "Homepage";
    delete presenceData.state;
  } else if (document.location.pathname.startsWith("/events")) {
    presenceData.details = "Events";
    presenceData.state = `looking at ${eventName.innerHTML} `;
    presenceData.smallImageText = `Really looking at ${eventName.innerHTML}`;
    presenceData.smallImageKey = "calendar";
  } else if (document.location.pathname.startsWith("/profile")) {
    presenceData.details = "Profile";
    presenceData.state = `Looking At ${user.nodeValue} profile`;
    presenceData.smallImageKey = "avatar";
  } else if (document.location.pathname.startsWith("/about")) {
    presenceData.details = "Reading The About Page";
    presenceData.smallImageKey = "glasses";
    delete presenceData.state;
  } else if (document.location.pathname.startsWith("/roster")) {
    presenceData.details = "Looking At The Clan Members";
    delete presenceData.state;
  } else if (document.location.pathname.startsWith("/tutorials")) {
    presenceData.details = "Reading Tutorials";
    delete presenceData.state;
  } else if (document.location.pathname.startsWith("/contact-us")) {
    presenceData.details = "Viewing Contact-Us";
    delete presenceData.state;
  } else if (document.location.pathname.startsWith("/gallery")) {
    presenceData.details = "Viewing The Gallery";
    delete presenceData.state;
  } else if (document.location.pathname.startsWith("/info")) {
    presenceData.details = "Viewing The Clan's Info";
    delete presenceData.state;
  }

  presence.setActivity(presenceData);
});
