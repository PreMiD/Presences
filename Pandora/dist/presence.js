const presence = new Presence({
    clientId: "608109837657702566"
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
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
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0NBQ2pDLENBQUMsQ0FBQztBQUVILElBQUksS0FBSyxDQUFDO0FBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQztJQUUzRSxJQUFJLFlBQVksR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDMUQsa0JBQWtCLENBQ2xCLENBQUM7SUFDRixZQUFZLEtBQUssSUFBSTtRQUNwQixDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRVIsSUFBSSxRQUFRLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ2pELGtDQUFrQyxDQUNsQyxDQUFDO0lBRUYsWUFBWSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRTlELFFBQVEsS0FBSyxFQUFFO1FBQ2QsS0FBSyxPQUFPO1lBQ1gsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNwRSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lB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