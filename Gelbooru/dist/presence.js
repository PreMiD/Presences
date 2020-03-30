var presence = new Presence({
    clientId: "620294187878711313"
});
presence.on("UpdateData", () => {
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.pathname == "/") {
        var presenceData = {
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
                var presenceData = {
                    details: "Searching...",
                    state: urlParams.get("tags").replace(" ", ", "),
                    largeImageKey: "lg-gb"
                };
                presence.setActivity(presenceData);
            }
            else {
                var presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-gb"
                };
                presence.setActivity(presenceData);
            }
        }
        else if (urlParams.get("s") == "view" && urlParams.get("id")) {
            var presenceData = {
                details: "Viewing a Post...",
                state: "Post " + urlParams.get("id"),
                largeImageKey: "lg-gb"
            };
            presence.setActivity(presenceData);
        }
        else {
            var presenceData = {
                largeImageKey: "lg-gb"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        var presenceData = {
            largeImageKey: "lg-gb"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLGFBQWEsRUFBRSxPQUFPO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNsQixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sRUFDOUI7UUFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQ2pDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxZQUFZLEdBQWlCO29CQUNoQyxPQUFPLEVBQUUsY0FBYztvQkFDdkIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7b0JBQy9DLGFBQWEsRUFBRSxPQUFPO2lCQUN0QixDQUFDO2dCQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7aUJBQU07Z0JBQ04sSUFBSSxZQUFZLEdBQWlCO29CQUNoQyxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxhQUFhLEVBQUUsT0FBTztpQkFDdEIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO1NBQ0Q7YUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0QsSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxhQUFhLEVBQUUsT0FBTzthQUN0QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ04sSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxhQUFhLEVBQUUsT0FBTzthQUN0QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQztLQUNEO1NBQU07UUFDTixJQUFJLFlBQVksR0FBaUI7WUFDaEMsYUFBYSxFQUFFLE9BQU87U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQyJ9