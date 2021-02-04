const presence = new Presence({
  clientId: "731472884337475596"
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
  let title: string;

  const titleFromURL = (): string => {
    const raw = currentPath.slice(1).join("/");
    return decodeURI(raw.replace(/_/g, " "));
  };

  try {
    title = document.querySelector("h1.firstHeading span").textContent;
  } catch (e) {
    title = titleFromURL();
  }

  if (currentPath[0] === "") {
    presenceData.details = "On the main page";
  } else if (document.querySelector(".error_content")) {
    presenceData.details = "On a non-existent page";
  } else if (title) {
    presenceData.details = "Reading a wiki page";
    presenceData.state = title;
    if (currentPath[0] !== "en") presenceData.state += ` (${currentPath[0]})`;
  } else {
    presenceData.details = "Viewing a page";
    presenceData.state = document.title.replace(" - Wikiwand", "");
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
