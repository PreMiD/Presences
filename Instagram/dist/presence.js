var presence = new Presence({
    clientId: "547436289960574977"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        const homepagePresence = {
            details: "Viewing the homepage",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/stories")) {
        const presenceData = {
            details: "Viewing a story",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/accounts")) {
        const presenceData = {
            details: "Settings",
            state: "Changing their Settings",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/p")) {
        const presenceData = {
            details: "Viewing a post",
            state: "NAME-HERE",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/explore")) {
        const presenceData = {
            details: "Exploring...",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/nametag")) {
        const presenceData = {
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            details: "Viewing a profile",
            state: document.location.pathname.split("/")[1],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLE1BQU0sZ0JBQWdCLEdBQWlCO1lBQ3JDLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDN0QsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0RCxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixLQUFLLEVBQUUsV0FBVztZQUNsQixhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsY0FBYztZQUN2QixhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNO1FBRUwsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9