const presence = new Presence({
    clientId: "630478614894477337"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "docslogo"
    };
    if (window.location.pathname.toLowerCase().includes("/document")) {
        presenceData.largeImageKey = "docslogo";
        if (window.location.pathname.toLowerCase().includes("/edit")) {
            presenceData.largeImageKey = "docslogo";
            presenceData.details = "Editing a document:";
            presenceData.state = document.title.replace("- Google Docs", "");
        }
        else {
            presenceData.largeImageKey = "docslogo";
            if (window.location.pathname.toLowerCase() === "/document/u/0/") {
                presenceData.details = "Browsing documents";
            }
            else {
                presenceData.largeImageKey = "docslogo";
                if (window.location.pathname.toLowerCase() === "/document/u/0") {
                    presenceData.details = "Browsing documents";
                }
                else {
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
        }
        else {
            presenceData.largeImageKey = "formslogo";
            if (window.location.pathname.toLowerCase() === "/forms/u/0/") {
                presenceData.details = "Browsing forms";
            }
            else {
                presenceData.largeImageKey = "formslogo";
                if (window.location.pathname.toLowerCase() === "/forms/u/0") {
                    presenceData.details = "Browsing forms";
                }
                else {
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
        }
        else {
            presenceData.largeImageKey = "sheetslogo";
            if (window.location.pathname.toLowerCase() === "/spreadsheets/u/0/") {
                presenceData.details = "Browsing spreadsheets";
            }
            else {
                presenceData.largeImageKey = "sheetslogo";
                if (window.location.pathname.toLowerCase() === "/spreadsheets/u/0") {
                    presenceData.details = "Browsing spreadsheets";
                }
                else {
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
        }
        else {
            presenceData.largeImageKey = "slideslogo";
            if (window.location.pathname.toLowerCase() === "/document/u/0/") {
                presenceData.largeImageKey = "slideslogo";
                presenceData.details = "Browsing slidesheets";
            }
            else {
                presenceData.largeImageKey = "slideslogo";
                if (window.location.pathname.toLowerCase() === "/presentation/u/0") {
                    presenceData.details = "Browsing slidesheets";
                }
                else {
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
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUNGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2hFLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVELFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ3hDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ3hDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQy9ELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7Z0JBQ3hDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssZUFBZSxFQUFFO29CQUM5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