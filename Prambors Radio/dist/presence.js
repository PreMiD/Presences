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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUNoQyxhQUFhLEVBQUUsTUFBTTtDQUNyQixDQUFDO0FBQ0YsSUFBSSxTQUFpQixDQUFDO0FBRXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3ZELElBQUksQ0FBQyxTQUFTO1lBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUNsRCxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDUixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDekIsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNqQixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7WUFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2hDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUNwQyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDbkQ7UUFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7YUFDM0IsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7YUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN0QixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7YUFDN0IsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7YUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztLQUN0QjtTQUFNO1FBQ04sWUFBWSxHQUFHLElBQUksQ0FBQztLQUNwQjtJQUNELFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzVFLENBQUMsQ0FBQyxDQUFDIn0=