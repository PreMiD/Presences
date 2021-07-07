var presence = new Presence({
  clientId: "475590192464396288"
});

presence.on("UpdateData", async () => {
  if (document.getElementsByClassName("community__name")[0]) {
    const testPresenceData: PresenceData = {
      details:
        document.getElementsByClassName("community__name")[0].textContent,
      state: document.getElementsByClassName("community__song-playing")[0]
        .textContent,
      largeImageKey: "pdjlogo"
    };
    presence.setActivity(testPresenceData);
  }
});

/*
presence.on("UpdateData", async () => {
  if(document.location.pathname == ("/")) {
    let homepagePresence: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if(document.location.pathname.startsWith("/stories")) {
    let presenceData: PresenceData = {
      details: "Viewing a story",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else {
    // TODO: Check if the page is really a profile
    let presenceData: PresenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.split("/")[1],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});
*/
