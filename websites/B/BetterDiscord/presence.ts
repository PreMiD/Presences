const presence = new Presence({
    clientId: "872429725090447360"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  title = document.querySelector(".title")?.textContent ?? "unknown",
  path = document.location;

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("timestamps"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "site",
      startTimestamp: browsingStamp
    };

  // Presence
  if (document.location.pathname === "/") presenceData.state = "Home Page";
  if (path.search.includes("filter")) {
    presenceData.state = `Search ${title}`;
    presenceData.smallImageKey = "search";
  } else if (path.pathname.includes("FAQ")) {
    presenceData.details = "Reading";
    presenceData.state = "Frequent Questions ?";
    presenceData.smallImageKey = "question";
  } else if (path.pathname.includes("developers"))
    presenceData.state = "Views Developers";
  else if (path.pathname.includes("Docs")) {
    presenceData.details = "Reading";
    (presenceData.state = title), (presenceData.smallImageKey = "reading");
  } else if (path.pathname.includes("Privacy")) {
    presenceData.details = "Reading";
    (presenceData.state = title), (presenceData.smallImageKey = "reading");
  } else if (path.pathname.includes("themes"))
    presenceData.state = "Views Themes";
  else if (path.pathname.includes("plugins"))
    presenceData.state = "Views plugins";
  else if (path.pathname.includes("theme/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Views Theme";
    presenceData.state = title;
    if (buttons) {
      presenceData.buttons = [
        {
          label: "Views Themes",
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    }
  } else if (path.pathname.includes("plugin/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Views plugin";
    presenceData.state = title;
    if (buttons) {
      presenceData.buttons = [
        {
          label: "Views plugins",
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    }
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!presenceData.state) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
