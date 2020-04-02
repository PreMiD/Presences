let presence = new Presence({
    clientId: "694885187116597309"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused;
let lastPlaybackState = null, playback;
presence.on("iFrameData", data => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "shinden"
    };
    presenceData.startTimestamp = browsingStamp;
    if (lastPlaybackState != playback) {
        lastPlaybackState = playback;
        browsingStamp = Math.floor(Date.now() / 1000);
    }
    if (document.location.host == "shinden.pl") {
        if (document.location.pathname == "/" ||
            document.location.pathname == "/main") {
            presenceData.details = "Browsing...";
        }
        else if (document.location.pathname.includes("/news/")) {
            if (document.querySelector(".box-title") !== null) {
                presenceData.details = "Reading article:";
                presenceData.state = document
                    .querySelector(".box-title")
                    .textContent.replace(document.querySelector(".box-title > span").textContent, "")
                    .replace(document.querySelector(".box-title > span:nth-child(2)")
                    .textContent, "");
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Viewing recent articles";
            }
        }
        else if (document.location.pathname.includes("/series")) {
            if (document.querySelector(".page-title") !== null) {
                if (document.location.pathname.includes("/episodes")) {
                    presenceData.details = "Viewing episodes of serie:";
                }
                else if (document.location.pathname.includes("/characters")) {
                    presenceData.details = "Viewing characters of serie:";
                }
                else if (document.location.pathname.includes("/recommendations")) {
                    presenceData.details = "Viewing recommendations of serie:";
                }
                else if (document.location.pathname.includes("/reviews")) {
                    presenceData.details = "Viewing reviews of serie:";
                }
                else if (document.location.pathname.includes("/stats")) {
                    presenceData.details = "Viewing statistics of serie:";
                }
                else {
                    presenceData.details = "Viewing serie:";
                }
                presenceData.state = document
                    .querySelector(".page-title")
                    .textContent.replace("Anime: ", "");
            }
            else if (document.location.pathname.includes("/current")) {
                presenceData.details = "Viewing the current series";
            }
            else {
                presenceData.details = "Browsing series...";
            }
        }
        else if (document.location.pathname.includes("/episode")) {
            let serie = document.querySelector(".page-title").textContent;
            let episode = document
                .querySelector(".episode-head")
                .textContent.replace(document.querySelector(".episode-head> small").textContent, "")
                .trim();
            episode =
                document.querySelector(".episode-head> small").textContent +
                    " " +
                    episode;
            if (iFrameVideo == true && !isNaN(duration)) {
                presenceData.details = serie;
                presenceData.state = episode;
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.smallImageText = paused
                    ? (await strings).pause
                    : (await strings).play;
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                if (paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
            else {
                presenceData.details = "Viewing episode: " + episode;
                presenceData.state = "of serie: " + serie;
            }
        }
        else if (document.location.pathname.includes("/manga")) {
            if (document.querySelector(".page-title") !== null) {
                if (document.location.pathname.includes("/chapters")) {
                    presenceData.details = "Viewing chapters of manga:";
                }
                else if (document.location.pathname.includes("/characters")) {
                    presenceData.details = "Viewing characters of manga:";
                }
                else if (document.location.pathname.includes("/recommendations")) {
                    presenceData.details = "Viewing recommendations of manga:";
                }
                else if (document.location.pathname.includes("/reviews")) {
                    presenceData.details = "Viewing reviews of manga:";
                }
                else if (document.location.pathname.includes("/stats")) {
                    presenceData.details = "Viewing statistics of manga:";
                }
                else {
                    presenceData.details = "Viewing manga:";
                }
                presenceData.state = document
                    .querySelector(".page-title")
                    .textContent.replace("Manga: ", "");
            }
            else {
                presenceData.details = "Browsing mangas...";
            }
        }
        else if (document.location.pathname.includes("/character")) {
            if (document.querySelector(".page-title") !== null) {
                presenceData.details = "Viewing character:";
                presenceData.state = document.querySelector(".page-title").textContent;
            }
            else {
                presenceData.details = "Viewing characters";
            }
        }
        else if (document.location.pathname.includes("/staff")) {
            if (document.querySelector(".page-title") !== null) {
                presenceData.details = "Viewing staff member:";
                presenceData.state = document.querySelector(".page-title").textContent;
            }
            else {
                presenceData.details = "Viewing staff members";
            }
        }
        else if (document.location.pathname.includes("/user")) {
            presenceData.details = "Viewing profile of:";
            presenceData.state = document.querySelector(".user-navigation > li:nth-child(1) > strong").textContent;
        }
        else if (document.location.pathname.includes("/animelist")) {
            presenceData.details = "Viewing their anime list";
        }
        else if (document.location.pathname.includes("/mangalist")) {
            presenceData.details = "Viewing their manga list";
        }
    }
    else if (document.location.host == "forum.shinden.pl") {
        if (document.URL.includes("thread/")) {
            presenceData.details = "Reading thread:";
            presenceData.state = document.querySelector("#content > div > div.pageContent > div.titleBar > h1").textContent;
        }
        else if (document.URL.includes("members/")) {
            presenceData.details = "Viewing user:";
            presenceData.state = document.querySelector(".username").textContent;
        }
        else if (document.URL == "https://forum.shinden.pl/index.php") {
            presenceData.details = "Browsing forums...";
        }
        else if (document.URL.includes("forums/")) {
            presenceData.details = "Viewing category:";
            presenceData.state = document.querySelector("#content > div > div.pageContent > div.titleBar > h1").textContent;
        }
        else if (document.URL.includes("groups/")) {
            if (document.querySelector("#content > div > div.pageContent > div.mainContainer > div > div.titleBar > h1") !== null) {
                presenceData.details = "Viewing group:";
                presenceData.state = document
                    .querySelector("#content > div > div.pageContent > div.mainContainer > div > div.titleBar > h1")
                    .textContent.replace("Informacje - ", "");
            }
            else {
                presenceData.details = "Viewing groups";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUN2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksRUFDM0IsUUFBYSxDQUFDO0FBRWYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsSUFBSSxRQUFRLEVBQUU7UUFDYixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7S0FDbEM7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxh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