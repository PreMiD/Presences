var presence = new Presence({
    clientId: "631039621656084480"
});
let timeNyaned = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        let presenceData = {
            details: "Nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/index.php")) {
        let presenceData = {
            details: "Nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/credits.php") {
        let presenceData = {
            details: "Looking at the credits",
            state: "...and probably nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/stats.php") {
        let presenceData = {
            details: "Looking at their stats",
            state: "...and probably nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRS9DLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzlELElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ3ZELElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLFVBQVU7U0FDM0IsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRTtRQUNyRCxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGNBQWMsRUFBRSxVQUFVO1NBQzNCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==