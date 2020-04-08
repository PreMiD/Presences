var presence = new Presence({
    clientId: "619286440353726465"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "tvtime-logo"
    };
    if (document.location.pathname == "/en" ||
        document.location.pathname == "/fr" ||
        document.location.pathname == "/es" ||
        document.location.pathname == "/it" ||
        document.location.pathname == "/pt_PT" ||
        document.location.pathname == "/pt_BR" ||
        document.location.pathname == "/de") {
        (data.details = "Viewing Watchlist"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/calendar")) {
        (data.details = "Viewing Calendar"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/upcoming")) {
        (data.details = "Viewing Upcoming Episodes"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/profile")) {
        var user = document
            .querySelector(".profile-infos h1.name")
            .textContent.split("Follow")[0];
        (data.details = "Viewing a User Profile"),
            (data.state = user),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/account")) {
        (data.details = "Viewing Account Details"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.includes("/show")) {
        if (document.location.pathname.includes("/episode/")) {
            var showname = document.querySelector("div.info-box h3 a").textContent;
            var shownumber = document.querySelector("div.info-box h1 .episode-label")
                .textContent;
            (data.details = "Viewing an Episode"),
                (data.state = showname + " - " + shownumber);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.endsWith("/explore")) {
            (data.details = "Browsing TV Shows"),
                (data.startTimestamp = browsingStamp);
            presence.setActivity(data);
        }
        else {
            var show = document.querySelector("div.info-box.heading-info h1")
                .textContent;
            (data.details = "Viewing a TV Show"), (data.state = show);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.includes("/actor/")) {
        var actor = document.querySelector("div#actor-details div.infos h1")
            .textContent;
        (data.details = "Viewing an Actor Profile"), (data.state = actor);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/about")) {
        (data.details = "Viewing the About Page"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/privacy")) {
        (data.details = "Viewing the Privacy Policy"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/terms")) {
        (data.details = "Viewing the Terms of Service"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/special-thanks")) {
        (data.details = "Viewing the Credits"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/podcasts")) {
        (data.details = "Viewing the Podcasts Page"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.includes("/article")) {
        if (document.location.pathname.endsWith("/articles")) {
            (data.details = "Browsing Articles"),
                (data.startTimestamp = browsingStamp);
            presence.setActivity(data);
        }
        else {
            var article = document.querySelector("div.article h1.page-header")
                .textContent;
            (data.details = "Viewing an Article"), (data.state = article);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsYUFBYTtLQUM3QixDQUFDO0lBRUYsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxLQUFLO1FBQ25DLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEtBQUs7UUFDbkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksS0FBSztRQUNuQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxLQUFLO1FBQ25DLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVE7UUFDdEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUTtRQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxLQUFLLEVBQ25DO1FBQ0EsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQzVFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzRCxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMs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