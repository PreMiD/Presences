var presence = new Presence({
    clientId: "702375041320484944"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var search, title, director, video, timestamps;
let Name;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getSeconds(videoTime, videoDuration) {
    var a = videoTime.split(":");
    var b = videoDuration.split(":");
    var secondsStart = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    var secondsEnd = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
    return (timestamps = getTimestamps(Math.floor(secondsStart), Math.floor(secondsEnd)));
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/movie/browse/") {
        presenceData.details = "Browsing Movies";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/movie/results/") {
        search = document.querySelector("#content > div.results-info > h5 > span")
            .textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Movie";
    }
    else if (document.location.pathname == "/movie-clip/results/music-video/") {
        search = document.querySelector("#content > div.results-info > h5 > span")
            .textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Music Video";
    }
    else if (document.location.pathname == "/movie-clip/playlist/results/music-video/") {
        search = document.querySelector("#content > div.results-info > h5 > span")
            .textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Music Video Playlist";
    }
    else if (document.location.pathname == "/movie-clip/results/clip/") {
        search = document.querySelector("#content > div.results-info > h5 > span")
            .textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Movie Clip";
    }
    else if (document.location.pathname == "/movie-clip/playlist/results/clip/") {
        search = document.querySelector("#content > div.results-info > h5 > span")
            .textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Movie Clip Playlist";
    }
    else if (document.location.pathname.indexOf("/movie/watch/") == 0) {
        title = document.querySelector("#UIMovieSummary > ul > li > div.block2 > a > h3").textContent;
        var container_div = document.querySelector("div.professionals");
        var count = container_div.getElementsByTagName("div").length;
        director = document.querySelector("div.professionals > div:nth-child(" +
            (count - count / 3) +
            " ) > div.prof > p").textContent;
        video = document.querySelector("#icons-and-text > div#play.show");
        var start = document.querySelector("#controlbar > div.durations > div.watched-duration").textContent;
        var end = document.querySelector("#controlbar > div.durations > div.content-duration").textContent;
        var div = document.querySelector("#UIMovieSummary > ul > li > div.block2 > div.info > p:nth-child(1)");
        Name = div.firstChild.nodeValue;
        if (video == null && end != "--:--:--") {
            timestamps = getSeconds(start, end);
            console.log(timestamps[0]);
            console.log(timestamps[1]);
            presenceData.details = title + " (" + Name + ")";
            presenceData.state = director;
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "playing";
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        else if (video != null && end != "--:--:--") {
            presenceData.details = title + " (" + Name + ")";
            presenceData.state = director;
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "paused";
        }
        else {
            presenceData.details = title + " (" + Name + ")";
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = director;
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Browsing";
        }
    }
    else if (document.location.pathname == "/privacy/") {
        presenceData.details = "Viewing privacy";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/terms/") {
        presenceData.details = "Viewing terms of service";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/adblocker/") {
        presenceData.details = "Look at the adblock turn off page";
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Turning off Adblock";
    }
    else if (document.location.pathname == "/intro/") {
        presenceData.details = "Selecting Language";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/launcher/") {
        presenceData.details = "Viewing Menu";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/login/") {
        presenceData.details = "Logining In";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/register/") {
        presenceData.details = "Signing Up";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/movie/speedtest/") {
        presenceData.details = "Running A Speed Test";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/e500/") {
        presenceData.details = "Logging a Bug.";
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Logging a Bug";
    }
    else if (document.location.pathname == "/movie-clip/playlist/browse/clip/") {
        presenceData.details = "Viewing Movie Clips";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/feed")) {
        if (document.location.pathname == "/feed/home/") {
            presenceData.details = "Viewing your feed.";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            var profile = document.querySelector("#UIFeedSidebar > div.quickinfo > h2").textContent;
            presenceData.details = "Viewing: " + profile;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname == "/movie-clip/playlist/browse/music-video/") {
        presenceData.details = "Viewing music videos";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/account/") {
        presenceData.details = "Viewing account details";
        presenceData.startTimestamp = browsingStamp;
    }
    else {
        presenceData.details = "Unable to Read Page";
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksTUFBYyxFQUNoQixLQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsS0FBVSxFQUNWLFVBQWlCLENBQUM7QUFDcEIsSUFBSSxJQUFTLENBQUM7QUFFZCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzdELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUMxRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsSUFBSSxV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