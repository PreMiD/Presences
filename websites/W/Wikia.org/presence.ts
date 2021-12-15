const presence = new Presence({
    clientId: "850759953718575224"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let currentURL = new URL(document.location.href),
  currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/"),
  presenceData: PresenceData = {
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
  prepare = async (): Promise<void> => {
    presence.info("Running...");

    if (currentURL.host === "www.wikia.org") {
      /*

		Chapter 1
		This one is for the front page of Wikia.org.
		
		*/

      if (currentPath[0] === "") presenceData.details = "On the index page";
      else if (currentPath[0] === "signin") presenceData.details = "Signing in";
      else if (currentPath[0] === "register")
        presenceData.details = "Registering an account";
    } else if (currentPath.includes("wiki")) {
      /*

		Chapter 2
		This one is for the wiki part on the Wikia.org.
		
		*/

      const mwConfig = await presence.getPageletiable('mw"]["config"]["values'),
        siteName = mwConfig.wgSiteName,
        lang = currentPath[0] === "wiki" ? "en" : currentPath[0],
        actionResult = (): string =>
          getURLParam("action") || getURLParam("veaction") || mwConfig.wgAction,
        titleFromURL = (): string => {
          const raw = mwConfig.wgPageName;
          return decodeURIComponent(raw.replace(/_/g, " "));
        },
        title = document.querySelector("h1")
          ? document.querySelector("h1").textContent.trim()
          : titleFromURL(),
        /**
         * Returns details based on the namespace.
         * @link https://en.wikipedia.org/wiki/Wikipedia:Namespace
         */
        namespaceDetails = (): string => {
          // Hardcoded IDs are used for namespaces that are usually consistent.
          // For others, use the canonical names as the keys. They will always be English.

          const details: { [index: string]: string } = {
              "-2": "Viewing a media",
              "-1": "Viewing a special page",
              0: "Reading an article",
              1: "Viewing a talk page",
              2: "Viewing a user page",
              3: "Viewing a user talk page",
              4: "Viewing a project page",
              5: "Viewing a project talk page",
              6: "Viewing a file",
              7: "Viewing a file talk page",
              8: "Viewing an interface page",
              9: "Viewing an interface talk page",
              10: "Viewing a template",
              11: "Viewing a template talk page",
              12: "Viewing a help page",
              13: "Viewing a help talk page",
              14: "Viewing a category",
              15: "Viewing a category talk page",
              110: "Viewing a forum page",
              111: "Viewing a forum talk page",
              420: "Viewing a GeoJson page",
              421: "Viewing a GeoJson talk page",
              500: "Viewing a user blog", // handled again by function below
              501: "Viewing a user blog comment", // depercated, redirected
              502: "Viewing a blog",
              503: "Viewing a blog talk page",
              710: "Viewing a media's subtitles",
              711: "Viewing a media's subtitles talk page",
              828: "Viewing a module",
              829: "Viewing a module talk page",
              1200: "Viewing a message wall",
              1201: "Viewing a thread",
              1202: "Viewing a message wall greeting",
              2000: "Viewing a forum board", // depercated, redirected
              2001: "Viewing a forum board thread", // depercated, redirected
              2002: "Viewing a forum topic", // depercated, redirected
              2300: "Viewing a gadget",
              2301: "Viewing a gadget talk page",
              2302: "Viewing a gadget definition page",
              2303: "Viewing a gadget definition talk page",
              Portal: "Viewing a portal",
              "Portal talk": "Viewing a portal talk page"
            },
            canonicalNamespace = mwConfig.wgCanonicalNamespace.replace(
              /_/g,
              " "
            );
          return (
            details[mwConfig.wgNamespaceNumber] ||
            details[canonicalNamespace] ||
            `Viewing a/an ${canonicalNamespace} page`
          );
        };

      if (mwConfig.wgIsMainPage && actionResult() === "view")
        presenceData.details = "On the main page";
      else if (document.querySelector(".unified-search__form")) {
        presenceData.details = "Searching for a page";
        presenceData.state = (
          document.querySelector(
            ".unified-search__input__query"
          ) as HTMLInputElement
        ).value;
      } else if (actionResult() === "history") {
        presenceData.details = "Viewing revision history";
        presenceData.state = titleFromURL();
      } else if (getURLParam("diff")) {
        presenceData.details = "Viewing difference between revisions";
        presenceData.state = titleFromURL();
      } else if (getURLParam("oldid")) {
        presenceData.details = "Viewing an old revision of a page";
        presenceData.state = titleFromURL();
      } else if (namespaceDetails() === "Viewing a user blog") {
        if (title) {
          presenceData.details = "Reading a user blog post";
          presenceData.state = `${title} by ${
            document.querySelector(".page-header__blog-post-details")
              .firstElementChild.textContent
          }`;
        } else {
          presenceData.details = namespaceDetails();
          presenceData.state = titleFromURL();
        }
      } else if (
        document.querySelector("#ca-ve-edit") ||
        getURLParam("veaction")
      ) {
        presenceData.state = `${
          title.toLowerCase() === titleFromURL().toLowerCase()
            ? `${title}`
            : `${title} (${titleFromURL()})`
        }`;
        updateCallback.function = (): void => {
          if (actionResult() === "edit" || actionResult() === "editsource")
            presenceData.details = "Editing a page";
          else presenceData.details = namespaceDetails();
        };
      } else {
        if (actionResult() === "edit") {
          presenceData.details = document.querySelector("#ca-edit")
            ? "Editing a page"
            : "Viewing source";
          presenceData.state = titleFromURL();
        } else {
          presenceData.details = namespaceDetails();
          presenceData.state = `${
            title.toLowerCase() === titleFromURL().toLowerCase()
              ? `${title}`
              : `${title} (${titleFromURL()})`
          }`;
        }
      }

      if (presenceData.state) presenceData.state += ` | ${siteName}`;
      else presenceData.state = siteName;

      if (lang !== "en") {
        if (presenceData.state) presenceData.state += ` (${lang})`;
        else presenceData.details += ` (${lang})`;
      }
    }
  };

(async (): Promise<void> => {
  await prepare();

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
})();
