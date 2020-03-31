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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2IsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNmLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDO0lBQ2pDLENBQUM7Q0FDRixDQUFDO0FBRUosQ0FBQyxHQUFHLEVBQUU7SUFDSixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDMUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDN0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQyw0Q0FBNEMsQ0FDN0MsQ0FBQyxXQUFXLENBQUM7WUFDZCxJQUNFLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDO2dCQUN2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