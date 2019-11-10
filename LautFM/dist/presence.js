//import { write } from "fs";

console.log("Starting LautFM-Presence");
console.log(document);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "640997739689279498",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2, title2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", data => {
    playback =
        data.iframe_video.duration !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    playing = (document.getElementsByClassName("btn playbutton")[0].getAttributeNode("data-trackingaction").value);
    var a = presenceData = '', presenceData = {
        largeImageKey: "logo"            
    };

    switch(playing){
        case "stop" :
             playingnow = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > span > b").innerText;
             presenceData.details = "Playing " + playingnow;
             music = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > div").innerText;
             presenceData.state = music;
             break;
        case "play" : 
        if (document.location.pathname == "/genres"){
            presenceData.state = "Schaut nach Genres";
            presence.setActivity(presenceData);
        }else if (document.location.pathname.includes("/stations/genre/")){
            presenceData.state = "Sucht Stationen";
            presence.setActivity(presenceData);
        }else if (document.location.pathname.includes("/stations/location")){
            presenceData.state = "Sucht lokale Stationen";
            presence.setActivity(presenceData);
        }else if (document.location.pathname == ("/stations/all")){
            presenceData.state = "Sucht nach Top-Sender";
            presence.setActivity(presenceData);
        }else
            station = document.querySelector("#app > section > header > div.fm-station-header__col.fm-station-header__col--name > h1").innerText;
            presenceData.details = "Befindet sich bei Station";
            presenceData.state = station;
            presence.setActivity(presenceData);
        
        //presenceData.state = "Lurking on LautFM"; break;
        //default : presenceData.state = "ZZzzzZZ"; 
    }
    

    

    presence.setActivity(presenceData);
}));

/**
 
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    console.log("starting lautfm");
    var a = '', presenceData = {
        largeImageKey: "logo"
        //  if (document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button:nth-child(2)").className !== "btn playbutton fm-player__btnfm-player__btn--stop playbutton--play)") {
            
    };
    presenceData.startTimestamp = browsingStamp;
    video = document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button.btn.playbutton.fm-player__btn.fm-player__btn--stop.playbutton--playing");
    if (document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button.btn.playbutton.fm-player__btn.fm-player__btn--stop.playbutton--playing").className == "btn playbutton fm-player__btn fm-player__btn--stop playbutton--play") {
        
        presence.details = "Its a Test toast";
        presence.setActivity(presenceData);
        
    }
    else if (document.location.pathname == "/") {
        playingnow = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > span > b").innerText;
        presenceData.details = "Hört " + playingnow;
        music = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > div > span.player-display__meta.player-display__meta--title").innerText
        presenceData.state = music;
         presence.setActivity(presenceData);
           
    } 
    else if (document.location.pathname.includes("/dashboard")) {
        presenceData.details = "Reading something in";
        presenceData.state = "Dashboard";
        presence.setActivity(presenceData);
       
    } 
    else if (document.location.pathname.includes("/premium")) {
    presenceData.details = "Think about";
    presenceData.state = "Premium";
    presence.setActivity(presenceData);
   
    } 
    else if (document.location.pathname.includes("/login")) {
        username1 = document.querySelector("#username");
    presenceData.details = "Log In";
    presenceData.state = username1.value;
    presence.setActivity(presenceData);
   
    } 
    else if (document.location.pathname.includes("/register")) {
        username2 = document.querySelector("#username");
    presenceData.details = "Sign Up";
    presenceData.state = "Maybe as " + username2.value;
    presence.setActivity(presenceData);
   
    } 

    else if (document.location.pathname.includes ("/servers/")) {
        tab1 = document.querySelector("#search");
            presenceData.details = "Search a Server";
            presenceData.state = tab1.value;
            presence.setActivity(presenceData);
         
    } 
    else if (document.location.pathname.includes("/server/")) {
        tab1SN = document.querySelector("#main > div.mb-4.mt-5.row > div:nth-child(1) > a > span");
            presenceData.details = "Watching a Server";
            presenceData.state = tab1SN.innerText;
            presence.setActivity(presenceData);
         
    }
    else if (document.location.pathname.includes("/emojis/")) {
        tab2 = document.querySelector("#search");
            presenceData.details = "Search a Emoji";
            presenceData.state =  tab2.value;
            presence.setActivity(presenceData);
         
    } 
    else if (document.location.pathname.includes ("/emoji/")) {
        tab2EN = document.querySelector("#main > div > div.col-12.text-center > h4");
            presenceData.details = "Watching a Emoji";
            tab2EU = document.querySelector("#main > div > div:nth-child(2) > div > div > a");
            presenceData.state =  tab2EN.innerText + " by " + tab2EU.innerText;
            presence.setActivity(presenceData);
         
    } 
    else if (document.location.pathname.includes ("/users/")) {
        tab3 = document.querySelector("#search");
        presenceData.details = "Search a User";
        presenceData.state =  tab3.value;
        presence.setActivity(presenceData);
        
    } 
    else if (document.location.pathname.includes("/user/")) {
        tab3UN = document.querySelector("#main > div:nth-child(1) > div > a > h1");
        presenceData.details = "Watching a User";
        presenceData.state =  tab3UN.innerText;
        presence.setActivity(presenceData);
        refresh;
         
    } 
    else if (document.location.pathname.includes ("/bots/")) {
        tab4 = document.querySelector("#search");
         presenceData.details = "Search a Bot";
         presenceData.state =  tab4.value;
        presence.setActivity(presenceData);
         
    }
    else if (document.location.pathname.includes("/bot/")) {
        tab4BN = document.querySelector("#main > div:nth-child(1) > div.col-md-12 > a > h1");
         presenceData.details = "Watching a Bot";
         presenceData.state =  tab4BN.innerText;
        presence.setActivity(presenceData);
         
    }
    
    else 
         //  if (document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button:nth-child(2)").className !== "btn playbutton fm-player__btnfm-player__btn--stop playbutton--play)") {
         //      presence.details = "Playing";
         //      presence.setActivity(presenceData);
           
         //  }
         //  presenceData.details = document.querySelector("#app > div.fixed.fixed--top > div > div.fm-player__btn-container > button.btn.playbutton.fm-player__btn.fm-player__btn--stop.playbutton--playing").innerText
         
         playingnow = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > span > b").innerText;
         presenceData.details = "Hört " + playingnow;
         music = document.querySelector("#app > div.fixed.fixed--top > div > a > div > div > div > span.player-display__meta.player-display__meta--title").innerText;
         presenceData.state = music;
          presence.setActivity(presenceData);
        
        
    }
        
     
));


 */

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function refresh(presence) {
    refresh.refresh;
}