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

    if(window.location.pathname.toLowerCase().includes("/forms")) {
        if(window.location.pathname.toLowerCase().includes("/edit")) {
            presenceData.details = "Editing a form:"
            presenceData.state =  document.title.replace("- Google Forms", "");
        } else {
            if(window.location.pathname.toLowerCase() ==="/forms/u/0/") {
                presenceData.details = "Browsing forms"
            } else {
                if(window.location.pathname.toLowerCase() ==="/forms/u/0") {
                    presenceData.details = "Browsing forms"
                } else {
                    presenceData.details = "Viewing a form:"
                    presenceData.state =  document.title.replace("- Google Forms", "");
                }
            }
        }

    }

    if(window.location.pathname.toLowerCase().includes("/spreadsheets")) {
        if(window.location.pathname.toLowerCase().includes("/edit")) {
            presenceData.details = "Editing a spreadsheet:"
            presenceData.state =  document.title.replace("- Google Sheets", "");
        } else {
            if(window.location.pathname.toLowerCase() ==="/spreadsheets/u/0/") {
                presenceData.details = "Browsing spreadsheets"
            } else {
                if(window.location.pathname.toLowerCase() ==="/spreadsheets/u/0") {
                    presenceData.details = "Browsing spreadsheets"
                } else {
                    presenceData.details = "Viewing a spreadsheet:"
                    presenceData.state =  document.title.replace("- Google Sheets", "");
                }
            }
        }

    }
    if(window.location.pathname.toLowerCase().includes("/presentation")) {
        if(window.location.pathname.toLowerCase().includes("/edit")) {
            presenceData.details = "Editing a slidesheet:"
            presenceData.state =  document.title.replace("- Google Slides", "");
        } else {
            if(window.location.pathname.toLowerCase() ==="/document/u/0/") {
                presenceData.details = "Browsing slidesheets"
            } else {
                if(window.location.pathname.toLowerCase() ==="/presentation/u/0") {
                    presenceData.details = "Browsing slidesheets"
                } else {
                    presenceData.details = "Viewing a slidesheet:"
                    presenceData.state =  document.title.replace("- Google Slides", "");
                }
            }
        }

    }



    presence.setActivity(presenceData)
    presence.setTrayTitle();

});
