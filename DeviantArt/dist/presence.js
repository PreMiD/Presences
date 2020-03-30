var presence = new Presence({
    clientId: "664057766809436161"
});
var browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
    details: "In construction",
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
                    else if (document.querySelector(".error-404") ||
                        document.querySelector("#error-404") ||
                        document.querySelector(".error-403") ||
                        document.querySelector("#error-403")) {
                        presenceData.details = "On a non-existent page";
                    }
                    else if (path[0] === "deviations") {
                        presenceData.details = "Viewing deviations";
                        presenceData.state = path
                            .slice(1)
                            .concat(new URL(document.location).searchParams.get("order")
                            ? new URL(document.location).searchParams.get("order")
                            : [])
                            .join(" > ")
                            .trim()
                            .replace(/-/g, " ")
                            .toLowerCase()
                            .split(" ")
                            .map(w => w.replace(w[0], w[0].toUpperCase()))
                            .join(" ");
                    }
                    else if (path[0] === "daily-deviations") {
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
                        presenceData.state = new URL(document.location).searchParams.get("q");
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
                    else if (websiteTheme === "old" &&
                        document.querySelector(".newbrowse") &&
                        !Object.keys({ presenceDataPlaced }).length) {
                        if (new URL(document.location).searchParams.get("q")) {
                            presenceData.details = "Searching something";
                            presenceData.state = new URL(document.location).searchParams.get("q");
                        }
                        else {
                            presenceData.details = "Viewing deviations";
                            var li = document.querySelectorAll(".browse-facet-category ul li");
                            if (path[3])
                                presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document
                                    .querySelector(".search-stats")
                                    .textContent.trim()
                                    .slice(7)} > `;
                            else if (path[2])
                                presenceData.state = `${li[1].textContent} > ${document
                                    .querySelector(".search-stats")
                                    .textContent.trim()
                                    .slice(7)} > `;
                            else if (path[1])
                                presenceData.state = `${document
                                    .querySelector(".search-stats")
                                    .textContent.trim()
                                    .slice(7)} > `;
                            else if (path[0])
                                presenceData.state = "";
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
                        presenceData.details = document
                            .querySelector("title")
                            .textContent.split(" by ")[0];
                        presenceData.state = document
                            .querySelector("title")
                            .textContent.split(" by ")[1]
                            .split(" ")[0];
                        if (presenceData.details === presenceDataPlaced.details &&
                            presenceData.state === presenceDataPlaced.state)
                            throw new Error("Current status is the same as the previous.");
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
                            All: "Viewing a user's posts",
                            Journals: "Viewing a user's journals",
                            "Status Updates": "Viewing a user's statuses",
                            Polls: "Viewing a user's polls"
                        };
                        presenceData.details =
                            details[document.querySelector("._3xmU1 div a").textContent];
                        presenceData.state = getName();
                    }
                    else if (path[1] === "journal") {
                        if (path[2]) {
                            if (websiteTheme === "eclipse") {
                                presenceData.details = document.querySelector("._2-k1X").textContent;
                            }
                            else {
                                if (path[2] === "poll")
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
                    else if (path[1] === "poll") {
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
                    else if (path[1] === "critique") {
                        if (path[2]) {
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
                if (path[0].toLowerCase() ===
                    document
                        .querySelector("title")
                        .textContent.split(" ")[0]
                        .toLowerCase())
                    return document.querySelector("title").textContent.split(" ")[0];
                else if (path[0].toLowerCase() ===
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
        }
        function lastItem(array) {
            return array[array.length - 1];
        }
    }
})();
if (updateCallback.present) {
    presence.on("UpdateData", async () => {
        resetData();
        updateCallback.function();
        cleanData();
        presence.setActivity(presenceData);
    });
}
else {
    cleanData();
    presence.on("UpdateData", async () => {
        presence.setActivity(presenceData);
    });
}
function resetData() {
    presenceData = {
        details: "In construction",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMxQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBbUJMLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssb0JBQW9CLEVBQUU7UUFDeEQsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUNuQixXQUFXLEdBQUcsS0FBSyxFQUNuQixJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDWCxrQkFBa0IsR0FBRyxFQUFFLEVBQ3ZCLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFHYixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJO1lBQ3BELElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQzs7WUFDekIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRzlCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFBRSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUM7O1lBQzNELElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUU5QixjQUFjLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtZQUM5QixJQUFJLFdBQVcsS0FBSyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7Z0JBQzlELElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RCxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBRXpDLElBQUk7b0JBUUgsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNuQixZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO3FCQUMvQzt5QkFBTSxJQUNOLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO3dCQUNwQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzt3QkFDcEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7d0JBQ3BDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQ25DO3dCQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7cUJBSWhEO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBRTt3QkFDcEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzt3QkFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJOzZCQUN2QixLQUFLLENBQUMsQ0FBQyxDQUFDOzZCQUNSLE1BQU0sQ0FDTixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7NEJBQ25ELENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7NEJBQ3RELENBQUMsQ0FBQyxFQUFFLENBQ0w7NkJBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQzs2QkFDWCxJQUFJLEVBQUU7NkJBQ04sT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7NkJBQ2xCLFdBQVcsRUFBRTs2QkFDYixLQUFLLENBQUMsR0FBRyxDQUFDOzZCQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOzZCQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ1o7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLEVBQUU7d0JBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7d0JBQ2xELElBQUksWUFBWSxLQUFLLFNBQVM7NEJBQzdCLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDMUMseUJBQXlCLENBQ3pCLENBQUMsS0FBSyxDQUFDOzs0QkFFUixZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7aUNBQzNCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztpQ0FDakMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUNBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUM7aUNBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNkO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQzt3QkFDbEQsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNWLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FDckIsQ0FBQzs7NEJBQ0UsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ2hDO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixFQUFFO3dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO3FCQUNoRDt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7d0JBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO3FCQUN2Qzt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLEVBQUU7d0JBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7cUJBRzdDO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTt3QkFDN0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7d0JBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDbkM7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO3dCQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUMvRCxHQUFHLENBQ0gsQ0FBQztxQkFDRjt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxlQUFlLEVBQUU7d0JBQ3ZDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87NEJBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7d0JBQ2hFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87NEJBQ3RCLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7OzRCQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO3FCQUVwRDt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7d0JBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7cUJBRTdDO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDakMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztxQkFFbkQ7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUNsQyxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO3FCQUV6Qzt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7d0JBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7cUJBQ2hEO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO3dCQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO3dCQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO3FCQUd2Qzt5QkFBTSxJQUNOLFlBQVksS0FBSyxLQUFLO3dCQUN0QixRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzt3QkFDcEMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFDMUM7d0JBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDckQsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQzs0QkFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDL0QsR0FBRyxDQUNILENBQUM7eUJBQ0Y7NkJBQU07NEJBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzs0QkFDNUMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUNqQyw4QkFBOEIsQ0FDOUIsQ0FBQzs0QkFDRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1YsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLE1BQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUNQLE1BQU0sUUFBUTtxQ0FDWixhQUFhLENBQUMsZUFBZSxDQUFDO3FDQUM5QixXQUFXLENBQUMsSUFBSSxFQUFFO3FDQUNsQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQ0FDWixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ2YsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLE1BQU0sUUFBUTtxQ0FDckQsYUFBYSxDQUFDLGVBQWUsQ0FBQztxQ0FDOUIsV0FBVyxDQUFDLElBQUksRUFBRTtxQ0FDbEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7aUNBQ1osSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNmLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRO3FDQUM5QixhQUFhLENBQUMsZUFBZSxDQUFDO3FDQUM5QixXQUFXLENBQUMsSUFBSSxFQUFFO3FDQUNsQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQ0FDWixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7NEJBQzFDLFlBQVksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FDM0MscUNBQXFDLENBQ3JDLENBQUMsV0FBVyxDQUFDO3lCQUNkO3FCQUNEO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDL0IsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztxQkFDaEQ7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO3dCQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO3FCQVUzQzt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBQzdCLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUTs2QkFDN0IsYUFBYSxDQUFDLE9BQU8sQ0FBQzs2QkFDdEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFROzZCQUMzQixhQUFhLENBQUMsT0FBTyxDQUFDOzZCQUN0QixXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDNUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVoQixJQUNDLFlBQVksQ0FBQyxPQUFPLEtBQUssa0JBQWtCLENBQUMsT0FBTzs0QkFDbkQsWUFBWSxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxLQUFLOzRCQUUvQyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7cUJBR2hFO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxFQUFFO3dCQUM3RCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTOzRCQUN4QixZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsV0FBVyxZQUFZLENBQUM7OzRCQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsV0FBVyxlQUFlLENBQUM7d0JBQ3BFLElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSSxXQUFXLEtBQUssTUFBTSxFQUFFOzRCQUN6RCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQ3BCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsV0FDcEMsT0FBTyxPQUFPLEVBQUUsRUFBRSxDQUFDO3lCQUNuQjs2QkFBTTs0QkFDTixJQUFJLFdBQVcsS0FBSyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNuQztpQ0FBTTtnQ0FDTixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztvQ0FDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNwQixRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQ3pDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUNBQ25CLElBQ0osUUFBUTtxQ0FDTixhQUFhLENBQUMsa0JBQWtCLENBQUM7cUNBQ2pDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVTtvQ0FFckMsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3FDQUNoRCxJQUNKLFFBQVE7cUNBQ04sYUFBYSxDQUFDLGtCQUFrQixDQUFDO3FDQUNqQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7b0NBRWhDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzs2QkFDaEQ7eUJBQ0Q7cUJBR0Q7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO3dCQUMvQixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVDLFdBQVcsQ0FDWCxDQUFDLFdBQVcsQ0FBQzt3QkFDZCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDbkM7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO3dCQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDO3FCQUMvQjt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7d0JBRS9CLE1BQU0sT0FBTyxHQUFHOzRCQUNmLEdBQUcsRUFBRSx3QkFBd0I7NEJBQzdCLFFBQVEsRUFBRSwyQkFBMkI7NEJBQ3JDLGdCQUFnQixFQUFFLDJCQUEyQjs0QkFDN0MsS0FBSyxFQUFFLHdCQUF3Qjt5QkFDL0IsQ0FBQzt3QkFDRixZQUFZLENBQUMsT0FBTzs0QkFDbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzlELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUM7cUJBQy9CO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDakMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ1osSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO2dDQUMvQixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVDLFNBQVMsQ0FDVCxDQUFDLFdBQVcsQ0FBQzs2QkFDZDtpQ0FBTTtnQ0FFTixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNO29DQUNyQixRQUFRO3lDQUNOLGFBQWEsQ0FBQyxJQUFJLENBQUM7eUNBQ25CLFdBQVcsQ0FBQyxNQUFNLENBQ2xCLENBQUMsRUFDRCxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNuRCxDQUFDOztvQ0FFSCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVDLFdBQVcsQ0FDWCxDQUFDLFdBQVcsQ0FBQzs2QkFDZjs0QkFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsT0FBTyxFQUFFLFlBQVksQ0FBQzt5QkFDOUM7NkJBQU07NEJBRU4sWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQzs0QkFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQzt5QkFDL0I7cUJBQ0Q7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUM5QixJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7NEJBQy9CLElBQUk7Z0NBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QyxTQUFTLENBQ1QsQ0FBQyxXQUFXLENBQUM7NkJBQ2Q7NEJBQUMsTUFBTTtnQ0FDUCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVDLFFBQVEsQ0FDUixDQUFDLFdBQVcsQ0FBQzs2QkFDZDt5QkFDRDs2QkFBTTs0QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7aUNBQzdCLGFBQWEsQ0FBQyxJQUFJLENBQUM7aUNBQ25CLFdBQVcsQ0FBQyxNQUFNLENBQ2xCLENBQUMsRUFDRCxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNuRCxDQUFDO3lCQUNIO3dCQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUM7cUJBQy9CO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDbEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ1osWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzs0QkFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLE9BQU8sRUFBRSxLQUFLLFFBQVE7aUNBQ2pELGFBQWEsQ0FBQyxJQUFJLENBQUM7aUNBQ25CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRO2lDQUM5QixhQUFhLENBQUMsSUFBSSxDQUFDO2lDQUNuQixXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQzt5QkFDdkI7NkJBQU07NEJBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQzs0QkFDcEQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQzt5QkFDL0I7cUJBQ0Q7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUNsQyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO3dCQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDO3FCQUMvQjt5QkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBQzdCLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUNBQW1DLENBQUM7d0JBQzNELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUM7cUJBQy9CO3lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFFaEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ1osWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQzs0QkFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNwQixRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQzlCLFNBQVMsT0FBTyxFQUFFLEVBQUUsQ0FBQzt5QkFDckI7NkJBQU07NEJBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLFdBQVcsV0FBVyxDQUFDOzRCQUMzRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDbkM7cUJBR0Q7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNqQyxZQUFZLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO3dCQUN0RCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDbkM7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO3dCQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFHbkM7eUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFLEVBQUU7d0JBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxXQUFXLFlBQVksQ0FBQzt3QkFDNUQsSUFBSSxXQUFXLEtBQUssT0FBTzs0QkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7NEJBQzNELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUM7cUJBR3BDO3lCQUFNO3dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQ1osK0dBQStHLENBQy9HLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNwQztvQkFFRCxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ25CLGtCQUFrQixHQUFHLFlBQVksQ0FBQztvQkFDbEMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDcEIsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RDtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZixXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixPQUFPLEVBQUUsQ0FBQztvQkFDVixTQUFTLEVBQUUsQ0FBQztvQkFDWixZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztvQkFDcEMsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO3dCQUNsQixPQUFPLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQ2pEO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDO29CQUU3QixJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7d0JBQ25CLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO3dCQUNuQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQ1osMEVBQTBFLENBQzFFLENBQUM7d0JBQ0YsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ25CO2lCQUNEO2FBQ0Q7aUJBQU07Z0JBQ04sWUFBWSxHQUFHLGtCQUFrQixDQUFDO2FBQ2xDO1FBQ0YsQ0FBQyxDQUFDO1FBRUYsU0FBUyxPQUFPLENBQUMsV0FBb0IsS0FBSztZQUN6QyxJQUFJO2dCQUNILElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDNUMsSUFBSTt3QkFDSCxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQzVCLGdFQUFnRSxDQUNoRSxDQUFDLFdBQVcsQ0FBQztxQkFDZDtvQkFBQyxNQUFNO3dCQUNQLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FDNUIsbUZBQW1GLENBQ25GLENBQUMsV0FBVyxDQUFDO3FCQUNkO2lCQUNEO3FCQUFNO29CQUNOLElBQUk7d0JBQ0gsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7NkJBQzVELFdBQVcsQ0FBQztxQkFDZDtvQkFBQyxNQUFNO3dCQUNQLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUM7cUJBQ3REO2lCQUNEO2FBQ0Q7WUFBQyxNQUFNO2dCQUNQLElBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsUUFBUTt5QkFDTixhQUFhLENBQUMsT0FBTyxDQUFDO3lCQUN0QixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekIsV0FBVyxFQUFFO29CQUVmLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM3RCxJQUNKLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLFFBQVE7eUJBQ04sYUFBYSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzVCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ2IsV0FBVyxFQUFFO29CQUVmLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7eUJBQ25DLGFBQWEsQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtRQUNGLENBQUM7UUFFRCxTQUFTLFFBQVEsQ0FBQyxLQUE0QjtZQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FDRDtBQUNGLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUU7SUFDM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEMsU0FBUyxFQUFFLENBQUM7UUFDWixjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0NBQ0g7S0FBTTtJQUNOLFNBQVMsRUFBRSxDQUFDO0lBQ1osUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztDQUNIO0FBS0QsU0FBUyxTQUFTO0lBQ2pCLFlBQVksR0FBRztRQUNkLE9BQU8sRUFBVSxpQkFBaUI7UUFDbEMsS0FBSyxFQUFVLElBQUk7UUFDbkIsYUFBYSxFQUFVLElBQUk7UUFDM0IsY0FBYyxFQUFVLGFBQWE7UUFDckMsWUFBWSxFQUFVLElBQUk7S0FDMUIsQ0FBQztBQUNILENBQUM7QUFLRCxTQUFTLFNBQVM7SUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdkMsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtZQUFFLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9