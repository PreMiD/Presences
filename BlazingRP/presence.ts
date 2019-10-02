var mainPresence = new Presence({
  clientId: "629041369515687937",
  mediaKeys: false
});
var hubPresence = new Presence({
  clientId: "629041900804112385",
  mediaKeys: false
});
var devPresence = new Presence({
  clientId: "629042148100276244",
  mediaKeys: false
});


mainPresence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "lg"
  };
  if(document.location.hostname == "blazingrp.net") {
    if(document.location.pathname == "/") {
      presenceData.details = "Betrachtet die Startseite..."
    } else if(document.location.pathname.startsWith("/jobs")) {
      presenceData.details = "Betrachtet freie Stellen..."
    } else if(document.location.pathname.startsWith("/roadmap")) {
      presenceData.details = "Betrachtet die Roadmap..."
    } else if(document.location.pathname.startsWith("/changelogs")) {
      presenceData.details = "Betrachtet die Changelogs..."
    } else if(document.location.pathname.startsWith("/wiki")) {
      if(document.getElementsByClassName("page-header")[0].textContent.startsWith("Bearbeiten von „")) {
        presenceData.details = "Bearbeitet einen Wiki Artikel...";
        presenceData.state = document.getElementsByClassName("page-header")[0].textContent.replace("Bearbeiten von „", "").replace("“", "");
      } else {
          presenceData.details = "Liest einen Wiki Artikel...";
          presenceData.state = document.getElementsByClassName("page-header")[0].textContent;
      }
    }
    mainPresence.setActivity(presenceData);
  } else if(document.location.hostname == "hub.blazingrp.net") {
    if(document.location.pathname == "/login") {
      presenceData.details = "Betrachtet die Loginseite...";
    } else if(document.location.pathname.startsWith("/register")) {
      presenceData.details = "Betrachtet die Registrierungsseite...";
    }
    hubPresence.setActivity(presenceData);
  } else if(document.location.hostname == "bugs.blazingrp.net") {
    presenceData.details = "Bugtracker"
    if(document.location.pathname == "/my_view_page.php") {
      presenceData.state = "Betrachtet das Dashboard...";
    } else if(document.location.pathname.startsWith("/view_all_bug_page.php")) {
      presenceData.state = "Betrachtet die Bugübersicht...";
    } else if(document.location.pathname.startsWith("/bug_report_page.php")) {
      presenceData.state = "Erstellt einen Bug...";
    } else if(document.location.pathname.startsWith("/roadmap_page.php")) {
      presenceData.state = "Betrachtet die Bug-Roadmap...";
    } else if(document.location.pathname.startsWith("/view.php")) {
      presenceData.state = "Betrachtet einen Fehler...";
    }
    mainPresence.setActivity(presenceData);
  } else if(document.location.hostname == "cdn.blazingrp.net") {
    presenceData.details = "Betrachet den Fileserver..."
    mainPresence.setActivity(presenceData);
  } else if(document.location.hostname == "developers.blazingrp.net") {
    if(document.location.pathname == "/") {
      presenceData.details = "Betrachtet die Startseite...";
    } else if(document.location.pathname.startsWith("/javadocs")) {
      presenceData.details = "Javadocs";
      if(document.location.pathname.split("/").length == 3) {
        presenceData.state = "Übersicht";
      } else {
        presenceData.state = document.location.pathname.split("/")[2];
      }
    }
    devPresence.setActivity(presenceData);
  }
});
