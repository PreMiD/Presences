var presence = new Presence({
    clientId: "518193753433833499"
});
presence.on("UpdateData", async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let typeParam = urlParams.get("type");
    let charParam = urlParams.get("char");
    if (typeParam == "original") {
        if (charParam.toLowerCase() == "taiga") {
            let presenceData = {
                details: "Looking at screenshots",
                state: "Taiga Aisaka",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking at screenshots",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
    }
    else if (typeParam == "fanart") {
        if (charParam.toLowerCase() == "taiga") {
            let presenceData = {
                details: "Looking at fanart",
                state: "Taiga Aisaka",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking at fanart",
                largeImageKey: "lg-tapi"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        let presenceData = {
            largeImageKey: "lg-tapi"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksU0FBUyxJQUFJLFVBQVUsRUFBRTtRQUM1QixJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDdkMsSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxLQUFLLEVBQUUsY0FBYztnQkFDckIsYUFBYSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNOLElBQUksWUFBWSxHQUFpQjtnQkFDaEMsT0FBTyxFQUFFLHdCQUF3QjtnQkFDakMsYUFBYSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7S0FDRDtTQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRTtRQUNqQyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDdkMsSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsY0FBYztnQkFDckIsYUFBYSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNOLElBQUksWUFBWSxHQUFpQjtnQkFDaEMsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsYUFBYSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7S0FDRDtTQUFNO1FBQ04sSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLGFBQWEsRUFBRSxTQUFTO1NBQ3hCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==