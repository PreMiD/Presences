const presence = new Presence({
  clientId: "547436289960574977"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    const homepagePresence: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if (document.location.pathname.startsWith("/stories")) {
    const presenceData: PresenceData = {
      details: "Viewing a story",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/accounts")) {
    const presenceData: PresenceData = {
      details: "Settings",
      state: "Changing their Settings",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/p")) {
    const presenceData: PresenceData = {
      details: "Viewing a post",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/explore")) {
    const presenceData: PresenceData = {
      details: "Exploring...",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/nametag")) {
    const presenceData: PresenceData = {
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/direct/inbox") ||
    document.location.pathname.startsWith("/direct/t")
  ) {
    const presenceData: PresenceData = {
      details: "Direct Messages",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else {
    // TODO: Check if the page is really a profile
    const presenceData: PresenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.split("/")[1],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});
