var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var iframe = new iFrame();
iframe.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.querySelector("#video-player") !== null) {
        var anime = document.querySelector("#video-player");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
        var anime = document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#video_1_html5_api") !== null) {
        var anime = document.querySelector("#video_1_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#player > div.jw-media.jw-reset > video") !== null) {
        var anime = document.querySelector("#player > div.jw-media.jw-reset > video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            })
        }
    }
    if (document.querySelector("#hola_html5_api") !== null) {
        var anime = document.querySelector("#hola_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#videojs_html5_api") !== null) {
        var anime = document.querySelector("#videojs_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("div.html5-video-container > video") !== null) {
        var anime = document.querySelector("div.html5-video-container > video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#olvideo_html5_api") !== null) {
        var anime = document.querySelector("#olvideo_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUMxQixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbEMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNyRCxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RSxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsWUFBWSxFQUFFO29CQUNiLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNwQjthQUNELENBQUMsQ0FBQztTQUNIO0tBQ0Q7QUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDIn0=