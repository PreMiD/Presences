var presence = new Presence({
    clientId: "654906151523057664"
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
    if (presenceData.state === null)
        delete presenceData.state;
    if (presenceData.endTimestamp === null)
        delete presenceData.endTimestamp;
}
(() => {
    if (document.querySelector("section.game")) {
        updateCallback.function = () => {
            presenceData.details = document.querySelector(".game-info__section--map .game-info__value").textContent;
            if (document.querySelector(".score__round") ||
                document.querySelector(".score__final")) {
                presenceData.state =
                    Number(document
                        .querySelector(".game-info__section--round .game-info__value")
                        .textContent.split(" / ")[0]) +
                        1 +
                        " of 5, " +
                        document.querySelector(".game-info__section--score .game-info__value")
                            .textContent +
                        " points";
                if (document
                    .querySelector(".game-info__section--round .game-info__value")
                    .textContent.split(" / ")[0] === "5") {
                    presenceData.state =
                        "Finished, " +
                            document.querySelector(".game-info__section--score .game-info__value").textContent +
                            " points";
                }
            }
            else {
                presenceData.state =
                    document
                        .querySelector(".game-info__section--round .game-info__value")
                        .textContent.split(" / ")[0] +
                        " of 5, " +
                        document.querySelector(".game-info__section--score .game-info__value")
                            .textContent +
                        " points";
            }
        };
    }
    else if (href.pathname === "/") {
        presenceData.details = "Viewing the home page";
    }
    else if (href.pathname === "/maps" || href.pathname === "/maps/") {
        presenceData.details = "Looking for a map";
    }
    else if (href.pathname.startsWith("/maps")) {
        if (document.querySelector(".map__title")) {
            presenceData.details = "Viewing a map";
            presenceData.state = document.querySelector(".map__title").textContent;
        }
        else {
            presenceData.details = "Looking for a map";
        }
    }
    else if (href.pathname.startsWith("/user/")) {
        presenceData.details = "Viewing a user profile";
        presenceData.state = document.querySelector(".profile-summary__nick").textContent;
    }
    else if (href.pathname.startsWith("/daily-challenges")) {
        presenceData.details = "Viewing a page";
        presenceData.state = "Daily Challenges";
    }
    else if (href.pathname.startsWith("/pro")) {
        presenceData.details = "Viewing a page";
        presenceData.state = "PRO Membership";
    }
    else if (href.pathname.startsWith("/static")) {
        const pageNames = {
            "faq.html": "FAQ",
            "terms.html": "Terms of Service",
            "privacy.html": "Privacy Policy"
        };
        presenceData.details = "Viewing a page";
        presenceData.state = pageNames[href.pathname.split("/")[2]];
    }
    else if (href.pathname.startsWith("/me")) {
        if (href.pathname.split("/")[2] === undefined) {
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
            presenceData.state = pageNames[href.pathname.split("/")[2]];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2IsT0FBTyxFQUFFLGlCQUEyQjtJQUNwQyxLQUFLLEVBQUUsSUFBYztJQUNyQixhQUFhLEVBQUUsSUFBYztJQUM3QixjQUFjLEVBQUUsYUFBdUI7SUFDdkMsWUFBWSxFQUFFLElBQWM7Q0FDN0IsRUFDRCxjQUFjLEdBQUc7SUFDZixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQztBQUtKLFNBQVMsU0FBUztJQUNoQixZQUFZLEdBQUc7UUFDYixPQUFPLEVBQUUsaUJBQTJCO1FBQ3BDLEtBQUssRUFBRSxJQUFjO1FBQ3JCLGFBQWEsRUFBRSxJQUFjO1FBQzdCLGNBQWMsRUFBRSxhQUF1QjtRQUN2QyxZQUFZLEVBQUUsSUFBYztLQUM3QixDQUFDO0FBQ0osQ0FBQztBQUtELFNBQVMsU0FBUztJQUNoQixJQUFJLFlBQVksQ0FBQyxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU8s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