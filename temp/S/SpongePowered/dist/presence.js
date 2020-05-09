var presence = new Presence({
    clientId: "626496186496450570"
});
var user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "sponge"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "forums.spongepowered.org") {
        if (document.location.pathname.includes("/t/")) {
            title = document.querySelector("#topic-title > div > div > h1 > a.fancy-title");
            if (title == null) {
                title = document.querySelector("#ember6 > header > div > div > div.extra-info-wrapper > div > div > h1 > a > span");
            }
            presenceData.details = "Forums, viewing thread:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/c/")) {
            title = document.querySelector("head > title");
            presenceData.details = "Forums, viewing category:";
            presenceData.state = title.innerText
                .split("topics")[0]
                .split("Latest")[1];
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#ember14 > div.search-advanced > div.search-info > div.result-count > span.term");
            if (search !== null) {
                presenceData.details = "Forums, Searching for:";
                presenceData.state = search.innerText;
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Going to search";
                presenceData.state = "something up";
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/u/")) {
            user = document.querySelector("#main-outlet > div:nth-child(3) > section > section > div.details > div.primary > div.primary-textual > h1");
            presenceData.details = "Forums, viewing user:";
            presenceData.state = user.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/accounts/")) {
            presenceData.details = "Forums, account settings";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Forums, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "docs.spongepowered.org") {
        title = document.querySelector("body > div.wy-grid-for-nav > section > div > div > div.document > div > div > h1");
        if (title != null) {
            presenceData.details = "Docs, reading:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Docs, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "jd.spongepowered.org") {
        title = document.querySelector("head > title");
        title = title.innerText.split(" (")[0];
        presenceData.details = "Java Docs, viewing:";
        if (title.length > 128) {
            presenceData.state = title.substring(0, 125) + "...";
        }
        else {
            presenceData.state = title;
        }
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "www.spongepowered.org") {
        if (document.location.pathname.includes("/downloads/")) {
            presenceData.details = "Viewing downloads";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/chat")) {
            presenceData.details = "Viewing chat";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/sponsors")) {
            presenceData.details = "Viewing sponsors";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "ore.spongepowered.org") {
        if (document.URL.includes("?categories=")) {
            title = document.querySelector("body > div > div > div.row.project-content > div.col-md-3 > div:nth-child(3) > table > tbody > tr.selected > td:nth-child(2) > strong");
            presenceData.details = "Ore, viewing category:";
            presenceData.state = title.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("body > div > div > div.project-header-container") !== null) {
            title = document.querySelector("body > div > div > div.project-header-container > div:nth-child(1) > div > div > h1 > strong > a");
            presenceData.details = "Ore, Viewing resource:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("body > div > div > div.row.user-header > div > span > span > h1") !== null) {
            user = document.querySelector("body > div > div > div.row.user-header > div > span > span > h1");
            presenceData.details = "Ore, Viewing author:";
            presenceData.state = user.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("?q=")) {
            search = document.querySelector("body > div > div > div.row.project-content > div.col-md-9 > li > span.pull-left > i");
            presenceData.details = "Ore, searching for:";
            presenceData.state = search.innerText;
            presenceData.smallImageKey = "search";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Ore, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLE1BQVcsRUFBRSxLQUFVLENBQUM7QUFFdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxRQUFRO0tBQ3hCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLDBCQUEwQixFQUFFO1FBQzVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QiwrQ0FBK0MsQ0FDaEQsQ0FBQztZQUNGLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDakIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLG1GQUFtRixDQUNwRixDQUFDO2FBQ0g7WUFFRCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1lBQ2pELElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNoQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDaEU7aUJBQU07Z0JBQ0ws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