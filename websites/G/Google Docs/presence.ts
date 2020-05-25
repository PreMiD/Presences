const presence = new Presence({
  clientId: "630478614894477337"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "docslogo"
  };
  if (window.location.pathname.toLowerCase().includes("/document")) {
    presenceData.largeImageKey = "docslogo";
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.largeImageKey = "docslogo";
      presenceData.details = "Editing a document:";
      presenceData.state = document.title.replace("- Google Docs", "");
    } else {
      presenceData.largeImageKey = "docslogo";
      if (window.location.pathname.toLowerCase() === "/document/u/0/") {
        presenceData.details = "Browsing documents";
      } else {
        presenceData.largeImageKey = "docslogo";
        if (window.location.pathname.toLowerCase() === "/document/u/0") {
          presenceData.details = "Browsing documents";
        } else {
          presenceData.largeImageKey = "docslogo";
          presenceData.details = "Viewing a document:";
          presenceData.state = document.title.replace("- Google Docs", "");
        }
      }
    }
  }

  if (window.location.pathname.toLowerCase().includes("/forms")) {
    presenceData.largeImageKey = "formslogo";
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.largeImageKey = "formslogo";
      presenceData.details = "Editing a form:";
      presenceData.state = document.title.replace("- Google Forms", "");
    } else {
      presenceData.largeImageKey = "formslogo";
      if (window.location.pathname.toLowerCase() === "/forms/u/0/") {
        presenceData.details = "Browsing forms";
      } else {
        presenceData.largeImageKey = "formslogo";
        if (window.location.pathname.toLowerCase() === "/forms/u/0") {
          presenceData.details = "Browsing forms";
        } else {
          presenceData.largeImageKey = "formslogo";
          presenceData.details = "Viewing a form:";
          presenceData.state = document.title.replace("- Google Forms", "");
        }
      }
    }
  }

  if (window.location.pathname.toLowerCase().includes("/spreadsheets")) {
    presenceData.largeImageKey = "sheetslogo";
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.largeImageKey = "sheetslogo";
      presenceData.details = "Editing a spreadsheet:";
      presenceData.state = document.title.replace("- Google Sheets", "");
    } else {
      presenceData.largeImageKey = "sheetslogo";
      if (window.location.pathname.toLowerCase() === "/spreadsheets/u/0/") {
        presenceData.details = "Browsing spreadsheets";
      } else {
        presenceData.largeImageKey = "sheetslogo";
        if (window.location.pathname.toLowerCase() === "/spreadsheets/u/0") {
          presenceData.details = "Browsing spreadsheets";
        } else {
          presenceData.largeImageKey = "sheetslogo";
          presenceData.details = "Viewing a spreadsheet:";
          presenceData.state = document.title.replace("- Google Sheets", "");
        }
      }
    }
  }
  if (window.location.pathname.toLowerCase().includes("/presentation")) {
    presenceData.largeImageKey = "slideslogo";
    if (window.location.pathname.toLowerCase().includes("/edit")) {
      presenceData.largeImageKey = "slideslogo";
      presenceData.details = "Editing a slidesheet:";
      presenceData.state = document.title.replace("- Google Slides", "");
    } else {
      presenceData.largeImageKey = "slideslogo";
      if (window.location.pathname.toLowerCase() === "/document/u/0/") {
        presenceData.largeImageKey = "slideslogo";
        presenceData.details = "Browsing slidesheets";
      } else {
        presenceData.largeImageKey = "slideslogo";
        if (window.location.pathname.toLowerCase() === "/presentation/u/0") {
          presenceData.details = "Browsing slidesheets";
        } else {
          presenceData.largeImageKey = "slideslogo";
          presenceData.details = "Viewing a slidesheet:";
          presenceData.state = document.title.replace("- Google Slides", "");
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
