const presence = new Presence({
    clientId: "860146992284958762"
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
    if (currentURL.hostname === "www.wikimedia.org") {
      presenceData.smallImageKey = "lg-black";
      presenceData.smallImageText = "wikimedia.org landing page";
      presenceData.details = "On the home page";
    } else if (currentURL.hostname === "wikimediafoundation.org") {
      presenceData.smallImageKey = "lg-black";
      presenceData.smallImageText = "Wikimedia Foundation website";

      if (currentPath[0] === "") presenceData.details = "On the home page";
      else if (currentPath[0] === "news") {
        if (currentPath[4]) {
          presenceData.details = "Reading a news article";
          presenceData.state = document.querySelector("h1").textContent;
        } else if (
          document.querySelector("h1").textContent.split(": ").length === 2
        ) {
          const titleSplit = document
            .querySelector("h1")
            .textContent.split(": ");
          if (/^[aeiou]/i.test(titleSplit[0]))
            presenceData.details = `Viewing an ${titleSplit[0].toLowerCase()}`;
          else
            presenceData.details = `Viewing a ${titleSplit[0].toLowerCase()}`;
          [, presenceData.state] = titleSplit;
        } else {
          presenceData.details = "Viewing a page";
          presenceData.state = "News";
        }
      } else {
        presenceData.details = "Viewing a page";
        [presenceData.state] = (
          document.querySelector("meta[property='og:title']") as HTMLMetaElement
        ).content.split(" – ");
      }
    } else if (
      currentURL.hostname === "diff.wikimedia.org" ||
      currentURL.hostname === "techblog.wikimedia.org"
    ) {
      let siteName: string;
      presenceData.smallImageKey = "reading";
      if (currentURL.hostname === "diff.wikimedia.org") siteName = "Diff";
      else if (currentURL.hostname === "techblog.wikimedia.org")
        siteName = "[[WM:TECHBLOG]]";

      presenceData.smallImageText = siteName;

      if (currentPath[0] === "") presenceData.details = "On the home page";
      else if (currentPath[3]) {
        presenceData.details = "Reading a news article";
        presenceData.state = document.querySelector("h1").textContent;
      } else if (
        document.querySelector("h1") &&
        document.querySelector("h1").textContent.split(": ").length === 2
      ) {
        const titleSplit = document.querySelector("h1").textContent.split(": ");
        if (/^[aeiou]/i.test(titleSplit[0]))
          presenceData.details = `Viewing an ${titleSplit[0].toLowerCase()}`;
        else presenceData.details = `Viewing a ${titleSplit[0].toLowerCase()}`;
        [, presenceData.state] = titleSplit;
      } else {
        presenceData.details = "Viewing a page";
        presenceData.state = document.querySelector("h1")
          ? document.querySelector("h1").textContent
          : (
              document.querySelector(
                "meta[property='og:title']"
              ) as HTMLMetaElement
            ).content.split(" – ")[0];
      }

      if (presenceData.state) presenceData.state += ` | ${siteName}`;
      else presenceData.state = siteName;
    } else if (currentURL.hostname === "lists.wikimedia.org") {
      if (currentPath[0] === "postorius" && currentPath[1] === "lists") {
        presenceData.smallImageKey = "envelope";
        presenceData.smallImageText = "Mailing Lists";

        if (!currentPath[2]) presenceData.details = "Viewing mailing lists";
        else if (currentPath[2]) {
          presenceData.details = "Viewing a mailing list info";
          presenceData.state = `${document
            .querySelector("h1")
            .textContent.replace(
              document.querySelector("h1 > small").textContent,
              ""
            )
            .trim()} (${document
            .querySelector("h1 > small")
            .textContent.trim()})`;
        }
      } else if (currentPath[0] === "hyperkitty") {
        if (!currentPath[1])
          presenceData.details = "Viewing the maling list archives";
        else if (currentPath[1] === "list") {
          if (!currentPath[3] || currentPath[3] === "latest") {
            presenceData.details = "Viewing a maling list archive";
            presenceData.state = document.title.replace(
              / - (.+) - (.+)/,
              `$1 (${currentPath[2]})`
            );
          } else if (currentPath[3] === "thread") {
            presenceData.details = "Viewing a thread from the archive";
            presenceData.state = document.title.replace(
              /(.+) - (.+) - (.+)/,
              `$1 – $2 (${currentPath[2]})`
            );
          } else if (/\d{4}/.test(currentPath[3])) {
            presenceData.details = "Viewing a maling list archive";
            presenceData.state = document.title.replace(
              /(.+) - (.+) - (.+)/,
              `$1 – $2 (${currentPath[2]})`
            );
          }
        }
      }
    } else if (currentURL.hostname === "stats.wikimedia.org") {
      presenceData.smallImageKey = "chart-bar";
      presenceData.smallImageText = "Wikimedia Statistics";

      presenceData.details = "Viewing Wikimedia Statistics";
      updateCallback.function = (): void => {
        presenceData.state = document
          .querySelector("title")
          .textContent.split(" - ")
          .slice(1)
          .join(" – ");
      };
    } else if (
      currentURL.hostname === "phabricator.wikimedia.org" ||
      currentURL.hostname === "phab.wmflabs.org"
    ) {
      presenceData.smallImageKey = "phabricator";
      presenceData.smallImageText = "Wikimedia Phabricator";
      if (currentURL.hostname === "phab.wmflabs.org")
        presenceData.smallImageText += " (test)";

      if (currentPath[0] === "") presenceData.details = "On the home page";
      else if (/^T\d+$/.test(currentPath[0])) {
        presenceData.details = "Viewing a task";
        presenceData.state = document.title.replace(/^[^\w\s\d]{1} /, "");
      } else if (currentPath[0] === "maniphest") {
        if (currentPath[1] === "task" && currentPath[2] === "edit")
          presenceData.details = "Creating a task";
        else {
          presenceData.details = "Viewing tasks (Maniphest)";
          presenceData.state = document.querySelector(
            "h1 .phui-header-header"
          ).textContent;
        }
      } else if (currentPath[0] === "project") {
        if (!currentPath[1] || currentPath[1] === "query") {
          presenceData.details = "Viewing projects";
          presenceData.state = document.querySelector(
            "h1 .phui-header-header"
          ).textContent;
        } else if (currentPath[1] === "view") {
          presenceData.details = "Viewing a project";
          presenceData.state = [
            ...document.querySelectorAll(
              ".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
            )
          ]
            .slice(1)
            .map((element) => element.textContent.trim())
            .join(" > ");
        } else {
          presenceData.details = "Viewing a project";
          const crumbs = [
            ...document.querySelectorAll(
              ".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
            )
          ];
          presenceData.state = crumbs
            .slice(1, crumbs.length - 1)
            .map((element) => element.textContent.trim())
            .join(" > ");
        }
      } else if (currentPath[0] === "diffusion") {
        presenceData.details = "Viewing repositories (Diffusion)";
        presenceData.state = document.querySelector(
          "h1 .phui-header-header"
        ).textContent;
      } else if (currentPath[0] === "source") {
        presenceData.details = "Viewing a repository";
        presenceData.state = document.querySelector(
          ".phui-crumbs-view.phui-crumbs-border .phui-crumb-name:nth-of-type(1)"
        ).textContent;
      } else if (currentPath[0] === "phame") {
        if (!currentPath[1])
          presenceData.details = "Viewing recent posts (Phame)";
        else if (currentPath[1] === "post") {
          if (currentPath[2] === "view") {
            presenceData.details = "Viewing a post";
            presenceData.state = document.querySelector(
              ".phame-header-title"
            ).textContent;
          } else {
            presenceData.details = "Viewing posts";
            presenceData.state = document.querySelector(
              "h1 .phui-header-header"
            ).textContent;
          }
        } else if (currentPath[1] === "blog") {
          if (currentPath[2] === "view") {
            presenceData.details = "Viewing a blog";
            presenceData.state = document.querySelector(
              ".phame-header-title"
            ).textContent;
          } else {
            presenceData.details = "Viewing blogs";
            presenceData.state = document.querySelector(
              "h1 .phui-header-header"
            ).textContent;
          }
        }
      } else if (/^P\d+$/.test(currentPath[0])) {
        presenceData.details = "Viewing a paste";
        presenceData.state = document.title.replace(/^[^\w\s\d]{1} /, "");
      } else if (currentPath[0] === "paste") {
        if (currentPath[1] === "task" && currentPath[2] === "edit")
          presenceData.details = "Creating a paste";
        else {
          presenceData.details = "Viewing pastes";
          presenceData.state = document.querySelector(
            "h1 .phui-header-header"
          ).textContent;
        }
      } else if (/^M\d+$/.test(currentPath[0])) {
        presenceData.details = "Viewing a mock";
        presenceData.state = document.title.replace(/^[^\w\s\d]{1} /, "");
      } else if (currentPath[0] === "pholio") {
        if (currentPath[1] === "task" && currentPath[2] === "edit")
          presenceData.details = "Creating a mock";
        else {
          presenceData.details = "Viewing mocks (Pholio)";
          presenceData.state = document.querySelector(
            "h1 .phui-header-header"
          ).textContent;
        }
      } else if (/^U\d+$/.test(currentPath[0])) {
        presenceData.details = "Viewing a short URL";
        presenceData.state = document.title.replace(/^[^\w\s\d]{1} /, "");
      } else if (currentPath[0] === "phurl") {
        if (currentPath[1] === "task" && currentPath[2] === "edit")
          presenceData.details = "Creating a short URL";
        else {
          presenceData.details = "Viewing short URLs (Phurl)";
          presenceData.state = document.querySelector(
            "h1 .phui-header-header"
          ).textContent;
        }
      } else {
        presenceData.details = `Viewing ${
          document.querySelector(
            ".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
          ).textContent
        }`;
        presenceData.state = [
          ...document.querySelectorAll(
            ".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
          )
        ]
          .slice(1)
          .map((element) => element.textContent.trim())
          .join(" > ");
      }
    } else if (currentURL.hostname === "xtools.wmflabs.org") {
      presenceData.smallImageKey = "xtools";
      presenceData.smallImageText = "XTools";

      const titleArray = document.title.split(" - ");

      if (titleArray.length === 1) presenceData.details = "On the home page";
      else if (titleArray.length === 2)
        presenceData.details = `Viewing ${titleArray[0]}`;
      else if (titleArray.length >= 3) {
        presenceData.details = `Viewing ${titleArray[titleArray.length - 2]}`;
        presenceData.state = titleArray.slice(0, -2).join(" - ");
      }
    } else if (currentURL.hostname === "dumps.wikimedia.org") {
      presenceData.smallImageKey = "cloud-download-alt";
      presenceData.smallImageText = "Wikimedia Downloads";

      if (currentPath[0] === "") presenceData.details = "On the home page";
      else {
        presenceData.details = "Viewing a page";
        const pageNames: { [index: string]: string } = {
          "backup-index.html": "Database backup dumps",
          "backups-of-old-wikis.html":
            "Backup dumps of wikis which no longer exist",
          other: "Other content",
          "legal.html": "License information",
          "mirrors.html": "Mirrors of database backup dumps"
        };
        presenceData.state = pageNames[currentPath[0]];
      }
    } else if (currentURL.hostname === "donate.wikimedia.org") {
      presenceData.smallImageKey = "donate";
      presenceData.smallImageText = "Donation Gateway";

      presenceData.details = "Donating to the Wikimedia Foundation";
      presenceData.state = "(or Wikipedia)";
    } else {
      const mwConfig = await presence.getPageletiable('mw"]["config"]["values');
      // console.log(mwConfig)

      if (currentURL.hostname === "meta.wikimedia.org")
        presenceData.smallImageKey = "meta";
      else if (currentURL.hostname === "incubator.wikimedia.org")
        presenceData.smallImageKey = "incubator";
      else if (currentURL.hostname === "wikitech.wikimedia.org")
        presenceData.smallImageKey = "wikitech";
      else if (currentURL.hostname === "www.mediawiki.org")
        presenceData.smallImageKey = "mediawiki";
      else if (currentURL.hostname.startsWith("wikimania"))
        presenceData.smallImageKey = "wikimania";
      else if (currentURL.hostname === "foundation.wikimedia.org")
        presenceData.smallImageKey = "lg-black";
      else if (currentURL.hostname === "wikispore.wmflabs.org")
        presenceData.smallImageKey = "wikispore";

      const siteName = mwConfig.wgSiteName,
        actionResult = (): string =>
          getURLParam("action") || getURLParam("veaction") || mwConfig.wgAction,
        titleFromURL = (): string => {
          const raw = mwConfig.wgPageName;
          return decodeURIComponent(raw.replace(/_/g, " "));
        },
        title = document.querySelector("h1")
          ? document.querySelector("h1").textContent
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
              2300: "Viewing a gadget",
              2301: "Viewing a gadget talk page",
              2302: "Viewing a gadget definition page",
              2303: "Viewing a gadget definition talk page",
              Obsolete: "Viewing an obsolete page",
              "Obsolete talk": "Viewing an obsolete talk page",
              Iberocoop: "Viewing an Iberocoop page",
              "Iberocoop talk": "Viewing an Iberocoop talk page",
              Tool: "Viewing a tool page",
              "Tool talk": "Viewing a tool talk page",
              Module: "Viewing a module page",
              "Module talk": "Viewing a module talk page",
              Translations: "Viewing a translations page",
              "Translations talk": "Viewing a translations talk page",
              Newsletter: "Viewing a newsletter page",
              "Newsletter talk": "Viewing a newsletter talk page",
              CNBanners: "Viewing a CNBanners page",
              "CNBanners talk": "Viewing a CNBanners talk page",
              Schema: "Viewing a schema page",
              "Schema talk": "Viewing a schema talk page",
              Research: "Viewing a research page",
              "Research talk": "Viewing a research talk page",
              Grants: "Viewing a grants page",
              "Grants talk": "Viewing a grants talk page",
              Manual: "Viewing a manual page",
              "Manual talk": "Viewing a manual talk page",
              Form: "Viewing a form page",
              "Form talk": "Viewing a form talk page"
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

      //
      // Important note:
      //
      // When checking for the current location, avoid using the URL.
      // The URL is going to be different in other languages.
      // Use the elements on the page instead.
      //

      if (mwConfig.wgIsMainPage) presenceData.details = "On the main page";
      else if (document.querySelector("#wpLoginAttempt"))
        presenceData.details = "Logging in";
      else if (document.querySelector("#wpCreateaccount"))
        presenceData.details = "Creating an account";
      else if (document.querySelector(".searchresults")) {
        presenceData.details = "Searching for a page";
        presenceData.state = (
          document.querySelector("input[type=search]") as HTMLInputElement
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
      if (presenceData.smallImageKey) presenceData.smallImageText = siteName;
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
