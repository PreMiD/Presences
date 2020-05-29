var presence = new Presence({
  clientId: "715602476249776239"
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
  if (document.querySelector("outline-not-found")) {
    presenceData.details = "On a non-existent page";
  } else if (currentPath[0] === "terms.html") {
    presenceData.details = "Reading the terms";
  } else if (currentPath[0] === "privacy.html") {
    presenceData.details = "Reading the privacy policy";
  } else if (currentPath[0] === "dmca.html") {
    presenceData.details = "Reading the DMCA page";
  } else if (currentPath[0] === "report.html") {
    presenceData.details = "Reporting an article";
  } else {
    let loadedPath: Array<string> = [],
      forceUpdate = false,
      presenceDataPlaced: presenceData = {};
    updateCallback.function = (): void => {
      if (loadedPath !== currentPath || forceUpdate) {
        loadedPath = currentPath;
        try {
          if (document.querySelector("outline-not-found")) {
            presenceData.details = "On a non-existent page";
          } else if (currentPath[0] === "") {
            presenceData.details = "On the home page";
          } else {
            presenceData.details = document.querySelector("h1").textContent;
            presenceData.state = document
              .querySelector(".publication")
              .textContent.trim()
              .split(" ›")[0];
          }
        } catch (error) {
          forceUpdate = true;
          resetData();
          presenceData.details = "Loading...";
        }
        presenceDataPlaced = presenceData;
        forceUpdate = false;
      } else {
        presenceData = presenceDataPlaced;
      }
    };
  }
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
