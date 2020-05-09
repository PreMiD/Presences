var presence = new Presence({
    clientId: "620294187878711313"
});
presence.on("UpdateData", () => {
    var presenceData = {
        details: "Viewing the homepage...",
        largeImageKey: "lg-gb"
    };
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.pathname == "/") {
        presenceData = {
            details: "Viewing the homepage...",
            largeImageKey: "lg-gb"
        };
        presence.setActivity(presenceData);
    }
    else if (urlParams.get("page") &&
        urlParams.get("s") &&
        urlParams.get("page") == "post") {
        if (urlParams.get("s") == "list") {
            if (urlParams.get("tags")) {
                presenceData = {
                    details: "Searching...",
                    state: urlParams.get("tags").replace(" ", ", "),
                    largeImageKey: "lg-gb"
                };
                presence.setActivity(presenceData);
            }
            else {
                presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-gb"
                };
                presence.setActivity(presenceData);
            }
        }
        else if (urlParams.get("s") == "view" && urlParams.get("id")) {
            presenceData = {
                details: "Viewing a Post...",
                state: "Post " + urlParams.get("id"),
                largeImageKey: "lg-gb"
            };
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity(presenceData);
        }
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixJQUFJLFlBQVksR0FBaUI7UUFDL0IsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxhQUFhLEVBQUUsT0FBTztLQUN2QixDQUFDO0lBRUYsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxZQUFZLEdBQUc7WUFDYixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLGFBQWEsRUFBRSxPQUFPO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFDTCxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNsQixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sRUFDL0I7UUFDQSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQ2hDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDekIsWUFBWSxHQUFHO29CQUNiLE9BQU8sRUFBRSxjQUFjO29CQUN2QixLQUFLLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztvQkFDL0MsYUFBYSxFQUFFLE9BQU87aUJBQ3ZCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxZQUFZLEdBQUc7b0JBQ2IsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsYUFBYSxFQUFFLE9BQU87aUJBQ3ZCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztTQUNGO2FBQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlELFlBQVksR0FBRztnQkFDYixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxhQUFhLEVBQUUsT0FBTzthQUN2QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztLQUNGO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==