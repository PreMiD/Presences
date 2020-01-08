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
                        presenceData.state = path.slice(1).concat((new URL(document.location)).searchParams.get("order")).join(" > ").replace(/-/g, ' ').toLowerCase().split(' ').map(w => w.replace(w[0], w[0].toUpperCase())).join(' ');
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
                        presenceData.details = "Viewing the account settings";
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
                    return document.querySelector("#root > main > div > div > div > div > div > div > div > div > span > a.user-link").textContent;
                }
                else {
                    try {
                        return lastItem(document.querySelectorAll("h1 .author .u .u")).textContent;
                    }
                    catch (_a) {
                        return document.querySelector("h1 .u .u").textContent;
                    }
                }
            }
            catch (_b) {
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