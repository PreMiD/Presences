var presence = new Presence({
  clientId: "613393646330576931"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: presenceData = {
      details: "Viewing the homepage",
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/search")) {
    const presenceData: presenceData = {
      details: "Searching...",
      state: document.location.search.substr(3),
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/package/")) {
    const presenceData: presenceData = {
      details: "Viewing a package",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/~")) {
    const presenceData: presenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.substr(3),
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: presenceData = {
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  }
});
