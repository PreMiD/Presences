var presence = new Presence({
  clientId: "652880245371699222"
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
  if (currentURL.hostname === "www.gamepedia.com") {
    //
    // Chapter 1
    // This part is for the editorial part of Gamepedia.
    //
    if (currentPath[0] === "") {
      presenceData.state = "Index";
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.details;
    } else if (currentPath[0] === "twitch-login") {
      presenceData.details = "Signing in";
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.state;
    } else if (currentPath[0] === "twitch-signup") {
      presenceData.details = "Registering an account";
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.details;
    } else if (currentPath[0] === "news") {
      presenceData.details = "Reading an news article";
      presenceData.state = document.querySelector(
        ".p-article-title"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (currentPath[0] === "blog") {
      presenceData.details = "Reading a blog article";
      presenceData.state = document.querySelector(
        ".p-article-title"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (currentPath[0] === "members") {
      presenceData.details = "Reading a blog article";
      presenceData.state = document.querySelector(".username").textContent;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "Viewing a page";
      if (currentPath[0] === "PRO") presenceData.state = "Gamepedia PRO";
      else presenceData.state = document.title.split(" - ")[0];
      presenceData.startTimestamp = browsingStamp;
    }
  } else {
    //
    // Chapter 2
    // This part is for the wiki part of Gamepedia.
    //
    var title: string,
      sitename: string,
      actionResult = currentURL.searchParams.get("action"),
      titleFromURL = (): string => {
        var raw: string;
        if (currentURL.pathname.startsWith("/index.php"))
          raw = currentURL.searchParams.get("title");
        else raw = currentURL.pathname.slice(1);
        if (raw.includes("_")) return raw.replace(/_/g, " ");
        else return raw;
      };

    try {
      title = document.querySelector("meta[property='og:title']").content;
    } catch (e) {
      title = titleFromURL();
    }

    try {
      sitename = document.querySelector("meta[property='og:site_name']")
        .content;
    } catch (e) {
      sitename = null;
    }

    const namespaceDetails = {
      Media: "Viewing a media",
      Special: "Viewing a special page",
      Talk: "Viewing a talk page",
      User: "Viewing a user page",
      "User talk": "Viewing a user talk page",
      [sitename]: "Viewing a project page",
      [sitename + " talk"]: "Viewing a project talk page",
      File: "Viewing a file",
      "File talk": "Viewing a file talk page",
      MediaWiki: "Viewing a MediaWiki page",
      "MediaWiki talk": "Viewing a MediaWiki talk page",
      Template: "Viewing a template",
      "Template talk": "Viewing a template talk",
      Help: "Viewing a help page",
      "Help talk": "Viewing a help talk page",
      Category: "Viewing a category",
      "Category talk": "Viewing a category talk page"
    };

    if (title === sitename) {
      presenceData.state = "Home";
      delete presenceData.details;
    } else if (actionResult == "history") {
      presenceData.details = "Viewing revision history";
      presenceData.state = title;
    } else if (actionResult == "edit") {
      presenceData.details = "Editing a wiki page";
      presenceData.state = title;
    } else if (title.startsWith("UserProfile:")) {
      presenceData.details = "Viewing a user profile";
      presenceData.state = document.querySelector(".mw-headline").textContent;
    } else {
      if (namespaceDetails[title.split(":")[0]])
        presenceData.details = namespaceDetails[title.split(":")[0]];
      else presenceData.details = "Reading a wiki page";
      presenceData.state = title;
    }

    presenceData.startTimestamp = browsingStamp;
    presenceData.state += " | " + sitename;
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
