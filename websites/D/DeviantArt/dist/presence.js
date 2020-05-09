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
        largeImageKey: "lg",
        startTimestamp: browsingStamp
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
                        return lastItem(document.querySelectorAll("h1 .author .u .u"))
                            .textContent;
                    }
                    catch {
                        return document.querySelector("h1 .u .u").textContent;
                    }
                }
            }
            catch {
                if (currentPath[0].toLowerCase() ===
                    document
                        .querySelector("title")
                        .textContent.split(" ")[0]
                        .toLowerCase())
                    return document.querySelector("title").textContent.split(" ")[0];
                else if (currentPath[0].toLowerCase() ===
                    document
                        .querySelector("title")
                        .textContent.split(" by ")[1]
                        .split(" ")[0]
                        .toLowerCase())
                    return (presenceData.state = document
                        .querySelector("title")
                        .textContent.split(" by ")[1]
                        .split(" ")[0]);
            }
        };
        updateCallback.function = () => {
            if (loadedPath !== currentPath.join("/") || forceUpdate) {
                loadedPath = currentPath.join("/");
                try {
                    if (currentPath[0] === "") {
                        presenceData.details = "Viewing the home page";
                    }
                    else if (document.querySelector(".error-400") ||
                        document.querySelector(".error-401") ||
                        document.querySelector(".error-403") ||
                        document.querySelector(".error-404") ||
                        document.querySelector(".error-405") ||
                        document.querySelector(".error-500") ||
                        document.querySelector(".error-503") ||
                        document.querySelector(".error-banned") ||
                        document.querySelector(".error-beta") ||
                        document.querySelector(".error-blocked") ||
                        document.querySelector(".error-blockedbyuser") ||
                        document.querySelector(".error-contentblockedbyuser") ||
                        document.querySelector(".error-deactivated") ||
                        document.querySelector(".error-noreferrer") ||
                        document.querySelector(".error-pageflooder") ||
                        document.querySelector(".error-suspended") ||
                        document.querySelector(".error-threadflooder") ||
                        document.querySelector("#error-400") ||
                        document.querySelector("#error-401") ||
                        document.querySelector("#error-403") ||
                        document.querySelector("#error-404") ||
                        document.querySelector("#error-405") ||
                        document.querySelector("#error-500") ||
                        document.querySelector("#error-503") ||
                        document.querySelector("#error-banned") ||
                        document.querySelector("#error-beta") ||
                        document.querySelector("#error-blocked") ||
                        document.querySelector("#error-blockedbyuser") ||
                        document.querySelector("#error-contentblockedbyuser") ||
                        document.querySelector("#error-deactivated") ||
                        document.querySelector("#error-noreferrer") ||
                        document.querySelector("#error-pageflooder") ||
                        document.querySelector("#error-suspended") ||
                        document.querySelector("#error-threadflooder")) {
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
                            presenceData.state = document
                                .querySelector(".dailyDevCurDate")
                                .textContent.split(", ")
                                .slice(1)
                                .join(", ");
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
                    else if (websiteTheme === "old" &&
                        document.querySelector(".newbrowse") &&
                        !Object.keys({ presenceDataPlaced }).length) {
                        if (getURLParam("q")) {
                            presenceData.details = "Searching something";
                            presenceData.state = getURLParam("q");
                        }
                        else {
                            presenceData.details = "Viewing deviations";
                            const li = document.querySelectorAll(".browse-facet-category ul li");
                            if (currentPath[3])
                                presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document
                                    .querySelector(".search-stats")
                                    .textContent.trim()
                                    .slice(7)} > `;
                            else if (currentPath[2])
                                presenceData.state = `${li[1].textContent} > ${document
                                    .querySelector(".search-stats")
                                    .textContent.trim()
                                    .slice(7)} > `;
                            else if (currentPath[1])
                                presenceData.state = `${document
                                    .querySelector(".search-stats")
                                    .textContent.trim()
                                    .slice(7)} > `;
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
                        presenceData.details = document
                            .querySelector("title")
                            .textContent.split(" by ")
                            .slice(0, -1)
                            .join(" - ");
                        presenceData.state = document
                            .querySelector("title")
                            .textContent.split(" by ")
                            .pop()
                            .split(" ")[0];
                        if (presenceData.details === presenceDataPlaced.details &&
                            presenceData.state === presenceDataPlaced.state)
                            throw new Error("Current status is the same as the previous.");
                        if (presenceData.details === "")
                            throw new Error("No art title detected and user is from the homepage.");
                    }
                    else if (currentPath[1] === "gallery" ||
                        currentPath[1] === "favourites") {
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
                                else if (document
                                    .querySelector(".gallery .active")
                                    .textContent.slice(1) === "Featured")
                                    presenceData.state = `Featured by ${getName(true)}`;
                                else if (document
                                    .querySelector(".gallery .active")
                                    .textContent.slice(1) === "All")
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
                        presenceData.details =
                            details[document.querySelector("._3xmU1 div a").textContent];
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "journal") {
                        if (currentPath[2]) {
                            if (websiteTheme === "eclipse") {
                                presenceData.details = document.querySelector("._2-k1X").textContent;
                            }
                            else {
                                if (currentPath[2] === "poll")
                                    document
                                        .querySelector("h2")
                                        .textContent.substr(1, document.querySelector("h2").textContent.length - 2);
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
                            presenceData.details = document
                                .querySelector("h2")
                                .textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                        }
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "critique") {
                        if (currentPath[2]) {
                            presenceData.details = "Viewing a critique";
                            presenceData.state = `from ${getName()}, ${document
                                .querySelector("h2")
                                .textContent.trim()} ${document
                                .querySelector("h4")
                                .textContent.trim()}`;
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
                            presenceData.details = document
                                .querySelector("title")
                                .textContent.split(" - ")
                                .slice(0, -1)
                                .join(" - ");
                            presenceData.state = `${document
                                .querySelector("title")
                                .textContent.split(" - ")
                                .pop()
                                .split("'s")[0]} (sta.sh)`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQzlDLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUMzQixPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxhQUFhO0NBQzlCLEVBQ0QsY0FBYyxHQUFHO0lBQ2YsU0FBUyxFQUFFLElBQWdCO0lBQzNCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQztBQUtKLFNBQVMsU0FBUztJQUNoQixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELFlBQVks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QUFDLFlBQVksQ0FBQzt3QkFDcEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7d0JBQ3BDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO3dCQUNwQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7d0JBQ3JDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7d0JBQ3hDLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7d0JBQzlDLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUM7d0JBQ3JELFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7d0JBQzVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7d0JBQzNDLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7d0JBQzVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7d0JBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7d0JBQzlDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO3dCQUNwQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzt3QkFDcEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7d0JBQ3BDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO3dCQUNwQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzt3QkFDcEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7d0JBQ3BDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO3dCQUNwQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7d0JBQ3JDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7d0JBQ3hDLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7d0JBQzlDLFFBQVEsQ0FB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