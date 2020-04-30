const presence = new Presence({
    clientId: "684410680392286247"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, playback;
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
    }
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "topflix"
    };
    let title;
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/serie")) {
        title = document.querySelector(".bd-hd");
        if (title !== null) {
            const year = document.querySelector(".bd-hd > span");
            title = title.textContent.replace(year.textContent, "");
            const seasonList = document
                .querySelector(".tabs > ul > li.active")
                .textContent.includes("Temporadas");
            const season = document.querySelector(".accordion > li.open > div");
            if (seasonList && season !== null) {
                const sseason = season.textContent.replace("ª Temporada", "");
                if (document.querySelector("body > .modal.fade.in") !== null) {
                    presenceData.details = title;
                    presenceData.state = season.textContent;
                    if (iFrameVideo == true && !isNaN(duration)) {
                        const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                        presenceData.startTimestamp = timestamps[0];
                        presenceData.endTimestamp = timestamps[1];
                        presenceData.smallImageKey = "play";
                        presenceData.smallImageText = (await strings).play;
                    }
                    else {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText = (await strings).pause;
                    }
                }
                else {
                    presenceData.details = "Vendo temporada " + sseason + " da série:";
                    presenceData.state = title;
                }
            }
            else {
                presenceData.details = "Vendo série:";
                presenceData.state = title;
            }
        }
        else {
            presenceData.details = "Navegando pelas séries...";
        }
    }
    else if (document.location.pathname.includes("/filme")) {
        title = document.querySelector(".bd-hd");
        if (title !== null) {
            const year = document.querySelector(".bd-hd > span");
            let rating = document.querySelector(".rate > p > span").textContent;
            rating = rating + "/10";
            title = title.textContent.replace(year.textContent, "");
            if (document.querySelector("body > .modal.fade.in") !== null) {
                presenceData.details = title;
                presenceData.state = year.textContent + " - " + rating;
                if (iFrameVideo == true && !isNaN(duration)) {
                    const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                    presenceData.startTimestamp = timestamps[0];
                    presenceData.endTimestamp = timestamps[1];
                    presenceData.smallImageKey = "play";
                    presenceData.smallImageText = (await strings).play;
                }
                else {
                    presenceData.smallImageKey = "pause";
                    presenceData.smallImageText = (await strings).pause;
                }
            }
            else {
                presenceData.details = "Vendo filme:";
                presenceData.state = title;
            }
        }
        else {
            presenceData.details = "Navegando pelos filmes...";
        }
    }
    else if (document.location.pathname.includes("/lancamentos")) {
        presenceData.details = "Navegando lançamentos...";
    }
    else if (document.location.pathname.includes("/app")) {
        presenceData.details = "Vendo os aplicativos";
    }
    else if (document.location.pathname.includes("/imdb")) {
        presenceData.details = "Navegando IMDb...";
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Navegando...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsTUFBTSxFQUFFLDZCQUE2QjtDQUN0QyxDQUFDLENBQUM7QUFPTCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDekUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVwRCxJQUFJLFdBQW9CLEVBQUUsV0FBZ0IsRUFBRSxRQUFhLEVBQUUsUUFBaUIsQ0FBQztBQUU3RSxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRTlELElBQUksUUFBUSxFQUFFO1FBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFD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