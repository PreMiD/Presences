const presence = new Presence({
    clientId: "691491207356088320"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
let currentTime, duration, paused;
presence.on("iFrameData", (data) => {
    const playback = data.duration !== null ? true : false;
    if (playback) {
        currentTime = data.currentTime;
        duration = data.duration;
        paused = data.paused;
    }
});
presence.on("UpdateData", () => {
    const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.URL === "https://www.threenow.co.nz/") {
        presenceData.details = "Browsing the main page";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.location.pathname.includes("/shows/")) {
        if (document.getElementsByClassName("EpisodeSynopsis-subtitle").length >= 1) {
            if (!isNaN(timestamps[1])) {
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
            }
            presenceData.state = document.getElementsByClassName("EpisodeSynopsis-title")[0].textContent;
            if (paused) {
                presenceData.details = "Watching a show";
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
                presenceData.smallImageKey = "pause";
            }
            else {
                presenceData.details = "Watching a show";
                presenceData.smallImageKey = "play";
            }
        }
        else {
            presenceData.details = "Viewing a show";
            presenceData.state = document.getElementsByClassName("HeroSynopsis-title")[0].textContent;
        }
    }
    else if (document.location.pathname.includes("/search")) {
        presenceData.details = "Searching shows";
        presenceData.state = document.getElementsByClassName("SearchInput-input")[0].value;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.URL === "https://www.threenow.co.nz/live-tv-guide") {
        presenceData.details = "Viewing the Live TV guide";
    }
    else if (document.URL === "https://www.threenow.co.nz/live-tv-guide/three") {
        presenceData.details = "Watching Three Live";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.URL === "https://www.threenow.co.nz/live-tv-guide/three-life") {
        presenceData.details = "Watching ThreeLife Live";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.URL === "https://www.threenow.co.nz/live-tv-guide/bravo") {
        presenceData.details = "Watching Bravo Live";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.URL === "https://www.threenow.co.nz/live-tv-guide/bravo") {
        presenceData.details = "Watching The Edge TV Live";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.location.pathname.includes("/tv") &&
        document.location.pathname.includes(".html")) {
        presenceData.details = "ThreeFans";
        presenceData.state = "Checking out information for fans!";
    }
    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN6RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7QUFFbEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdkQsSUFBSSxRQUFRLEVBQUU7UUFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDdkIsSUFBSSxDQUFDLEtB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