const presence = new Presence({
    clientId: "694885187116597309"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused;
let lastPlaybackState = null, playback;
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    const presenceData = {
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
            const serie = document.querySelector(".page-title").textContent;
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
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxXQUFvQixFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsQ0FBQztBQUN2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksRUFDMUIsUUFBYSxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsSUFBSSxRQUFRLEVBQUU7UUFDWixXQUFXLEdBQUcsSUFBSSxDQUFD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