var presence = new Presence({
    clientId: "640292045117980713"
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
presence.on("UpdateData", async () => {
    let presenceData = {
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksT0FBZ0IsQ0FBQztBQUNyQixJQUFJLE1BQWUsQ0FBQztBQUNwQixJQUFJLFFBQWEsQ0FBQztBQUNsQixJQUFJLFNBQWMsQ0FBQztBQUNuQixJQUFJLFFBQWEsQ0FBQztBQUVsQixTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxTQUFTO0tBQ3hCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtRQUM3QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNyRCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsNFFBQTRRLENBQzVRLENBQUM7WUFDRixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPO2lCQUMvQixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztpQkFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUtwQixJQUFJLFNBQVMsSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUVwRSxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZDtpQkFBTSxJQUFJLFFBQVEsSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtnQkFFaEQsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDaEIsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNkO2lCQUFNO2dCQUVOLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNmO1lBRUQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUloQztRQUVELElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksS0FBSyxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QiwrTkFBK04sQ0FDL04sQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxjQUFjLENBQUM7WUFDL0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUM3QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsK05BQStOLENBQy9OLENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsY0FBYyxDQUFDO1lBQy9DLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO2FBQU07WUFFTixJQUFJLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztZQUNqRCxJQUFJLEtBQXVCLEVBQUUsVUFBZSxDQUFDO1lBRTdDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQzlELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qix3TkFBd04sQ0FDeE4sQ0FBQztnQkFDRixXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztnQkFDaEMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUN0QixVQUFVLEdBQUcsYUFBYSxDQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFDO2dCQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3JCLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDdkQsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNO3dCQUNuQyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUs7d0JBQ3ZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUN4QixZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QixnT0FBZ08sQ0FDaE8sQ0FBQztvQkFDRixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7d0JBQ2xCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QixnT0FBZ08sQ0FDaE8sQ0FBQztxQkFDRjtvQkFFRCxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTt3QkFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7cUJBQ2hDO3lCQUFNO3dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzt3QkFDekMsUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7cUJBQzdCO29CQUVELElBQUksTUFBTSxFQUFFO3dCQUNYLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQzt3QkFDbkMsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO3FCQUNqQztpQkFDRDtxQkFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDM0IsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7b0JBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO29CQUN0QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsZ09BQWdPLENBQ2hPLENBQUM7b0JBQ0YsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNsQixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsZ09BQWdPLENBQ2hPLENBQUM7cUJBQ0Y7b0JBQ0QsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7d0JBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO3FCQUNoQzt5QkFBTTt3QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7d0JBQ3pDLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO3FCQUM3QjtvQkFFRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztpQkFDdkM7YUFDRDtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDNUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7Z0JBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7YUFDakQ7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzdELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO2dCQUNyQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO2dCQUN2QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQzthQUM1QztTQUNEO0tBQ0Q7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdkI7U0FBTTtRQUNOLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==