var presence = new presence({
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
        largeImageKey: "logo"
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