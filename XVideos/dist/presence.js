var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "605119835751579649",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var video = document.querySelector(".video-bg-pic video");
    if (video !== null && !isNaN(video.duration)) {
        var title;
        title =
            document.querySelector(".video-page #main .page-title");
        var uploader = document.querySelector(".video-page #main .video-metadata .uploader-tag .name"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            details: title.innerText,
            state: uploader.textContent,
            largeImageKey: "lg",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : title.innerText);
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (video && title !== null && uploader !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector(".video-bg-pic video");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ3hCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM1RSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVDLElBQUksS0FBVyxDQUFDO1FBQ2QsS0FBSztZQUNILFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUU1RCxJQUFJLFFBQVEsR0FDUixRQUFRLENBQUMsYUFBYSxDQUFDLHVEQUF1RCxDQUFDLEVBQ2pGLFVBQVUsR0FBRyxhQUFhLENBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDM0IsRUFDRCxZQUFZLEdBQWlCO1lBQzNCLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBUztZQUN4QixLQUFLLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDM0IsYUFBYSxFQUFFLElBQUk7WUFDbkIsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUM5QyxjQUFjLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQzFCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJO1lBQ3hCLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUM7UUFFSixRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRzNELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7WUFDbkMsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO1NBQ2xDO1FBR0QsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ2hELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO0tBQ0Y7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDekI7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUN2QyxRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssT0FBTztZQUNWLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQXFCLENBQUM7WUFDOUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUMsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFPSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzdELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=