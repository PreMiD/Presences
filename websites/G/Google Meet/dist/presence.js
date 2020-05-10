const presence = new Presence({
    clientId: "701914032541794386"
});
const time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "meetlogo"
    }, path = document.location.pathname.toLowerCase();
    if (path === "/") {
        presenceData.details = "Initial page";
        presenceData.state = "Just waiting";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else {
        presenceData.smallImageKey = "vcall";
        presenceData.details = "Watching";
        presenceData.state = "In a meeting";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzNDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFVBQVU7S0FDMUIsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEQsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ2xDLFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9