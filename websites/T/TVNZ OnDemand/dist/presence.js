const presence = new Presence({
    clientId: "687426695417823238"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
let currentTime, duration, paused, playback;
presence.on("iFrameData", (data) => {
    playback = data.duration !== null ? true : false;
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
    if (document.location.href.includes("login.tech.tvnz.co.nz")) {
        presenceData.details = "Logging in...";
        presenceData.smallImageKey = "login";
    }
    else if (document.location.pathname.includes("/1-news-special")) {
        presenceData.details = "Watching a live 1 NEWS Special";
        presenceData.state = document.getElementsByClassName("Hero-title")[1].textContent;
        presenceData.smallImageKey = "one";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.location.pathname.includes("/choose-profile") ||
        document.location.pathname.includes("/profiles-welcome")) {
        presenceData.details = "Choosing a profile";
    }
    else if (document.URL === "https://www.tvnz.co.nz/" ||
        document.URL === "https://www.tvnz.co.nz" ||
        document.URL === "https://www.tvnz.co.nz/shows") {
        presenceData.details = "Browsing the main page";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.location.pathname.includes("/episodes/")) {
        if (!isNaN(timestamps[1])) {
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        presenceData.state = document.getElementsByClassName("Player-title")[0].textContent;
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
    else if (document.location.pathname.includes("/shows/")) {
        presenceData.details = "Viewing a show";
        presenceData.state = document.getElementsByClassName("Hero-title")[1].textContent;
    }
    else if (document.URL === "https://www.tvnz.co.nz/categories/my-favourites") {
        presenceData.details = "Browsing favourite shows";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.location.pathname.includes("/categories/")) {
        presenceData.details = "Browsing a category";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("PageHeader-title")[0].textContent;
    }
    else if (document.location.pathname.includes("/manage-profiles") ||
        document.location.pathname.includes("/add-profile")) {
        presenceData.details = "Managing profiles";
    }
    else if (document.location.pathname.includes("/settings")) {
        presenceData.details = "Managing account details";
    }
    else if (document.location.pathname.includes("/search")) {
        presenceData.details = "Searching shows";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (document.URL === "https://www.tvnz.co.nz/livetv") {
        presenceData.details = "Viewing the Live TV guide";
    }
    else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-1") {
        presenceData.details = "Watching TVNZ 1 Live";
        presenceData.smallImageKey = "one";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("Player-title")[0].textContent;
    }
    else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-2") {
        presenceData.details = "Watching TVNZ 2 Live";
        presenceData.smallImageKey = "two";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("Player-title")[0].textContent;
    }
    else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-duke") {
        presenceData.details = "Watching TVNZ Duke Live";
        presenceData.smallImageKey = "duke";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("Player-title")[0].textContent;
    }
    else if (document.location.pathname.includes("/one-news")) {
        presenceData.details = "Browsing 1 NEWS";
        presenceData.smallImageKey = "one";
    }
    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN6RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELElBQUksV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRCxJQUFJLFFBQVEsRUFBRTtRQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUN2QixJQUFJLENB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