var presence = new Presence({
    clientId: "631039621656084480"
});
const timeNyaned = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        const presenceData = {
            details: "Nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/index.php")) {
        const presenceData = {
            details: "Nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/credits.php") {
        const presenceData = {
            details: "Looking at the credits",
            state: "...and probably nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/stats.php") {
        const presenceData = {
            details: "Looking at their stats",
            state: "...and probably nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWpELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzlELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ3ZELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLFVBQVU7U0FDM0IsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRTtRQUNyRCxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGNBQWMsRUFBRSxVQUFVO1NBQzNCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==