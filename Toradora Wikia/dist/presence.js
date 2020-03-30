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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ2pDLFFBQVEsRUFBRSxvQkFBb0I7Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDM0MsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUU1RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUVwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSTtnQkFDSCxJQUFJLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM3RCxXQUFXLENBQUM7YUFDZDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNiLElBQUksT0FBTyxHQUFHLDJCQUEyQixDQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUNWLGtGQUFrRjtvQkFDakYsT0FBTztvQkFDUCxXQUFXO29CQUNYLEdBQUcsQ0FDSixDQUFDO2FBQ0Y7WUFDRCxJQUFJLFlBQVksR0FBaUI7Z0JBQ2hDLE9BQU8sRUFBRSxtQkFBbUI7Z0JBQzVCLEtBQUssRUFBRSxJQUFJO2dCQUNYLGFBQWEsRUFBRSxVQUFVO2FBQ3pCLENBQUM7WUFDRixlQUFlLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzFDO0tBQ0Q7SUFDRCxjQUFjLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtRQUMxQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBRTNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUV2RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2pCLElBQUk7b0JBQ0gsSUFBSSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDN0QsV0FBVyxDQUFDO2lCQUNkO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNiLElBQUksT0FBTyxHQUFHLDJCQUEyQixDQUFDO29CQUMxQyxPQUFPLENBQUMsR0FBRyxDQUNWLGtGQUFrRjt3QkFDakYsT0FBTzt3QkFDUCxXQUFXO3dCQUNYLEdBQUcsQ0FDSixDQUFDO2lCQUNGO2dCQUNELElBQUksWUFBWSxHQUFpQjtvQkFDaEMsT0FBTyxFQUFFLHlCQUF5QjtvQkFDbEMsS0FBSyxFQUFFLElBQUk7b0JBQ1gsYUFBYSxFQUFFLFVBQVU7aUJBQ3pCLENBQUM7Z0JBQ0YsY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QztTQUNEO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9