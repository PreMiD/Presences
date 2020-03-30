var presence = new Presence({
    clientId: "652880245371699222"
});
var browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
    details: "In construction",
    state: null,
    largeImageKey: "lg",
    startTimestamp: browsingStamp,
    endTimestamp: null
}, updateCallback = {
    _function: null,
    get function() {
        return this._function;
    },
    set function(parameter) {
        this._function = parameter;
    },
    get present() {
        return this._function !== null;
    }
};
(() => {
    if (href.hostname === "www.gamepedia.com") {
        if (href.pathname === "/") {
            presenceData.state = "Index";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (href.pathname.includes("/twitch-login")) {
            presenceData.details = "Signing in";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.state;
        }
        else if (href.pathname.includes("/twitch-signup")) {
            presenceData.details = "Registering an account";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (href.pathname.includes("/news/")) {
            presenceData.details = "Reading an news article";
            presenceData.state = document.querySelector(".p-article-title").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (href.pathname.includes("/blog/")) {
            presenceData.details = "Reading a blog article";
            presenceData.state = document.querySelector(".p-article-title").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (href.pathname.includes("/members/")) {
            presenceData.details = "Reading a blog article";
            presenceData.state = document.querySelector(".username").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Viewing a page";
            if (href.pathname.includes("/PRO"))
                presenceData.state = "Gamepedia PRO";
            else
                presenceData.state = document.title.split(" - ")[0];
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else {
        let title, sitename, actionResult = href.searchParams.get("action"), titleFromURL = () => {
            let raw;
            if (href.pathname.startsWith("/index.php"))
                raw = href.searchParams.get("title");
            else
                raw = href.pathname.slice(1);
            if (raw.includes("_"))
                return raw.replace(/_/g, " ");
            else
                return raw;
        };
        try {
            title = document.querySelector("meta[property='og:title']").content;
        }
        catch (e) {
            title = titleFromURL();
        }
        try {
            sitename = document.querySelector("meta[property='og:site_name']")
                .content;
        }
        catch (e) {
            sitename = null;
        }
        let namespaceDetails = {
            Media: "Viewing a media",
            Special: "Viewing a special page",
            Talk: "Viewing a talk page",
            User: "Viewing a user page",
            "User talk": "Viewing a user talk page",
            [sitename]: "Viewing a project page",
            [sitename + " talk"]: "Viewing a project talk page",
            File: "Viewing a file",
            "File talk": "Viewing a file talk page",
            MediaWiki: "Viewing a MediaWiki page",
            "MediaWiki talk": "Viewing a MediaWiki talk page",
            Template: "Viewing a template",
            "Template talk": "Viewing a template talk",
            Help: "Viewing a help page",
            "Help talk": "Viewing a help talk page",
            Category: "Viewing a category",
            "Category talk": "Viewing a category talk page"
        };
        if (title === sitename) {
            presenceData.state = "Home";
            delete presenceData.details;
        }
        else if (actionResult == "history" && titleFromURL) {
            presenceData.details = "Viewing revision history";
            presenceData.state = title;
        }
        else if (actionResult == "edit" && titleFromURL) {
            presenceData.details = "Editing a wiki page";
            presenceData.state = title;
        }
        else if (title.startsWith("UserProfile:")) {
            presenceData.details = "Viewing a user profile";
            presenceData.state = document.querySelector(".mw-headline").textContent;
        }
        else {
            if (namespaceDetails[title.split(":")[0]])
                presenceData.details = namespaceDetails[title.split(":")[0]];
            else
                presenceData.details = "Reading a wiki page";
            presenceData.state = title;
        }
        presenceData.startTimestamp = browsingStamp;
        presenceData.state += " | " + sitename;
    }
    cleanData();
})();
if (updateCallback.present) {
    presence.on("UpdateData", async () => {
        updateCallback.function();
        presence.setActivity(presenceData);
    });
}
else {
    presence.on("UpdateData", async () => {
        presence.setActivity(presenceData);
    });
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function resetData() {
    presenceData = {
        details: "In construction",
        state: null,
        largeImageKey: "lg",
        startTimestamp: browsingStamp,
        endTimestamp: null
    };
}
function cleanData() {
    if (presenceData.state === null)
        delete presenceData.state;
    if (presenceData.endTimestamp === null)
        delete presenceData.endTimestamp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMxQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLG1CQUFtQixFQUFFO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7WUFDMUIsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDN0IsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQzVCO2FBQU0sSUFB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