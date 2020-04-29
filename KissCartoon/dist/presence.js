var presence = new Presence({
    clientId: "698231292172435567"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const browsingStamp = Math.floor(Date.now() / 1000);
let currentTime, duration, paused, playback, timestamps;
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "kisscartoon"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/" ||
        document.location.pathname == "/kisscartoon.html") {
        presenceData.details = "Viewing home page";
    }
    else if (document.querySelector(".full.watch_container") !== null) {
        timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
        if (!isNaN(duration)) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.details = document
                .querySelector("#adsIfrme > div > div > div > h1 > strong")
                .textContent.replace("Watch ", "")
                .replace(" online free", "");
            presenceData.state = document
                .querySelector("#selectEpisode")
                .textContent.trim();
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (isNaN(duration)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Looking at:";
            presenceData.state =
                document
                    .querySelector("#adsIfrme > div > div > div > h1 > strong")
                    .textContent.replace("Watch ", "")
                    .replace(" online free", "") +
                    " " +
                    document.querySelector("#selectEpisode").textContent.trim();
        }
    }
    else if (document.location.pathname.includes("/CartoonList")) {
        presenceData.details = "Viewing the Cartoon List";
    }
    else if (document.location.pathname.includes("/Cartoon")) {
        presenceData.details = "Viewing Cartoon:";
        presenceData.state = document.querySelector("#leftside > div:nth-child(2) > div.barContent.full > div.full > h1 > a").textContent;
    }
    else if (document.location.pathname.includes("/ReportError")) {
        presenceData.details = "Reporting an error";
        presenceData.smallImageKey = "writing";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDcEQsSUFBSSxXQUFnQixFQUNsQixRQUFhLEVBQ2IsTUFBVyxFQUNYLFFBQWEsRUFDYixVQUFlLENBQUM7QUFFbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNqQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUU5RCxJQUFJLFFBQVEsRUFBRTtRQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxRQUFRLEdB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