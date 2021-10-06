const presence = new Presence({
  clientId: "719757905888542730"
});

let actionTimestamp: number = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "gitbookw"
  };

  if (location.hostname === "app.gitbook.com") {
    // In dashboard?
    if (document.querySelector("[class*=--dashboardBody-")) {
      const dashName = document.querySelector(
        "[class*=--dashboardMenu-] [class*=--headerText-]"
      );
      data.details = dashName
        ? `In ${dashName.textContent}'s Dashboard`
        : "In a Dashboard";
      actionTimestamp = null;
    } else {
      data.smallImageKey = "writing";
      data.smallImageText = "Editing";

      const docName = document.querySelector("[class*='logoText-'] span"),
        pageName = document.querySelector("[class*=--navButtonOpened-] span");

      actionTimestamp ??= Date.now();
      if (docName) data.details = `Editing ${docName.textContent}`;
      if (pageName) data.state = `on ${pageName.textContent}`;
      data.startTimestamp = actionTimestamp;
    }
  } else {
    data.smallImageKey = "reading";
    data.smallImageText = "Viewing";

    const docName = document.querySelector("[class*='logoText-'] span"),
      pageName = document.querySelector("[class*=--navButtonOpened-] span");

    actionTimestamp ??= Date.now();
    if (docName) data.details = `Viewing ${docName.textContent}`;
    if (pageName) data.state = `on ${pageName.textContent}`;
    data.startTimestamp = actionTimestamp;
  }

  // If data doesn't exist clear else set activity to the presence data
  if (!data.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});
