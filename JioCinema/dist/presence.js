var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "632479205707350037",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = window.location.href;
    if (url.includes("/watch/")) {
        let video = document.getElementsByTagName("video")[0], timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), title = document.getElementsByClassName("meta-data-title")[0].textContent;
        presenceData = {
            details: title,
            largeImageKey: "large_img",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (url.includes("/tv/")) {
            const episode = document.querySelectorAll("div.now-playing")[0].offsetParent.querySelectorAll("span.jioTitle")[1].textContent;
            presenceData.state = episode.replace("| ", "");
        }
        else if (url.includes("/movies/")) {
            presenceData.state = "Movie";
        }
        else if (url.includes("/playlist/")) {
            presenceData.state = "Music Video";
        }
        else {
            presenceData.state = "Video";
        }
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
    }
    else if (url.includes("/search/")) {
        presenceData.details = "Searching...";
        presenceData.smallImageKey = "search";
    }
    else {
        presenceData.details = "Browsing";
    }
    presence.setActivity(presenceData, true);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFLLFFBQVEsR0FBYyxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMvQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxZQUFZLEdBQWlCO1FBQzdCLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGNBQWM7S0FDakIsQ0FBQztJQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDM0I7UUFDRSxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN2RSxVQUFVLEdBQUcsYUFBYSxDQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDN0IsS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMxRSxZQUFZLEdBQUc7WUFDYixPQUFPLEVBQUUsS0FBSztZQUNkLGFBQWEsRUFBRSxXQUFXO1lBQzFCLGFBQWEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDOUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUMxQixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUs7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSTtZQUN4QixjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDO1FBQ0YsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUN4QjtZQUNFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDOUgsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztTQUMvQzthQUNJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDakM7WUFDRSxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUM5QjthQUNJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFDbkM7WUFDRSxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztTQUNwQzthQUVEO1lBQ0UsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDOUI7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO1lBQ25DLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQztTQUNsQztLQUNGO1NBQ0ksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUNqQztRQUNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQ3ZDO1NBRUQ7UUFDRSxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztLQUNuQztJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzdELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=