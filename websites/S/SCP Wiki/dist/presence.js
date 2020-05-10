const presence = new Presence({
    clientId: "639208971806310441"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: browsingStamp,
        state: document.getElementById("page-title").textContent.trim()
    };
    if (document.location.hostname == "scp-int.wikidot.com")
        presenceData.largeImageKey = "logo-int";
    if (document.location.hostname == "scp-sandbox-3.wikidot.com")
        presenceData.largeImageKey = "logo-sandbox";
    if (document.location.pathname == "/" || !document.location.pathname)
        presenceData.state = "Main";
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsYUFBYTtRQUM3QixLQUFLLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO0tBQ2hFLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtRQUNyRCxZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztJQUMxQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLDJCQUEyQjtRQUMzRCxZQUFZLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQztJQUU5QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUTtRQUNsRSxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUU5QixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=