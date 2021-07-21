if (
  document.location.pathname.includes("/wiki/")
    ? document.querySelector(".skin-hydra") ||
      ((document.querySelector(".skin-fandomdesktop") ||
        document.querySelector(".skin-fandommobile")) &&
        document.querySelector(".is-gamepedia"))
    : true
) {
  ((): void => {
    const presence = new Presence({
        clientId: "652880245371699222"
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
      };

    ((): void => {
      presence.info("Running...");

      if (currentURL.hostname === "www.gamepedia.com") {
        /*

		Chapter 1
		This part is for the editorial part of Gamepedia.
		
		*/

        if (currentPath[0] === "") presenceData.details = "On the index page";
        else if (currentPath[0] === "news") {
          presenceData.details = "Reading an news article";
          presenceData.state =
            document.querySelector(".p-article-title").textContent;
        } else if (currentPath[0] === "blog") {
          presenceData.details = "Reading a blog article";
          presenceData.state =
            document.querySelector(".p-article-title").textContent;
        } else if (currentPath[0] === "members") {
          presenceData.details = "Reading a blog article";
          presenceData.state = document.querySelector(".username").textContent;
        } else {
          presenceData.details = "Viewing a page";
          if (currentPath[0] === "PRO") presenceData.state = "Gamepedia PRO";
          else [presenceData.state] = document.title.split(" - ");
        }
      } else if (currentURL.hostname === "fandomauth.gamepedia.com") {
        if (currentPath[0] === "signin") presenceData.details = "Signing in";
        else if (currentPath[0] === "register")
          presenceData.details = "Registering an account";
      } else {
        /*

		Chapter 2
		This part is for the wiki part of Gamepedia.
		
		*/

        let title: string, sitename: string;
        const actionResult = (): string =>
            getURLParam("action") || getURLParam("veaction"),
          lang = currentPath[0] === "wiki" ? "en" : currentPath[0],
          titleFromURL = (): string => {
            const raw: string =
              currentPath[0] === "index.php"
                ? getURLParam("title")
                : currentPath[0] === "wiki"
                ? currentPath.slice(1).join("/")
                : currentPath.slice(2).join("/");
            //let lang: string = currentPath[0]
            return decodeURIComponent(raw.replace(/_/g, " "));
          };

        try {
          title = document.querySelector("h1").textContent.trim();
        } catch (e) {
          title = titleFromURL();
        }

        try {
          sitename = (
            document.querySelector(
              "meta[property='og:site_name']"
            ) as HTMLMetaElement
          ).content;
        } catch (e) {
          if (
            document.querySelector(".skin-fandomdesktop") ||
            document.querySelector(".skin-fandommobile")
          ) {
            sitename = (
              document.querySelector(
                ".fandom-community-header__community-name"
              ) || document.querySelector(".wds-community-bar__sitename")
            ).textContent.trim();
          } else {
            const mainPageHref = (
                (document.querySelector("#n-mainpage-description a") ||
                  document.querySelector("#p-navigation a") ||
                  document.querySelector(".mw-wiki-logo")) as HTMLAnchorElement
              ).href,
              mainPageURL = new URL(mainPageHref),
              mainPagePath = mainPageURL.pathname
                .replace(/^\/|\/$/g, "")
                .split("/"),
              mainPageRaw =
                mainPagePath[0] === "index.php"
                  ? getURLParam("title")
                  : mainPagePath[0] === "wiki"
                  ? mainPagePath.slice(1).join("/")
                  : mainPagePath.slice(2).join("/");
            sitename = decodeURIComponent(mainPageRaw.replace(/_/g, " "));
          }
        }

        /**
         * Returns details based on the namespace.
         * @link https://en.wikipedia.org/wiki/Wikipedia:Namespace
         */
        const namespaceDetails = (): string => {
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
            100: "Viewing a portal",
            101: "Viewing a portal talk page",
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
            // Wikis like Minecraft Wiki have custom namespaces above 9999 for other topics.
            // They work like normal main pages.
            10000: "Reading an article",
            10001: "Viewing a talk page",
            10002: "Reading an article",
            10003: "Viewing a talk page"
          };
          return (
            details[
              [...document.querySelector("body").classList]
                .filter((v) => /ns--?\d/.test(v))[0]
                .slice(3)
            ] || "Viewing a wiki page"
          );
        };

        if (
          (document.querySelector(".skin-hydra") &&
            (
              (document.querySelector("#n-mainpage-description a") ||
                document.querySelector("#p-navigation a") ||
                document.querySelector(".mw-wiki-logo")) as HTMLAnchorElement
            ).href === currentURL.href) ||
          title === "Home"
        )
          presenceData.details = "On the home page";
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
        } else if (namespaceDetails() === "Viewing a user profile") {
          presenceData.details = namespaceDetails();
          presenceData.state =
            document.querySelector(".mw-headline").textContent;
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

        if (presenceData.state) presenceData.state += ` | ${sitename}`;
        else presenceData.state = sitename;

        if (lang !== "en") {
          if (presenceData.state) presenceData.state += ` (${lang})`;
          else presenceData.details += ` (${lang})`;
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
  })();
}
