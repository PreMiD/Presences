var presence = new Presence({
  clientId: "547436289960574977"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const homepagePresence: presenceData = {
      details: "Viewing the homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if (document.location.pathname.startsWith("/stories")) {
    const presenceData: presenceData = {
      details: "Viewing a story",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/accounts")) {
    const presenceData: presenceData = {
      details: "Settings",
      state: "Changing their Settings",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/p")) {
    const presenceData: presenceData = {
      details: "Viewing a post",
      state: "NAME-HERE",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/explore")) {
    const presenceData: presenceData = {
      details: "Exploring...",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/nametag")) {
    const presenceData: presenceData = {
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else {
    // TODO: Check if the page is really a profile
    const presenceData: presenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.split("/")[1],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});
