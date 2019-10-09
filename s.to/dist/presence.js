var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "463000750193246209",
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
    var a = '', presenceData = {
        largeImageKey: "sto"
    };
    presenceData.startTimestamp = browsingStamp;
    video = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
    if (document.querySelector("#wrapper > div.seriesContentBox > div.container.marginBottom > div:nth-child(4) > div.hosterSiteTitle > h2 > span") !== null) {
       if (iFrameVideo == true && !isNaN(duration)) {
            var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "sto",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused
                    ? (yield strings).pause
                    : (yield strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            presenceData.details = "Schaut: ";
            title = document.querySelector("head > title");
            presenceData.state = title.innerText.split(" |")[0];
            
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            presence.setActivity(presenceData);
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            title = document.querySelector("head > title");
            presenceData.state = title.innerText.split(" |")[0];
            var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
                largeImageKey: "sto",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused
                    ? (yield strings).pause
                    : (yield strings).play,
                startTimestamp: timestamps[0],
                endTimestamp: timestamps[1]
            };
            presenceData.details = "Schaut: ";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Stöbert durch";
        presenceData.state = "die Startseite";
        delete presenceData.smallImageText;
        
        presence.setActivity(presenceData);
        
           
    }
    else if (document.location.pathname == "/serie/stream/") {
        presenceData.details = "Schaut nach";
        presenceData.state = "einer Serie";
        delete presenceData.smallImageText;
        
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/app") {
        presenceData.details = "Schaut nach";
        presenceData.state = "Streaming ToGo";
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/beliebte-serien") {
        presenceData.details = "Schaut nach";
        presenceData.state = "Beliebten Serien";
        presenceData.smallImageKey = "search";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/team")) {
        presenceData.details = "Zählt die Teammitglieder";        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/statistics")) {
        presenceData.details = "Informiert sich über S.To";
        info1 = document.querySelector("#wrapper > div.container > div.row > div:nth-child(1) > div.facts.row > div:nth-child(4) > h3"); 
        presenceData.state = info1.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/") && document.location.pathname.endsWith("/subscribed")) {
        test1 = document.querySelector("#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2");
        presenceData.details = "Durchstöbert";
        presenceData.state = test1.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/") && document.location.pathname.endsWith("/watched")) {       
        name7 = document.querySelector("#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2");
        presenceData.details = "Durchstöbert";
        presenceData.state = name7.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/") && document.location.pathname.endsWith("/watchlist")) {       
        name8 = document.querySelector("#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2");
        presenceData.details = "Durchstöbert";
        presenceData.state = name8.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/info")) {
        name1 = document.querySelector("#wrapper > div.container > div > div > div.col-lg-12 > div > h2");
        presenceData.details = "Sieht...";
        presenceData.state = name1.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/profil")) {
        presenceData.details = "Beoachtet ein Profil";
        name2 = document.querySelector("#userDetails > div > div > div.col-lg-6.col-md-6.col-xs-12.col-sm-6 > a > h1");
        presenceData.state = name2.innerText;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }

    else if (document.location.pathname.includes("/katalog/")) {
        presenceData.details = "Sucht eine Serie im Katalog";
        katalog1 = document.querySelector("#wrapper > div.container.marginBottom > div.pageTitle > h1 > strong");
        presenceData.state = "Serien mit " + katalog1.innerText;
        presenceData.smallImageKey = "search";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes ("/account/subscribed")) {
        presenceData.details = "Informiert sich über";
        presenceData.state = "Abonnierte Serien";
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/account/watchlist")) {
        presenceData.details = "Informiert sich über";
        presenceData.state = "Watchlist";
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/account/watched")) {
        presenceData.details = "Liest den Log über";
        presenceData.state = "Zuletzt geschaute Episoden";
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/news")) {
        presenceData.details = "Informiert sich über";
        presenceData.state = "Neuigkeiten von S.To";
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/neu")) {
        presenceData.details = "Sucht neue Serien";
        presenceData.state = "OwO";
        presenceData.smallImageKey = "search";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/nachrichten")) {
        user1 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Schreibt Nachrichten...";
        presenceData.state = "als " + user1.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/support")) {
        tickets1 = document.querySelector("#wrapper > div.container > div.pageTitle > h1");
        presenceData.details = "Befindet sich im Supportmenü";
        presenceData.state = tickets1.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/account/settings")) {
        user2 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Ändert die Einstellungen";
        presenceData.state = "Account: " + user2.innerText;          
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/anleitung")) {
                presenceData.details = "Liest das Tutorial";
        presenceData.state = "So viel Text owo";         
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
      else if (document.location.pathname.includes("/registrierung")) {
          username1 = document.querySelector("#formUsername");
        presenceData.details = "Registriert sich gerade...";
        presenceData.state = "Vielleicht als " + username1.value;         
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/account")) {
        user3 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Angemeldet als";
        presenceData.state = user3.innerText;          
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/serienwuensche")) {
        name4 = document.querySelector("#wrapper > div.container > div.row.leaderboardBox > div.col-md-3 > div > strong");
        presenceData.details = "Votet für neue Serien";
        presenceData.state = name4.innerText + " Serienwünsche";          
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/serien")) {
        name5 = document.querySelector("#serInput");
        presenceData.details = "Sucht eine neue Serie";
        presenceData.state = name5.value; 
        presenceData.smallImageKey = "search";         
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/genre/")) {
        name6 = document.querySelector("#wrapper > div.container.marginBottom > div.seriesListSection > div.pageTitle.pageCenter.homeTitle > h1");
        presenceData.details = "Sucht in Genre";
        presenceData.state = name6.innerText;
        presenceData.smallImageKey = "search";        
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
      
    else if (document.location.pathname.includes("/random")) {
        presenceData.details = "Sucht eine random Serie";
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search")) {
        views = document.querySelector("#search");
        presenceData.smallImageKey = "search";
        presenceData.details = "Sucht eine Serie:";
        presenceData.state = views.value;
        delete presenceData.smallImageText;
        
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}