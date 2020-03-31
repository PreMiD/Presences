var presence = new Presence({
    clientId: "470178791428325376"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/show")) {
        let homepagePresence = {
            details: document
                .getElementsByClassName("titel")[0]
                .getElementsByTagName("h3")[0].innerText,
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/speedsuche") ||
        document.location.pathname.startsWith("/suche")) {
        let searchingPresence = {
            details: "Sucht...",
            state: "Sucht nach einem Anime",
            largeImageKey: "logo"
        };
        presence.setActivity(searchingPresence);
    }
    else if (document.location.pathname == "/") {
        let homepagePresence = {
            details: "Inaktiv...",
            state: "Hängt auf der Startseite ab",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/animes")) {
        let overviewPresence = {
            details: "Schaut sich um...",
            state: "Sucht nach Animes",
            largeImageKey: "logo"
        };
        presence.setActivity(overviewPresence);
    }
    else if (document.location.pathname.startsWith("/kalender")) {
        let calenderPresence = {
            details: "Schaut in den Kalender",
            largeImageKey: "logo"
        };
        presence.setActivity(calenderPresence);
    }
    else {
        let inactivePresence = {
            details: "Inaktiv...",
            largeImageKey: "logo"
        };
        presence.setActivity(inactivePresence);
    }
});
presence.on("iFrameData", function (data) {
    console.log(data);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2xELElBQUksZ0JBQWdCLEdBQWlCO1lBQ25DLE9BQU8sRUFBRSxRQUFRO2lCQUNkLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUUxQyxhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDL0M7UUFDQSxJQUFJLGlCQUFpQixHQUFpQjtZQUNwQyxPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUM1QyxJQUFJLGdCQUFnQixHQUFpQjtZQUNuQyxPQUFPLEVBQUUsWUFBWTtZQUNyQixLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzRCxJQUFJLGdCQUFnQixHQUFpQjtZQUNuQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzdELElBQUksZ0JBQWdCLEdBQWlCO1lBQ25DLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztTQUFNO1FBQ0wsSUFBSSxnQkFBZ0IsR0FBaUI7WUFDbkMsT0FBTyxFQUFFLFlBQVk7WUFDckIsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBUyxJQUFJO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFPSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzdELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=