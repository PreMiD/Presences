var presence = new Presence({
    clientId: "707379503881650258" //The client ID of the Application created at https://discordapp.com/developers/applications
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings
});

/*

function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(10000, myOutsideHeavyLiftingFunction);
//Run the function seperate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/
var search: string,
  title: string,
  director: string,
  video: any,
  timestamps: any[];
let Name: any;
function getTimestamps(videoTime: number, videoDuration: number): any {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000),Math.floor(endTime)];
  }


  
var browsingStamp = Math.floor(Date.now() / 1000);
var teamname;
presence.on("UpdateData", async () => {
    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

    var presenceData: presenceData = {
        largeImageKey: "espnapp_logo", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
    }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/
    if (document.location.pathname == "/"){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
    }
    else if(document.location.pathname.includes("/nba/team/")){
        if(document.location.pathname.includes("/nba/team/stats/")){
            teamname = document.querySelector("#fittPageContainer > div.StickyContainer > div:nth-child(1) > div > div > div > div > h1 > div").textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = teamname;
            var stats = document.querySelector("#fittPageContainer > div.StickyContainer > div.page-container.cf > div.layout.is-9-3 > div > section > div > div.flex.justify-between.mt3.mb3.items-center > h1").textContent;
            stats = stats.replace(/[^\d-]/g,``);
            presenceData.state = "Stats " + stats;
            console.log("Stats Page");
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
            var stats = document.querySelector("#fittPageContainer > div.StickyContainer > div.page-container.cf > div.layout.is-9-3 > div > section > div > div.flex.justify-between.mt3.mb3.items-center > h1").textContent;
            stats = stats.replace(/[^\d-]/g,``);
            presenceData.state = "Stats " + stats;
            console.log("Stats Page");
        }
        else {
            teamname = document.querySelector("#clubhouse-header > div > div > div > h1 > div").textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = teamname;
            presenceData.state = "Home Page";
            console.log("teampage"); 
        }  
    }
    else if (document.location.pathname.includes ("/watch/player/")){
        var name = document.querySelector("#fittPageContainer > div.WatchListingsVideo.WatchListingsVideo--VideoContainer > div.WatchVideoPlayer__Metadata > div.WatchVideoPlayer__Metadata--title").textContent;
        var channel = document.querySelector("#fittPageContainer > div.WatchListingsVideo.WatchListingsVideo--VideoContainer > div.WatchVideoPlayer__Metadata > div.WatchVideoPlayer__Metadata--subtitle").textContent;
        var video = (<HTMLVideoElement>document.querySelector("#vjs_video_3_html5_api"));
        if (video == null){
            presenceData.details = name;
            presenceData.state = channel;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (video != null){
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
        var search = (<HTMLInputElement>document.querySelector("#fittPageContainer > div.page-container.cf > div > div > div.SearchBar.ml4.mr4 > form > input")).value;
        presenceData.details = "searching";
        presenceData.state = search;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "searching";
        console.log (search);
    } 
    if (presenceData.details == null) {
        //This will fire if you do not set presence details
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});

//document.querySelector("#fittPageContainer > div.WatchListingsVideo.WatchListingsVideo--VideoContainer > div.WatchVideoPlayer__Metadata > div.WatchVideoPlayer__Metadata--title").textContent

//document.querySelector("#vjs_video_3")