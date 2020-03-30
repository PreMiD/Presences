var presence = new Presence({
    clientId: "619963616489242645"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/wiki/")) {
        let page = "N/A";
        try {
            page = document.getElementsByClassName("page-header__title")[0]
                .textContent;
        }
        catch (err) {
            let errCode = "KMNNWIKI_WIKIEN_GETPAGETITLE";
            console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " +
                errCode +
                "   :::   " +
                err);
        }
        let presenceData = {
            details: "Viewing a page...",
            state: page,
            largeImageKey: "lg-kmnnwwiki"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRXBELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJO1lBQ0gsSUFBSSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0QsV0FBVyxDQUFDO1NBQ2Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNiLElBQUksT0FBTyxHQUFHLDhCQUE4QixDQUFDO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQ1Ysa0ZBQWtGO2dCQUNqRixPQUFPO2dCQUNQLFdBQVc7Z0JBQ1gsR0FBRyxDQUNKLENBQUM7U0FDRjtRQUNELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxJQUFJO1lBQ1gsYUFBYSxFQUFFLGNBQWM7U0FDN0IsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQyJ9