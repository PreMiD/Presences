var presence = new Presence({
    clientId: "708981544487878738"
});
console.log("Presence created");
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var author;
var playbackStatus;
function getStatus() {
    var playPauseBtn = document.querySelector("#play-button");
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
        largeImageKey: "musiccast"
    };
    if (document.location.hostname === "www.musiccast.marinosite.xyz" || document.location.hostname === "musiccast.marinosite.xyz") {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#title");
        author = document.querySelector("#artist");
        playbackStatus = getStatus();
        if (playbackStatus === "Paused") {
            presenceData.smallImageKey = "no-cast";
        }
        if (playbackStatus === "Playing") {
            presenceData.smallImageKey = "transparent";
        }
        presenceData.state = title.innerText;
        presenceData.details = author.innerText;
        presenceData.smallImageText = playbackStatus;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtBQUUvQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksY0FBbUIsQ0FBQztBQUV4QixTQUFTLFNBQVM7SUFDaEIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxRCxJQUFHLFlBQVksQ0FBQyxTQUFTLEtBQUssYUFBYSxFQUFDO1FBQzFDLE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBQ0QsSUFBRyxZQUFZLENBQUMsU0FBUyxLQUFLLGNBQWMsRUFBQztRQUMzQyxPQUFPLFNBQVMsQ0FBQTtLQUNqQjtJQUNELE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssOEJBQThCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssMEJBQTBCLEVBQUM7UUFDM0gsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsY0FBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUcsY0FBYyxLQUFLLFFBQVEsRUFBQztZQUM3QixZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQTtTQUN2QztRQUNELElBQUcsY0FBYyxLQUFLLFNBQVMsRUFBQztZQUM5QixZQUFZLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtTQUMzQztRQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDeEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7S0FDaEQ7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9