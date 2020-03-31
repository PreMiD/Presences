const presence = new Presence({
    clientId: "630428033966276612"
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let presenceData = {
    largeImageKey: "logo"
};
let timestamp;
presence.on("UpdateData", async () => {
    if (document.location.hostname.startsWith("streaming")) {
        if (!timestamp)
            timestamp = Date.now();
        const status = document.querySelector("#playerBtn")
            ? document.querySelector("#playerBtn").className
            : null;
        if (status === "stopped") {
            timestamp = null;
            delete presenceData.startTimestamp;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
        }
        else if (status === "playing") {
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "Streaming";
            presenceData.startTimestamp = timestamp;
        }
        else {
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = (await strings).play;
        }
        presenceData.state = document
            .querySelectorAll("span[data-radium=true]")
            .item(3).textContent;
        presenceData.details = document
            .querySelectorAll("span[data-radium=true]")
            .item(2).textContent;
    }
    else {
        presenceData = null;
    }
    presenceData ? presence.setActivity(presenceData) : presence.setActivity();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0NBQ2xDLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUMvQixhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBQ0YsSUFBSSxTQUFpQixDQUFDO0FBRXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3RELElBQUksQ0FBQyxTQUFTO1lBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUNqRCxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDVCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNqQixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7WUFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQy9CLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUNwQyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDcEQ7UUFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7YUFDMUIsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7YUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN2QixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7YUFDNUIsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7YUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsWUFBWSxHQUFHLElBQUksQ0FBQztLQUNyQjtJQUNELFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzdFLENBQUMsQ0FBQyxDQUFDIn0=