const presence = new Presence({
  clientId: "801765062997180437"
});

let currentURL = new URL(document.location.href),
  currentPath = currentURL.pathname.slice(1).split("/");
const browsingStamp = Math.floor(Date.now() / 1000);
let presenceData: PresenceData = {
  details: "Viewing an unsupported page",
  largeImageKey: "kt_logo",
  startTimestamp: browsingStamp
};
const updateCallback = {
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
const resetData = (): void => {
  currentURL = new URL(document.location.href);
  currentPath = currentURL.pathname.slice(1).split("/");
  presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "kt_logo",
    startTimestamp: browsingStamp
  };
};

((): void => {

  if (currentURL.hostname === "memetrolls.net") {
    updateCallback.function = (): void => {
      if (currentPath[0] === "play") {
        presenceData.details = "Playing" + document.title;

    } else if (currentPath[0] === "") {
      presenceData.details = "Choosing a song";
    }
  }
}})

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
