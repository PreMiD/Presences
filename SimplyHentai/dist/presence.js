var presence = new Presence({
    clientId: "608043966285348944"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var reading;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != reading) {
    lastPlaybackState = reading;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
    reading =
        document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;
    var something, a, b;
    if (reading) {
        something = document.querySelectorAll(".margin-bottom-12 h1 a");
        a = something[0];
        b = something[1];
        var page = document
            .querySelector(".page-jump.text-center")
            .getAttribute("value");
        let presenceData = {
            details: a.innerText,
            state: b.innerText + " [Page: " + page + "]",
            largeImageKey: "lg"
        };
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData, true);
    }
    else {
        let presenceData = {
            largeImageKey: "lg"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLGlCQUFpQixJQUFJLE9BQU8sRUFBRTtJQUNqQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQzlDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsT0FBTztRQUNOLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRTFFLElBQUksU0FBYyxFQUFFLENBQU0sRUFBRSxDQUFNLENBQUM7SUFFbkMsSUFBSSxPQUFPLEVBQUU7UUFDWixTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDaEUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLElBQUksSUFBSSxHQUFHLFFBQVE7YUFDakIsYUFBYSxDQUFDLHdCQUF3QixDQUFDO2FBQ3ZDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QixJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTO1lBQ3BCLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxJQUFJLEdBQUcsR0FBRztZQUM1QyxhQUFhLEVBQUUsSUFBSTtTQUNuQixDQUFDO1FBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNOLElBQUksWUFBWSxHQUFpQjtZQUNoQyxhQUFhLEVBQUUsSUFBSTtTQUNuQixDQUFDO1FBRUYsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7UUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN6QztBQUNGLENBQUMsQ0FBQyxDQUFDO0FBT0gsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM5RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEQsQ0FBQyJ9