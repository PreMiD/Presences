var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "644400074008297512",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
    details: 'In construction',
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
    if (href.host === "www.fandom.com") {
        if (href.pathname === "/") {
            presenceData.state = "Index";
            delete presenceData.details;
        }
        else if (href.pathname.includes("/signin")) {
            presenceData.details = "Signing in";
        }
        else if (href.pathname.includes("/register")) {
            presenceData.details = "Registering an account";
            delete presenceData.details;
        }
        else if (href.pathname.includes("/articles/")) {
            presenceData.details = "Reading an article";
            presenceData.state = document.querySelector(".article-header__title").textContent;
        }
        else if (href.pathname.includes("/topics/")) {
            presenceData.details = "Viewing a topic";
            presenceData.state = document.querySelector(".topic-header__title").firstElementChild.innerHTML;
        }
        else if (href.pathname.includes("/video")) {
            updateCallback.function = () => {
                resetData();
                presenceData.details = "Watching a video";
                presenceData.state = document.querySelector(".video-page-featured-player__title").textContent;
                try {
                    if (document.querySelector(".jw-icon-playback").getAttribute("aria-label") === "Pause") {
                        let video = document.querySelector(".jw-video");
                        let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
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
                console.log(presenceData);
            };
        }
        else if (href.pathname.includes("/curated/")) {
            presenceData.details = "Viewing a curation";
            presenceData.state = document.querySelector(".card__title").textContent;
        }
        else {
            presenceData.details = "Viewing a page";
            if (href.pathname.includes("/explore"))
                presenceData.state = "Explore";
            else if (href.pathname.includes("/about"))
                presenceData.state = "About";
            else if (href.pathname.includes("/carriers"))
                presenceData.state = "Carriers";
            else if (href.pathname.includes("/terms-of-use"))
                presenceData.state = "Terms of Use";
            else if (href.pathname.includes("/privacy-policy"))
                presenceData.state = "Privacy Policy";
            else if (href.pathname.includes("/mediakit"))
                presenceData.state = "Media Kit";
            else if (href.pathname.includes("/local-sitemap"))
                presenceData.state = "Local Sitemap";
        }
    }
    else if (href.pathname.includes("/wiki/")) {
        let title, sitename, actionResult = href.searchParams.get("action") || href.searchParams.get("veaction"), titleFromURL = () => {
            let raw, lang;
            if (href.pathname.startsWith("/wiki/")) {
                raw = href.pathname.slice(6);
            }
            else {
                lang = href.pathname.split("/")[0];
                raw = href.pathname.slice(7 + lang.length);
            }
            if (raw.includes("_"))
                return raw.replace(/_/g, " ");
            else
                return raw;
        };
        try {
            title = document.querySelector('.page-header__title').innerHTML;
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
            "Media": "Viewing a media",
            "Special": "Viewing a special page",
            "Talk": "Viewing a talk page",
            "User": "Viewing a user page",
            "User talk": "Viewing a user talk page",
            [sitename]: "Viewing a project page",
            [sitename + " talk"]: "Viewing a project talk page",
            "File": "Viewing a file",
            "File talk": "Viewing a file talk page",
            "MediaWiki": "Viewing a MediaWiki page",
            "MediaWiki talk": "Viewing a MediaWiki talk page",
            "Template": "Viewing a template",
            "Template talk": "Viewing a template talk",
            "Help": "Viewing a help page",
            "Help talk": "Viewing a help talk page",
            "Category": "Viewing a category",
            "Category talk": "Viewing a category talk page",
            "Blog": "Viewing a blog",
            "Message Wall": "Viewing a message wall",
            "Thread": "Viewing a forum thread",
            "Board": "Viewing a forum board",
            "Topic": "Viewing a forum topic",
        };
        if (title === "Home") {
            sitename = document.querySelector("meta[property='og:title']").content;
            presenceData.state = "Home";
            delete presenceData.details;
        }
        else if (actionResult == "history" && titleFromURL) {
            presenceData.details = "Viewing revision history";
            presenceData.state = titleFromURL();
        }
        else if (actionResult == "edit" && titleFromURL) {
            if (href.searchParams.has("action"))
                title = document.querySelector("#EditPageHeader").children[2].textContent;
            presenceData.details = "Editing a wiki page";
            presenceData.state = titleFromURL();
        }
        else if (href.pathname.includes("User_blog:")) {
            if (title) {
                presenceData.details = "Reading a user blog post";
                presenceData.state = title + " by " + document.querySelector(".page-header__blog-post-details").firstElementChild.textContent;
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
    else if (href.pathname === "/f" || href.pathname.includes("/f/")) {
        updateCallback.function = () => {
            var presenceData = {
                details: 'In construction',
                state: null,
                largeImageKey: "lg",
                startTimestamp: browsingStamp,
            };
            href = new URL(document.location.href);
            if (href.pathname === "/f") {
                presenceData.details = "Viewing the discussion page";
            }
            else if (href.pathname.includes("/p/")) {
                presenceData.details = "Reading an discussion post";
                presenceData.state = document.querySelector(".post__title").textContent;
            }
            else if (href.pathname.includes("/u/")) {
                presenceData.details = "Viewing a discussion user page";
                presenceData.state = document.querySelector(".user-overview__username").textContent;
            }
            cleanData();
        };
    }
    cleanData();
})();
if (updateCallback.present) {
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        updateCallback.function();
        presence.setActivity(presenceData);
    }));
}
else {
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        presence.setActivity(presenceData);
    }));
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function resetData() {
    presenceData = {
        details: 'In construction',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFXLGlCQUFpQjtJQUNuQyxLQUFLLEVBQVcsSUFBSTtJQUNwQixhQUFhLEVBQVcsSUFBSTtJQUM1QixjQUFjLEVBQVcsYUFBYTtJQUN0QyxZQUFZLEVBQVcsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTtJQUMvQixDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBRUwsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBU25DLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7WUFDMUIsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7WUFDNUIsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFBO1NBQzNCO2FBQU0sSUFBSSxJQUFJ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