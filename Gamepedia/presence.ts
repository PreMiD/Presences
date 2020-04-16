var presence = new Presence({
  clientId: "652880245371699222"
});

var browsingStamp = Math.floor(Date.now() / 1000),
  href = new URL(document.location.href),
  presenceData = {
    details: "In construction" as string,
    state: null as string,
    largeImageKey: "lg" as string,
    startTimestamp: browsingStamp as number,
    endTimestamp: null as number
  },
  updateCallback = {
    _function: null,
    get function(): any {
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
 * Cleans presenceData
 */
function cleanData(): void {
  if (presenceData.state === null) delete presenceData.state;
  if (presenceData.endTimestamp === null) delete presenceData.endTimestamp;
}

((): void => {
  if (href.hostname === "www.gamepedia.com") {
    if (href.pathname === "/") {
      presenceData.state = "Index";
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.details;
    } else if (href.pathname.includes("/twitch-login")) {
      presenceData.details = "Signing in";
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.state;
    } else if (href.pathname.includes("/twitch-signup")) {
      presenceData.details = "Registering an account";
      presenceData.startTimestamp = browsingStamp;
      delete presenceData.details;
    } else if (href.pathname.includes("/news/")) {
      presenceData.details = "Reading an news article";
      presenceData.state = document.querySelector(
        ".p-article-title"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (href.pathname.includes("/blog/")) {
      presenceData.details = "Reading a blog article";
      presenceData.state = document.querySelector(
        ".p-article-title"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (href.pathname.includes("/members/")) {
      presenceData.details = "Reading a blog article";
      presenceData.state = document.querySelector(".username").textContent;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "Viewing a page";
      if (href.pathname.includes("/PRO")) presenceData.state = "Gamepedia PRO";
      else presenceData.state = document.title.split(" - ")[0];
      presenceData.startTimestamp = browsingStamp;
    }
  } else {
    let title: string, sitename: string;
    const actionResult = href.searchParams.get("action"),
      titleFromURL = (): string => {
        let raw: string;
        if (href.pathname.startsWith("/index.php"))
          raw = href.searchParams.get("title");
        else raw = href.pathname.slice(1);
        if (raw.includes("_")) return raw.replace(/_/g, " ");
        else return raw;
      };

    try {
      title = (document.querySelector(
        "meta[property='og:title']"
      ) as HTMLMetaElement).content;
    } catch (e) {
      title = titleFromURL();
    }

    try {
      sitename = (document.querySelector(
        "meta[property='og:site_name']"
      ) as HTMLMetaElement).content;
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

  cleanData();
})();

if (updateCallback.present) {
  presence.on("UpdateData", async () => {
    updateCallback.function();
    presence.setActivity(presenceData);
  });
} else {
  presence.on("UpdateData", async () => {
    presence.setActivity(presenceData);
  });
}
