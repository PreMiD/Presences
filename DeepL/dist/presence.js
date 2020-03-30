var presence = new Presence({
    clientId: "614903529240395782"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/translator") {
        let presenceData = {
            details: document.getElementsByClassName("translate_from")[0].parentNode
                .textContent,
            state: document.getElementsByClassName("translate_to")[0].parentNode
                .textContent,
            largeImageKey: "lg-deepl"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            largeImageKey: "lg-deepl"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFO1FBQ2hELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtpQkFDdEUsV0FBVztZQUNiLEtBQUssRUFBRSxRQUFRLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtpQkFDbEUsV0FBVztZQUNiLGFBQWEsRUFBRSxVQUFVO1NBQ3pCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDTixJQUFJLFlBQVksR0FBaUI7WUFDaEMsYUFBYSxFQUFFLFVBQVU7U0FDekIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQyJ9