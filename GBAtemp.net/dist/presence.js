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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM5QyxVQUFVLEVBQ1YsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxDQUFDO0FBRVAsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdEQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLGtEQUFrRCxDQUNsRCxDQUFDO1FBQ0YsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN4RSxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxPQUFPLEVBQUUseUJBQXlCLEdBQUcsVUFBVSxDQUFDLFNBQVM7Z0JBQ3pELEtBQUssRUFBRSxVQUFVLENBQUMsU0FBUztnQkFDM0IsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGNBQWMsRUFBRSxXQUFXO2FBQzNCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTixJQUFJLFlBQVksR0FBaUI7Z0JB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