var presence = new Presence({
  clientId: "654906151523057664"
});

var currentURL = new URL(document.location.href),
  currentPath = currentURL.pathname.slice(1).split("/"),
  browsingStamp = Math.floor(Date.now() / 1000),
  presenceData: presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  },
  updateCallback = {
    _function: null as Function,
    get function(): Function {
      return this._function;
    },
    set function(parameter) {
      this._function = parameter;
    },
    get present(): boolean {
      return this._function !== null;
    }
  };

/**
 * Initialize/reset presenceData.
 */
function resetData(): void {
  currentURL = new URL(document.location.href);
  currentPath = currentURL.pathname.slice(1).split("/");
  presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
}

((): void => {
  let loadedPath = [],
    presenceDataPlaced: presenceData = {};

  updateCallback.function = (): void => {
    if (loadedPath !== currentPath) {
      loadedPath = currentPath;

      if (currentPath[0] === "") {
        presenceData.details = "Viewing the home page";
      } else if (currentPath[0] === "game") {
        presenceData.details = document.querySelector(
          ".game-status[data-qa=map-name] .game-status__body"
        ).textContent;
        if (document.querySelector(".result")) {
          presenceData.state =
            Number(
              document
                .querySelector(
                  ".game-status[data-qa=round-number] .game-status__body"
                )
                .textContent.split(" / ")[0]
            ) +
            1 +
            " of 5, " +
            document.querySelector(
              ".game-status[data-qa=score] .game-status__body"
            ).textContent +
            " points";
          if (
            document
              .querySelector(
                ".game-status[data-qa=round-number] .game-status__body"
              )
              .textContent.split(" / ")[0] === "5"
          ) {
            presenceData.state =
              "Finished, " +
              document.querySelector(
                ".game-status[data-qa=score] .game-status__body"
              ).textContent +
              " points";
          }
        } else {
          presenceData.state =
            document
              .querySelector(
                ".game-status[data-qa=round-number] .game-status__body"
              )
              .textContent.split(" / ")[0] +
            " of 5, " +
            document.querySelector(
              ".game-status[data-qa=score] .game-status__body"
            ).textContent +
            " points";
        }
      } else if (currentPath[0] === "maps" && !currentPath[1]) {
        presenceData.details = "Looking for a map";
      } else if (currentPath[0] === "maps") {
        if (document.querySelector(".map-block__title")) {
          presenceData.details = "Viewing a map";
          presenceData.state = document.querySelector(
            ".map-block__title"
          ).textContent;
        } else {
          presenceData.details = "Looking for a map";
        }
      } else if (currentPath[0] === "user") {
        presenceData.details = "Viewing a user profile";
        presenceData.state = document.querySelector(
          ".profile-summary__nick"
        ).textContent;
      } else if (currentPath[0] === "daily-challenges") {
        presenceData.details = "Viewing a page";
        presenceData.state = "Daily Challenges";
      } else if (currentPath[0] === "pro") {
        presenceData.details = "Viewing a page";
        presenceData.state = "PRO Membership";
      } else if (currentPath[0] === "static") {
        const pageNames = {
          "faq.html": "FAQ",
          "terms.html": "Terms of Service",
          "privacy.html": "Privacy Policy"
        };
        presenceData.details = "Viewing a page";
        presenceData.state = pageNames[currentURL.pathname.split("/")[2]];
      } else if (currentPath[0] === "me") {
        if (currentPath[2] === undefined) {
          presenceData.details = "Viewing their own profile";
        } else {
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
      } else if (currentPath[0] === "signin") {
        presenceData.details = "Signing in";
      } else if (currentPath[0] === "signup") {
        presenceData.details = "Registering an account";
      } else if (currentPath[0] === "free") {
        presenceData.details = "Viewing a page";
        presenceData.state = "GeoGuessr Free";
      }

      presenceDataPlaced = presenceData;
    } else {
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
} else {
  presence.on("UpdateData", async () => {
    presence.setActivity(presenceData);
  });
}
