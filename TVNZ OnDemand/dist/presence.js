var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
    clientId: "687426695417823238",
    mediaKeys: false
});

const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

let iFrameVideo, currentTime, duration, paused;
let video, videoDuration, videoCurrentTime;

presence.on("iFrameData", data => {
    playback =
        data.iframe_video.duration !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currentTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});

presence.on("UpdateData", () => {
    let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));

    let presenceData = { 
        largeImageKey: "logo" 
    }

    if (document.location.pathname.includes("/choose-profile")) {
        presenceData.details = "Choosing a profile"
    } else if (document.URL === "https://www.tvnz.co.nz/" || document.URL === "https://www.tvnz.co.nz/shows") {
        presenceData.details = "Browsing the main page";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.location.pathname.includes("/episodes/")) {
        if (timestamps[1] !== NaN) {
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }

        let showName;
        const tagCollection = document.getElementsByClassName("Player-title");
        for (tag of tagCollection) {
            showName = tag.innerText;
        }
        
        presenceData.state = showName;

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

        let showName;
        const tagCollection = document.getElementsByTagName("a")
        for (tag of tagCollection) { 
            if (tag.hasAttribute("data-test-show-hero-title") === true) {
                showName = tag.innerText
            }
        }

        presenceData.state = showName
    } else if (document.URL === "https://www.tvnz.co.nz/" || document.URL === "https://www.tvnz.co.nz/shows") {
        presenceData.details = "Browsing the main page";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.URL === "https://www.tvnz.co.nz/categories/my-favourites") {
        presenceData.details = "Browsing favourite shows";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (document.location.pathname.includes("/categories/")) {
        presenceData.details = "Browsing a category";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);

        let categoryName;
        const tagCollection = document.getElementsByClassName("PageHeader-title");
        for (tag of tagCollection) { 
            categoryName = tag.innerText
        }

        presenceData.state = categoryName;
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

        let liveTVShowName;
        const tagCollection = document.getElementsByClassName("Player-title")
        for (tag of tagCollection) { 
            liveTVShowName = tag.innerText
        }

        presenceData.state = liveTVShowName;
    } else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-2") {
        presenceData.details = "Watching TVNZ 2 Live";
        presenceData.smallImageKey = "two";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);

        let liveTVShowName;
        const tagCollection = document.getElementsByClassName("Player-title")
        for (tag of tagCollection) { 
            liveTVShowName = tag.innerText
        }

        presenceData.state = liveTVShowName;
    } else if (document.URL === "https://www.tvnz.co.nz/livetv/tvnz-duke") {
        presenceData.details = "Watching TVNZ Duke Live";
        presenceData.smallImageKey = "duke";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);

        let liveTVShowName;
        const tagCollection = document.getElementsByClassName("Player-title")
        for (tag of tagCollection) { 
            liveTVShowName = tag.innerText
        }

        presenceData.state = liveTVShowName;
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
