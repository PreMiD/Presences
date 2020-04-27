var presence = new Presence({
    clientId: "632110854543769601"
});
const timeElapsed = Math.floor(Date.now() / 1000);
let threadName, authorName, newsAuthor, profileName, reviewAuthor, reviewTitle, blogAuthor, blogTitle, gName, pName, cName;
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/threads")) {
        threadName = document.querySelector("a#threadTitle");
        authorName = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
        newsAuthor = document.querySelector("div.news-author > a.username > b");
        if (authorName == null) {
            const presenceData = {
                details: "Reading a news post by " + newsAuthor.innerText,
                state: threadName.innerText,
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            const presenceData = {
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
            const presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            const presenceData = {
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
            const presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else if (pName.innerText == "Game Database") {
            const presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            const presenceData = {
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
            const presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            const presenceData = {
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
        const presenceData = {
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
            const presenceData = {
                details: "Browsing...",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            const presenceData = {
                details: "Looking at " + profileName.innerText + "'s profile",
                largeImageKey: "tempy",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/chat")) {
        const presenceData = {
            details: "Chatting in IRC",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/shoutbox")) {
        const presenceData = {
            details: "Chatting in the Shoutbox",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/search")) {
        const presenceData = {
            details: "Searching...",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/review")) {
        reviewAuthor = document.querySelector("span.review_author > a.username");
        reviewTitle = document.querySelector("h1#review_title > a");
        const presenceData = {
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
        const presenceData = {
            details: "Reading a blog post by " + blogAuthor.innerText,
            state: blogTitle.innerText,
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            details: "Browsing...",
            largeImageKey: "tempy",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksVUFBVSxFQUNaLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssQ0FBQztBQUVSLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3JELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNqQyxrREFBa0QsQ0FDbkQsQ0FBQztRQUNGLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU0sWUFBWSxHQUFpQjtnQkFDakMsT0FBTyxFQUFFLHlCQUF5QixHQUFHLFVBQVUsQ0FBQyxTQUFTO2dCQUN6RCxLQUFLLEVBQUUsVUFBVSxDQUFDLFNBQVM7Z0JBQzNCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixjQUFjLEVBQUUsV0FBVzthQUM1QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxZQUFZ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