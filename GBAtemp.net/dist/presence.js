var presence = new Presence({
    clientId: "632110854543769601"
});
let timeElapsed = Math.floor(Date.now() / 1000), threadName, authorName, newsAuthor, profileName, reviewAuthor, reviewTitle, blogAuthor, blogTitle, gName, pName, cName;
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/threads")) {
        threadName = document.querySelector("a#threadTitle");
        authorName = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
        newsAuthor = document.querySelector("div.news-author > a.username > b");
        if (authorName == null) {
            let presenceData = {
                details: "Reading a news post by " + newsAuthor.innerText,
                state: threadName.innerText,
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Reading a thread by " + authorName.innerText,
                state: threadName.innerText,
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/game")) {
        gName = document.querySelector("h1.dynamicTitle");
        if (gName.innerText == "GBAtemp Game Center Home") {
            let presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Reading about a game",
                state: gName.innerText,
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/platform")) {
        pName = document.querySelector("h1.dynamicTitle");
        if (pName.innerText == "Game Center Platform List") {
            let presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else if (pName.innerText == "Game Database") {
            let presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Reading about a platform",
                state: pName.innerText,
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/company")) {
        cName = document.querySelector("h1.dynamicTitle");
        if (cName.innerText == "List of video game companies") {
            let presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Reading about a company",
                state: cName.innerText,
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/questions")) {
        threadName = document.querySelector("h1.blueHeader");
        let presenceData = {
            details: "Reading a question",
            state: threadName.innerText,
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/members")) {
        profileName = document.querySelector("div.mainText.secondaryContent > h1.username");
        if (profileName == null) {
            let presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking at " + profileName.innerText + "'s profile",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/chat")) {
        let presenceData = {
            details: "Chatting in IRC",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/shoutbox")) {
        let presenceData = {
            details: "Chatting in the Shoutbox",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/search")) {
        let presenceData = {
            details: "Searching...",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/review")) {
        reviewAuthor = document.querySelector("span.review_author > a.username");
        reviewTitle = document.querySelector("h1#review_title > a");
        let presenceData = {
            details: "Reading a review by " + reviewAuthor.innerText,
            state: reviewTitle.innerText,
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/entry")) {
        blogAuthor = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
        blogTitle = document.querySelector("a.newsTitle");
        let presenceData = {
            details: "Reading a blog post by " + blogAuthor.innerText,
            state: blogTitle.innerText,
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            details: "Browsing...",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM3QyxVQUFVLEVBQ1YsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxDQUFDO0FBRVIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLGtEQUFrRCxDQUNuRCxDQUFDO1FBQ0YsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN4RSxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUseUJBQXlCLEdBQUcsVUFBVSxDQUFDLFNBQVM7Z0JBQ3pELEtBQUssRUFBRSxVQUFVLENBQUMsU0FBUztnQkFDM0IsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGNBQWMsRUFBRSxXQUFXO2FBQzVCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxJQUFJLFlBQVksR0FBaUI7Z0JB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