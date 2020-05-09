let iFrameVideo, currentTime, duration, paused, playback;
const presence = new Presence({
    clientId: "648938148050632745"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "HelloYouLookingAtThisThisIsntRealHahaLOL"
    };
    const path = document.location.pathname;
    if (document.location.pathname.includes("/iplayer/")) {
        if (duration == null) {
            presenceData.details = document.querySelector(".channel-panel-item__link__title.typo.typo--skylark.typo--bold").textContent;
            presenceData.state = document.querySelector(".channel-panel-item__link__subtitle.typo.typo--canary").textContent;
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "Watching Live";
        }
        else {
            const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            presenceData.details = document.querySelector(".play-cta__title-container > span").textContent;
            presenceData.state = document.querySelector(".typo.typo--skylark.play-cta__subtitle").textContent;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = "Paused";
            }
        }
        switch (path) {
            case "/iplayer/live/bbcthree":
                presenceData.largeImageKey = "bbcthree";
                break;
            case "/iplayer/live/bbcone":
                presenceData.largeImageKey = "bbcone";
                break;
            case "/iplayer/live/bbctwo":
                presenceData.largeImageKey = "bbctwo";
                break;
            case "/iplayer/live/bbcfour":
                presenceData.largeImageKey = "bbcfour";
                break;
            case "/iplayer/live/radio1":
                presenceData.largeImageKey = "radio1";
                break;
            case "/iplayer/live/cbbc":
                presenceData.largeImageKey = "cbbc";
                break;
            case "/iplayer/live/cbeebies":
                presenceData.largeImageKey = "cbeebies";
                break;
            case "/iplayer/live/bbcscotland":
                presenceData.largeImageKey = "bbcscotland";
                break;
            case "/iplayer/live/bbcnews":
                presenceData.largeImageKey = "bbcnews";
                break;
            case "/iplayer/live/bbcparliament":
                presenceData.largeImageKey = "bbcparliament";
                break;
            case "/iplayer/live/bbcalba":
                presenceData.largeImageKey = "bbcalba";
                break;
            case "/iplayer/live/s4c":
                presenceData.largeImageKey = "s4c";
                break;
            default:
                presenceData.largeImageKey = "bbciplayer";
        }
        if (document.location.pathname.includes("/iplayer/episode/")) {
            presenceData.largeImageKey = "bbciplayer";
        }
    }
    else if (path === "/iplayer") {
        presenceData.details = "Home Page";
        presenceData.largeImageKey = "bbciplayer";
    }
    else if (path === "/bbcone") {
        presenceData.details = "Browsing BBC One";
        presenceData.largeImageKey = "bbcone";
    }
    else if (path === "/bbctwo") {
        presenceData.details = "Browsing BBC Two";
        presenceData.largeImageKey = "bbctwo";
    }
    else if (path === "/tv/bbcthree") {
        presenceData.details = "Browsing BBC Three";
        presenceData.largeImageKey = "bbcthree";
    }
    else if (path === "/bbcfour") {
        presenceData.details = "Browsing BBC Four";
        presenceData.largeImageKey = "bbcfour";
    }
    else if (path === "/tv/radio1") {
        presenceData.details = "Browsing Radio 1";
        presenceData.largeImageKey = "radio1";
    }
    else if (path === "/tv/cbbc") {
        presenceData.details = "Browsing CBBC";
        presenceData.largeImageKey = "cbbc";
    }
    else if (path === "/tv/cbeebies") {
        presenceData.details = "Browsing Cbeebies";
        presenceData.largeImageKey = "cbeebies";
    }
    else if (path === "/tv/bbcscotland") {
        presenceData.details = "Browsing BBC Scotland";
        presenceData.largeImageKey = "bbcscotland";
    }
    else if (path === "/tv/bbcnews") {
        presenceData.details = "Browsing BBC News";
        presenceData.largeImageKey = "bbcnews";
    }
    else if (path === "/tv/bbcparliament") {
        presenceData.details = "Browsing BBC Parliament";
        presenceData.largeImageKey = "bbcparliament";
    }
    else if (path === "/tv/bbcalba") {
        presenceData.details = "Browsing BBC Alba";
        presenceData.largeImageKey = "bbcalba";
    }
    else if (path === "/tv/s4c") {
        presenceData.details = "Browsing S4C";
        presenceData.largeImageKey = "s4c";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7QUFDekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUM7SUFDNUIsUUFBUSxFQUFFLG9CQUFvQjtDQUMvQixDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELElBQUksUUFBUSxFQUFFO1FBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDakMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0tBQ25DO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFD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