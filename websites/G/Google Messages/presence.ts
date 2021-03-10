const presence = new Presence({
    clientId: "809898713996066827"
  }),
  tmb = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      smallImageKey: "google",
      smallImageText: "Google",
      startTimestamp: tmb
    },
    path = document.location.pathname.toLowerCase(),
    showcon = await presence.getSetting("showContact");
  // Home Page
  if (path === "/" || path.includes("/intl/")) {
    presenceData.largeImageKey = "icon";
    presenceData.details = "Home page";
  }
  // Auth page
  else if (path === "/web/authentication") {
    presenceData.largeImageKey = "icon";
    presenceData.details = "Authentication page";
  } else if (path === "/web/conversations") {
    presenceData.details = "Browsing conversations";
    presenceData.largeImageKey = "icon";
  } else if (
    path.includes("/web/conversations/") &&
    path !== "/web/conversations/new"
  ) {
    // checking parameters
    if (!showcon) {
      presenceData.state = "Hidden (adjustable in Presence settings)";
    } else {
      const itl = document
        .getElementsByClassName("title-container")[0]
        .querySelector("h2 > span > span").textContent;
      presenceData.state = itl;
    }
    presenceData.details = "Reading messages from:";
    presenceData.largeImageKey = "icon";
  } else if (path === "/web/conversations/new") {
    presenceData.largeImageKey = "icon";
    presenceData.details = "New conversation page";
  } else if (path === "/web/settings") {
    presenceData.largeImageKey = "icon";
    presenceData.details = "Browsing settings";
  } else {
    presenceData.largeImageKey = "icon";
    presenceData.details = "Browsing on Google Messages";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
