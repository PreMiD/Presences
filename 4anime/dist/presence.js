var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640644330666852382",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    playback =
        document.querySelector(".vjs-current-time-display") !== null
            ? true : false;
    if (!playback) {
        presenceData: presenceData = {
            largeImageKey: "logo"
        };
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData, true);
    }
    var video = document.querySelector("#video1_html5_api");
    if (video !== null && !isNaN(video.duration)) {
        var videoTitle;
        var seasonepisode;
        videoTitle = document.querySelector('a#titleleft');
        seasonepisode = document.querySelector('span#titleleft');
        var uploader = '', timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration)), presenceData = {
            largeImageKey: "logo",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (yield strings).pause
                : (yield strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);
        presenceData.details = videoTitle.innerText;
        presenceData.state = seasonepisode.innerText;
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        if (videoTitle !== null) {
            presence.setActivity(presenceData, !video.paused);
        }
    }
}));
presence.on("MediaKeys", (key) => {
    switch (key) {
        case "pause":
            var video = document.querySelector("#video1_html5_api");
            video.paused ? video.play() : video.pause();
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFHLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtJQUU5QixpQkFBaUIsR0FBRyxRQUFRLENBQUE7SUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFBO0NBRTlDO0FBQ0QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRW5DLFFBQVE7UUFDTixRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLEtBQUssSUFBSTtZQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFbEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUViLFlBQVksRUFBRSxZQUFZLEdBQUc7WUFDM0IsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQTtRQUVELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLE9BQU8sWUFBWSxDQUFDLEtB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