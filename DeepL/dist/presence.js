var presence = new Presence({
    clientId: "614903529240395782"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/translator") {
        const presenceData = {
            details: document.getElementsByClassName("translate_from")[0].parentNode
                .textContent,
            state: document.getElementsByClassName("translate_to")[0].parentNode
                .textContent,
            largeImageKey: "lg-deepl"
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            largeImageKey: "lg-deepl"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFO1FBQy9DLE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtpQkFDckUsV0FBVztZQUNkLEtBQUssRUFBRSxRQUFRLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtpQkFDakUsV0FBVztZQUNkLGFBQWEsRUFBRSxVQUFVO1NBQzFCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxNQUFNLFlBQVksR0FBaUI7WUFDakMsYUFBYSxFQUFFLFVBQVU7U0FDMUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9