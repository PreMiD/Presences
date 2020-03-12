var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

let iframe = new iFrame();
iframe.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.querySelector("#vjs_video_1_html5_api") !== null) {
        let video = document.querySelector("#vjs_video_1_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currentTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
}));