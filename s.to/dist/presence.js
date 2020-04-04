var presence = new Presence({
    clientId: "463000750193246209"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "sto"
    };
   
    if (document.location.pathname == "/") {
        presenceData.details = "Stöbert durch";
        presenceData.state = "die Startseite";       
        
        presence.setActivity(presenceData);
         
    }
    else if (document.location.pathname.includes("/serie/stream/")) {        
        nameofserie = document.querySelector("#series > section > div.container.row > div.series-meta.col-md-6-5.col-sm-6.col-xs-12 > div.series-title > h1 > span");
       // Try if Name of Title are visible
        try {
            presenceData.details = "Schaut " + nameofserie.innerText;
            titleofserie = document.querySelector("#wrapper > div.seriesContentBox > div.container.marginBottom > div:nth-child(4) > div.hosterSiteTitle > h2 > span").innerText;          
            presenceData.state = titleofserie;
        } catch {
            presenceData.details = "Schaut";
            presenceData.state = nameofserie.innerText;
        }
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
    else if (document.location.pathname == "/statistics") {
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
    else if (document.location.pathname == "/info") {
        name1 = document.querySelector("#wrapper > div.container > div > div > div.col-lg-12 > div > h2");
        presenceData.details = "Sieht...";
        presenceData.state = name1.innerText;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/profil")) {
        presenceData.details = "Beobachtet ein Profil";
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
    else if (document.location.pathname == "/neu") {
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
    else if (document.location.pathname == "/support") {
       presenceData.details = "Befindet sich im Support";
       supportzahl = document.querySelector("#wrapper > div.container.noPadding > div:nth-child(6) > h3").innerText;
        presenceData.state = supportzahl;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/support/frage/")) {
        frage1 = document.querySelector("#wrapper > div.container > div.row > div.col-lg-8 > section:nth-child(1) > article > h1").innerText;
        presenceData.details = "Liest Fragen...";
        presenceData.state = frage1;        
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/support/fragen") {
        presenceData.details = "Liest Fragen...";    
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
    else if (document.location.pathname.includes("/account/support")) {
        supporttickets = document.querySelector("#wrapper > div.container > div.pageTitle > h1").innerText;
        presenceData.details = "Liest Supporttickets";
        presenceData.state = supporttickets;          
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/account/friendships") {        
        presenceData.details = "Beobachtet";
        presenceData.state = "die Freundesliste";          
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/support/anleitung") {
                presenceData.details = "Liest das Tutorial";
        presenceData.state = "So viel Text owo";         
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.endsWith("/account/statistics")) {
        presenceData.details = "Betrachtet Statisken...";         
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
      else if (document.location.pathname == "/registrierung") {
          username1 = document.querySelector("#formUsername");
        presenceData.details = "Registriert sich gerade...";
        presenceData.state = "Vielleicht als " + username1.value;         
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/account") {
        user3 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Angemeldet als";
        presenceData.state = user3.innerText;          
        delete presenceData.smallImageText;
      
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/serienwuensche") {
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
        presenceData.details = "Sucht...";
        presenceData.state = views.value;
        delete presenceData.smallImageText;
        
        presence.setActivity(presenceData);
    }
   
    else {
        presence.setActivity();
        
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}