var presence = new Presence({
    clientId: "607875991746117643"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        const presenceData = {
            details: "Looking at nekos",
            largeImageKey: "lg-nekos"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/lewd") {
        const presenceData = {
            details: "Looking at lewd nekos",
            largeImageKey: "lg-nekos"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLGFBQWEsRUFBRSxVQUFVO1NBQzFCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPLEVBQUU7UUFDaEQsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsYUFBYSxFQUFFLFVBQVU7U0FDMUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9