var presence = new Presence({
    clientId: "607875991746117643"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        let presenceData = {
            details: "Looking at nekos",
            largeImageKey: "lg-nekos"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/lewd") {
        let presenceData = {
            details: "Looking at lewd nekos",
            largeImageKey: "lg-nekos"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLGFBQWEsRUFBRSxVQUFVO1NBQ3pCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPLEVBQUU7UUFDakQsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsYUFBYSxFQUFFLFVBQVU7U0FDekIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQyJ9