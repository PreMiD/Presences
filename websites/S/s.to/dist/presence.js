const presence = new Presence({
    clientId: "463000750193246209"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "sto"
    };
    if (document.location.pathname == "/") {
        presenceData.details = "Stöbert durch";
        presenceData.state = "die Startseite";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/serie/stream/")) {
        const nameofserie = document.querySelector("#series > section > div.container.row > div.series-meta.col-md-6-5.col-sm-6.col-xs-12 > div.series-title > h1 > span");
        try {
            presenceData.details = "Schaut " + nameofserie.textContent;
            const titleofserie = document.querySelector("#wrapper > div.seriesContentBox > div.container.marginBottom > div:nth-child(4) > div.hosterSiteTitle > h2 > span").textContent;
            presenceData.state = titleofserie;
        }
        catch {
            presenceData.details = "Schaut";
            presenceData.state = nameofserie.textContent;
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
        const info1 = document.querySelector("#wrapper > div.container > div.row > div:nth-child(1) > div.facts.row > div:nth-child(4) > h3");
        presenceData.state = info1.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/") &&
        document.location.pathname.endsWith("/subscribed")) {
        const test1 = document.querySelector("#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2");
        presenceData.details = "Durchstöbert";
        presenceData.state = test1.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/") &&
        document.location.pathname.endsWith("/watched")) {
        const name7 = document.querySelector("#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2");
        presenceData.details = "Durchstöbert";
        presenceData.state = name7.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/") &&
        document.location.pathname.endsWith("/watchlist")) {
        const name8 = document.querySelector("#wrapper > div.container > div.seriesListContainer.row > div.pageTitle45 > h2");
        presenceData.details = "Durchstöbert";
        presenceData.state = name8.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/info") {
        const name1 = document.querySelector("#wrapper > div.container > div > div > div.col-lg-12 > div > h2");
        presenceData.details = "Sieht...";
        presenceData.state = name1.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/profil")) {
        presenceData.details = "Beobachtet ein Profil";
        const name2 = document.querySelector("#userDetails > div > div > div.col-lg-6.col-md-6.col-xs-12.col-sm-6 > a > h1");
        presenceData.state = name2.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/katalog/")) {
        presenceData.details = "Sucht eine Serie im Katalog";
        const katalog1 = document.querySelector("#wrapper > div.container.marginBottom > div.pageTitle > h1 > strong");
        presenceData.state = "Serien mit " + katalog1.textContent;
        presenceData.smallImageKey = "search";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/account/subscribed")) {
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
        const user1 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Schreibt Nachrichten...";
        presenceData.state = "als " + user1.textContent;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/support") {
        presenceData.details = "Befindet sich im Support";
        const supportzahl = document.querySelector("#wrapper > div.container.noPadding > div:nth-child(6) > h3").textContent;
        presenceData.state = supportzahl;
        presenceData.smallImageKey = "reading";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/support/frage/")) {
        const frage1 = document.querySelector("#wrapper > div.container > div.row > div.col-lg-8 > section:nth-child(1) > article > h1").textContent;
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
        const user2 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Ändert die Einstellungen";
        presenceData.state = "Account: " + user2.textContent;
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/account/support")) {
        const supporttickets = document.querySelector("#wrapper > div.container > div.pageTitle > h1").textContent;
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
        const username1 = document.querySelector("#formUsername");
        presenceData.details = "Registriert sich gerade...";
        presenceData.state = "Vielleicht als " + username1.value;
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/account") {
        const user3 = document.querySelector("#wrapper > header > div > div.header-content > nav > div > div.dd > p > a > span.name");
        presenceData.details = "Angemeldet als";
        presenceData.state = user3.textContent;
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/serienwuensche") {
        const name4 = document.querySelector("#wrapper > div.container > div.row.leaderboardBox > div.col-md-3 > div > strong");
        presenceData.details = "Votet für neue Serien";
        presenceData.state = name4.textContent + " Serienwünsche";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/serien")) {
        const name5 = document.querySelector("#serInput");
        presenceData.details = "Sucht eine neue Serie";
        presenceData.state = name5.value;
        presenceData.smallImageKey = "search";
        delete presenceData.smallImageText;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/genre/")) {
        const name6 = document.querySelector("#wrapper > div.container.marginBottom > div.seriesListSection > div.pageTitle.pageCenter.homeTitle > h1");
        presenceData.details = "Sucht in Genre";
        presenceData.state = name6.textContent;
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
        const views = document.querySelector("#search");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLEtBQUs7S0FDckIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7UUFFdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDeEMsc0hBQXNILENBQ3ZILENBQUM7UUFFRixJQUFJO1lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUMzRCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6QyxtSEFBbUgsQ0FDcEgsQ0FBQyxXQUFXLENBQUM7WUFDZCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNuQztRQUFDLE1BQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUNoQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFDRCxPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7UUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FB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