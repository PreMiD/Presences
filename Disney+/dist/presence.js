var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "630236276829716483",
    mediaKeys: true
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
});
let title;
let subtitle;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "disneyplus-logo",
    };
    if (document.location.pathname.includes("/video")) {
        const video = document.querySelector(".btm-media-clients video");
        if (video && !isNaN(video.duration)) {
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            const titleField = document.querySelector(".btm-media-overlays-container .title-field");
            title = titleField ? titleField.textContent : null;
            const subtitleField = document.querySelector(".btm-media-overlays-container .subtitle-field");
            subtitle = subtitleField ? subtitleField.textContent : null;
            data.details = title;
            data.state = subtitle ? subtitle : "Movie";
            data.smallImageKey = video.paused ? "pause" : "play";
            data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play;
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            if (title)
                presence.setActivity(data, !video.paused);
        }
    }
    else {
        data.details = (yield strings).browsing;
        presence.setActivity(data);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsQ0FBQTtBQUVGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDekMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxLQUFhLENBQUE7QUFDakIsSUFBSSxRQUFnQixDQUFBO0FBRXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBaUI7UUFDckIsYUFBYSxFQUFFLGlCQUFpQjtLQUNuQyxDQUFBO0lBRUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0MsTUFBTSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtRQUVsRixJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsTUFBTSxVQUFVLEdBQWEsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFFckcsTUFBTSxVQUFVLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsNENBQTRDLENBQUMsQ0FBQTtZQUN2RyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDbEQsTUFBTSxhQUFhLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0NBQStDLENBQUMsQ0FBQTtZQUM3RyxRQUFRLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFHM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBRTFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7WUFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO1lBQ2pGLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRWpDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUE7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTthQUMzQjtZQUVELElBQUksS0FBSztnQkFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNoRDtLQUNKO1NBQU07UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUE7UUFDdkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFHRixTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzNELE1BQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNwQyxNQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFBO0lBQ2hGLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNsRCxDQUFDIn0=