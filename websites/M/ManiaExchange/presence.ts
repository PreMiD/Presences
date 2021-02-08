const presence = new Presence({
  clientId: "731069087031230487"
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
  },
  /**
   * Search for URL parameters.
   * @param urlParam The parameter that you want to know about the value.
   */
  getURLParam = (urlParam: string): string => {
    return currentURL.searchParams.get(urlParam);
  },
  /**
   * Get timestamps based on the video element.
   * @param {Number} videoTime Current video time seconds.
   * @param {Number} videoDuration Video duration seconds.
   */
  getTimestamps = (videoTime: number, videoDuration: number): Array<number> => {
    const startTime = Date.now(),
      endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  };

((): void => {
  if (
    currentURL.hostname.startsWith("mania") ||
    currentURL.hostname.startsWith("www")
  ) {
    if (currentPath[0] === "") {
      presenceData.details = "On the portal";
    } else if (currentPath[0] === "tac.html") {
      presenceData.details = "Viewing a page";
      presenceData.details = "Terms and Conditions";
    } else if (currentPath[0] === "privacy.html") {
      presenceData.details = "Viewing a page";
      presenceData.details = "Privacy Policy";
    }
  } else if (
    currentURL.hostname.startsWith("tm.") ||
    currentURL.hostname.startsWith("sm") ||
    currentURL.hostname.startsWith("trackmania")
  ) {
    /**
     * Choose between two strings based on the website.
     * @param tm String for TrackMania²
     * @param sm String for ShootMania
     */
    const chooseTwo = (tm: string, sm: string): string => {
      return presenceData.smallImageKey === "tm" ? tm : sm;
    };

    switch (currentURL.hostname.split(".")[0]) {
      case "tm":
        presenceData.smallImageKey = "tm";
        presenceData.smallImageText = "TrackMania²";
        break;
      case "sm":
        presenceData.smallImageKey = "sm";
        presenceData.smallImageText = "ShootMania";
        break;
      case "trackmania":
        presenceData.smallImageKey = "tm-2020";
        presenceData.smallImageText = "Trackmania (2020)";
        presenceData.largeImageKey = "tmx";
        break;
    }

    if (currentPath[0] === "error") {
      presenceData.details = "On a non-existent page";
    } else if (currentPath[0] === "" || currentPath[0] === "home") {
      if (currentPath[1] === "rules") {
        presenceData.details = "Viewing a page";
        presenceData.state = "Rules & Guidelines"; // actually "Guildelines" on the page
      } else if (currentPath[1] === "about") {
        presenceData.details = "Viewing a page";
        presenceData.state = "About";
      } else {
        presenceData.details = "On the home page";
      }
    } else if (currentPath[0] === "auth") {
      presenceData.details = "Logging in";
    } else if (currentPath[0] === "tracks" || currentPath[0] === "maps") {
      presenceData.details = document
        .querySelector(".panelbox-heading h1")
        .textContent.trim();
      presenceData.state = document
        .querySelector(".panelbox-stats a[id^='user-']")
        .textContent.trim();
    } else if (
      currentPath[0] === "tracksearch2" ||
      currentPath[0] === "mapsearch2" ||
      currentPath[0] === "ts" ||
      currentPath[0] === "ms"
    ) {
      updateCallback.function = (): void => {
        presenceData.details = chooseTwo(
          "Searching for a track",
          "Searching for a map"
        );
        presenceData.state = getURLParam("trackname") || undefined;
      };
    } else if (
      currentPath[0] === "tracksearch" ||
      currentPath[0] === "mapsearch"
    ) {
      const searchSummary: string = document
        .querySelector("td.WindowText:nth-child(2)")
        .textContent.trim()
        .slice(8);
      presenceData.details = chooseTwo(
        "Searching for a track",
        "Searching for a map"
      );
      if ((document.querySelector("#TrackName") as HTMLInputElement).value)
        presenceData.state = `${
          (document.querySelector("#TrackName") as HTMLInputElement).value
        }, ${searchSummary}`;
      else
        presenceData.state =
          searchSummary[0].toUpperCase() + searchSummary.slice(1);
    } else if (currentPath[0] === "mappacksearch") {
      // Valid on TrackMania² and Trackmania (2020) only
      updateCallback.function = (): void => {
        presenceData.details = "Searching for a mappack";
        presenceData.state = getURLParam("name") || undefined;
      };
    } else if (currentPath[0] === "mappack") {
      // Valid on TrackMania² and Trackmania (2020) only
      if (currentPath[1] === "create") {
        presenceData.details = "Creating a mappack";
      } else if (currentPath[1] === "view") {
        presenceData.details = document
          .querySelector(".WindowText td:nth-of-type(2)")
          .textContent.trim();
        presenceData.state = `${document
          .querySelector(".WindowText:nth-of-type(2) td:nth-of-type(2)")
          .textContent.trim()} (mappack)`;
      }
    } else if (currentPath[0] === "upload") {
      // Valid on TrackMania² and Trackmania (2020) only
      if (currentPath[1] === "track") {
        presenceData.details = "Uploading a track";
      } else if (currentPath[1] === "replay") {
        presenceData.details = "Uploading a replay";
      }
    } else if (currentPath[0] === "recordsearch") {
      // Valid on TrackMania² and Trackmania (2020) only
      updateCallback.function = (): void => {
        presenceData.details = "Searching for a record";
        presenceData.state = getURLParam("name") || undefined;
      };
    } else if (currentPath[0] === "leaderboard") {
      // Valid on TrackMania² and Trackmania (2020) only
      const searchSummary = document
        .querySelector(".windowv2-textcontainer")
        .textContent.slice(17, this.length - 4);
      presenceData.details = "Viewing the leaderboards";
      if ((document.querySelector("#DriverName") as HTMLInputElement).value)
        presenceData.state = `${
          (document.querySelector("#DriverName") as HTMLInputElement).value
        }, ${searchSummary}`;
      else
        presenceData.state =
          searchSummary[0].toUpperCase() + searchSummary.slice(1);
    } else if (currentPath[0] === "reports") {
      if (currentPath[1] === "compose") {
        presenceData.details = "Reporting something";
      } else if (currentPath[1] === "my-reports") {
        presenceData.details = "Viewing reports";
      } else {
        presenceData.details = "Viewing a report";
      }
    } else if (currentPath[0] === "forums") {
      presenceData.details = "Viewing the forums";
      presenceData.state = document
        .querySelector(".windowv2-header")
        .textContent.trim();
      if (presenceData.state === "Community forums") delete presenceData.state;
    } else if (currentPath[0] === "threads") {
      if (currentPath[1] === "new-thread") {
        presenceData.details = "Writing a new thread";
      } else if (currentPath[1] === "new-post") {
        presenceData.details = "Replying to a thread";
      } else {
        presenceData.details = "Viewing a thread";
        presenceData.state = document
          .querySelector(".windowv2-header")
          .textContent.trim();
      }
    } else if (currentPath[0] === "posts") {
      if (currentPath[1] === "edit") {
        presenceData.details = "Editing a post";
      }
    } else if (currentPath[0] === "blogs") {
      if (currentPath[1] === "entry") {
        presenceData.details = "Reading a blog entry";
        presenceData.state = document
          .querySelector(".windowv2-header")
          .textContent.trim();
      } else if (currentPath[1] === "search") {
        presenceData.details = "Searching for a blog entry";
      } else {
        presenceData.details = "Viewing the blog";
      }
    } else if (currentPath[0] === "user") {
      if (currentPath[1] === "search") {
        const searchSummary = document
            .querySelector(".windowv2-textcontainer")
            .textContent.trim()
            .split(" ...")[0]
            .slice(15),
          usernameSearched = (document.querySelector(
            "#UserUsername"
          ) as HTMLInputElement).value;
        presenceData.details = "Searching for a user";
        if (usernameSearched)
          presenceData.state = `${usernameSearched}, ${searchSummary.slice(
            usernameSearched.length + 30
          )}`;
        else
          presenceData.state =
            searchSummary[0].toUpperCase() + searchSummary.slice(1);
      } else if (currentPath[1] === "team") {
        presenceData.details = "Viewing the team behind the site";
        presenceData.state = "(MX Crew)";
      } else if (currentPath[1] === "online") {
        presenceData.details = "Viewing active users";
      } else if (currentPath[1] === "profile") {
        presenceData.details = "Viewing a user profile";
        presenceData.state = document.querySelector(
          ".WindowText .RowModCell_1:nth-of-type(2) a:nth-of-type(3)"
        ).textContent;
      } else if (currentPath[1] === "edit") {
        presenceData.details = "Editing their account information";
      }
    } else if (currentPath[0] === "support") {
      presenceData.details = "Viewing a page";
      presenceData.state = "Support";
    } else if (currentPath[0] === "messaging") {
      if (currentPath[1] === "index" || currentPath[1] === undefined)
        presenceData.details = "Viewing thier private messages";
      else if (currentPath[1] === "compose")
        presenceData.details = "Writing a private message";
      else if (currentPath[1] === "reply")
        presenceData.details = "Replying a private message";
      else presenceData.details = "Viewing a private message";
    } else if (currentPath[0] === "media") {
      presenceData.details = "Viewing a page";
      presenceData.state = "Media";
    } else if (currentPath[0] === "api") {
      presenceData.details = "Viewing a page";
      presenceData.state = "API";
    } else if (currentPath[0] === "statistics") {
      presenceData.details = "Viewing statistics";
      presenceData.state = document
        .querySelector(".windowv2-header")
        .textContent.trim();
      if (presenceData.state === "Statistics") delete presenceData.state;
    }
  } else if (currentURL.hostname.startsWith("item")) {
    presenceData.smallImageKey = "lg";
    presenceData.smallImageText = "ItemExchange";
    presenceData.largeImageKey = "item";

    if (currentPath[0] === "error") {
      presenceData.details = "On a non-existent page";
    } else if (
      (currentPath[0] === "" || currentPath[0] === "home") &&
      currentPath.length === 1
    ) {
      presenceData.details = "On the home page";
    } else if (currentPath[0] === "auth") {
      presenceData.details = "Logging in";
    } else if (currentPath[0].toLowerCase() === "item") {
      presenceData.details = document.querySelector("h3").textContent;
      presenceData.state = document
        .querySelector(".panel-body dd:nth-of-type(2)")
        .textContent.trim();
    } else if (currentPath[0].toLowerCase() === "set") {
      presenceData.details = document.querySelector("h3").textContent;
      presenceData.state = `${document
        .querySelector(".panel-body dd:nth-of-type(2)")
        .textContent.trim()} (set)`;
    } else if (currentPath[0] === "itemsearch") {
      updateCallback.function = (): void => {
        presenceData.details = "Searching for an item";
        presenceData.state = getURLParam("itemname") || undefined;
      };
    } else if (currentPath[0] === "setsearch") {
      updateCallback.function = (): void => {
        presenceData.details = "Searching for a set";
        presenceData.state = getURLParam("setname") || undefined;
      };
    } else if (currentPath[0] === "blocks") {
      presenceData.details = "Searching for a block";
    } else if (currentPath[0] === "forum") {
      presenceData.details = "Viewing the forums";
      presenceData.state = document
        .querySelector(".windowv2-header")
        .textContent.trim();
      if (presenceData.state === "Community Forums") delete presenceData.state;
    } else if (currentPath[0] === "threads") {
      presenceData.details = "Viewing a thread";
      presenceData.state = document
        .querySelector(".windowv2-header")
        .textContent.trim();
    } else if (currentPath[0] === "usersearch") {
      const details = [];
      if ((document.querySelector("#username") as HTMLInputElement).textContent)
        details.push(
          (document.querySelector("#username") as HTMLInputElement).textContent
        );
      if (document.querySelector("#s2id_mode").textContent)
        details.push(document.querySelector("#s2id_mode").textContent.slice(1));
      presenceData.details = "Searching for a user";
      if (details.length !== 0) presenceData.state = details.join(", ");
    } else if (currentPath[0] === "user") {
      if (currentPath[1] === "profile") {
        presenceData.details = "Viewing a user profile";
        presenceData.state = document.querySelector(
          ".WindowText .RowModCell_1:nth-of-type(2) a:nth-of-type(3)"
        ).textContent;
      } else if (currentPath[1] === "edit") {
        presenceData.details = "Editing their account information";
      }
    } else if (currentPath[0] === "messaging") {
      if (currentPath[1] === "index" || currentPath[1] === undefined)
        presenceData.details = "Viewing thier private messages";
      else if (currentPath[1] === "compose")
        presenceData.details = "Writing a private message";
      else if (currentPath[1] === "reply")
        presenceData.details = "Replying a private message";
      else presenceData.details = "Viewing a private message";
    } else if (currentPath[0] === "faq") {
      presenceData.details = "Viewing a page";
      presenceData.state = "FAQ";
    } else if (currentPath[0] === "rules") {
      presenceData.details = "Viewing a page";
      presenceData.state = "Rules";
    }
  } else if (currentURL.hostname.startsWith("accounts")) {
    presenceData.smallImageKey = "accounts";
    presenceData.smallImageText = "Accounts";

    if (currentPath[0] === "auth") {
      if (currentPath[1] === "login") {
        presenceData.details = "Logging in";
      } else if (
        currentPath[1] === "register" ||
        currentPath[1] === "resend_confirm"
      ) {
        presenceData.details = "Registering an account";
      } else if (currentPath[1] === "forgot") {
        presenceData.details = "Figuring out the password";
      }
    } else if (currentPath[0] === "user") {
      presenceData.details = "Configuring their account";
    }
  } else if (currentURL.hostname.startsWith("tmtube")) {
    presenceData.smallImageKey = "lg";
    presenceData.smallImageText = "TMTube Archive";
    presenceData.largeImageKey = "tmtube";

    updateCallback.function = (): void => {
      if (currentPath[0] === "") {
        presenceData.details = "On the home page";
      } else if (currentPath[0] === "view") {
        presenceData.details = document.querySelector("h2").textContent.trim();
        presenceData.state = document
          .querySelector(".box-user h2")
          .textContent.trim();
        try {
          if (
            document
              .querySelector(".mejs__playpause-button button")
              .getAttribute("aria-label") === "Pause"
          ) {
            const video: HTMLVideoElement = document.querySelector("video"),
              timestamps = getTimestamps(
                Math.floor(video.currentTime),
                Math.floor(video.duration)
              );
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
          } else {
            delete presenceData.startTimestamp;
          }
        } catch (e) {
          delete presenceData.startTimestamp;
        }
      } else if (currentPath[0] === "search") {
        presenceData.details = "Searching for a video";
        presenceData.state = getURLParam("query");
      }
    };
  } else if (currentURL.hostname.startsWith("api")) {
    presenceData.smallImageKey = "api";
    presenceData.smallImageText = "API Documentation";

    if (currentPath[0] === "") {
      presenceData.details = "On the home page";
    } else if (currentPath[0] === "documents") {
      presenceData.details = "Viewing a page";
      switch (currentPath[1]) {
        case "reference":
          presenceData.state = "API Reference";
          break;
        case "enum":
          presenceData.state = "Enumeration values";
          break;
        case "conventions":
          presenceData.state = "Conventions";
          break;
        case "changes":
          presenceData.state = "Changes";
          break;
      }
    }
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
