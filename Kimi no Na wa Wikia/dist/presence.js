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
            const errCode = "KMNNWIKI_WIKIEN_GETPAGETITLE";
            console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " +
                errCode +
                "   :::   " +
                err);
        }
        const presenceData = {
            details: "Viewing a page...",
            state: page,
            largeImageKey: "lg-kmnnwwiki"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRW5ELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJO1lBQ0YsSUFBSSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDNUQsV0FBVyxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztZQUMvQyxPQUFPLENBQUMsR0FBRyxDQUNULGtGQUFrRjtnQkFDaEYsT0FBTztnQkFDUCxXQUFXO2dCQUNYLEdBQUcsQ0FDTixDQUFDO1NBQ0g7UUFDRCxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxjQUFjO1NBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==