var presence = new Presence({
    clientId: "636622538356686871"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "rlg"
    };
    title = document.querySelector("#offer-balance");
    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the home page";
    }
    else if (document.location.pathname.includes("/latestnews")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing through";
        presenceData.state = "the latest news";
    }
    else if (document.location.pathname.includes("/news/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reading article:";
        title = document.querySelector("body > main > section > div > div > div > div.col-2-3 > h1");
        presenceData.state = title.innerText;
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/livefeed")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing through";
        presenceData.state = "the live feed";
    }
    else if (document.location.pathname.includes("/training/")) {
        if (document.location.pathname.includes("/sequence/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing training sequence:";
            title = document.querySelector("#rlg-training-page > div.row > div.col-3-3 > h1");
            presenceData.state = title.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing training maps";
        }
    }
    else if (document.location.pathname.includes("/items")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing through";
        presenceData.state = "the item database";
    }
    else if (document.location.pathname.includes("/achievements")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing through";
        presenceData.state = "the achievements";
    }
    else if (document.location.pathname.includes("/apply")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing through";
        presenceData.state = "the applications";
    }
    else if (document.location.pathname.includes("/faq")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing through";
        presenceData.state = "the FAQ";
    }
    else if (document.location.pathname.includes("/proleague")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the proleague";
    }
    else if (document.location.pathname.includes("/rocketroyale")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the rocketroyale";
    }
    else if (document.location.pathname.includes("/about")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing about the site";
    }
    else if (document.location.pathname.includes("/contact")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing contact details";
    }
    else if (document.location.pathname.includes("/trading")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing trading offers";
    }
    else if (document.location.pathname.includes("/trade/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing trade of user:";
        title = document.querySelector("body > main > div > div > div > div.col-3-3.rlg-trade-page > div.rlg-trade-display-container.is--user > div.rlg-trade-display-header > a > div > div.rlg-trade-platform-name > span:nth-child(1)");
        presenceData.state = title.innerText;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBVSxDQUFDO0FBRWYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxLQUFLO0tBQ3JCLENBQUM7SUFFRixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRWpELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7S0FDaEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUM3RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLEtBQUssR0FB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