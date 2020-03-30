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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRS9DLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMxQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQy9ELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMxQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ3hELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLFVBQVU7U0FDMUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRTtRQUN0RCxJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGNBQWMsRUFBRSxVQUFVO1NBQzFCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==