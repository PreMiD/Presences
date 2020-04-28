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
    var a = videoTime.split(':');
    var b = videoDuration.split(':');
    var secondsStart = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    var secondsEnd = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
    return timestamps = getTimestamps(Math.floor(secondsStart), Math.floor(secondsEnd));
}
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "logo",
        details: "",
        startTimestamp: 0,
        smallImageKey: "",
        smallImageText: "",
        state: "",
        endTimestamp: 0
    };
    if (document.location.pathname == "/movie/browse/") {
        presenceData.details = "Browsing Movies";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/movie/results/") {
        search = document.querySelector("#content > div.results-info > h5 > span").textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Movie";
    }
    else if (document.location.pathname == "/movie-clip/results/music-video/") {
        search = document.querySelector("#content > div.results-info > h5 > span").textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Music Video";
    }
    else if (document.location.pathname == "/movie-clip/playlist/results/music-video/") {
        search = document.querySelector("#content > div.results-info > h5 > span").textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Music Video Playlist";
    }
    else if (document.location.pathname == "/movie-clip/results/clip/") {
        search = document.querySelector("#content > div.results-info > h5 > span").textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Movie Clip";
    }
    else if (document.location.pathname == "/movie-clip/playlist/results/clip/") {
        search = document.querySelector("#content > div.results-info > h5 > span").textContent;
        presenceData.details = "Searching: " + search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        presenceData.state = "Movie Clip Playlist";
    }
    else if (document.location.pathname.indexOf("/movie/watch/") == 0) {
        title = document.querySelector("#UIMovieSummary > ul > li > div.block2 > a > h3").textContent;
        var container_div = document.querySelector("div.professionals");
        var count = container_div.getElementsByTagName('div').length;
        director = document.querySelector("div.professionals > div:nth-child(" + (count - (count / 3)) + " ) > div.prof > p").textContent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksTUFBYyxFQUFFLEtBQWEsRUFBRSxRQUFnQixFQUFFLEtBQVUsRUFBRSxVQUFpQixDQUFDO0FBQ25GLElBQUksSUFBUyxDQUFDO0FBRWQsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUMzRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDeEQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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