const presence = new Presence({
    clientId: "630478614894477337"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      startTimestamp: browsingStamp
    },
    privacy = await presence.getSetting("privacy");
  if (window.location.pathname.toLowerCase().includes("/document")) {
    presenceData.largeImageKey = "docslogo";
    title = document.title.replace("- Google Docs", "");
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.details = privacy
        ? "Editing a document"
        : "Editing a document:";
      presenceData.state = privacy ? null : title;
    } else {
      if (window.location.pathname.toLowerCase() === "/document/u/0") {
        presenceData.details = "Browsing documents";
      } else {
        presenceData.details = privacy
          ? "Viewing a document"
          : "Viewing a document:";
        presenceData.state = privacy ? null : title;
      }
    }
  }

  if (window.location.pathname.toLowerCase().includes("/forms")) {
    presenceData.largeImageKey = "formslogo";
    title = document.title.replace("- Google Forms", "");
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.details = privacy ? "Editing a form" : "Editing a form:";
      presenceData.state = privacy ? null : title;
    } else if(document.location.pathname === "/forms/u/0/"){
      if (window.location.pathname.toLowerCase() === "/forms/u/0/") {
        presenceData.details = "Browsing forms";
      } else {
        if (window.location.pathname.toLowerCase() === "/forms/u/0") {
          presenceData.details = "Browsing forms";
        } else {
          presenceData.details = privacy ? "Viewing a form" : "Viewing a form:";
          presenceData.state = privacy ? null : title;
        }
      }
    }
  }

  if (window.location.pathname.toLowerCase().includes("/spreadsheets")) {
    presenceData.largeImageKey = "sheetslogo";
    title = document.title.replace("- Google Sheets", "");
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.details = privacy
        ? "Editing a spreadsheet"
        : "Editing a spreadsheet:";
      presenceData.state = privacy ? null : title;
    } else {
      if (window.location.pathname.toLowerCase() === "/spreadsheets/u/0/") {
        presenceData.details = "Browsing spreadsheets";
      } else {
        if (window.location.pathname.toLowerCase() === "/spreadsheets/u/0") {
          presenceData.details = "Browsing spreadsheets";
        } else {
          presenceData.details = privacy
            ? "Viewing a spreadsheet"
            : "Viewing a spreadsheet:";
          presenceData.state = privacy ? null : title;
        }
      }
    }
  }
  if (window.location.pathname.toLowerCase().includes("/presentation")) {
    presenceData.largeImageKey = "slideslogo";
    title = document.title.replace("- Google Slides", "");
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.details = privacy
        ? "Editing a slidesheet"
        : "Editing a slidesheet:";
      presenceData.state = privacy ? null : title;
    } else {
      if (window.location.pathname.toLowerCase() === "/document/u/0/") {
        presenceData.details = "Browsing slidesheets";
      } else {
        presenceData.largeImageKey = "slideslogo";
        if (window.location.pathname.toLowerCase() === "/presentation/u/0") {
          presenceData.details = "Browsing slidesheets";
        } else {
          presenceData.details = privacy
            ? "Viewing a slidesheet"
            : "Viewing a slidesheet:";
          presenceData.state = privacy ? null : title;
        }
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
