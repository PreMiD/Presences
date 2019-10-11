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
    mediaKeys: false
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
if (document.location.pathname.startsWith("/questions")) {
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