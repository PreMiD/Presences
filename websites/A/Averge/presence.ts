const presence1 = new Presence({
  clientId: "910193698644586536",
});

presence1.on("UpdateData", () => {
  const browsingTimestamp = Math.floor(Date.now() / 1000);

  // Initial Presence Data
  const presenceData: PresenceData = {
    largeImageKey: "averge-eu-logo",
    startTimestamp: browsingTimestamp,
  };

  // Base URL Check
  if (window.location.href.startsWith("https://averge.eu")) {
    const path = window.location.pathname.toLowerCase();

    // Define Page Specific Presence Data
    switch (path) {
      case "/":
        presenceData.details = "Schaut auf die Startseite";
        presenceData.state = "Dashboard";
        break;
      case "/raidprotect":
        presenceData.details = "Schaut auf RaidProtect";
        presenceData.state = "RaidProtect";
        break;
      case "/globalsecure":
        presenceData.details = "Schaut auf GlobalSecure";
        presenceData.state = "GlobalSecure";
        break;
      case "/about":
        presenceData.details = "Schaut über uns an";
        presenceData.state = "Über uns";
        break;
      case "/projectserver":
        presenceData.details = "Schaut auf ProjektServer";
        presenceData.state = "ProjektServer";
        break;
      case "/kontakt":
        presenceData.details = "Schaut Kontakt an";
        presenceData.state = "Kontakt";
        break;
      default:
        if (path.includes("/404")) {
          presenceData.details = "Schaut sich die Seite an:";
          presenceData.state = "404 Seite";
        } else if (path.includes("/impressum")) {
          presenceData.details = "Schaut sich die Seite an:";
          presenceData.state = "Impressum";
        } else if (path.includes("/datenschutz")) {
          presenceData.details = "Schaut sich die Seite an:";
          presenceData.state = "Datenschutz";
        } else {
          delete presenceData.details;
        }
        break;
    }
  } else {
    // Handle non-averge.eu URLs
    presenceData.details = "Schaut sich die Seite an:";
    const path = window.location.pathname.toLowerCase();

    if (path === "/") {
      presenceData.state = "Homepage";
    } else if (path.includes("/404")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "404 Seite";
    } else if (path.includes("/impressum")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "Impressum";
    } else if (path.includes("/datenschutz")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "Datenschutz";
    } else {
      delete presenceData.details;
    }
  }

  // Update the presence
  if (!presenceData.details) {
    presence1.clearActivity();
  } else {
    presence1.setActivity(presenceData);
  }
});
