const presence = new Presence({
    clientId: "729241422179467315"
});
const startTime = Math.floor(Date.now() / 1000);
let title;
let author;
let playbackStatus;
function getStatus() {
    const playPauseBtn = document.querySelector("#play-button");
    if (playPauseBtn.className === "fas fa-play") {
        return "Paused";
    }
    if (playPauseBtn.className === "fas fa-pause") {
        return "Playing";
    }
    return "Playing";
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "main",
        startTimestamp: startTime
    };
    title = document.querySelector("#title").innerHTML;
    author = document.querySelector("#artist").innerHTML;
    playbackStatus = getStatus();
    if (playbackStatus === "Paused") {
        presenceData.smallImageKey = "stop";
    }
    if (playbackStatus === "Playing") {
        presenceData.smallImageKey = "play";
    }
    presenceData.state = title;
    presenceData.details = author;
    presenceData.smallImageText = playbackStatus;
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQTtBQUVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWhELElBQUksS0FBYSxDQUFDO0FBQ2xCLElBQUksTUFBYyxDQUFDO0FBQ25CLElBQUksY0FBc0IsQ0FBQztBQUUzQixTQUFTLFNBQVM7SUFDZCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzVELElBQUcsWUFBWSxDQUFDLFNBQVMsS0FBSyxhQUFhLEVBQUM7UUFDeEMsT0FBTyxRQUFRLENBQUM7S0FDbkI7SUFDRCxJQUFHLFlBQVksQ0FBQyxTQUFTLEtBQUssY0FBYyxFQUFDO1FBQ3pDLE9BQU8sU0FBUyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsU0FBUztLQUM1QixDQUFDO0lBRUYsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ25ELE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNyRCxjQUFjLEdBQUcsU0FBUyxFQUFFLENBQUM7SUFDN0IsSUFBRyxjQUFjLEtBQUssUUFBUSxFQUFDO1FBQzNCLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0tBQ3ZDO0lBQ0QsSUFBRyxjQUFjLEtBQUssU0FBUyxFQUFDO1FBQzVCLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0tBQ3ZDO0lBQ0QsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDM0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDOUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFFN0MsSUFBRyxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQztRQUM1QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzFCO1NBQUk7UUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3RDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==