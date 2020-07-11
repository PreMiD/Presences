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
  currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
  presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
};

((): void => {
  let title: string;

  const titleFromURL = (): string => currentPath[1];

  try {
    title = document.querySelector("h1.firstHeading span").textContent;
  } catch (e) {
    title = titleFromURL();
  }

  if (currentPath[0] === "") {
    presenceData.details = "On the home page";
  } else if (document.querySelector(".error_content")) {
    presenceData.details = "On a non-existent page";
  } else if (currentPath[0] === "news") {
    presenceData.details = "Viewing a page";
    presenceData.state = "Wikiwand Today";
  } else if (currentPath[0] === "about") {
    presenceData.details = "Viewing a page";
    presenceData.state = "About";
  } else if (currentPath[0] === "press") {
    presenceData.details = "Viewing a page";
    presenceData.state = "Press";
  } else if (currentPath[0] === "terms") {
    presenceData.details = "Viewing a page";
    presenceData.state = "Terms of Service";
  } else if (currentPath[0] === "privacy") {
    presenceData.details = "Viewing a page";
    presenceData.state = "Privacy Policy";
  } else {
    presenceData.details = "Reading a wiki page";
    presenceData.state = title;
  }

  console.log(presenceData);
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
