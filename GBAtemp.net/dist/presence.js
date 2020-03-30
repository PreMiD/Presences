var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "632110854543769601",
    
});
timeElapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
if (document.location.pathname.startsWith("/game")) {
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
    ;
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
;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBRUgsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBRTFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3BELFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtEQUFrRCxDQUFDLENBQUE7UUFDdkYsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtRQUNyRSxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLFlBQVksR0FBaUI7Z0JBQy9CLE9BQU8sRUFBRSx5QkFBeUIsR0FBRyxVQUFVLENBQUMsU0FBUztnQkFDekQsS0FBSyxFQUFFLFVBQVUsQ0FBQyxTQUFTO2dCQUMzQixhQUFhLEVBQUUsT0FBTztnQkFDdEIsY0FBYyxFQUFFLFdBQVc7YUFDNUIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsc0JBQXNCLEdBQUcsVUFBVSxD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