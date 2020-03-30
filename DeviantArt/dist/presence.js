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
    clientId: "664057766809436161",
    mediaKeys: false
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
        var loadedPath = [], forceUpdate = false, presenceDataPlaced = {}, retries = 0;
        if (document.querySelector("table#overhead") === null)
            var websiteTheme = "eclipse";
        else
            var websiteTheme = "old";
        if (document.querySelector("#group"))
            var profileType = "group";
        else
            var profileType = "user";
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
                            var li = document.querySelectorAll(".browse-facet-category ul li");
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
                            catch (_a) {
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
                    catch (_a) {
                        return document.querySelector("#root > main > div > div > div > div > div > div > div > div > span > a.user-link").textContent;
                    }
                }
                else {
                    try {
                        return lastItem(document.querySelectorAll("h1 .author .u .u")).textContent;
                    }
                    catch (_b) {
                        return document.querySelector("h1 .u .u").textContent;
                    }
                }
            }
            catch (_c) {
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
            var li = document.querySelectorAll(".browse-facet-product ul li .selected");
            li.forEach((v) => {
                if (presenceData.state === undefined)
                    presenceData.state = v.textContent;
                else
                    presenceData.state += ` > ${v.textContent}`;
            });
        }
    }
    else if (currentURL.hostname === "www.deviantartsupport.com") {
        var currentTitle = "", presenceDataPlaced = {};
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
        var loadedPath = [], forceUpdate = false, presenceDataPlaced = {}, retries = 0;
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
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        resetData();
        updateCallback.function();
        presence.setActivity(presenceData);
    }));
}
else {
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        presence.setActivity(presenceData);
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7SUF5QkwsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBRWpELElBQUksVUFBVSxHQUFHLEVBQUUsRUFBRSxXQUFXLEdBQUcsS0FBSyxFQUFFLGtCQUFrQixHQUFpQixFQUFFLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQTtRQUc1RixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJO1lBQUUsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFBOztZQUM5RSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUE7UUFHN0IsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUFFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQTs7WUFDMUQsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFBO1FBRTdCLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBRTlCLElBQUksVUFBVSxLQUFLLFdBQVcsSUFBSSxXQUFXLEVBQUU7Z0JBRTlDLFVBQVUsR0FBRyxXQUFXLENBQUE7Z0JBRXhCLElBQUk7b0JBU0gsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUMxQixZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFBO3FCQUU5Qzt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsRUFBRTt3QkFDNStDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7cUJBSy9DO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBRTt3QkFDM0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQTt3QkFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUV6Tjt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxrQkFBa0IsRUFBRTt3QkFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTt3QkFDakQsSUFBSSxZQUFZLEtBQUssU0FBUzs0QkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQyxLQUFLLENBQUE7OzRCQUN2RyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBRWhIO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTt3QkFDakQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7OzRCQUN4RyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtxQkFFL0I7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7d0JBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7cUJBRS9DO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUE7cUJBRXRDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLGFBQWEsRUFBRTt3QkFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtxQkFJNUM7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO3dCQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQTt3QkFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO3FCQUV6Qzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7d0JBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7d0JBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUVyQzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxlQUFlLEVBQUU7d0JBQzlDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87NEJBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUE7d0JBQ3RFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87NEJBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTs7NEJBQzFFLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUE7cUJBR25EO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtxQkFHNUM7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFBO3FCQUdsRDt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7d0JBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUE7cUJBR3hDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtxQkFFL0M7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssaUJBQWlCLEVBQUU7d0JBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7d0JBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUE7cUJBRXRDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTt3QkFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUE7cUJBRS9CO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBRTt3QkFDM0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTtxQkFJdkM7eUJBQU0sSUFBSSxZQUFZLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTt3QkFDdkgsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3JCLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7NEJBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3lCQUNyQzs2QkFBTTs0QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBOzRCQUMzQyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMsQ0FBQTs0QkFDbEUsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLE1BQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7aUNBQzdKLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztnQ0FBRSxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtpQ0FDM0ksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtpQ0FDcEgsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBOzRCQUNoRCxZQUFZLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQyxXQUFXLENBQUE7eUJBQy9GO3FCQUVEO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtxQkFFL0M7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO3dCQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFBO3FCQVcxQzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ3pHLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFFbEcsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLEtBQUs7NEJBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO3FCQUkzSzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBRTt3QkFDM0UsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUzs0QkFBRSxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsV0FBVyxZQUFZLENBQUE7OzRCQUN4RixZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsV0FBVyxlQUFlLENBQUE7d0JBQ25FLElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSSxXQUFXLEtBQUssTUFBTSxFQUFFOzRCQUN6RCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLE9BQU8sT0FBTyxFQUFFLEVBQUUsQ0FBQTt5QkFDeEY7NkJBQU07NEJBQ04sSUFBSSxXQUFXLEtBQUssT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTs2QkFDbEM7aUNBQU07Z0NBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7b0NBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO3FDQUM3SSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVU7b0NBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO3FDQUN2SSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7b0NBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBOzZCQUNsSTt5QkFDRDtxQkFJRDt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7d0JBQ3RDLFlBQVksQ0FBQyxPQUFPLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUE7d0JBQ3ZFLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO3FCQUVsQzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7d0JBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUE7d0JBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7cUJBRTlCO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsTUFBTSxPQUFPLEdBQUc7NEJBQ2YsS0FBSyxFQUFFLHdCQUF3Qjs0QkFDL0IsVUFBVSxFQUFFLDJCQUEyQjs0QkFDdkMsZ0JBQWdCLEVBQUUsMkJBQTJCOzRCQUM3QyxPQUFPLEVBQUUsd0JBQXdCO3lCQUNqQyxDQUFBO3dCQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUE7d0JBQ25GLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7cUJBRTlCO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDeEMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ25CLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtnQ0FDL0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTs2QkFDcEU7aUNBQU07Z0NBQ04sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTTtvQ0FBRSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTs7b0NBQ2pJLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUE7NkJBQzNFOzRCQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxPQUFPLEVBQUUsWUFBWSxDQUFBO3lCQUM3Qzs2QkFBTTs0QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFBOzRCQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFBO3lCQUM5QjtxQkFFRDt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7d0JBQ3JDLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTs0QkFDL0IsSUFBSTtnQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFBOzZCQUFDOzRCQUMxRSxXQUFNO2dDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUE7NkJBQUM7eUJBQzNFOzZCQUFNOzRCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7eUJBQzlIO3dCQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7cUJBRTlCO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ25CLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUE7NEJBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFBO3lCQUMvSTs2QkFBTTs0QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFBOzRCQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFBO3lCQUM5QjtxQkFFRDt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7d0JBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUE7d0JBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7cUJBRTlCO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTt3QkFDcEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQ0FBbUMsQ0FBQTt3QkFDMUQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQTtxQkFFOUI7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUN2QyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDbkIsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQTs0QkFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxTQUFTLE9BQU8sRUFBRSxFQUFFLENBQUE7eUJBQ3BGOzZCQUFNOzRCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxXQUFXLFdBQVcsQ0FBQTs0QkFDMUQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7eUJBQ2xDO3FCQUlEO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQTt3QkFDckQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBRWxDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTt3QkFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTt3QkFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBSWxDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxFQUFFO3dCQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsV0FBVyxZQUFZLENBQUE7d0JBQzNELElBQUksV0FBVyxLQUFLLE9BQU87NEJBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7OzRCQUMxRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFBO3FCQUluQzt5QkFBTTt3QkFDTixVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBQ2pDO29CQUVELE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtvQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDcEIsa0JBQWtCLEdBQUcsWUFBWSxDQUFBO29CQUNqQyxXQUFXLEdBQUcsS0FBSyxDQUFBO29CQUNuQixPQUFPLEdBQUcsQ0FBQyxDQUFBO2lCQUVYO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUVmLFdBQVcsR0FBRyxJQUFJLENBQUE7b0JBQ2xCLE9BQU8sRUFBRSxDQUFBO29CQUNULFNBQVMsRUFBRSxDQUFBO29CQUNYLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFBO29CQUNuQyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7d0JBQ2xCLE9BQU8sQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtxQkFDaEQ7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUE7b0JBRTVCLElBQUksT0FBTyxLQUFLLEVBQUUsRUFBRTt3QkFDbkIsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7d0JBQ2xDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQzVCO2lCQUVEO2FBRUQ7aUJBQU07Z0JBQ04sWUFBWSxHQUFHLGtCQUFrQixDQUFBO2FBQ2pDO1FBQ0YsQ0FBQyxDQUFBO1FBRUQsU0FBUyxPQUFPLENBQUMsV0FBb0IsS0FBSztZQUN6QyxJQUFJO2dCQUNILElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDNUMsSUFBSTt3QkFBQyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0VBQWdFLENBQUMsQ0FBQyxXQUFXLENBQUE7cUJBQUM7b0JBQ2pILFdBQU07d0JBQUMsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLG1GQUFtRixDQUFDLENBQUMsV0FBVyxDQUFBO3FCQUFDO2lCQUN0STtxQkFBTTtvQkFDTixJQUFJO3dCQUFDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFBO3FCQUFDO29CQUNoRixXQUFNO3dCQUFDLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUE7cUJBQUM7aUJBQzdEO2FBQ0Q7WUFBQyxXQUFNO2dCQUNQLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQUUsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ3pLLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO29CQUFFLE9BQU8sWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQzFPO1FBQ0YsQ0FBQztRQUVELFNBQVMsUUFBUSxDQUFDLEtBQTRCO1lBQzdDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDL0IsQ0FBQztLQUVEO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLHNCQUFzQixFQUFFO1FBRTFELFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUE7UUFFaEQsUUFBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxFQUFFO2dCQUNOLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO2dCQUM1QixNQUFLO1lBQ04sS0FBSyxRQUFRO2dCQUNaLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVc7b0JBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQTtnQkFDM0UsTUFBSztZQUNOO2dCQUNDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNuQztLQUVEO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLHFCQUFxQixFQUFFO1FBRXpELFFBQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLEtBQUssRUFBRTtnQkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFBO2dCQUNuRCxNQUFLO1lBQ04sS0FBSyxNQUFNO2dCQUVWLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7Z0JBeUN2QyxNQUFLO1lBRU47Z0JBQ0MsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ25DO0tBRUQ7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssc0JBQXNCLEVBQUU7UUFFMUQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25CLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUE7Z0JBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUE7YUFDN0Q7aUJBQU07Z0JBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTtnQkFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQTthQUM3RDtTQUNEO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBO1NBQzNDO0tBRUQ7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssdUJBQXVCLEVBQUU7UUFFM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtLQUc1QztTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSywwQkFBMEIsRUFBRTtRQUU5RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFBO0tBUzdDO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLHFCQUFxQixFQUFFO1FBRXpELElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUNBQWlDLENBQUE7WUFDeEQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDckM7YUFBTTtZQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLENBQUE7WUFDdkQsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHVDQUF1QyxDQUFDLENBQUE7WUFDM0UsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNoQixJQUFJLFlBQVksQ0FBQyxLQUFLLEtBQUssU0FBUztvQkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUE7O29CQUNuRSxZQUFZLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ2pELENBQUMsQ0FBQyxDQUFBO1NBQ0Y7S0FFRDtTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSywyQkFBMkIsRUFBRTtRQUUvRCxJQUFJLFlBQVksR0FBRyxFQUFFLEVBQUUsa0JBQWtCLEdBQWlCLEVBQUUsQ0FBQTtRQUU1RCxjQUFjLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtZQUM5QixJQUFJLFlBQVksS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDcEQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFBO2dCQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQTtnQkFDakMsa0JBQWtCLEdBQUcsWUFBWSxDQUFBO2FBQ2pDO2lCQUFNO2dCQUNOLFlBQVksR0FBRyxrQkFBa0IsQ0FBQTthQUNqQztRQUNGLENBQUMsQ0FBQTtLQUVEO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLHlCQUF5QixFQUFFO1FBRTdELFlBQVksQ0FBQyxPQUFPLEdBQUcsK0JBQStCLENBQUE7S0FFdEQ7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssbUJBQW1CLEVBQUU7UUFFdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQTtLQUU5QztTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFFNUMsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUFFLFdBQVcsR0FBRyxLQUFLLEVBQUUsa0JBQWtCLEdBQWlCLEVBQUUsRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBRTVGLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBRTlCLElBQUksVUFBVSxLQUFLLFdBQVcsSUFBSSxXQUFXLEVBQUU7Z0JBRTlDLFVBQVUsR0FBRyxXQUFXLENBQUE7Z0JBRXhCLElBQUk7b0JBRUgsUUFBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3RCLEtBQUssRUFBRTs0QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQTs0QkFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7NEJBQzVCLE1BQUs7d0JBQ04sS0FBSyxJQUFJOzRCQUNSLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtnQ0FDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUE7Z0NBQ2xDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFBOzZCQUMvQjtpQ0FBTTtnQ0FDTixVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7NkJBQ2pDOzRCQUNELE1BQUs7d0JBQ04sS0FBSyxRQUFROzRCQUNaLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFBOzRCQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQTs0QkFDcEMsTUFBSzt3QkFDTixLQUFLLE1BQU07NEJBQ1YsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUE7NEJBQ2xDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUE7NEJBQ3RDLE1BQUs7d0JBQ047NEJBQ0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTs0QkFDeEcsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTs0QkFDaEgsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQ0FDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBOzZCQUMzQztxQkFDRjtvQkFFRCxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7b0JBQ2xCLGtCQUFrQixHQUFHLFlBQVksQ0FBQTtvQkFDakMsV0FBVyxHQUFHLEtBQUssQ0FBQTtvQkFDbkIsT0FBTyxHQUFHLENBQUMsQ0FBQTtpQkFFWDtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFFZixXQUFXLEdBQUcsSUFBSSxDQUFBO29CQUNsQixPQUFPLEVBQUUsQ0FBQTtvQkFDVCxTQUFTLEVBQUUsQ0FBQTtvQkFDWCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQTtvQkFDbkMsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO3dCQUNsQixPQUFPLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUE7cUJBQ2hEO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFBO29CQUU1QixJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7d0JBQ25CLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO3dCQUNsQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO3FCQUM1QjtpQkFFRDthQUVEO2lCQUFNO2dCQUNOLFlBQVksR0FBRyxrQkFBa0IsQ0FBQTthQUNqQztRQUNGLENBQUMsQ0FBQTtLQUVEO0FBRUYsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtBQUVKLElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRTtJQUMzQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7UUFDcEMsU0FBUyxFQUFFLENBQUE7UUFDWCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0NBQ0Y7S0FBTTtJQUNOLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQSxDQUFDLENBQUE7Q0FDRjtBQUtELFNBQVMsU0FBUztJQUNqQixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDNUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDckQsWUFBWSxHQUFHO1lBQ2QsT0FBTyxFQUFXLDZCQUE2QjtZQUMvQyxLQUFLLEVBQVcsU0FBUztZQUN6QixhQUFhLEVBQVcsSUFBSTtZQUM1QixjQUFjLEVBQVcsYUFBYTtZQUN0QyxZQUFZLEVBQVcsU0FBUztTQUNoQyxDQUFDO0FBQ0gsQ0FBQztBQUtELElBQUksVUFBVSxHQUFHO0lBS2hCLGdCQUFnQixDQUFDLGFBQXNCLEtBQUs7UUFDM0MsSUFBSSxVQUFVO1lBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx1SEFBdUgsQ0FBQyxDQUFBOztZQUNqSixPQUFPLENBQUMsSUFBSSxDQUFDLHFIQUFxSCxDQUFDLENBQUE7UUFDeEksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUtELFVBQVUsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUE7UUFDekYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0NBQ0QsQ0FBQTtBQU1ELFNBQVMsV0FBVyxDQUFDLFFBQWdCO0lBQ3BDLE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDN0MsQ0FBQyJ9