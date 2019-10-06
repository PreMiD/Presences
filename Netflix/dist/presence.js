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
    clientId: "630480553694593025",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "netflix-logo"
    };
    if (document.location.pathname.includes("/watch")) {
        var video = document.querySelector(".VideoContainer video");
        if (video && !isNaN(video.duration)) {
            var showCheck = document.querySelector(".ellipsize-text span") ? true : false;
            var title = document.querySelector(".video-title h4").textContent;
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            data.details = title;
            if (showCheck) {
                var season = document.querySelector(".video-title span").textContent;
                var episode = document.querySelector(".video-title span:nth-child(3)").textContent;
                data.state = season + " " + episode;
            }
            else {
                data.state = "Movie";
            }
            data.smallImageKey = video.paused ? "pause" : "play",
                data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play,
                data.startTimestamp = timestamps[0],
                data.endTimestamp = timestamps[1];
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            if (title !== null && season !== null && episode !== null) {
                presence.setActivity(data, !video.paused);
            }
        }
    }
    else {
        data.details = (yield strings).browsing,
            presence.setActivity(data);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN6QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxJQUFJLEdBQWlCO1FBQ3JCLGFBQWEsRUFBRSxjQUFjO0tBQ2hDLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMvQyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzlFLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRTlFLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDbEUsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFekYsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFFcEIsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFDckUsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFDbkYsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQTthQUN0QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTthQUN2QjtZQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO2dCQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJO2dCQUNqRixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRWpDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUM1QjtZQUVELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1NBQ0o7S0FDSjtTQUFNO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUTtZQUN2QyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDM0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELENBQUMifQ==
=======
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
    clientId: "630480553694593025",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "netflix-logo"
    };
    if (document.location.pathname.includes("/watch")) {
        var video = document.querySelector(".VideoContainer video");
        if (video && !isNaN(video.duration)) {
            var showCheck = document.querySelector(".ellipsize-text span") ? true : false;
            var title = document.querySelector(".video-title h4").textContent;
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            data.details = title;
            if (showCheck) {
                var season = document.querySelector(".video-title span").textContent;
                var episode = document.querySelector(".video-title span:nth-child(3)").textContent;
                data.state = season + " " + episode;
            }
            else {
                data.state = "Movie";
            }
            data.smallImageKey = video.paused ? "pause" : "play",
                data.smallImageText = video.paused ? (yield strings).pause : (yield strings).play,
                data.startTimestamp = timestamps[0],
                data.endTimestamp = timestamps[1];
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            if (title !== null && season !== null && episode !== null) {
                presence.setActivity(data, !video.paused);
            }
        }
    }
    else {
        data.details = "Browsing...",
            presence.setActivity(data);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsRUFFRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM5QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksSUFBSSxHQUFpQjtRQUNyQixhQUFhLEVBQUUsY0FBYztLQUNoQyxDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0MsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM5RSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUU5RSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2xFLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRXpGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO1lBRXBCLElBQUksU0FBUyxFQUFFO2dCQUNYLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUM7Z0JBQ3JFLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxXQUFXLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUE7YUFDdEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7YUFDdkI7WUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSTtnQkFDakYsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUVqQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDNUI7WUFFRCxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUN2RCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QztTQUNKO0tBQ0o7U0FBTTtRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYTtZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDM0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==
