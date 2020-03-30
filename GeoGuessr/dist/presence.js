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
    clientId: "654906151523057664",
    
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
    if (document.querySelector("section.game")) {
        updateCallback.function = () => {
            presenceData.details = document.querySelector(".game-info__section--map .game-info__value").textContent;
            if (document.querySelector(".score__round") || document.querySelector(".score__final")) {
                presenceData.state = (Number(document.querySelector(".game-info__section--round .game-info__value").textContent.split(" / ")[0]) + 1) + " of 5, " + document.querySelector(".game-info__section--score .game-info__value").textContent + " points";
                if (document.querySelector(".game-info__section--round .game-info__value").textContent.split(" / ")[0] === "5") {
                    presenceData.state = "Finished, " + document.querySelector(".game-info__section--score .game-info__value").textContent + " points";
                }
            }
            else {
                presenceData.state = document.querySelector(".game-info__section--round .game-info__value").textContent.split(" / ")[0] + " of 5, " + document.querySelector(".game-info__section--score .game-info__value").textContent + " points";
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
                "settings": "Settings",
                "leagues": "Leagues",
                "activities": "Activities",
                "current": "Ongoing games",
                "likes": "Favorite maps",
                "badges": "Badges",
                "maps": "My maps",
                "map-maker": "Map Maker"
            };
            presenceData.details = "Viewing a personal page";
            presenceData.state = pageNames[href.pathname.split("/")[2]];
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
    if (presenceData.state === null)
        delete presenceData.state;
    if (presenceData.endTimestamp === null)
        delete presenceData.endTimestamp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFXLGlCQUFpQjtJQUNuQyxLQUFLLEVBQVcsSUFBSTtJQUNwQixhQUFhLEVBQVcsSUFBSTtJQUM1QixjQUFjLEVBQVcsYUFBYTtJQUN0QyxZQUFZLEVBQVcsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTtJQUMvQixDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBRUwsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQzlCLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtZQUN2RyxJQUFJLFFBQVEs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