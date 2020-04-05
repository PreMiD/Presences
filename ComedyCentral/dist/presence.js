var presence = new Presence({
    clientId: "630533580119998496"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "comedycentral"
    };
    if (document.location.pathname.startsWith("/episodes")) {
        var player = document.querySelector(".edge-player-content-element");
        var show = document.querySelector(".header h3 a").textContent;
        var epTitle = document.querySelector(".sub-header h1").textContent;
        var epNumber;
        epNumber = document.querySelector(".meta span");
        if (epNumber) {
            epNumber =
                epNumber.textContent.replace("Season ", "S").replace(" Ep ", ":E") +
                    " ";
        }
        else {
            epNumber = "";
        }
        var timestamps = getTimestamps(Math.floor(player.currentTime), Math.floor(player.duration));
        data.details = show;
        data.state = epNumber + epTitle;
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];
        data.smallImageKey = player.paused ? "pause" : "play";
        data.smallImageText = player.paused
            ? (await strings).pause
            : (await strings).play;
        if (player.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data);
    }
    else {
        data.details = "Browsing...";
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLGFBQWEsRUFBRSxlQUFlO0tBQy9CLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN0RCxJQUFJLE1BQU0sR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbkQsOEJBQThCLENBQy9CLENBQUM7UUFFRixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUM5RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ25FLElBQUksUUFBYSxDQUFDO1FBQ2xCLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELElBQUksUUFBUSxFQUFFO1lBQ1osUUFBUTtnQkFDTixRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7b0JBQ2xFLEdBQUcsQ0FBQztTQUNQO2FBQU07WUFDTCxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDNUIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU07WUFDakMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRXpCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCO1FBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtTQUFNO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9