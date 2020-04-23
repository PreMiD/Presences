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
            let title = getElement(".page-videolist > h1");
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
            const title = getElement(".mv-movie-title > span > a");
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
            const title = getElement(".full-title > .content > .title");
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