var presence = new Presence({
    clientId: "697552926876368917"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var iFrameVideo, currentTime, duration, paused;
var video;
var lastPlaybackState = null;
var playback;
var title;
presence.on("iFrameData", (data) => {
    video = data;
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const info = await presence.getSetting("sSI");
    const elapsed = await presence.getSetting("sTE");
    const videoTime = await presence.getSetting("sVT");
    if (elapsed) {
        var browsingStamp = Math.floor(Date.now() / 1000);
        console.log("Elapsed is on");
    }
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    var presenceData = {
        largeImageKey: "logo"
    };
    if (videoTime) {
        console.log("IS ON");
        if (lastPlaybackState != playback) {
            lastPlaybackState = playback;
            browsingStamp = Math.floor(Date.now() / 1000);
        }
    }
    else {
        lastPlaybackState = console.log("Video time is off");
    }
    if (info) {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname == "/movies") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added movies";
        }
        else if (document.location.pathname == "/series") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added series";
        }
        else if (document.location.pathname == "/cinema-movies") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the recently added cinema movies.";
        }
        else if (document.location.pathname == "/recommended-series") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing recommened series";
        }
        else if (document.location.pathname.includes("/videos/")) {
            title = document.querySelector("#main_bg > div:nth-child(5) > div > div.video-info-left > h1");
            if (title != null) {
                presenceData.state = title.innerText;
                if (iFrameVideo == true && !isNaN(duration) && title != null && video != null) {
                    if (!paused) {
                        presenceData.details = "Watching:";
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        if (videoTime) {
                            (presenceData.smallImageText = paused
                                ? (await strings).pause
                                : (await strings).play);
                            presenceData.startTimestamp = timestamps[0];
                            presenceData.endTimestamp = timestamps[1];
                        }
                    }
                    else if (paused) {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                        presenceData.details = "Paused:";
                        presenceData.smallImageKey = "pause";
                    }
                }
                else if (iFrameVideo == null && isNaN(duration) && title != null) {
                    presenceData.details = "Viewing:";
                    presenceData.state = title.innerText;
                    presenceData.startTimestamp = browsingStamp;
                }
                else {
                    presenceData.details = "Error 03: Watching unknown show/movie.";
                    presenceData.state = "Can't tell if playing or not.";
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.smallImageKey = "search";
                    presenceData.smallImageText = "Error 3";
                }
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Error 02: Watching unknown show/movie.";
                presenceData.smallImageKey = "search";
            }
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Error 01: Can't Read Page";
            presenceData.smallImageKey = "search";
        }
    }
    else {
        presence.setActivity(presenceData);
        return;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7QUFDL0MsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksS0FBSyxDQUFDO0FBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMvQixLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2IsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsSUFBSSxRQUFRLEVBQUU7UUFDVixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7S0FDckM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQVMsRUFBRSxhQUFhO0lBQzNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFHLEVBQUU7SUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkQsSUFBSSxPQUFPLEVBQUM7UUFDUixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlFLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsTUFBTTtLQUN4QixDQUFDO0lBQ0YsSUFBSSxTQUFTLEVBQUM7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksaUJBQWlCLElBQUksUUFBUSxFQUFFO1lBQy9CLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztZQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDakQ7S0FDSjtTQUNHO1FBQ0EsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsSUFBSSxJQUFJLEVBQUM7UUFDTCxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBQztZQUNqQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1NBQzlDO2FBQ0ksSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUM7WUFDNUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQ0FBbUMsQ0FBQztTQUM5RDthQUNJLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFDO1lBQzVDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUNBQW1DLENBQUM7U0FDOUQ7YUFDSSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQixFQUFDO1lBQ25ELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkNBQTJDLENBQUM7U0FDdEU7YUFDSSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQixFQUFDO1lBQ3hELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7U0FDdEQ7YUFFSSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQztZQUNwRCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQy9GLElBQUksS0FBSyxJQUFJLElBQUksRUFBQztnQkFDZCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUM7d0JBQ1IsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7d0JBQ25DLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDdkQsSUFBRyxTQUFTLEVBQUM7NEJBQ2IsQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLE1BQU07Z0NBQ2pDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQ0FDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDNUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLFlBQVksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN6QztxQkFDSjt5QkFDSSxJQUFJLE1BQU0sRUFBRTt3QkFDYixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7d0JBQ25DLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQzt3QkFDakMsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7d0JBQ2pDLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO3FCQUM1QztpQkFFSjtxQkFDUSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO29CQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7b0JBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO2lCQUMvQztxQkFDRztvQkFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLHdDQUF3QyxDQUFDO29CQUNoRSxZQUFZLENBQUMsS0FBSyxHQUFHLCtCQUErQixDQUFDO29CQUNyRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztvQkFDNUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7b0JBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO2lCQUMzQzthQUNKO2lCQUNHO2dCQUVBLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO2dCQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdDQUF3QyxDQUFDO2dCQUNoRSxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQzthQUM3QztTQUNKO2FBQ1E7WUFDRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1lBQ25ELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1NBQ3pDO0tBQ1I7U0FDRztRQUNBLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsT0FBTztLQUNWO0lBRUcsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUU5QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzFCO1NBQ0k7UUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3RDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==