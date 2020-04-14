var presence = new Presence({
    clientId: "664057766809436161"
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
        state: undefined,
        largeImageKey: "lg",
        startTimestamp: browsingStamp,
        endTimestamp: undefined
    };
}
var logHandler = {
    pageNotSupported(isCritical = false) {
        if (isCritical)
            console.error("Whoops. It seems that this page is not supported. \nPlease contact @Hans5958#0969 to request a support for this page.");
        else
            console.warn("It seems that this page is not fully supported. \nPlease contact @Hans5958#0969 to request a support for this page.");
        console.log(currentURL.href);
    },
    fatalError(error) {
        console.groupEnd();
        console.error("Fatal error! Terminating.\nPlease report this problem to @Hans5958#0969.");
        console.groupCollapsed("Error log");
        console.log(currentURL.href);
        console.error(error);
        console.groupEnd();
    }
};
function getURLParam(urlParam) {
    return currentURL.searchParams.get(urlParam);
}
(() => {
    if (currentURL.hostname === "www.deviantart.com") {
        let loadedPath, forceUpdate = false, presenceDataPlaced = {}, retries = 0, profileType, websiteTheme;
        if (document.querySelector("table#overhead") === null)
            websiteTheme = "eclipse";
        else
            websiteTheme = "old";
        if (document.querySelector("#group"))
            profileType = "group";
        else
            profileType = "user";
        const lastItem = (array) => {
            return array[array.length - 1];
        };
        const getName = (override = false) => {
            try {
                if (websiteTheme === "eclipse" && !override) {
                    try {
                        return document.querySelector("#content-container > div > div > div > div > div > a.user-link").textContent;
                    }
                    catch {
                        return document.querySelector("#root > main > div > div > div > div > div > div > div > div > span > a.user-link").textContent;
                    }
                }
                else {
                    try {
                        return lastItem(document.querySelectorAll("h1 .author .u .u")).textContent;
                    }
                    catch {
                        return document.querySelector("h1 .u .u").textContent;
                    }
                }
            }
            catch {
                if (currentPath[0].toLowerCase() === document.querySelector("title").textContent.split(" ")[0].toLowerCase())
                    return document.querySelector("title").textContent.split(" ")[0];
                else if (currentPath[0].toLowerCase() === document.querySelector("title").textContent.split(" by ")[1].split(" ")[0].toLowerCase())
                    return (presenceData.state = document.querySelector("title").textContent.split(" by ")[1].split(" ")[0]);
            }
        };
        updateCallback.function = () => {
            if (loadedPath !== currentPath.join("/") || forceUpdate) {
                loadedPath = currentPath.join("/");
                try {
                    if (currentPath[0] === "") {
                        presenceData.details = "Viewing the home page";
                    }
                    else if (document.querySelector(".error-400") || document.querySelector(".error-401") || document.querySelector(".error-403") || document.querySelector(".error-404") || document.querySelector(".error-405") || document.querySelector(".error-500") || document.querySelector(".error-503") || document.querySelector(".error-banned") || document.querySelector(".error-beta") || document.querySelector(".error-blocked") || document.querySelector(".error-blockedbyuser") || document.querySelector(".error-contentblockedbyuser") || document.querySelector(".error-deactivated") || document.querySelector(".error-noreferrer") || document.querySelector(".error-pageflooder") || document.querySelector(".error-suspended") || document.querySelector(".error-threadflooder") || document.querySelector("#error-400") || document.querySelector("#error-401") || document.querySelector("#error-403") || document.querySelector("#error-404") || document.querySelector("#error-405") || document.querySelector("#error-500") || document.querySelector("#error-503") || document.querySelector("#error-banned") || document.querySelector("#error-beta") || document.querySelector("#error-blocked") || document.querySelector("#error-blockedbyuser") || document.querySelector("#error-contentblockedbyuser") || document.querySelector("#error-deactivated") || document.querySelector("#error-noreferrer") || document.querySelector("#error-pageflooder") || document.querySelector("#error-suspended") || document.querySelector("#error-threadflooder")) {
                        presenceData.details = "On a non-existent page";
                    }
                    else if (currentPath[0] === "deviations") {
                        presenceData.details = "Viewing deviations";
                        presenceData.state = currentPath
                            .slice(1)
                            .concat(getURLParam("order") ? getURLParam("order") : [])
                            .join(" > ")
                            .trim()
                            .replace(/-/g, " ")
                            .toLowerCase()
                            .split(" ")
                            .map((w) => w.replace(w[0], w[0].toUpperCase()))
                            .join(" ");
                    }
                    else if (currentPath[0] === "daily-deviations") {
                        presenceData.details = "Viewing daily deviations";
                        if (websiteTheme === "eclipse")
                            presenceData.state = document.querySelector("#daily-deviation-picker").value;
                        else
                            presenceData.state = document.querySelector(".dailyDevCurDate").textContent.split(", ").slice(1).join(", ");
                    }
                    else if (currentPath[0] === "journals") {
                        presenceData.details = "Viewing daily deviations";
                        if (currentPath[1])
                            presenceData.state = currentPath[1].replace(currentPath[1], currentPath[1].toUpperCase());
                        else
                            presenceData.state = "All";
                    }
                    else if (currentPath[0] === "status-updates") {
                        presenceData.details = "Viewing status updates";
                    }
                    else if (currentPath[0] === "polls") {
                        presenceData.details = "Viewing polls";
                    }
                    else if (currentPath[0] === "commissions") {
                        presenceData.details = "Viewing commissions";
                    }
                    else if (currentPath[0] === "tag") {
                        presenceData.details = "Viewing a tag";
                        presenceData.state = `#${currentPath[1]}`;
                    }
                    else if (currentPath[0] === "search") {
                        presenceData.details = "Searching something";
                        presenceData.state = getURLParam("q");
                    }
                    else if (currentPath[0] === "notifications") {
                        if (currentPath[1] === "notes")
                            presenceData.details = "Reading notes";
                        if (currentPath[1] === "watch")
                            presenceData.details = "Viewing the watch list";
                        else
                            presenceData.details = "Reading notifications";
                    }
                    else if (currentPath[0] === "settings") {
                        presenceData.details = "Doing some settings";
                    }
                    else if (currentPath[0] === "account") {
                        presenceData.details = "Viewing the account pages";
                    }
                    else if (currentPath[0] === "checkout") {
                        presenceData.details = "On the checkout";
                    }
                    else if (currentPath[0] === "wishlist") {
                        presenceData.details = "Viewing their wishlist";
                    }
                    else if (currentPath[0] === "core-membership") {
                        presenceData.details = "Viewing a page";
                        presenceData.state = "Core Membership";
                    }
                    else if (currentPath[0] === "timeline") {
                        presenceData.details = "Viewing a page";
                        presenceData.state = "Timeline";
                    }
                    else if (currentPath[0] === "makeagroup") {
                        presenceData.details = "Making a group";
                    }
                    else if (websiteTheme === "old" && document.querySelector(".newbrowse") && !Object.keys({ presenceDataPlaced }).length) {
                        if (getURLParam("q")) {
                            presenceData.details = "Searching something";
                            presenceData.state = getURLParam("q");
                        }
                        else {
                            presenceData.details = "Viewing deviations";
                            const li = document.querySelectorAll(".browse-facet-category ul li");
                            if (currentPath[3])
                                presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[2])
                                presenceData.state = `${li[1].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[1])
                                presenceData.state = `${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[0])
                                presenceData.state = "";
                            presenceData.state += document.querySelector(".browse-facet-order ul li .selected").textContent;
                        }
                    }
                    else if (currentPath[0] === "watch") {
                        presenceData.details = "Viewing the watch list";
                    }
                    else if (currentPath[0] === "critiques") {
                        presenceData.details = "Viewing critiques";
                    }
                    else if (currentPath[1] === "art") {
                        presenceData.details = document.querySelector("title").textContent.split(" by ").slice(0, -1).join(" - ");
                        presenceData.state = document.querySelector("title").textContent.split(" by ").pop().split(" ")[0];
                        if (presenceData.details === presenceDataPlaced.details && presenceData.state === presenceDataPlaced.state)
                            throw new Error("Current status is the same as the previous.");
                        if (presenceData.details === "")
                            throw new Error("No art title detected and user is from the homepage.");
                    }
                    else if (currentPath[1] === "gallery" || currentPath[1] === "favourites") {
                        if (currentPath[1] === "gallery")
                            presenceData.details = `Viewing a ${profileType}'s gallery`;
                        else
                            presenceData.details = `Viewing a ${profileType}'s favourites`;
                        if (websiteTheme === "eclipse" && profileType === "user") {
                            presenceData.state = `${document.querySelector("h2.uUWfu").textContent} by ${getName()}`;
                        }
                        else {
                            if (profileType === "group" && !currentPath[2]) {
                                presenceData.state = getName(true);
                            }
                            else {
                                if (!document.querySelector(".gallery .active"))
                                    presenceData.state = `${document.querySelector(".folder-title").textContent} by ${getName(true)}`;
                                else if (document.querySelector(".gallery .active").textContent.slice(1) === "Featured")
                                    presenceData.state = `Featured by ${getName(true)}`;
                                else if (document.querySelector(".gallery .active").textContent.slice(1) === "All")
                                    presenceData.state = `All by ${getName(true)}`;
                            }
                        }
                    }
                    else if (currentPath[1] === "print") {
                        presenceData.details = document.querySelector("h1 .title").textContent;
                        presenceData.state = getName(true);
                    }
                    else if (currentPath[1] === "prints") {
                        presenceData.details = `Viewing a user's prints`;
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "posts") {
                        const details = {
                            All: "Viewing a user's posts",
                            Journals: "Viewing a user's journals",
                            "Status Updates": "Viewing a user's statuses",
                            Polls: "Viewing a user's polls"
                        };
                        presenceData.details = details[document.querySelector("._3xmU1 div a").textContent];
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "journal") {
                        if (currentPath[2]) {
                            if (websiteTheme === "eclipse") {
                                presenceData.details = document.querySelector("._2-k1X").textContent;
                            }
                            else {
                                if (currentPath[2] === "poll")
                                    document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                                else
                                    presenceData.details = document.querySelector("h1 .title").textContent;
                            }
                            presenceData.state = `${getName()} (journal)`;
                        }
                        else {
                            presenceData.details = `Viewing a user's journals`;
                            presenceData.state = getName();
                        }
                    }
                    else if (currentPath[1] === "poll") {
                        if (websiteTheme === "eclipse") {
                            try {
                                presenceData.details = document.querySelector("._1ddsf").textContent;
                            }
                            catch {
                                presenceData.details = document.querySelector(".gfMBk").textContent;
                            }
                        }
                        else {
                            presenceData.details = document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                        }
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "critique") {
                        if (currentPath[2]) {
                            presenceData.details = "Viewing a critique";
                            presenceData.state = `from ${getName()}, ${document.querySelector("h2").textContent.trim()} ${document.querySelector("h4").textContent.trim()}`;
                        }
                        else {
                            presenceData.details = "Viewing a user's critiques";
                            presenceData.state = getName();
                        }
                    }
                    else if (currentPath[1] === "wishlist") {
                        presenceData.details = "Viewing a user's wishlist";
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "dds") {
                        presenceData.details = "Viewing a user's daily deviations";
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "badges") {
                        if (currentPath[2]) {
                            presenceData.details = "Viewing a badge";
                            presenceData.state = `${document.querySelector("h3").textContent} from ${getName()}`;
                        }
                        else {
                            presenceData.details = `Viewing a ${profileType}'s badges`;
                            presenceData.state = getName(true);
                        }
                    }
                    else if (currentPath[1] === "aboutus") {
                        presenceData.details = "Viewing a group's about page";
                        presenceData.state = getName(true);
                    }
                    else if (currentPath[1] === "blog") {
                        presenceData.details = "Viewing a group's blog";
                        presenceData.state = getName(true);
                    }
                    else if (currentPath[0] && !currentPath[1] && getName()) {
                        presenceData.details = `Viewing a ${profileType}'s profile`;
                        if (profileType === "group")
                            presenceData.state = getName(true);
                        else
                            presenceData.state = getName();
                    }
                    else {
                        logHandler.pageNotSupported(true);
                    }
                    console.groupEnd();
                    presenceDataPlaced = presenceData;
                    forceUpdate = false;
                    retries = 0;
                }
                catch (error) {
                    forceUpdate = true;
                    retries++;
                    resetData();
                    presenceData.details = "Loading...";
                    if (retries === 1) {
                        console.groupCollapsed("Loading or retrying...");
                    }
                    console.log(`${retries}/30`);
                    if (retries === 30) {
                        updateCallback.function = () => undefined;
                        logHandler.fatalError(error);
                    }
                }
            }
            else {
                presenceData = presenceDataPlaced;
            }
        };
    }
    else if (currentURL.hostname === "about.deviantart.com") {
        presenceData.details = "Viewing the about pages";
        switch (currentPath[0]) {
            case "":
                presenceData.state = "About";
                break;
            case "policy":
                if (currentPath[1] === "etiquette")
                    presenceData.state = "Etiquette Policy";
                break;
            default:
                logHandler.pageNotSupported(false);
        }
    }
    else if (currentURL.hostname === "chat.deviantart.com") {
        switch (currentPath[0]) {
            case "":
                presenceData.details = "Viewing the chat room list";
                break;
            case "chat":
                presenceData.details = "On a chat room";
                break;
            default:
                logHandler.pageNotSupported(false);
        }
    }
    else if (currentURL.hostname === "forum.deviantart.com") {
        if (currentPath[1]) {
            if (currentPath[2]) {
                presenceData.details = "Viewing a topic";
                presenceData.state = document.querySelector("h1").textContent;
            }
            else {
                presenceData.details = "Viewing a topic category";
                presenceData.state = document.querySelector("h1").textContent;
            }
        }
        else {
            presenceData.details = "Viewing the forums";
        }
    }
    else if (currentURL.hostname === "groups.deviantart.com") {
        presenceData.details = "Looking for a group";
    }
    else if (currentURL.hostname === "portfolio.deviantart.com") {
        presenceData.details = "Creating a portfolio";
    }
    else if (currentURL.hostname === "shop.deviantart.com") {
        if (getURLParam("q")) {
            presenceData.details = "Searching something on the shop";
            presenceData.state = getURLParam("q");
        }
        else {
            presenceData.details = "Viewing deviations on the shop";
            const li = document.querySelectorAll(".browse-facet-product ul li .selected");
            li.forEach((v) => {
                if (presenceData.state === undefined)
                    presenceData.state = v.textContent;
                else
                    presenceData.state += ` > ${v.textContent}`;
            });
        }
    }
    else if (currentURL.hostname === "www.deviantartsupport.com") {
        let currentTitle = "", presenceDataPlaced = {};
        updateCallback.function = () => {
            if (currentTitle !== document.title.split(" - ")[0]) {
                currentTitle = document.title.split(" - ")[0];
                presenceData.details = "Viewing the help center/KB";
                presenceData.state = currentTitle;
                presenceDataPlaced = presenceData;
            }
            else {
                presenceData = presenceDataPlaced;
            }
        };
    }
    else if (currentURL.hostname === "www.eclipsefeedback.com") {
        presenceData.details = "Giving feedback about Eclipse";
    }
    else if (currentURL.hostname === "deviantartads.com") {
        presenceData.details = "Viewing the media kit";
    }
    else if (currentURL.hostname === "sta.sh") {
        let loadedPath, forceUpdate = false, presenceDataPlaced = {}, retries = 0;
        updateCallback.function = () => {
            if (loadedPath !== currentPath.join("/") || forceUpdate) {
                loadedPath = currentPath.join("/");
                try {
                    switch (currentPath[0]) {
                        case "":
                            presenceData.details = "On Sta.sh";
                            presenceData.state = "Index";
                            break;
                        case "my":
                            if (currentPath[1] === "settings") {
                                presenceData.details = "On Sta.sh";
                                presenceData.state = "Settings";
                            }
                            else {
                                logHandler.pageNotSupported(true);
                            }
                            break;
                        case "writer":
                            presenceData.details = "On Sta.sh";
                            presenceData.state = "Sta.sh Writer";
                            break;
                        case "muro":
                            presenceData.details = "On Sta.sh";
                            presenceData.state = "DeviantArt muro";
                            break;
                        default:
                            presenceData.details = document.querySelector("title").textContent.split(" - ").slice(0, -1).join(" - ");
                            presenceData.state = `${document.querySelector("title").textContent.split(" - ").pop().split("'s")[0]} (sta.sh)`;
                            if (presenceData.details === "") {
                                throw new Error("No title found on Sta.sh");
                            }
                    }
                    console.groupEnd();
                    presenceDataPlaced = presenceData;
                    forceUpdate = false;
                    retries = 0;
                }
                catch (error) {
                    forceUpdate = true;
                    retries++;
                    resetData();
                    presenceData.details = "Loading...";
                    if (retries === 1) {
                        console.groupCollapsed("Loading or retrying...");
                    }
                    console.log(`${retries}/30`);
                    if (retries === 30) {
                        updateCallback.function = () => undefined;
                        logHandler.fatalError(error);
                    }
                }
            }
            else {
                presenceData = presenceDataPlaced;
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