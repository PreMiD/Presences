var presence = new Presence({
    clientId: "702668334990098523"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
});
const getElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        return element.textContent.replace(/^\s+|\s+$/g, "");
    }
    else
        return "Loading...";
};
const videoStatus = (video) => {
    return video.paused ? "pause" : "play";
};
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var oldUrl, elapsed, searchText = "", searchElapsed = 0;
const statics = {
    "/": {
        details: "Browsing"
    },
    "/login/": {
        details: "Logging In"
    },
    "/password/forgot/": {
        details: "Forgot Password"
    },
    "/pages/kodi_plugin/": {
        details: "Viewing",
        state: "Kodi Plugin"
    },
    "/pages/contact/": {
        details: "Viewing",
        state: "Contact"
    },
    "/pages/faq/": {
        details: "Viewing",
        state: "FAQ"
    },
    "/pages/terms/": {
        details: "Viewing",
        state: "Terms of Service"
    },
    "/pages/privacy/": {
        details: "Viewing",
        state: "Privacy Info"
    },
    "/pages/cookies/": {
        details: "Viewing",
        state: "Cookie Info"
    },
    "/pages/social_terms/": {
        details: "Viewing",
        state: "Social Terms"
    },
    "/account/gifts/": {
        details: "Redeeming",
        state: "Gift-Code"
    },
    "/account/favorites/": {
        details: "Viewing",
        state: "Favorites"
    },
    "/account/playlist/wl/": {
        details: "Viewing",
        state: "Watch Later"
    },
    "/account/pin/": {
        details: "Logging In",
        state: "Pin"
    },
    "/premium/primary/": {
        details: "Buying",
        state: "Premium"
    },
    "/movies/": {
        details: "Browsing",
        state: "Movies"
    },
    "/shows/": {
        details: "Browsing",
        state: "TV Shows"
    },
    "/latest/episodes/": {
        details: "Browsing",
        state: "Latest Episodes"
    },
    "/schedule/": {
        details: "Viewing",
        state: "Schedule"
    },
    "/sets/children/": {
        details: "Viewing Set",
        state: "Children"
    },
    "/sets/comedies/": {
        details: "Viewing Set",
        state: "Comedies"
    },
    "/sets/action/": {
        details: "Viewing Set",
        state: "Action"
    },
    "/sets/dramas/": {
        details: "Viewing Set",
        state: "Dramas"
    },
    "/sets/romance/": {
        details: "Viewing Set",
        state: "Romance"
    },
    "/sets/sci-fi/": {
        details: "Viewing Set",
        state: "Science Fiction"
    },
    "/sets/horror/": {
        details: "Viewing Set",
        state: "Horror"
    }
};
presence.on("UpdateData", async () => {
    const path = location.pathname.replace(/\/?$/, "/");
    const video = document.querySelector("video");
    const search = document.querySelector("input");
    const showSearchInfo = await presence.getSetting("search");
    const showBrowseInfo = await presence.getSetting("browse");
    const showVideoInfo = await presence.getSetting("video");
    var data = {
        details: undefined,
        state: undefined,
        largeImageKey: "thesite",
        smallImageKey: undefined,
        smallImageText: undefined,
        startTimestamp: undefined,
        endTimestamp: undefined
    };
    if (oldUrl !== path) {
        oldUrl = path;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    const parseVideo = async () => {
        const status = videoStatus(video);
        data.smallImageKey = status;
        data.smallImageText = (await strings)[status];
        if (status === "play") {
            const timestamps = getTimestamps(video.currentTime, video.duration);
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        }
    };
    if (showBrowseInfo) {
        if (path.includes("/person")) {
            data.details = "Viewing Person";
            data.state = getElement(".person-page-block h2");
        }
        if (path.includes("/account")) {
            data.details = "Viewing";
            data.state = `Account (${getElement(".account-nav > .active")})`;
        }
        if (path.includes("/request")) {
            data.details = "Viewing";
            data.state = `Requests (${getElement(".nav-tabs > .active")})`;
        }
        if (path.includes("/collections")) {
            var title = getElement(".page-videolist > h1");
            title = title === "Loading..." ? undefined : title;
            data.details = "Browsing";
            data.state = "Collections";
            if (title) {
                data.details = "Browsing Collection";
                data.state = title;
            }
        }
        if (path in statics) {
            data = { ...data, ...statics[path] };
        }
    }
    if (showVideoInfo) {
        const wl = path.includes("/list");
        const wl_movie = wl && getElement(".media-body .genre");
        const wl_show = wl && !wl_movie;
        if (wl_movie || path.includes("/movies")) {
            const menu = document.querySelector(".mv-movie-info");
            const title = getElement(".mv-movie-title > span");
            if (menu) {
                if (menu.style.display === "none") {
                    await parseVideo();
                    data.details = "Watching Movie";
                    data.state = title;
                }
                else {
                    data.details = "Viewing Movie Details";
                    data.state = title;
                }
            }
        }
        if (path.includes("/shows")) {
            const menu = document.querySelector(".mv-movie-info");
            const regex = getElement(".mv-movie-title > span > span > strong").match(/S(?<season>\d{1,4})E(?<episode>\d{1,4})/);
            const setting = await presence.getSetting("show-format");
            var title = getElement(".mv-movie-title > span > a");
            if (title !== "Loading...") {
                const season = regex.groups.season;
                const episode = regex.groups.episode;
                const state = setting
                    .replace("%show%", title)
                    .replace("%season%", season)
                    .replace("%episode%", episode);
                if (menu) {
                    if (menu.style.display === "none") {
                        await parseVideo();
                        data.details = "Watching TV Show";
                        data.state = state;
                    }
                    else {
                        data.details = "Viewing TV Show Details";
                        data.state = state;
                    }
                }
            }
            else {
                data.details = "Viewing TV Show Details";
                data.state = getElement(".mv-movie-title > span");
            }
        }
        if (wl_show) {
            const menu = document.querySelector(".mv-movie-info");
            const regex = getElement(".full-title > .content > .seq > em").match(/S(?<season>\d{1,4})E(?<episode>\d{1,4})/);
            const setting = await presence.getSetting("show-format");
            var title = getElement(".full-title > .content > .title");
            if (title !== "Loading...") {
                const season = regex.groups.season;
                const episode = regex.groups.episode;
                const state = setting
                    .replace("%show%", title)
                    .replace("%season%", season)
                    .replace("%episode%", episode);
                if (menu) {
                    if (menu.style.display === "none") {
                        await parseVideo();
                        data.details = "Watching TV Show";
                        data.state = state;
                    }
                    else {
                        data.details = "Viewing TV Show Details";
                        data.state = state;
                    }
                }
            }
            else {
                data.details = "Viewing TV Show Details";
                data.state = getElement(".mv-movie-title > span");
            }
        }
    }
    if (showSearchInfo) {
        if (search.value != searchText) {
            searchText = search.value;
            searchElapsed = Date.now();
        }
        if ((Date.now() - searchElapsed <= 5000 || path.includes("/search")) &&
            searchText.length > 0) {
            data.details = "Searching";
            data.state = searchText;
            data.startTimestamp = elapsed ? elapsed : undefined;
            data.endTimestamp = undefined;
        }
    }
    if (data.details !== undefined) {
        if (data.details.match("(Browsing|Viewing)")) {
            data.smallImageKey = "reading";
            data.smallImageText = (await strings).browse;
        }
        if (data.details.includes("Searching")) {
            data.smallImageKey = "search";
            data.smallImageText = (await strings).search;
        }
        presence.setActivity(data);
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLE1BQU0sRUFBRSw0QkFBNEI7SUFDcEMsTUFBTSxFQUFFLDZCQUE2QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWEsRUFBVSxFQUFFO0lBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0RDs7UUFBTSxPQUFPLFlBQVksQ0FBQztBQUM3QixDQUFDLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQXVCLEVBQVUsRUFBRTtJQUN0RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQUVGLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxD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