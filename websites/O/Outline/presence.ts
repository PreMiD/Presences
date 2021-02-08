const presence = new Presence({
  clientId: "715602476249776239"
});

let currentURL = new URL(document.location.href),
  currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
const browsingStamp = Math.floor(Date.now() / 1000);
let presenceData: PresenceData = {
  details: "Viewing an unsupported page",
  largeImageKey: "lg",
  startTimestamp: browsingStamp
};
const updateCallback = {
    _function: null as () => void,
    get function(): () => void {
      return this._function;
    },
    set function(parameter) {
      this._function = parameter;
    },
    get present(): boolean {
      return this._function !== null;
    }
  },
  /**
   * Initialize/reset presenceData.
   */
  resetData = (
    defaultData: PresenceData = {
      details: "Viewing an unsupported page",
      largeImageKey: "lg",
      startTimestamp: browsingStamp
    }
  ): void => {
    currentURL = new URL(document.location.href);
    currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
    presenceData = { ...defaultData };
  };

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
    let loadedPath: string,
      forceUpdate = false,
      presenceDataPlaced: PresenceData = {};
    updateCallback.function = (): void => {
      if (loadedPath !== currentURL.pathname || forceUpdate) {
        loadedPath = currentURL.pathname;
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
  const defaultData = { ...presenceData };
  presence.on("UpdateData", async () => {
    resetData(defaultData);
    updateCallback.function();
    presence.setActivity(presenceData);
  });
} else {
  presence.on("UpdateData", async () => {
    presence.setActivity(presenceData);
  });
}
