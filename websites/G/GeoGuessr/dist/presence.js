var presence = new Presence({
    clientId: "654906151523057664"
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
(() => {
    let loadedPath = [], presenceDataPlaced = {};
    updateCallback.function = () => {
        if (loadedPath !== currentPath) {
            loadedPath = currentPath;
            if (currentPath[0] === "") {
                presenceData.details = "Viewing the home page";
            }
            else if (currentPath[0] === "game") {
                presenceData.details = document.querySelector(".game-status[data-qa=map-name] .game-status__body").textContent;
                if (document.querySelector(".result")) {
                    presenceData.state =
                        Number(document
                            .querySelector(".game-status[data-qa=round-number] .game-status__body")
                            .textContent.split(" / ")[0]) +
                            1 +
                            " of 5, " +
                            document.querySelector(".game-status[data-qa=score] .game-status__body").textContent +
                            " points";
                    if (document
                        .querySelector(".game-status[data-qa=round-number] .game-status__body")
                        .textContent.split(" / ")[0] === "5") {
                        presenceData.state =
                            "Finished, " +
                                document.querySelector(".game-status[data-qa=score] .game-status__body").textContent +
                                " points";
                    }
                }
                else {
                    presenceData.state =
                        document
                            .querySelector(".game-status[data-qa=round-number] .game-status__body")
                            .textContent.split(" / ")[0] +
                            " of 5, " +
                            document.querySelector(".game-status[data-qa=score] .game-status__body").textContent +
                            " points";
                }
            }
            else if (currentPath[0] === "maps" && !currentPath[1]) {
                presenceData.details = "Looking for a map";
            }
            else if (currentPath[0] === "maps") {
                if (document.querySelector(".map-block__title")) {
                    presenceData.details = "Viewing a map";
                    presenceData.state = document.querySelector(".map-block__title").textContent;
                }
                else {
                    presenceData.details = "Looking for a map";
                }
            }
            else if (currentPath[0] === "user") {
                presenceData.details = "Viewing a user profile";
                presenceData.state = document.querySelector(".profile-summary__nick").textContent;
            }
            else if (currentPath[0] === "daily-challenges") {
                presenceData.details = "Viewing a page";
                presenceData.state = "Daily Challenges";
            }
            else if (currentPath[0] === "pro") {
                presenceData.details = "Viewing a page";
                presenceData.state = "PRO Membership";
            }
            else if (currentPath[0] === "static") {
                const pageNames = {
                    "faq.html": "FAQ",
                    "terms.html": "Terms of Service",
                    "privacy.html": "Privacy Policy"
                };
                presenceData.details = "Viewing a page";
                presenceData.state = pageNames[currentURL.pathname.split("/")[2]];
            }
            else if (currentPath[0] === "me") {
                if (currentPath[2] === undefined) {
                    presenceData.details = "Viewing their own profile";
                }
                else {
                    const pageNames = {
                        settings: "Settings",
                        leagues: "Leagues",
                        activities: "Activities",
                        current: "Ongoing games",
                        likes: "Favorite maps",
                        badges: "Badges",
                        maps: "My maps",
                        "map-maker": "Map Maker"
                    };
                    presenceData.details = "Viewing a personal page";
                    presenceData.state = pageNames[currentURL.pathname.split("/")[2]];
                }
            }
            else if (currentPath[0] === "signin") {
                presenceData.details = "Signing in";
            }
            else if (currentPath[0] === "signup") {
                presenceData.details = "Registering an account";
            }
            else if (currentPath[0] === "free") {
                presenceData.details = "Viewing a page";
                presenceData.state = "GeoGuessr Free";
            }
            presenceDataPlaced = presenceData;
        }
        else {
            presenceData = presenceDataPlaced;
        }
    };
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