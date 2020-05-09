var presence = new Presence({
    clientId: "633805202868273153"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "g2alogo"
    };
    if (document.location.hostname == "www.g2a.com") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/wishlist")) {
            presenceData.details = "Viewing their wishlist";
        }
        else if (document.location.pathname.includes("/cart")) {
            presenceData.details = "Viewing their cart";
        }
        else if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching for:";
            presenceData.state = title.innerText
                .replace('" - G2A.COM', "")
                .replace('Search results - "', "");
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/category")) {
            presenceData.details = "Viewing category:";
            title = document.querySelector("head > title");
            presenceData.state = title.innerText.replace(" - G2A.COM", "");
        }
        else if (document.querySelector("#app > div > div.content > div > article > header > div > div > h1 > span") !== null) {
            presenceData.details = "Viewing item:";
            title = document.querySelector("#app > div > div.content > div > article > header > div > div > h1 > span");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/user")) {
            presenceData.details = "Viewing user:";
            user = document.querySelector("#app > div > div.content > div > div > div > section > div.user-info > button > strong");
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/goldmine")) {
            presenceData.details = "Using the goldmine";
        }
        else if (document.location.pathname.includes("/news/")) {
            presenceData.startTimestamp = browsingStamp;
            title = document.querySelector("body > div.single-article.single-article--feature.default-template > div.review-top > div.review-top__wrapper > div > header > h1");
            if (title == null) {
                presenceData.details = "Browsing news section";
            }
            else {
                presenceData.details = "News - Reading:";
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "reading";
            }
        }
    }
    else if (document.location.hostname == "id.g2a.com") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing their account details";
    }
    else if (document.location.hostname == "dashboard.g2a.com") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing their dashboard";
    }
    else if (document.location.hostname == "pay.g2a.com") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Using G2A Pay";
    }
    else if (document.location.hostname == "plus.g2a.com") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "G2A Plus - Viewing:";
        title = document.querySelector("head > title");
        presenceData.state = title.innerText.replace(" - G2A Plus", "");
    }
    else if (document.location.hostname == "loot.g2a.com") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname == "/") {
            presenceData.details = "Browsing G2A Loot";
        }
        else {
            presenceData.details = "G2A Loot - Viewing:";
            title = document.querySelector("head > title");
            presenceData.state = title.innerText.replace(" - G2A Loot", "");
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFNBQVM7S0FDekIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFO1FBQy9DLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7U0FDakQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTO2lCQUNqQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztpQkFDMUIsT0FBTyxD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