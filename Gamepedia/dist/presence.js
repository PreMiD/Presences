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
function cleanData() {
    if (presenceData.state === null)
        delete presenceData.state;
    if (presenceData.endTimestamp === null)
        delete presenceData.endTimestamp;
}
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
        let title, sitename;
        const actionResult = href.searchParams.get("action"), titleFromURL = () => {
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
        const namespaceDetails = {
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
        else if (actionResult == "history") {
            presenceData.details = "Viewing revision history";
            presenceData.state = title;
        }
        else if (actionResult == "edit") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2IsT0FBTyxFQUFFLGlCQUEyQjtJQUNwQyxLQUFLLEVBQUUsSUFBYztJQUNyQixhQUFhLEVBQUUsSUFBYztJQUM3QixjQUFjLEVBQUUsYUFBdUI7SUFDdkMsWUFBWSxFQUFFLElBQWM7Q0FDN0IsRUFDRCxjQUFjLEdBQUc7SUFDZixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQztBQUtKLFNBQVMsU0FBUztJQUNoQixJQUFJLFlBQVksQ0FBQyxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztJQUMzRCxJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssSUFBSTtRQUFFLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQztBQUMzRSxDQUFDO0FBRUQsQ0FBQyxHQUFTLEVBQUU7SUFDVixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssbUJBQW1CLEVBQUU7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