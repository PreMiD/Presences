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
    const menu = document.getElementsByClassName("project-list-sidebar"),
      //Selcting active section
      actif = menu[0].getElementsByClassName("active"),
      //Take care of custom folders
      maybecustom = actif[0].getElementsByClassName("name ng-binding");
    if (maybecustom.length !== 0)
      presenceData.state = maybecustom[0].textContent;
    //Take care of (i) logo
    else {
      const fnl = actif[0].getElementsByTagName("a");
      presenceData.state = fnl[0].textContent;
    }
    presenceData.startTimestamp = elapsed;
  } else if (pth.includes("/project")) {
    //Project page
    presenceData.details = document.title.replace(
      "- Online LaTeX Editor Overleaf",
      ""
    );
    //Isolating lateral menu
    const menu = document.getElementsByClassName("file-tree-list"),
      //Selecting selected element
      actif = menu[0].getElementsByClassName("selected"),
      //Selecting current file name
      filename = actif[0].getElementsByTagName("span")[0].textContent;
    presenceData.state = filename;
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

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
