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
    const presenceData = {
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