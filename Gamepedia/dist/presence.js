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
            sitename = document.querySelector("meta[property='og:site_name']").content;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2IsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNmLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDO0lBQ2pDLENBQUM7Q0FDRixDQUFDO0FBRUosQ0FBQyxHQUFHLEVBQUU7SUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssbUJBQW1CLEVBQUU7UUFDekMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtZQUN6QixZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUM3QixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUM7U0FDN0I7YUFBTSxJQUFJ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