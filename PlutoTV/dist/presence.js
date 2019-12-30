var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640292045117980713",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var search;
var playing;
var paused;
var progress;
var lastState;
var oldTitle;
lastState = null;
oldTitle = null;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "plutotv"
    };
    if (document.location.hostname == "pluto.tv") {
        if (document.location.pathname.includes("/live-tv/")) {
            progress = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.VideoControls__videoControls-irCOHX.frYEBe > div.VideoControls__bottomPanel-gpACgQ.jiJGDj > div > div > div > div");
            progress = progress.style.cssText.replace("width: ", "").replace("%;", "");
            if (lastState == progress && progress !== "0" && progress !== "100") {
                playing = true;
                paused = true;
            }
            else if (progress == "0" || progress == "100") {
                playing = false;
                paused = true;
            }
            else {
                lastState = progress;
                playing = true;
                paused = false;
            }
            progress = Number(progress);
            progress = Math.round(progress);
        }
        if (playing == true && paused == false) {
            title = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.NnGyI");
            presenceData.details = title.innerText;
            presenceData.state = progress + "% progressed";
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
        }
        else if (playing == true && paused == true) {
            title = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.NnGyI");
            presenceData.details = title.innerText;
            presenceData.state = progress + "% progressed";
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
        }
        else {
            var currentTime, duration, paused;
            var video, timestamps;
            if (document.location.pathname.includes("/on-demand/movies/")) {
                video = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.Player__VideoWrapper-iChBud.eNibdw > div > div:nth-child(1) > div > div.container.chromeless.pointer-enabled > video");
                currentTime = video.currentTime;
                duration = video.duration;
                paused = video.paused;
                timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (!isNaN(duration)) {
                    presenceData.smallImageKey = paused ? "pause" : "play";
                    presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                    presenceData.startTimestamp = timestamps[0];
                    presenceData.endTimestamp = timestamps[1];
                    title = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.ktRSHs > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL");
                    if (title == null) {
                        title = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL");
                    }
                    if (title == null && oldTitle !== null) {
                        presenceData.details = oldTitle;
                    }
                    else {
                        presenceData.details = title.textContent;
                        oldTitle = title.textContent;
                    }
                    if (paused) {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                    }
                }
                else if (isNaN(duration)) {
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Looking at: ";
                    title = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.ktRSHs > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL");
                    if (title == null) {
                        title = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL");
                    }
                    if (title == null && oldTitle !== null) {
                        presenceData.details = oldTitle;
                    }
                    else {
                        presenceData.details = title.textContent;
                        oldTitle = title.textContent;
                    }
                    presenceData.smallImageKey = "reading";
                }
            }
            else if (document.location.pathname.includes("/trending")) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing what's trending";
            }
            else if (document.location.pathname.includes("/on-demand")) {
                presenceData.details = "Browsing on";
                presenceData.state = "demand shows...";
                presenceData.startTimestamp = browsingStamp;
            }
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
