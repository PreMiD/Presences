const presence = new Presence({
    clientId: "784954155747377162"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "latex",
      smallImageKey: "whitelogo",
      smallImageText: "Overleaf"
    },
    pth = window.location.pathname.toLowerCase();

  //Projects page (hub)
  if (pth === "/project" || pth === "/project/") {
    presenceData.details = "Browsing Projects";
    //Selecting lateral menu
    const //Selcting active section
      actif = document
        .getElementsByClassName("project-list-sidebar")[0]
        .getElementsByClassName("active"),
      //Take care of custom folders
      maybecustom = actif[0].getElementsByClassName("name ng-binding");
    if (maybecustom.length !== 0)
      presenceData.state = maybecustom[0].textContent;
    //Take care of (i) logo
    else presenceData.state = actif[0].getElementsByTagName("a")[0].textContent;

    presenceData.startTimestamp = elapsed;
  } else if (pth.includes("/project")) {
    //Project page
    presenceData.details = document.title.replace(
      "- Online LaTeX Editor Overleaf",
      ""
    );
    //Isolating lateral menu

    presenceData.state = document
      .getElementsByClassName("file-tree-list")[0]
      .getElementsByClassName("selected")[0]
      .getElementsByTagName("span")[0].textContent;
    presenceData.startTimestamp = elapsed;
  } else if (pth.includes("/learn")) {
    //Documentation
    presenceData.details = "Browsing Documentation";
    if (pth === "/learn" || pth === "/learn/") presenceData.state = "Main Page";
    else {
      presenceData.state = document.title.replace(
        "- Overleaf, Online LaTeX Editor",
        ""
      );
    }
    presenceData.startTimestamp = elapsed;
  } else {
    //Random other pages
    presenceData.details = "Browsing:";
    presenceData.state = document.title.replace(
      "- Overleaf, Online LaTeX Editor",
      ""
    );
    presenceData.startTimestamp = elapsed;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
