var presence = new Presence({
    clientId: "470178791428325376"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/show")) {
        const homepagePresence = {
            details: document
                .getElementsByClassName("titel")[0]
                .getElementsByTagName("h3")[0].innerText,
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/speedsuche") ||
        document.location.pathname.startsWith("/suche")) {
        const searchingPresence = {
            details: "Sucht...",
            state: "Sucht nach einem Anime",
            largeImageKey: "logo"
        };
        presence.setActivity(searchingPresence);
    }
    else if (document.location.pathname == "/") {
        const homepagePresence = {
            details: "Inaktiv...",
            state: "Hängt auf der Startseite ab",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/animes")) {
        const overviewPresence = {
            details: "Schaut sich um...",
            state: "Sucht nach Animes",
            largeImageKey: "logo"
        };
        presence.setActivity(overviewPresence);
    }
    else if (document.location.pathname.startsWith("/kalender")) {
        const calenderPresence = {
            details: "Schaut in den Kalender",
            largeImageKey: "logo"
        };
        presence.setActivity(calenderPresence);
    }
    else {
        const inactivePresence = {
            details: "Inaktiv...",
            largeImageKey: "logo"
        };
        presence.setActivity(inactivePresence);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2xELE1BQU0sZ0JBQWdCLEdBQWlCO1lBQ3JDLE9BQU8sRUFBRSxRQUFRO2lCQUNkLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUUxQyxhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDL0M7UUFDQSxNQUFNLGlCQUFpQixHQUFpQjtZQUN0QyxPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUM1QyxNQUFNLGdCQUFnQixHQUFpQjtZQUNyQyxPQUFPLEVBQUUsWUFBWTtZQUNyQixLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzRCxNQUFNLGdCQUFnQixHQUFpQjtZQUNyQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzdELE1BQU0sZ0JBQWdCLEdBQWlCO1lBQ3JDLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztTQUFNO1FBQ0wsTUFBTSxnQkFBZ0IsR0FBaUI7WUFDckMsT0FBTyxFQUFFLFlBQVk7WUFDckIsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQyxDQUFDIn0=