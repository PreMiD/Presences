var presence = new Presence({
    clientId: "613393646330576931"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        let presenceData = {
            details: "Viewing the homepage",
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/search")) {
        let presenceData = {
            details: "Searching...",
            state: document.location.search.substr(3),
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/package/")) {
        let presenceData = {
            details: "Viewing a package",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/~")) {
        let presenceData = {
            details: "Viewing a profile",
            state: document.location.pathname.substr(3),
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            largeImageKey: "lg-npm"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLGFBQWEsRUFBRSxRQUFRO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDNUQsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLGFBQWEsRUFBRSxRQUFRO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDOUQsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsYUFBYSxFQUFFLFFBQVE7U0FDdkIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2RCxJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzQyxhQUFhLEVBQUUsUUFBUTtTQUN2QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztTQUFNO1FBQ04sSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLGFBQWEsRUFBRSxRQUFRO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==