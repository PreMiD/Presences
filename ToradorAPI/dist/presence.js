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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksU0FBUyxJQUFJLFVBQVUsRUFBRTtRQUMzQixJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDdEMsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxLQUFLLEVBQUUsY0FBYztnQkFDckIsYUFBYSxFQUFFLFNBQVM7YUFDekIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksWUFBWSxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLHdCQUF3QjtnQkFDakMsYUFBYSxFQUFFLFNBQVM7YUFDekIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7S0FDRjtTQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRTtRQUNoQyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDdEMsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsY0FBYztnQkFDckIsYUFBYSxFQUFFLFNBQVM7YUFDekIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksWUFBWSxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsYUFBYSxFQUFFLFNBQVM7YUFDekIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7S0FDRjtTQUFNO1FBQ0wsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLGFBQWEsRUFBRSxTQUFTO1NBQ3pCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==