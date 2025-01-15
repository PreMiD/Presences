const presence1 = new Presence({
  clientId: "910193698644586536"
});
const browsingTimestamp2 = Math.floor(Date.now() / 1000);

presence1.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "averge.eu",
    startTimestamp: browsingTimestamp2
  };

   if (window.location.href.includes("averge.eu"))
    presenceData.details = "https://averge.eu";
  else if (window.location.href.includes("averge.eu")) {
    if (window.location.pathname.toLowerCase() === "/") {
      presenceData.details = "Schaut auf die Startseite";
      presenceData.state = "Dashboard";
    } else if (window.location.pathname.toLowerCase() === "/raidprotect") {
      presenceData.details = "Schaut auf RaidProtect";
      presenceData.state = "RaidProtect";
    } else if (window.location.pathname.toLowerCase() === "/globalsecure") {
      presenceData.details = "Schaut auf GlobalSecure";
      presenceData.state = "GlobalSecure";
    } else if (window.location.pathname.toLowerCase() === "/about") {
      presenceData.details = "Schaut über uns an";
      presenceData.state = "Über uns";
    } else if (window.location.pathname.toLowerCase() === "/projectserver") {
      presenceData.details = "Schaut auf ProjektServer";
      presenceData.state = "ProjektServer";
    } else if (window.location.pathname.toLowerCase() === "/kontakt") {
      presenceData.details = "Schaut Kontakt an";
      presenceData.state = "Kontakt";
    }  else if (window.location.pathname.toLowerCase().includes("/404")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "404 Seite";
    } else if (window.location.pathname.toLowerCase().includes("/impressum")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "Impressum";
    } else if (window.location.pathname.toLowerCase().includes("/datenschutz")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "Datenschutz";
    } 
  } else {
    presenceData.details = "Schaut sich die Seite an:";
    if (window.location.pathname.toLowerCase() === "/")
      presenceData.state = "Homepage";
     else if (window.location.pathname.toLowerCase().includes("/404")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "404 Seite";
    } else if (window.location.pathname.toLowerCase().includes("/impressum")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "Impressum";
    } else if (window.location.pathname.toLowerCase().includes("/datenschutz")) {
      presenceData.details = "Schaut sich die Seite an:";
      presenceData.state = "Datenschutz";
    } else delete presenceData.details;
  }

  if (!presenceData.details) {
    presence1.setTrayTitle();
    presence1.setActivity();
  } else presence1.setActivity(presenceData);
});