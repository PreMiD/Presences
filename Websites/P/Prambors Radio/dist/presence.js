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
    const pause = (await strings).pause, play = (await strings).play;
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
            presenceData.smallImageText = pause;
        }
        else if (status === "playing") {
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "Streaming";
            presenceData.startTimestamp = timestamp;
        }
        else {
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = play;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0NBQ2xDLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUMvQixhQUFhLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBQ0YsSUFBSSxTQUFpQixDQUFDO0FBRXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQ2pDLElBQUksR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3RELElBQUksQ0FBQyxTQUFTO1lBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUNqRCxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDVCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNqQixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7WUFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDckM7YUFBTSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDL0IsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7WUFDMUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7U0FDekM7YUFBTTtZQUNMLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO1FBQ0QsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRO2FBQzFCLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO2FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDdkIsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRO2FBQzVCLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO2FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7S0FDeEI7U0FBTTtRQUNMLFlBQVksR0FBRyxJQUFJLENBQUM7S0FDckI7SUFDRCxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM3RSxDQUFDLENBQUMsQ0FBQyJ9