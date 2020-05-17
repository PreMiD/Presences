var presence = new Presence({
  clientId: "644400074008297512"
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

/**
 * Search for URL parameters.
 * @param urlParam The parameter that you want to know about the value.
 */
function getURLParam(urlParam: string): string {
  return currentURL.searchParams.get(urlParam);
}

/**
 * Get timestamps based on the video element.
 * @param {Number} videoTime Current video time seconds.
 * @param {Number} videoDuration Video duration seconds.
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

((): void => {
  if (currentURL.host === "www.fandom.com") {
    //
    // Chapter 1
    // This one is for the editorial part of Fandom.
    //
    if (currentPath[0] === "") {
      presenceData.details = "Index";
    } else if (currentPath[0] === "signin") {
      presenceData.details = "Signing in";
    } else if (currentPath[0] === "register") {
      presenceData.details = "Registering an account";
    } else if (currentPath[0] === "articles") {
      presenceData.details = "Reading an article";
      presenceData.state = document.querySelector(
        ".article-header__title"
      ).textContent;
    } else if (currentPath[0] === "topics") {
      presenceData.details = "Viewing a topic";
      presenceData.state = document.querySelector(
        ".topic-header__title"
      ).firstElementChild.innerHTML;
    } else if (currentPath[0] === "video") {
      updateCallback.function = (): void => {
        presenceData.details = "Watching a video";
        presenceData.state = document.querySelector(
          ".video-page-featured-player__title"
        ).textContent;
        try {
          if (
            document
              .querySelector(".jw-icon-playback")
              .getAttribute("aria-label") === "Pause"
          ) {
            const video = document.querySelector(".jw-video");
            const timestamps = getTimestamps(
              Math.floor(video.currentTime),
              Math.floor(video.duration)
            );
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
          } else {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        } catch (e) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      };
    } else if (currentPath[0] === "curated") {
      presenceData.details = "Viewing a curation";
      presenceData.state = document.querySelector(".card__title").textContent;
    } else if (currentPath[0] === "u") {
      presenceData.details = "Viewing a profile page";
      presenceData.state = `${
        document.querySelector(".profile-info-card__name").textContent
      } (${
        document.querySelector(".profile-info-card__username").textContent
      })`;
    } else {
      presenceData.details = "Viewing a page";
      if (currentPath[0] === "explore") presenceData.state = "Explore";
      else if (currentPath[0] === "about") presenceData.state = "About";
      else if (currentPath[0] === "carriers") presenceData.state = "Carriers";
      else if (currentPath[0] === "terms-of-use")
        presenceData.state = "Terms of Use";
      else if (currentPath[0] === "privacy-policy")
        presenceData.state = "Privacy Policy";
      else if (currentPath[0] === "mediakit") presenceData.state = "Media Kit";
      else if (currentPath[0] === "local-sitemap")
        presenceData.state = "Local Sitemap";
    }
  } else if (currentPath.includes("wiki")) {
    //
    // Chapter 2
    // This one is for the wiki part on the Fandom, which was Wikia a while ago.
    //
    let title: string, sitename: string;
    const actionResult = getURLParam("action") || getURLParam("veaction");
    const titleFromURL = (): string => {
      let raw: string;
      //var lang: string
      if (currentPath[0] === "wiki") {
        raw = currentURL.pathname.slice(6);
      } else {
        // lang = currentPath[0]
        raw = currentPath[2];
      }
      if (raw.includes("_")) return raw.replace(/_/g, " ");
      else return raw;
    };

    try {
      title = document.querySelector(".page-header__title").innerHTML;
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
      "Category talk": "Viewing a category talk page",
      Blog: "Viewing a blog",
      "Message Wall": "Viewing a message wall",
      Thread: "Viewing a forum thread",
      Board: "Viewing a forum board",
      Topic: "Viewing a forum topic"
    };

    if (title === "Home") {
      sitename = document.querySelector("meta[property='og:title']").content;
      presenceData.state = "Home";
      delete presenceData.details;
    } else if (actionResult == "history") {
      presenceData.details = "Viewing revision history";
      presenceData.state = titleFromURL();
    } else if (actionResult == "edit") {
      // if (currentURL.searchParams.has("action")) title = document.querySelector("#EditPageHeader").children[2].textContent
      presenceData.details = "Editing a wiki page";
      presenceData.state = titleFromURL();
    } else if (currentURL.pathname.includes("User_blog:")) {
      if (title) {
        presenceData.details = "Reading a user blog post";
        presenceData.state =
          title +
          " by " +
          document.querySelector(".page-header__blog-post-details")
            .firstElementChild.textContent;
      } else {
        presenceData.details = "Viewing a user blog";
        presenceData.state = titleFromURL();
      }
    } else {
      if (namespaceDetails[title.split(":")[0]])
        presenceData.details = namespaceDetails[title.split(":")[0]];
      else presenceData.details = "Reading a wiki page";
      presenceData.state = title;
    }

    presenceData.startTimestamp = browsingStamp;
    presenceData.state += " | " + sitename;
  } else if (currentPath[0] === "f") {
    //
    // Chapter 3
    // This one is for the discussion parts on each wikis.
    //
    const sitename = document
      .querySelector("meta[property='og:title']")
      .content.substring(25)
      .replace(" | Fandom", "");
    updateCallback.function = (): void => {
      if (!currentPath[1]) {
        presenceData.details = "Viewing the discussion page";
        presenceData.state = sitename;
      } else if (currentPath[1] === "p") {
        presenceData.details = "Reading an discussion post";
        presenceData.state = `${
          document.querySelector(".post__title").textContent
        } | ${sitename}`;
      } else if (currentPath[1] === "u") {
        presenceData.details = "Viewing a discussion user page";
        presenceData.state = `${
          document.querySelector(".user-overview__username").textContent
        } | ${sitename}`;
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
