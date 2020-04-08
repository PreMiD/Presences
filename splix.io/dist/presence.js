var presence = new Presence({
    clientId: "640321591108042762"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var ui;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "splix"
    };
    if (document.location.pathname == "/") {
        ui = document.querySelector("#playUI");
        if (ui.style.cssText == "display: none;") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Getting ready...";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details =
                document.querySelector("#scoreBlock > span:nth-child(5)").textContent +
                    " " +
                    document.querySelector("#scoreBlock > span:nth-child(1)").textContent;
            presenceData.state = document.querySelector("#scoreBlock > span:nth-child(7)").textContent;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVMLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksRUFBTyxDQUFDO0FBRVosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxPQUFPO0tBQ3ZCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLGdCQUFnQixFQUFFO1lBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7U0FDM0M7YUFBTTtZQUNMLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPO2dCQUNsQixRQUFRLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsV0FBVztvQkFDckUsR0FBRztvQkFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3hFLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsaUNBQWlDLENBQ2xDLENBQUMsV0FBVyxDQUFDO1NBQ2Y7S0FDRjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=