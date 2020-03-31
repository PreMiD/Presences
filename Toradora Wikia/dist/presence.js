var englishPresence = new Presence({
    clientId: "613417749489778689"
});
var germanPresence = new Presence({
    clientId: "613418400042975329"
});
englishPresence.on("UpdateData", async () => {
    if (document.location.href.includes("tora-dora.fandom.com")) {
        if (document.location.pathname.startsWith("/wiki/")) {
            let page = "N/A";
            try {
                page = document.getElementsByClassName("page-header__title")[0]
                    .textContent;
            }
            catch (err) {
                let errCode = "TWIKI_WIKIEN_GETPAGETITLE";
                console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " +
                    errCode +
                    "   :::   " +
                    err);
            }
            let presenceData = {
                details: "Viewing a page...",
                state: page,
                largeImageKey: "lg-twiki"
            };
            englishPresence.setActivity(presenceData);
        }
    }
    germanPresence.on("UpdateData", async () => {
        if (document.location.href.includes("toradora.fandom.com")) {
            if (document.location.pathname.startsWith("/de/wiki/")) {
                let page = "N/A";
                try {
                    page = document.getElementsByClassName("page-header__title")[0]
                        .textContent;
                }
                catch (err) {
                    let errCode = "TWIKI_WIKIDE_GETPAGETITLE";
                    console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " +
                        errCode +
                        "   :::   " +
                        err);
                }
                let presenceData = {
                    details: "Schaut eine Seite an...",
                    state: page,
                    largeImageKey: "lg-twiki"
                };
                germanPresence.setActivity(presenceData);
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUNqQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDMUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUUzRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUVuRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSTtnQkFDRixJQUFJLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM1RCxXQUFXLENBQUM7YUFDaEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrRkFBa0Y7b0JBQ2hGLE9BQU87b0JBQ1AsV0FBVztvQkFDWCxHQUFHLENBQ04sQ0FBQzthQUNIO1lBQ0QsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsSUFBSTtnQkFDWCxhQUFhLEVBQUUsVUFBVTthQUMxQixDQUFDO1lBQ0YsZUFBZSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzQztLQUNGO0lBQ0QsY0FBYyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDekMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUUxRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFFdEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNqQixJQUFJO29CQUNGLElBQUksR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzVELFdBQVcsQ0FBQztpQkFDaEI7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxPQUFPLEdBQUcsMkJBQTJCLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsa0ZBQWtGO3dCQUNoRixPQUFPO3dCQUNQLFdBQVc7d0JBQ1gsR0FBRyxDQUNOLENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxZQUFZLEdBQWlCO29CQUMvQixPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxLQUFLLEVBQUUsSUFBSTtvQkFDWCxhQUFhLEVBQUUsVUFBVTtpQkFDMUIsQ0FBQztnQkFDRixjQUFjLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzFDO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=