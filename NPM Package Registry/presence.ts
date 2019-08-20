var presence = new Presence({
  clientId: "613393646330576931",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.pathname == "/") {
    let presenceData: presenceData = {
      details: "Viewing the homepage",
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/search")) {
    let presenceData: presenceData = {
      details: "Searching...",
      state: document.location.search.substr(3),
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/package/")) {
    let presenceData: presenceData = {
      details: "Viewing a package",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/~")) {
    let presenceData: presenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.substr(3),
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  } else {
    let presenceData: presenceData = {
      largeImageKey: "lg-npm"
    };
    presence.setActivity(presenceData);
  }
});