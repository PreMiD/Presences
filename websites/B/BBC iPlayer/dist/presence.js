let currentTime, duration, paused, playback;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUM1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsSUFBSSxRQUFRLEVBQUU7UUFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztLQUNuQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVB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