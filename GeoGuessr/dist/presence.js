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
        let pageNames = {
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
            let pageNames = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMxQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBQ0wsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQzlCLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUMsNENBQTRDLENBQzVDLENBQUMsV0FBVyxDQUFDO1lBQ2QsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztnQkFD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