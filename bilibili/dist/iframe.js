var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var iframe = new iFrame();
iframe.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.querySelector(".bilibili-player-video video") !== null) {
        var video = document.querySelector(".bilibili-player-video video");
        if (video != undefined && !isNaN(video.duration)) {
            var test = video.paused;
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    test: test,
                    currTime: video.currentTime,
                    dur: video.duration,
                    pause: test
                }
            });
        }
    }
}));