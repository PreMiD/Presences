var presence = new Presence({
    clientId: "640292045117980713"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var playing;
var paused;
var progress;
var lastState;
var oldTitle;
var currentTime, duration;
var video, timestamps;
lastState = null;
oldTitle = null;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "plutotv"
    };
    if (document.location.hostname == "pluto.tv") {
        if (document.location.pathname.includes("/live-tv/")) {
            progress = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.VideoControls__videoControls-irCOHX.frYEBe > div.VideoControls__bottomPanel-gpACgQ.jiJGDj > div > div > div > div");
            progress = progress.style.cssText
                .replace("width: ", "")
                .replace("%;", "");
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
            if (document.location.pathname.includes("/on-demand/movies/")) {
                video = document.querySelector("#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.Player__VideoWrapper-iChBud.eNibdw > div > div:nth-child(1) > div > div.container.chromeless.pointer-enabled > video");
                currentTime = video.currentTime;
                duration = video.duration;
                paused = video.paused;
                timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (!isNaN(duration)) {
                    presenceData.smallImageKey = paused ? "pause" : "play";
                    presenceData.smallImageText = paused
                        ? (await strings).pause
                        : (await strings).play;
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQWdCLENBQUM7QUFDckIsSUFBSSxNQUFlLENBQUM7QUFDcEIsSUFBSSxRQUFhLENBQUM7QUFDbEIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxRQUFhLENBQUM7QUFFbEIsSUFBSSxXQUFnQixFQUFFLFFBQWEsQ0FBQztBQUNwQyxJQUFJLEtBQXVCLEVBQUUsVUFBZSxDQUFDO0FBRTdDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBUSxHQUFHLElBQUksQ0FBQztBQUVoQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJ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