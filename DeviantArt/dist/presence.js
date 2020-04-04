var presence = new Presence({
    clientId: "664057766809436161",
});
var currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/"), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
    details: "Viewing an unsupported page",
    state: undefined,
    largeImageKey: "lg",
    startTimestamp: browsingStamp,
    endTimestamp: undefined
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
    if (currentURL.hostname === "www.deviantart.com") {
        let loadedPath = [], forceUpdate = false, presenceDataPlaced = {}, retries = 0, websiteTheme, profileType;
        if (document.querySelector("table#overhead") === null)
            websiteTheme = "eclipse";
        else
            websiteTheme = "old";
        if (document.querySelector("#group"))
            profileType = "group";
        else
            profileType = "user";
        updateCallback.function = () => {
            if (loadedPath !== currentPath || forceUpdate) {
                loadedPath = currentPath;
                try {
                    if (currentPath[0] === "") {
                        presenceData.details = "Viewing the home page";
                    }
                    else if (document.querySelector(".error-400") || document.querySelector(".error-401") || document.querySelector(".error-403") || document.querySelector(".error-404") || document.querySelector(".error-405") || document.querySelector(".error-500") || document.querySelector(".error-503") || document.querySelector(".error-banned") || document.querySelector(".error-beta") || document.querySelector(".error-blocked") || document.querySelector(".error-blockedbyuser") || document.querySelector(".error-contentblockedbyuser") || document.querySelector(".error-deactivated") || document.querySelector(".error-noreferrer") || document.querySelector(".error-pageflooder") || document.querySelector(".error-suspended") || document.querySelector(".error-threadflooder") || document.querySelector("#error-400") || document.querySelector("#error-401") || document.querySelector("#error-403") || document.querySelector("#error-404") || document.querySelector("#error-405") || document.querySelector("#error-500") || document.querySelector("#error-503") || document.querySelector("#error-banned") || document.querySelector("#error-beta") || document.querySelector("#error-blocked") || document.querySelector("#error-blockedbyuser") || document.querySelector("#error-contentblockedbyuser") || document.querySelector("#error-deactivated") || document.querySelector("#error-noreferrer") || document.querySelector("#error-pageflooder") || document.querySelector("#error-suspended") || document.querySelector("#error-threadflooder")) {
                        presenceData.details = "On a non-existent page";
                    }
                    else if (currentPath[0] === "deviations") {
                        presenceData.details = "Viewing deviations";
                        presenceData.state = currentPath.slice(1).concat(getURLParam("order") ? getURLParam("order") : []).join(" > ").trim().replace(/-/g, ' ').toLowerCase().split(' ').map(w => w.replace(w[0], w[0].toUpperCase())).join(' ');
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
                            let li = document.querySelectorAll(".browse-facet-category ul li");
                            if (currentPath[3])
                                presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[2])
                                presenceData.state = `${li[1].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[1])
                                presenceData.state = `${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[0])
                                presenceData.state = '';
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
                            throw new Error('Current status is the same as the previous.');
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
                            "All": "Viewing a user's posts",
                            "Journals": "Viewing a user's journals",
                            "Status Updates": "Viewing a user's statuses",
                            "Polls": "Viewing a user's polls"
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
                    console.log("Done!");
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
                        updateCallback.function = () => { };
                        logHandler.fatalError(error);
                    }
                }
            }
            else {
                presenceData = presenceDataPlaced;
            }
        };
        function getName(override = false) {
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
                    return presenceData.state = document.querySelector("title").textContent.split(" by ")[1].split(" ")[0];
            }
        }
        function lastItem(array) {
            return array[array.length - 1];
        }
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
            let li = document.querySelectorAll(".browse-facet-product ul li .selected");
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
        let loadedPath = [], forceUpdate = false, presenceDataPlaced = {}, retries = 0;
        updateCallback.function = () => {
            if (loadedPath !== currentPath || forceUpdate) {
                loadedPath = currentPath;
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
                        updateCallback.function = () => { };
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
function resetData() {
    currentURL = new URL(document.location.href),
        currentPath = currentURL.pathname.slice(1).split("/"),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7SUF5QkwsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBRWpELElBQUksVUFBVSxHQUFHLEVBQUUsRUFBRSxXQUFXLEdBQUcsS0FBSyxFQUFFLGtCQUFrQixHQUFpQixFQUFFLEVBQUUs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