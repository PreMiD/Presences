const presence = new Presence({
    clientId: "608109837657702566"
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function stripText(element, id = "None", log = true) {
    if (element && element.firstChild) {
        return element.firstChild.textContent;
    }
    else {
        if (log)
            console.log("%cPandora%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
                id, "font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;", "font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
        return null;
    }
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var state;
presence.on("UpdateData", async () => {
    var title, artist, smallImageKey, smallImageText, audioTime, audioDuration;
    var audioElement = document.querySelector("audio:last-child");
    audioElement === null
        ? (audioElement = document.querySelector("audio"))
        : null;
    var audioBar = document.querySelector(".Tuner__Audio__NowPlayingHitArea");
    audioElement && audioBar ? (state = "music") : (state = null);
    switch (state) {
        case "music":
            title = document.querySelector(".Tuner__Audio__TrackDetail__title");
            artist = document.querySelector(".Tuner__Audio__TrackDetail__artist");
            if (title === null && artist === null) {
                return;
            }
            else {
                title = stripText(title, "Title");
                artist = stripText(artist, "Title");
            }
            smallImageKey = "play";
            smallImageText = (await strings).play;
            var timestamps = getTimestamps(Math.floor(audioElement.currentTime), Math.floor(audioElement.duration));
            audioTime = timestamps[0];
            audioDuration = timestamps[1];
            break;
        default:
            title = "Browsing...";
            break;
    }
    var data = {
        details: title,
        state: artist,
        largeImageKey: "pandora",
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: audioTime,
        endTimestamp: audioDuration
    };
    if (state && audioElement && audioElement.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
        data.smallImageKey = "pause";
        data.smallImageText = (await strings).pause;
    }
    presence.setActivity(data, audioElement ? !audioElement.paused : true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0NBQ2xDLENBQUMsQ0FBQztBQUVILFNBQVMsU0FBUyxDQUFDLE9BQW9CLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtJQUM5RCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ2pDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7S0FDdkM7U0FBTTtRQUNMLElBQUksR0FBRztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQ1QsNktBQTZLO2dCQUMzSyxFQUFFLEVBQ0osc0dBQXNHLEVBQ3RHLHNHQUFzRyxFQUN0RyxlQUFlLENBQ2hCLENBQUM7UUFDSixPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQU9ELFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksS0FBSyxDQUFDO0FBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJ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