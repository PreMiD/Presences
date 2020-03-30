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
    if (document.location.hostname === "www.deviantart.com") {
        var currentPath = "", forceUpdate = false, path = [""], presenceDataPlaced = {}, retries = 0;
        if (document.querySelector("table#overhead") === null)
            var websiteTheme = "eclipse";
        else
            var websiteTheme = "old";
        if (document.querySelector("#group"))
            var profileType = "group";
        else
            var profileType = "user";
        updateCallback.function = () => {
            if (currentPath !== document.location.pathname || forceUpdate) {
                path = document.location.pathname.slice(1).split("/");
                currentPath = document.location.pathname;
                try {
                    if (path[0] === "") {
                        presenceData.details = "Viewing the home page";
                    }
                    else if (document.querySelector(".error-404") || document.querySelector("#error-404") || document.querySelector(".error-403") || document.querySelector("#error-403")) {
                        presenceData.details = "On a non-existent page";
                    }
                    else if (path[0] === "deviations") {
                        presenceData.details = "Viewing deviations";
                        presenceData.state = path.slice(1).concat((new URL(document.location)).searchParams.get("order") ? (new URL(document.location)).searchParams.get("order") : []).join(" > ").trim().replace(/-/g, ' ').toLowerCase().split(' ').map(w => w.replace(w[0], w[0].toUpperCase())).join(' ');
                    }
                    else if (path[0] === "daily-deviations") {
                        presenceData.details = "Viewing daily deviations";
                        if (websiteTheme === "eclipse")
                            presenceData.state = document.querySelector("#daily-deviation-picker").value;
                        else
                            presenceData.state = document.querySelector(".dailyDevCurDate").textContent.split(", ").slice(1).join(", ");
                    }
                    else if (path[0] === "journals") {
                        presenceData.details = "Viewing daily deviations";
                        if (path[1])
                            presenceData.state = path[1].replace(path[1], path[1].toUpperCase());
                        else
                            presenceData.state = "All";
                    }
                    else if (path[0] === "status-updates") {
                        presenceData.details = "Viewing status updates";
                    }
                    else if (path[0] === "polls") {
                        presenceData.details = "Viewing polls";
                    }
                    else if (path[0] === "commissions") {
                        presenceData.details = "Viewing commissions";
                    }
                    else if (path[0] === "tag") {
                        presenceData.details = "Viewing a tag";
                        presenceData.state = `#${path[1]}`;
                    }
                    else if (path[0] === "search") {
                        presenceData.details = "Searching something";
                        presenceData.state = (new URL(document.location)).searchParams.get("q");
                    }
                    else if (path[0] === "notifications") {
                        if (path[1] === "notes")
                            presenceData.details = "Reading notes";
                        if (path[1] === "watch")
                            presenceData.details = "Viewing the watch list";
                        else
                            presenceData.details = "Reading notifications";
                    }
                    else if (path[0] === "settings") {
                        presenceData.details = "Doing some settings";
                    }
                    else if (path[0] === "account") {
                        presenceData.details = "Viewing the account pages";
                    }
                    else if (path[0] === "checkout") {
                        presenceData.details = "On the checkout";
                    }
                    else if (path[0] === "wishlist") {
                        presenceData.details = "Viewing their wishlist";
                    }
                    else if (path[0] === "core-membership") {
                        presenceData.details = "Viewing a page";
                        presenceData.state = "Core Membership";
                    }
                    else if (websiteTheme === "old" && document.querySelector(".newbrowse") && !Object.keys({ presenceDataPlaced }).length) {
                        if ((new URL(document.location)).searchParams.get("q")) {
                            presenceData.details = "Searching something";
                            presenceData.state = (new URL(document.location)).searchParams.get("q");
                        }
                        else {
                            presenceData.details = "Viewing deviations";
                            var li = document.querySelectorAll(".browse-facet-category ul li");
                            if (path[3])
                                presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (path[2])
                                presenceData.state = `${li[1].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (path[1])
                                presenceData.state = `${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (path[0])
                                presenceData.state = '';
                            presenceData.state += document.querySelector(".browse-facet-order ul li .selected").textContent;
                        }
                    }
                    else if (path[0] === "watch") {
                        presenceData.details = "Viewing the watch list";
                    }
                    else if (path[0] === "critiques") {
                        presenceData.details = "Viewing critiques";
                    }
                    else if (path[1] === "art") {
                        presenceData.details = document.querySelector("title").textContent.split(" by ")[0];
                        presenceData.state = document.querySelector("title").textContent.split(" by ")[1].split(" ")[0];
                        if (presenceData.details === presenceDataPlaced.details && presenceData.state === presenceDataPlaced.state)
                            throw new Error('Current status is the same as the previous.');
                    }
                    else if (path[1] === "gallery" || path[1] === "favourites") {
                        if (path[1] === "gallery")
                            presenceData.details = `Viewing a ${profileType}'s gallery`;
                        else
                            presenceData.details = `Viewing a ${profileType}'s favourites`;
                        if (websiteTheme === "eclipse" && profileType === "user") {
                            presenceData.state = `${document.querySelector("h2.uUWfu").textContent} by ${getName()}`;
                        }
                        else {
                            if (profileType === "group" && !path[2]) {
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
                    else if (path[1] === "print") {
                        presenceData.details = document.querySelector("h1 .title").textContent;
                        presenceData.state = getName(true);
                    }
                    else if (path[1] === "prints") {
                        presenceData.details = `Viewing a user's prints`;
                        presenceData.state = getName();
                    }
                    else if (path[1] === "posts") {
                        const details = {
                            "All": "Viewing a user's posts",
                            "Journals": "Viewing a user's journals",
                            "Status Updates": "Viewing a user's statuses",
                            "Polls": "Viewing a user's polls"
                        };
                        presenceData.details = details[document.querySelector("._3xmU1 div a").textContent];
                        presenceData.state = getName();
                    }
                    else if (path[1] === "journal") {
                        if (path[2]) {
                            if (websiteTheme === "eclipse") {
                                presenceData.details = document.querySelector("._2-k1X").textContent;
                            }
                            else {
                                if (path[2] === "poll")
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
                    else if (path[1] === "poll") {
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
                    else if (path[1] === "critique") {
                        if (path[2]) {
                            presenceData.details = "Viewing a critique";
                            presenceData.state = `from ${getName()}, ${document.querySelector("h2").textContent.trim()} ${document.querySelector("h4").textContent.trim()}`;
                        }
                        else {
                            presenceData.details = "Viewing a user's critiques";
                            presenceData.state = getName();
                        }
                    }
                    else if (path[1] === "wishlist") {
                        presenceData.details = "Viewing a user's wishlist";
                        presenceData.state = getName();
                    }
                    else if (path[1] === "dds") {
                        presenceData.details = "Viewing a user's daily deviations";
                        presenceData.state = getName();
                    }
                    else if (path[1] === "badges") {
                        if (path[2]) {
                            presenceData.details = "Viewing a badge";
                            presenceData.state = `${document.querySelector("h3").textContent} from ${getName()}`;
                        }
                        else {
                            presenceData.details = `Viewing a ${profileType}'s badges`;
                            presenceData.state = getName(true);
                        }
                    }
                    else if (path[1] === "aboutus") {
                        presenceData.details = "Viewing a group's about page";
                        presenceData.state = getName(true);
                    }
                    else if (path[1] === "blog") {
                        presenceData.details = "Viewing a group's blog";
                        presenceData.state = getName(true);
                    }
                    else if (path[0] && !path[1] && getName()) {
                        presenceData.details = `Viewing a ${profileType}'s profile`;
                        if (profileType === "group")
                            presenceData.state = getName(true);
                        else
                            presenceData.state = getName();
                    }
                    else {
                        console.error("Whoops. Seems this page is not supported. \nPlease contact @Hans5958#0969 to request a support for this page.");
                        console.log(document.location.href);
                    }
                    console.groupEnd();
                    presenceDataPlaced = presenceData;
                    forceUpdate = false;
                    retries = 0;
                    console.log("Done! Presence result:");
                    console.log(`${presenceData.details}\n${presenceData.state}`);
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
                        console.groupEnd();
                        console.error("Fatal error! Terminating.\nPlease report this problem to @Hans5958#0969.");
                        console.groupCollapsed("Error log");
                        console.log(document.location.href);
                        console.error(error);
                        console.groupEnd();
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
                if (path[0].toLowerCase() === document.querySelector("title").textContent.split(" ")[0].toLowerCase())
                    return document.querySelector("title").textContent.split(" ")[0];
                else if (path[0].toLowerCase() === document.querySelector("title").textContent.split(" by ")[1].split(" ")[0].toLowerCase())
                    return presenceData.state = document.querySelector("title").textContent.split(" by ")[1].split(" ")[0];
            }
        }
        function lastItem(array) {
            return array[array.length - 1];
        }
    }
})();
if (updateCallback.present) {
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        resetData();
        updateCallback.function();
        cleanData();
        presence.setActivity(presenceData);
    }));
}
else {
    cleanData();
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        presence.setActivity(presenceData);
    }));
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
    Object.keys(presenceData).forEach(key => {
        if (presenceData[key] === null)
            delete presenceData[key];
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFXLGlCQUFpQjtJQUNuQyxLQUFLLEVBQVcsSUFBSTtJQUNwQixhQUFhLEVBQVcsSUFBSTtJQUM1QixjQUFjLEVBQVcsYUFBYTtJQUN0QyxZQUFZLEVBQVcsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTtJQUMvQixDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBb0JGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssb0JBQW9CLEVBQUU7UUFFM0QsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUFFLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxDQUFD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