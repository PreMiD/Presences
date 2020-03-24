const presence = new Presence({
    clientId: "687426695417823238",
    mediaKeys: false
});

const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

let iFrameVideo, currentTime, duration, paused, video, videoDuration, videoCurrentTime;

presence.on("iFrameData", data => {
    playback = data.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iFrameVideo;
        currentTime = data.currentTime;
        duration = data.duration;
        paused = data.paused;
    }
});

presence.on("UpdateData", () => {
    let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));

    let presenceData = { 
        largeImageKey: "logo" 
    }

    if (document.location.pathname.includes("/choose-profile") || document.location.pathname.includes("/profiles-welcome")) {
        presenceData.details = "Choosing a profile"
    } else if (document.URL === "https://www.tvnz.co.nz/" || document.URL === "https://www.tvnz.co.nz" || document.URL === "https://www.tvnz.co.nz/shows") {
        presenceData.details = "Browsing the main page";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.location.pathname.includes("/episodes/")) {
        if (!isNaN(timestamps[1])) {
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        
        presenceData.state = document.getElementsByClassName("Player-title")[0].innerText;

        if (paused) {
            presenceData.details = "Watching a show"; 
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.smallImageKey = "pause";
        } else {
            presenceData.details = "Watching a show"; 
            presenceData.smallImageKey = "play";
        }
    } else if (document.location.pathname.includes("/shows/")) {
        presenceData.details = "Viewing a show"; 
        presenceData.state = document.getElementsByClassName("Hero-title")[1].innerText;
    } else if (document.URL === "https://www.tvnz.co.nz/categories/my-favourites") {
        presenceData.details = "Browsing favourite shows";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.location.pathname.includes("/categories/")) {
        presenceData.details = "Browsing a category";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("PageHeader-title")[0].innerText;
    } else if (document.location.pathname.includes("/manage-profiles") || document.location.pathname.includes("/add-profile")) {
        presenceData.details = "Managing profiles";
    } else if (document.location.pathname.includes("/settings")) {
        presenceData.details = "Managing account details";
    } else if (document.location.pathname.includes("/search")) {
        presenceData.details = "Searching shows";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.URL === "https://www.tvnz.co.nz/livetv") {
        presenceData.details = "Viewing the Live TV guide";
    } else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-1") {
        presenceData.details = "Watching TVNZ 1 Live";
        presenceData.smallImageKey = "one";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("Player-title")[0].innerText;
    } else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-2") {
        presenceData.details = "Watching TVNZ 2 Live";
        presenceData.smallImageKey = "two";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("Player-title")[0].innerText;
    } else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-duke") {
        presenceData.details = "Watching TVNZ Duke Live";
        presenceData.smallImageKey = "duke";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        presenceData.state = document.getElementsByClassName("Player-title")[0].innerText;
    } else if (document.location.pathname.includes("/one-news")) {
        presenceData.details = "Browsing 1 NEWS";
        presenceData.smallImageKey = "one";
    }

    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
