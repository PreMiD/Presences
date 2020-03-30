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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25ELElBQUksZ0JBQWdCLEdBQWlCO1lBQ3BDLE9BQU8sRUFBRSxRQUFRO2lCQUNmLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUV6QyxhQUFhLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3ZDO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDOUM7UUFDRCxJQUFJLGlCQUFpQixHQUFpQjtZQUNyQyxPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLGFBQWEsRUFBRSxNQUFNO1NBQ3JCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUM3QyxJQUFJLGdCQUFnQixHQUFpQjtZQUNwQyxPQUFPLEVBQUUsWUFBWTtZQUNyQixLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLGFBQWEsRUFBRSxNQUFNO1NBQ3JCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDdkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM1RCxJQUFJLGdCQUFnQixHQUFpQjtZQUNwQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsYUFBYSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzlELElBQUksZ0JBQWdCLEdBQWlCO1lBQ3BDLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsYUFBYSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN2QztTQUFNO1FBQ04sSUFBSSxnQkFBZ0IsR0FBaUI7WUFDcEMsT0FBTyxFQUFFLFlBQVk7WUFDckIsYUFBYSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN2QztBQUNGLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBUyxJQUFJO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFPSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzlELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFDIn0=