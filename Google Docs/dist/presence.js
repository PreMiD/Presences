var presence = new Presence({
    clientId: "630478614894477337",
    mediaKeys: false
});
let oo;
let songt;
let songa;

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "docslogo"
    };
    if(window.location.pathname.toLowerCase().includes("/document")) {
        if(window.location.pathname.toLowerCase().includes("/edit")) {
            presenceData.details = "Editing a document:"
            presenceData.state =  document.title.replace("- Google Docs", "");
        } else {
            if(window.location.pathname.toLowerCase() ==="/document/u/0/") {
                presenceData.details = "Browsing documents"
            } else {
                if(window.location.pathname.toLowerCase() ==="/document/u/0") {
                    presenceData.details = "Browsing documents"
                } else {
                    presenceData.details = "Viewing a document:"
                    presenceData.state =  document.title.replace("- Google Docs", "");
                }
            }
        }

    }




    presence.setActivity(presenceData)
    presence.setTrayTitle();

});
