var presence = new Presence({
    clientId: "644400074008297512"
});
var currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/"), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
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
function resetData() {
    currentURL = new URL(document.location.href);
    currentPath = currentURL.pathname.slice(1).split("/");
    presenceData = {
        details: "Viewing an unsupported page",
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
}
function getURLParam(urlParam) {
    return currentURL.searchParams.get(urlParam);
}
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
(() => {
    if (currentURL.host === "www.fandom.com") {
        if (currentPath[0] === "") {
            presenceData.details = "Index";
        }
        else if (currentPath[0] === "signin") {
            presenceData.details = "Signing in";
        }
        else if (currentPath[0] === "register") {
            presenceData.details = "Registering an account";
        }
        else if (currentPath[0] === "articles") {
            presenceData.details = "Reading an article";
            presenceData.state = document.querySelector(".article-header__title").textContent;
        }
        else if (currentPath[0] === "topics") {
            presenceData.details = "Viewing a topic";
            presenceData.state = document.querySelector(".topic-header__title").firstElementChild.innerHTML;
        }
        else if (currentPath[0] === "video") {
            updateCallback.function = () => {
                presenceData.details = "Watching a video";
                presenceData.state = document.querySelector(".video-page-featured-player__title").textContent;
                try {
                    if (document
                        .querySelector(".jw-icon-playback")
                        .getAttribute("aria-label") === "Pause") {
                        const video = document.querySelector(".jw-video");
                        const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                        presenceData.startTimestamp = timestamps[0];
                        presenceData.endTimestamp = timestamps[1];
                    }
                    else {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                    }
                }
                catch (e) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            };
        }
        else if (currentPath[0] === "curated") {
            presenceData.details = "Viewing a curation";
            presenceData.state = document.querySelector(".card__title").textContent;
        }
        else if (currentPath[0] === "u") {
            presenceData.details = "Viewing a profile page";
            presenceData.state = `${document.querySelector(".profile-info-card__name").textContent} (${document.querySelector(".profile-info-card__username").textContent})`;
        }
        else {
            presenceData.details = "Viewing a page";
            if (currentPath[0] === "explore")
                presenceData.state = "Explore";
            else if (currentPath[0] === "about")
                presenceData.state = "About";
            else if (currentPath[0] === "carriers")
                presenceData.state = "Carriers";
            else if (currentPath[0] === "terms-of-use")
                presenceData.state = "Terms of Use";
            else if (currentPath[0] === "privacy-policy")
                presenceData.state = "Privacy Policy";
            else if (currentPath[0] === "mediakit")
                presenceData.state = "Media Kit";
            else if (currentPath[0] === "local-sitemap")
                presenceData.state = "Local Sitemap";
        }
    }
    else if (currentPath.includes("wiki")) {
        let title, sitename;
        const actionResult = getURLParam("action") || getURLParam("veaction");
        const titleFromURL = () => {
            let raw;
            if (currentPath[0] === "wiki") {
                raw = currentURL.pathname.slice(6);
            }
            else {
                raw = currentPath[2];
            }
            if (raw.includes("_"))
                return raw.replace(/_/g, " ");
            else
                return raw;
        };
        try {
            title = document.querySelector(".page-header__title").innerHTML;
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
            "Category talk": "Viewing a category talk page",
            Blog: "Viewing a blog",
            "Message Wall": "Viewing a message wall",
            Thread: "Viewing a forum thread",
            Board: "Viewing a forum board",
            Topic: "Viewing a forum topic"
        };
        if (title === "Home") {
            sitename = document.querySelector("meta[property='og:title']").content;
            presenceData.state = "Home";
            delete presenceData.details;
        }
        else if (actionResult == "history") {
            presenceData.details = "Viewing revision history";
            presenceData.state = titleFromURL();
        }
        else if (actionResult == "edit") {
            presenceData.details = "Editing a wiki page";
            presenceData.state = titleFromURL();
        }
        else if (currentURL.pathname.includes("User_blog:")) {
            if (title) {
                presenceData.details = "Reading a user blog post";
                presenceData.state =
                    title +
                        " by " +
                        document.querySelector(".page-header__blog-post-details")
                            .firstElementChild.textContent;
            }
            else {
                presenceData.details = "Viewing a user blog";
                presenceData.state = titleFromURL();
            }
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
    else if (currentPath[0] === "f") {
        const sitename = document
            .querySelector("meta[property='og:title']")
            .content.substring(25)
            .replace(" | Fandom", "");
        updateCallback.function = () => {
            if (!currentPath[1]) {
                presenceData.details = "Viewing the discussion page";
                presenceData.state = sitename;
            }
            else if (currentPath[1] === "p") {
                presenceData.details = "Reading an discussion post";
                presenceData.state = `${document.querySelector(".post__title").textContent} | ${sitename}`;
            }
            else if (currentPath[1] === "u") {
                presenceData.details = "Viewing a discussion user page";
                presenceData.state = `${document.querySelector(".user-overview__username").textContent} | ${sitename}`;
            }
        };
    }
})();
if (updateCallback.present) {
    presence.on("UpdateData", async () => {
        resetData();
        updateCallback.function();
        presence.setActivity(presenceData);
    });
}
else {
    presence.on("UpdateData", async () => {
        presence.setActivity(presenceData);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQzlDLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUMzQixPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxhQUFhO0NBQzlCLEVBQ0QsY0FBYyxHQUFHO0lBQ2YsU0FBUyxFQUFFLElBQWdCO0lBQzNCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQztBQUtKLFNBQVMsU0FBUztJQUNoQixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELFlBQVks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