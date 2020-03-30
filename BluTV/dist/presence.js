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
    clientId: "664216462038401066",
    
});
let strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
let startTimestamp = Math.floor(Date.now() / 1000);
let data, video;
presence.on("iFrameData", (msg) => __awaiter(this, void 0, void 0, function* () {
    if (!msg)
        return;
    data = msg;
    video = msg.video;
}));
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let path = document.location.pathname;
    let presenceData = {
        largeImageKey: "blutv"
    };
    if (!path.includes('izle')) {
        video = null;
        data = null;
    }
    if (data) {
        if (data.series) {
            let name = data.series.name ? data.series.name : seriesName(path.split('/')[3].replace(/-/gi, ' '));
            presenceData.details = name;
            presenceData.state = `${data.series.season} | ${data.series.ep}`;
        }
        else {
            presenceData.details = path.startsWith('/canli-yayin') ? "Bir televizyon yayını izliyor:" : "Bir film izliyor:";
            presenceData.state = data.movie.name;
        }
        if (video) {
            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused ? (yield strings).paused : (yield strings).playing;
            let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            if (video.duration && !video.paused && !document.location.pathname.startsWith('/canli-yayin')) {
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
            }
        }
    }
    else {
        presenceData.startTimestamp = startTimestamp;
        presenceData.details = (yield strings).browsing;
    }
    presence.setActivity(presenceData);
}));
function seriesName(name) {
    return name.replace(/([^\W_]+[^\s-]*) */g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUIsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDekMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbkQsSUFBSSxJQUFTLEVBQUUsS0FBdUIsQ0FBQztBQUd2QyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFPLEdBQUcsRUFBRSxFQUFFO0lBRXBDLElBQUksQ0FBQyxHQUFHO1FBQUUsT0FBTztJQUNqQixJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ1gsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFFdEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVqQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV0QyxJQUFJLFlBQVksR0FBaUI7UUFDN0IsYUFBYSxFQUFFLE9BQU87S0FDekIsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3hCLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDYixJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2Y7SUFFRCxJQUFJLElBQUksRUFBRTtRQUVOLElB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