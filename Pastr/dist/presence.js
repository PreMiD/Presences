var presence = new Presence({
    clientId: "630777829478498326",
    mediaKeys: false
});
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "pastrlogo"
    };
    let pageTitle = (document.title).slice(11);
    let currentPage;
    let action; 
    let state;
    if(pageTitle == "Create") {
        action = "Creating a paste"
        let pasteName = document.getElementById("paste-title").value;
        if(!pasteName) {
            pasteName = "Untitled";
        }
        state = pasteName;
    } else if(pageTitle == "The smoothest paste service") {
        action = "Viewing a page";
        state = "Homepage";
    } else if (window.location.href.includes("view")) {
        action = "Viewing a paste";
        state = pageTitle;
    } else {
        action = "Viewing a page";
        state = pageTitle;
    }

    presenceData.details = action;
    presenceData.state = state;

    presence.setActivity(presenceData);
    presence.setTrayTitle();
});
