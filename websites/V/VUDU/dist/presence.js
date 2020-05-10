const presence = new Presence({
    clientId: "697983563857002517"
});
let startTime = Date.now();
let videoPlayer;
let videoDuration;
let cuTime;
let endTime;
let videoState = "paused";
let metadata;
let presenceData = {
    largeImageKey: "vudularge",
    details: "Browsing VUDU"
};
function grabMetadata() {
    var closeButton = document.querySelector('[aria-label="Close"]');
    if (!closeButton)
        return;
    var metaParent = closeButton.parentElement;
    metadata = metaParent.getElementsByTagName("span")[0].innerHTML;
}
function getVideoPlayer() {
    var VUDUIFrame = document.getElementById("contentPlayerFrame");
    var VUDUIFrameContent = VUDUIFrame.contentDocument || VUDUIFrame.contentWindow.document;
    videoPlayer = VUDUIFrameContent.getElementById("videoPlayer");
    videoDuration = videoPlayer.duration;
    cuTime = videoPlayer.currentTime;
}
function calculateEndTime() {
    videoState = "playing";
    startTime = Date.now();
    endTime = startTime + (videoDuration - cuTime) * 1000;
    if (isNaN(endTime)) {
        videoState = "loading";
        calculateEndTime();
    }
}
function pausePresence() {
    videoState = "paused";
}
setInterval(grabMetadata, 10000);
setInterval(getVideoPlayer, 1000);
presence.on("UpdateData", () => {
    if (videoPlayer != null && metadata != undefined) {
        if (videoPlayer.paused) {
            if (videoState != "paused") {
                pausePresence();
            }
            presenceData = {
                largeImageKey: "vudularge",
                details: "Watching " + metadata,
                state: "Paused"
            };
        }
        else {
            if (videoState != "playing") {
                calculateEndTime();
            }
            presenceData = {
                largeImageKey: "vudularge",
                smallImageKey: "vudusmall",
                smallImageText: "Watching movies",
                details: "Watching " + metadata,
                startTimestamp: startTime,
                endTimestamp: endTime
            };
        }
        presence.setActivity(presenceData);
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUdILElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUzQixJQUFJLFdBQVcsQ0FBQztBQUNoQixJQUFJLGFBQWEsQ0FBQztBQUNsQixJQUFJLE1BQU0sQ0FBQztBQUVYLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDO0FBRTFCLElBQUksUUFBUSxDQUFDO0FBR2IsSUFBSSxZQUFZLEdBQWlCO0lBQy9CLGFBQWEsRUFDWCxXQUFXO0lBQ2IsT0FBTyxFQUFFLGVBQWU7Q0FDekIsQ0FBQztBQUdGLFNBQVMsWUFBWTtJQUVuQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFHakUsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBR3pCLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFHM0MsUUFBUSxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDbEUsQ0FBQztBQUdELFNBQVMsY0FBYztJQUVyQixJQUFJLFVBQVUsR0FBUSxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFHcEUsSUFBSSxpQkFBaUIsR0FDbkIsVUFBVSxDQUFDLGVBQWUsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUdsRSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTlELGFBQWEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBRXJDLE1BQU0sR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0FBQ25DLENBQUM7QUFFRCxTQUFTLGdCQUFnQjtJQUN2QixVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkIsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFdEQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFFbEIsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQztBQUVELFNBQVMsYUFBYTtJQUNwQixVQUFVLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLENBQUM7QUFFRCxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFbEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBRzdCLElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFO1FBRWhELElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUV0QixJQUFJLFVBQVUsSUFBSSxRQUFRLEVBQUU7Z0JBQzFCLGFBQWEsRUFBRSxDQUFDO2FBQ2pCO1lBR0QsWUFBWSxHQUFHO2dCQUNiLGFBQWEsRUFDWCxXQUFXO2dCQUNiLE9BQU8sRUFBRSxXQUFXLEdBQUcsUUFBUTtnQkFDL0IsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQztTQUNIO2FBQU07WUFFTCxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUU7Z0JBQzNCLGdCQUFnQixFQUFFLENBQUM7YUFDcEI7WUFHRCxZQUFZLEdBQUc7Z0JBQ2IsYUFBYSxFQUNYLFdBQVc7Z0JBQ2IsYUFBYSxFQUNYLFdBQVc7Z0JBQ2IsY0FBYyxFQUFFLGlCQUFpQjtnQkFDakMsT0FBTyxFQUFFLFdBQVcsR0FBRyxRQUFRO2dCQUMvQixjQUFjLEVBQUUsU0FBUztnQkFDekIsWUFBWSxFQUFFLE9BQU87YUFDdEIsQ0FBQztTQUNIO1FBR0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNO1FBRUwsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=