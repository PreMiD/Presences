var presence = new Presence({
    clientId: "707379503881650258"
});
var stats;

function getTimestamps(videoTime: number, videoDuration: number): any {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000),Math.floor(endTime)];
  }


  
var browsingStamp = Math.floor(Date.now() / 1000);
var teamname;
presence.on("UpdateData", async () => {

    var presenceData: presenceData = {
        largeImageKey: "espnapp_logo"
    };
    if (document.location.pathname == "/"){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
    }
    else if(document.location.pathname.includes("/nba/team/")){
        if(document.location.pathname.includes("/nba/team/stats/")){
            teamname = document.querySelector("#fittPageContainer > div.StickyContainer > div:nth-child(1) > div > div > div > div > h1 > div").textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = teamname;
            stats = document.querySelector("#fittPageContainer > div.StickyContainer > div.page-container.cf > div.layout.is-9-3 > div > section > div > div.flex.justify-between.mt3.mb3.items-center > h1").textContent;
            stats = stats.replace(/[^\d-]/g,``);
            presenceData.state = "Stats " + stats;
        }
        else {
            teamname = document.querySelector("#clubhouse-header > div > div > div > h1 > div").textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = teamname;
            presenceData.state = "Home Page";
            console.log("teampage"); 
        }  
    }
    else if(document.location.pathname.includes("/nfl/team/")){
        if(document.location.pathname.includes("/nfl/team/stats/")){
            teamname = document.querySelector("#fittPageContainer > div.StickyContainer > div:nth-child(1) > div > div > div > div > h1 > div").textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = teamname;
            stats = document.querySelector("#fittPageContainer > div.StickyContainer > div.page-container.cf > div.layout.is-9-3 > div > section > div > div.flex.justify-between.mt3.mb3.items-center > h1").textContent;
            stats = stats.replace(/[^\d-]/g,``);
            presenceData.state = "Stats " + stats;
        }
        else {
            teamname = document.querySelector("#clubhouse-header > div > div > div > h1 > div").textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = teamname;
            presenceData.state = "Home Page"; 
        }  
    }
    else if (document.location.pathname.includes ("/watch/player/")){
        var name = document.querySelector("#fittPageContainer > div.WatchListingsVideo.WatchListingsVideo--VideoContainer > div.WatchVideoPlayer__Metadata > div.WatchVideoPlayer__Metadata--title").textContent;
        var channel = document.querySelector("#fittPageContainer > div.WatchListingsVideo.WatchListingsVideo--VideoContainer > div.WatchVideoPlayer__Metadata > div.WatchVideoPlayer__Metadata--subtitle").textContent;
        var video = (document.querySelector("#vjs_video_3_html5_api")as HTMLVideoElement);
        if (video == null){
            presenceData.details = name;
            presenceData.state = channel;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (video){
            var timestamps = getTimestamps(video.currentTime,video.duration);
            presenceData.details = name;
            presenceData.state = channel;
            if (!video.paused){
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.smallImageKey = "play";
                presenceData.smallImageText = "playing";
            }
            else {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = "paused";
            }
            console.log(timestamps);
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = name;
            presenceData.state = channel;
        }
    }
    else if (document.location.pathname.includes("/search/")){
        var search = (document.querySelector("#fittPageContainer > div.page-container.cf > div > div > div.SearchBar.ml4.mr4 > form > input")as HTMLInputElement).value;
        presenceData.details = "searching";
        presenceData.state = search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        console.log (search);
    } 
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {

        presence.setActivity(presenceData); 
    }
});