var presence = new Presence({
  clientId: "613393646330576931"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/search")) {
    const presenceData: PresenceData = {
      details: "Searching...",
      state: document.location.search.substr(3),
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/package/")) {
    let state: string;
    if (document.location.pathname.split("/").length == 4) {
      const user: string = document.location.pathname.split("/")[2];
      const package: string = document.location.pathname.split("/")[3];
      state = user + "/" + package;
    } else {
      state = document.location.pathname.split("/")[2];
    }
    const presenceData: PresenceData = {
      details: "Viewing a package",
      state: state,
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/~")) {
    const presenceData: PresenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.substr(3),
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: PresenceData = {
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  }
});
