const presence = new Presence({
    clientId: "702467872315670529"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "ta"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/gamer/")) {
        const user = document.querySelector(".tabs > ul > li").textContent;
        if (document.location.pathname.includes("/gamecollection")) {
            presenceData.details = "Viewing " + user + "'s";
            presenceData.state = "Game Collection";
        }
        else if (document.location.pathname.includes("/achievements")) {
            presenceData.details = "Viewing " + user + "'s";
            presenceData.state = "Achievements";
        }
        else if (document.location.pathname.includes("/goals")) {
            presenceData.details = "Viewing " + user + "'s";
            presenceData.state = "Goals";
        }
        else if (document.location.pathname.includes("/blog")) {
            presenceData.details = "Viewing " + user + "'s";
            presenceData.state = "Blog";
        }
        else if (document.location.pathname.includes("/stats")) {
            presenceData.details = "Viewing " + user + "'s";
            presenceData.state = "Statistics";
        }
        else {
            presenceData.details = "Viewing profile of:";
            presenceData.state = user;
        }
    }
    else if (document.location.pathname.includes("/game/")) {
        if (document.location.pathname.includes("/achievements")) {
            presenceData.details = "Viewing Achievements of game:";
            presenceData.state = document.querySelector("div.panel-header.w > h3 > a").textContent;
        }
        else if (document.location.pathname.includes("/forum")) {
            presenceData.details = "Viewing Forums of game:";
            presenceData.state = document.title.replace(" Forum", "");
        }
        else if (document.location.pathname.includes("/walkthrough")) {
            presenceData.details = "Viewing Walkthrough of game:";
            presenceData.state = document
                .querySelector(".pagetitle")
                .textContent.replace(" Walkthrough", "");
        }
        else if (document.location.pathname.includes("/reviews")) {
            presenceData.details = "Viewing Reviews of game:";
            presenceData.state = document
                .querySelector(".pagetitle")
                .textContent.replace(" Reviews", "");
        }
        else if (document.location.pathname.includes("/scores")) {
            presenceData.details = "Viewing Top Scores of game:";
            presenceData.state = document
                .querySelector(".pagetitle")
                .textContent.replace("Top Scores For ", "");
        }
        else if (document.location.pathname.includes("/gamers")) {
            presenceData.details = "Viewing Gamers of game:";
            presenceData.state = document.querySelector("div.panel-header.w > h3 > a").textContent;
        }
        else {
            presenceData.details = "Viewing game:";
            presenceData.state = document.querySelector(".info").textContent.trim();
        }
    }
    else if (document.querySelector(".pagetitle") !== null &&
        document.querySelector(".pagetitle").textContent == "Achievement Details") {
        presenceData.details = "Viewing acheievement:";
        presenceData.state = document.querySelector(".title").textContent;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText =
            "Game: " +
                document.querySelector("div.panel-header.w > h3 > a").textContent;
    }
    else if (document.location.pathname == "/news" ||
        document.location.pathname == "/news.aspx") {
        presenceData.details = "Viewing the latest news";
    }
    else if (document.location.pathname == "/xbox-one/news") {
        presenceData.details = "Viewing the latest Xbox One news";
    }
    else if (document.location.pathname == "/xbox-one/games") {
        presenceData.details = "Viewing the latest Xbox One games";
    }
    else if (document.location.pathname == "/xbox-one/prices") {
        presenceData.details = "Viewing the latest Xbox One prices";
    }
    else if (document.location.pathname == "/xbox-360/news") {
        presenceData.details = "Viewing the latest Xbox 360 news";
    }
    else if (document.location.pathname == "/xbox-360/games") {
        presenceData.details = "Viewing the latest Xbox 360 games";
    }
    else if (document.location.pathname == "/xbox-360/prices") {
        presenceData.details = "Viewing the latest Xbox 360 prices";
    }
    else if (document.location.pathname == "/windows/news") {
        presenceData.details = "Viewing the latest Windows news";
    }
    else if (document.location.pathname == "/windows/games") {
        presenceData.details = "Viewing the latest Windows games";
    }
    else if (document.location.pathname == "/windows/prices") {
        presenceData.details = "Viewing the latest Windows prices";
    }
    else if (document.location.pathname == "/id-at-xbox/news") {
        presenceData.details = "Viewing the latest ID@Xbox news";
    }
    else if (document.location.pathname == "/id-at-xbox/games") {
        presenceData.details = "Viewing the latest ID@Xbox games";
    }
    else if (document.location.pathname == "/xbox-series-x/news") {
        presenceData.details = "Viewing the latest Xbox Series X news";
    }
    else if (document.location.pathname == "/xbox-series-x/games") {
        presenceData.details = "Viewing the latest Xbox Series X games";
    }
    else if (document.location.pathname == "/xbox-game-pass/news") {
        presenceData.details = "Viewing the latest Xbox Game Pass news";
    }
    else if (document.location.pathname == "/xbox-game-pass/games") {
        presenceData.details = "Viewing the latest Xbox Game Pass games";
    }
    else if (document.location.pathname == "/xbox-quests") {
        presenceData.details = "Viewing the latest Xbox Game Pass quests";
    }
    else if (document.location.pathname == "/ea-access/news") {
        presenceData.details = "Viewing the latest EA Access news";
    }
    else if (document.location.pathname == "/ea-access/games") {
        presenceData.details = "Viewing the latest EA Access games";
    }
    else if (document.location.pathname == "/xbox-game-pass-pc/news") {
        presenceData.details = "Viewing the latest Xbox Game Pass for PC news";
    }
    else if (document.location.pathname == "/xbox-game-pass-pc/games") {
        presenceData.details = "Viewing the latest Xbox Game Pass for PC games";
    }
    else if (document.location.pathname == "/videos") {
        presenceData.details = "Viewing the latest videos";
    }
    else if (document.querySelector(".newsitem > header > h1") !== null) {
        presenceData.details = "Reading article:";
        presenceData.state = document.querySelector(".newsitem > header > h1").textContent;
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/suggestnews.aspx") {
        presenceData.details = "Suggesting new news";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname == "/news/community") {
        presenceData.details = "Viewing the latest community news";
    }
    else if (document.location.pathname == "/news/tags/podcast") {
        presenceData.details = "Viewing the latest podcasts";
    }
    else if (document.location.pathname == "/siteupdates") {
        presenceData.details = "Viewing the latest site updates";
    }
    else if (document.location.pathname == "/games.aspx") {
        presenceData.details = "Viewing all games";
    }
    else if (document.location.pathname == "/xbox-achievements.aspx") {
        presenceData.details = "Viewing all achievements";
    }
    else if (document.location.pathname == "/solutions-required.aspx") {
        presenceData.details = "Viewing all achievements";
        presenceData.state = "that require guides";
    }
    else if (document.location.pathname == "/sitereviews.aspx") {
        presenceData.details = "Viewing site reviews";
    }
    else if (document.location.pathname == "/solutions") {
        presenceData.details = "Viewing achievement solutions";
    }
    else if (document.location.pathname == "/xbox-live.aspx") {
        presenceData.details = "Viewing Xbox Live status";
    }
    else if (document.location.pathname == "/challenges.aspx") {
        presenceData.details = "Viewing the Challanges Hub";
    }
    else if (document.location.pathname == "/gamingsessions.aspx") {
        presenceData.details = "Viewing the Gaming Sessions";
    }
    else if (document.location.pathname.includes("/viewcomment.aspx") &&
        document.querySelector(".pagetitle") !== null &&
        document.querySelector(".pagetitle").textContent == "View Solution") {
        presenceData.details = "Viewing solution for achievement:";
        presenceData.state = document.querySelector(".title").textContent;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText =
            "Game: " +
                document.querySelector("div.panel-header.w > h3 > a").textContent;
    }
    else if (document.location.pathname == "/serieslist.aspx") {
        presenceData.details = "Viewing Game Series";
    }
    else if (document.location.pathname == "/popularachievements.aspx") {
        presenceData.details = "Viewing popular achievements";
    }
    else if (document.location.pathname == "/walkthroughs.aspx") {
        presenceData.details = "Viewing Xbox Walkthroughs and Guides";
    }
    else if (document.location.pathname == "/reviews.aspx") {
        presenceData.details = "Viewing user reviews";
    }
    else if (document.location.pathname == "/gamereleases.aspx") {
        presenceData.details = "Viewing upcoming releases";
    }
    else if (document.location.pathname == "/searchresults.aspx") {
        presenceData.details = "Searching for:";
        presenceData.state = document.querySelector("#txtSearchFor").value;
        presenceData.smallImageKey = "search";
    }
    else if (document.location.pathname.includes("/products")) {
        if (document.location.pathname.includes("/latest")) {
            presenceData.details = "Viewing the latest products";
        }
        else if (document.location.pathname.includes("/xbox-sales")) {
            presenceData.details = "Viewing Xbox sales";
        }
        else if (document.querySelector(".pagetitle") !== null) {
            presenceData.details = "Viewing prices for:";
            presenceData.state = document
                .querySelector(".pagetitle")
                .textContent.replace("Best price for ", "")
                .trim();
        }
    }
    else if (document.location.pathname.includes("/forum/")) {
        presenceData.smallImageKey = "reading";
        if (document.location.pathname.includes("/viewthreads.aspx")) {
            presenceData.details = "Forums - Viewing their recent threads";
        }
        else if (document.location.pathname.includes("/forums.aspx")) {
            presenceData.details = "Browsing the forums...";
        }
        else if (document.location.pathname.includes("/viewboard.aspx")) {
            presenceData.details = "Forums - Viewing board:";
            presenceData.state = document.querySelector(".pagetitle").textContent;
        }
        else if (document.location.pathname.includes("/newthreads.aspx")) {
            presenceData.details = "Forums - Viewing new threads";
        }
        else if (document.location.pathname.includes("/viewthread.aspx")) {
            presenceData.details = "Forums - Reading thread:";
            presenceData.state = document.querySelector("#oMessageThread > div:nth-child(2) > h1").textContent;
        }
        else if (document.location.pathname.includes("/search.aspx")) {
            presenceData.details = "Forums - Searching for:";
            presenceData.state = document.querySelector("#txtSearchFor").value;
            presenceData.smallImageKey = "search";
        }
    }
    else if (document.location.pathname.includes("/leaderboard")) {
        presenceData.details = "Viewing the leaderboards";
    }
    else if (document.location.pathname.includes("/userleaderboards.aspx")) {
        presenceData.details = "Viewing user created leaderboards";
    }
    else if (document.location.pathname.includes("/TAPlaylist")) {
        if (document.location.pathname.includes("/forum")) {
            presenceData.details = "Viewing TA Playlist forum posts";
        }
        else if (document.location.pathname.includes("/stats")) {
            presenceData.details = "Viewing TA Playlist statistics";
        }
        else if (document.location.pathname.includes("/clips")) {
            presenceData.details = "Viewing TA Playlist clips";
        }
        else if (document.location.pathname.includes("/history")) {
            presenceData.details = "Viewing TA Playlist history";
        }
        else if (document.querySelector(".community-playlist > div.header > div > h1") !==
            null) {
            presenceData.details = "Viewing:";
            presenceData.state = document.querySelector(".community-playlist > div.header > div > h1").textContent;
        }
        else {
            presenceData.details = "TA Playlist - Browsing...";
        }
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Browsing...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUVuRSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQy9ELFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7U0FDckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFD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