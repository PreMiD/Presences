var presence = new Presence({
    clientId: "656826806061498368"
}), presenceData = {
    largeImageKey: "icon"
}, customData = false;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    customData = false;
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/dashboard") {
        presenceData.details = "Viewing the Dashboard!";
    }
    else if (document.location.pathname == "/profile") {
        presenceData.details = "Viewing their profile!";
    }
    else if (document.location.pathname.startsWith("/room")) {
        var title = document.querySelector("#title");
        if (title != null) {
            customData = true;
            var roomData = {
                details: "Completing room:",
                state: title.innerText,
                largeImageKey: "icon",
                startTimestamp: browsingStamp
            };
            presence.setActivity(roomData);
        }
        else {
            presenceData.details = "Looking at rooms!";
        }
    }
    else if (document.location.pathname == "/upload" ||
        document.location.pathname == "/manage-rooms" ||
        document.location.pathname.startsWith("/room/manage") ||
        document.location.pathname == "/assign-tasks" ||
        document.location.pathname == "/your-material") {
        presenceData.details = "Managing a room!";
        presenceData.state = "Page: " + document.location.pathname;
    }
    else if (document.location.pathname == "/leaderboards") {
        presenceData.details = "Checking the leaderboards!";
    }
    else {
        presenceData.details = "Breaking stuff!";
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBRTlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3JCLEVBQ0QsVUFBVSxHQUFZLEtBQUssQ0FBQztBQUU3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ25CLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FDaEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtRQUNwRCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBQ2hEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQztZQUVsQixJQUFJLFFBQVEsR0FBaUI7Z0JBQzVCLE9BQU8sRUFBRSxrQkFBa0I7Z0JBQzNCLEtBQUssRUFBRyxLQUFxQixDQUFDLFNBQVM7Z0JBQ3ZDLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixjQUFjLEVBQUUsYUFBYTthQUM3QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztTQUMzQztLQUNEO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTO1FBQ3ZDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWU7UUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUNyRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlO1FBQzdDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQixFQUM3QztRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7S0FFM0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtRQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO0tBQ3BEO1NBQU07UUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO0tBQ3pDO0lBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNoQixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==