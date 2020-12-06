const presence = new Presence({
    clientId: "784954155747377162"
});

const elapsed = Math.floor(Date.now() / 1000);


presence.on("UpdateData", async () => {

    var presenceData: PresenceData = {
        largeImageKey: "latex",
        smallImageKey: "whitelogo",
        smallImageText: "Overleaf",
    };


    let pth = window.location.pathname.toLowerCase();;


    //Projects page (hub)
    if (pth === "/project" || pth === "/project/") {
        presenceData.details = "Browsing Projects";
        //Selecting lateral menu
        let menu = document.getElementsByClassName("project-list-sidebar");
        //Selcting active section
        let actif = menu[0].getElementsByClassName("active");
        //Take care of custom folders
        let maybecustom = actif[0].getElementsByClassName("name ng-binding");
        if (maybecustom.length != 0) {
            presenceData.state = maybecustom[0].textContent;
        }
        //Take care of (i) logo
        else {
            var fnl = actif[0].getElementsByTagName("a");
            presenceData.state = fnl[0].textContent;
        };
        presenceData.startTimestamp = elapsed;
    }

    //Project page
    else if (pth.includes("/project")) {
        presenceData.details = document.title.replace("- Online LaTeX Editor Overleaf", "");
        //Isolating lateral menu
        let menu = document.getElementsByClassName("file-tree-list");
        //Selecting selected element
        let actif = menu[0].getElementsByClassName("selected");
        //Selecting current file name
        let filename = actif[0].getElementsByTagName("span")[0].textContent
        presenceData.state = filename;
        presenceData.startTimestamp = elapsed;
    }


    //Documentation
    else if (pth.includes("/learn")) {
        presenceData.details = "Browsing Documentation";
        if (pth === "/learn" || pth === "/learn/") {
            presenceData.state = "Main Page";
        }
        else {
            presenceData.state = document.title.replace("- Overleaf, Online LaTeX Editor", "");
        };
        presenceData.startTimestamp = elapsed;
    }


    //Random other pages
    else {
        presenceData.details = "Browsing:";
        presenceData.state = document.title.replace("- Overleaf, Online LaTeX Editor", "");
        presenceData.startTimestamp = elapsed;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});