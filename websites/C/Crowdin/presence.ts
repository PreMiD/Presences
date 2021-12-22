const presence = new Presence({
    clientId: "848293229409337444"
  }),
  browsingStamp = Math.round(Date.now() / 1000);

let translatePageTitle: HTMLElement | null,
  translatingFile: HTMLElement,
  translateProject: HTMLElement,
  translatingLanguage: HTMLElement,
  profileName: HTMLElement,
  profileNickname: HTMLElement | null;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    details: "Unknown page",
    largeImageKey: "crowdin",
    startTimestamp: browsingStamp
  };

  if (document.location.host === "support.crowdin.com") {
    if (!document.location.pathname || document.location.pathname === "/")
      presenceData.details = "On the main support page";
    else if (
      document.location.pathname.includes("/api/v2/") ||
      document.location.pathname.includes("/enterprise/api/")
    ) {
      const [activeLabel] = Array.from(
          document.querySelectorAll("label")
        ).filter((c) => c.className?.includes("active")),
        currentSection =
          activeLabel?.children.length >= 2
            ? activeLabel?.children[1].textContent
              ? activeLabel?.children[1].textContent
              : activeLabel?.children[0].textContent
            : activeLabel?.textContent;
      presenceData.details = "Reading more about API V2";
      presenceData.state = currentSection;
      presenceData.smallImageKey = "reading";
      if (activeLabel) {
        presenceData.buttons = [
          {
            label: "View section",
            url: document.URL
          }
        ];
      }
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching support";
      presenceData.state = (
        document.querySelector(
          ".form-control.form-control__result.input-lg"
        ) as HTMLInputElement | null
      )?.value;
      presenceData.smallImageKey = "search";
    } else {
      presenceData.details = "Reading support article";
      presenceData.state = document.querySelector(".hero")?.textContent;
      presenceData.smallImageKey = "reading";
      presenceData.buttons = [
        {
          label: "View article",
          url: document.URL
        }
      ];
    }
  } else if (document.location.host === "store.crowdin.com") {
    presenceData.details = "Browsing the store";
    if (!document.location.pathname || document.location.pathname === "/")
      presenceData.details = "On the main store page";
    else if (document.location.pathname.includes("/collections/")) {
      const isApp = !!document.querySelector(".product-single__title");
      presenceData.details = isApp ? "Viewing app" : "Browsing apps";
      presenceData.state =
        document.querySelector(".product-single__title")?.textContent ||
        (
          document.querySelector("[role=text]") as HTMLElement | null
        )?.innerText.split("\n")?.[1];
      if (isApp) {
        presenceData.buttons = [
          {
            label: "View app",
            url: document.URL
          }
        ];
      }
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching the store";
      presenceData.state = (
        document.querySelector(".search__input") as HTMLInputElement | null
      )?.value;
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.host === "status.crowdin.com") {
    // TODO add incident page (when they have an incident to report lol)
    presenceData.details = "Viewing Crowdin's status";
    if (document.location.pathname === "/subscribe")
      presenceData.details = "Subscribing to status reports";
  } else if (document.location.host === "blog.crowdin.com") {
    presenceData.smallImageKey = "reading";
    if (document.location.pathname === "/")
      presenceData.details = "Browsing the blog";
    else if (document.location.pathname.includes("/tag/")) {
      presenceData.details = "Viewing tag";
      presenceData.state = document
        .querySelector(".text-center.home-bg.home-bg--tags")
        ?.textContent.split(":")[1];
      presenceData.buttons = [
        {
          label: "View tag",
          url: document.URL
        }
      ];
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching the blog";
      presenceData.state = (
        document.querySelector(".form-control") as HTMLInputElement | null
      )?.value;
      presenceData.smallImageKey = "search";
    } else if (document.querySelector(".hero > h1")) {
      presenceData.details = "Reading blog post";
      presenceData.state = document.querySelector(".hero > h1").textContent;
      presenceData.buttons = [
        {
          label: "View blog post",
          url: document.URL
        }
      ];
    } else {
      presenceData.details = "Unknown page";
      presenceData.smallImageKey = "";
    }
  } else {
    if (
      (document.location.pathname === "/" || !document.location.pathname) &&
      document.location.host === "crowdin.com"
    )
      presenceData.details = "Website Home";
    else if (
      document.location.pathname.includes("/project/") ||
      (document.location.host !== "crowdin.com" &&
        document.location.pathname === "/")
    ) {
      translateProject =
        document.querySelector(
          ".title-name.project-name-preview.text-overflow"
        ) || document.querySelector(".project-name-text.text-overflow");

      translatePageTitle = document.querySelector(
        ".language-header.no-margin-top.margin-bottom"
      );

      presenceData.details = translateProject?.innerText;
      presenceData.buttons = [
        {
          label: "View project",
          url: document.URL
        }
      ];
      if (document.location.pathname.includes("activity_stream"))
        presenceData.state = "Viewing activity";
      else if (document.location.pathname.includes("reports"))
        presenceData.state = "Viewing reports";
      else if (document.location.pathname.includes("discussions"))
        presenceData.state = "Viewing discussions";
      else if (document.location.pathname.includes("tasks"))
        presenceData.state = "Viewing tasks";
      else {
        presenceData.state =
          translatePageTitle?.innerText || "Viewing project home";
      }
    } else if (document.location.pathname.includes("/translate")) {
      translatingFile = document.querySelector(".file-name");
      translatingLanguage = document.querySelector(
        ".language-name-wrapper.text-overflow"
      );
      translateProject = document.querySelector("title");

      presenceData.details = `Translating ${translatingFile?.innerHTML}`;
      presenceData.state = `${translateProject?.innerText
        .split("-")[1]
        ?.trim()} (${translatingLanguage?.innerHTML})`;
      presenceData.smallImageKey = "writing";
      presenceData.buttons = [
        {
          label: "Translate project",
          url: document.URL
        }
      ];
    } else if (document.location.pathname.includes("/profile")) {
      profileName = document.querySelector(".username.s-margin-bottom");
      profileNickname = document.querySelector(".user-login");

      if (document.location.pathname.includes("/activity")) {
        presenceData.details = "Viewing activity";
        presenceData.state = `${profileName?.innerText}${
          profileNickname ? ` - ${profileNickname.innerText}` : ""
        }`;
      } else if (document.querySelector(".static-icon.static-icon-plus")) {
        presenceData.details = "Viewing own profile";
        presenceData.state = `${profileName?.innerText}${
          profileNickname ? ` - ${profileNickname.innerText}` : ""
        }`;
      } else {
        presenceData.details = "Viewing a profile";
        presenceData.state = `${profileName?.innerText}${
          profileNickname ? ` - ${profileNickname.innerText}` : ""
        }`;
      }
    } else if (document.location.pathname.includes("/projects")) {
      const currentTab =
        document.querySelector("#showcase_current").parentElement.parentElement
          .className === "tab-pane active"
          ? document.querySelector("#showcase_current")?.textContent
          : document.querySelector(".active")?.textContent;

      presenceData.details = "Exploring projects";
      presenceData.state = currentTab;
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/resources")) {
      presenceData.details = "Viewing resources";
      presenceData.state = (
        document.querySelector(".active") as HTMLLIElement | null
      )?.innerText;
    } else if (document.location.pathname === "/release-notes") {
      presenceData.details = "Reading release notes";
      presenceData.state = (
        document.querySelector(
          ".selected-release-item"
        ) as HTMLAnchorElement | null
      )?.innerText;
      presenceData.smallImageKey = "reading";
      presenceData.buttons = [
        {
          label: "View release notes",
          url: document.URL
        }
      ];
    } else if (document.location.pathname === "/features")
      presenceData.details = "Viewing Crowdin's features";
    else if (document.location.pathname === "/demo-request")
      presenceData.details = "Requesting a demo";
    else if (document.location.pathname.includes("/page/")) {
      presenceData.details = "Reading page";
      presenceData.state =
        document.querySelector(".text-center > h1")?.textContent ??
        (document.querySelector(".row > h1") as HTMLElement | null)?.innerText
          .split("\n")
          .join(" ");
      presenceData.smallImageKey = "reading";
      presenceData.buttons = [
        {
          label: "View page",
          url: document.URL
        }
      ];
    } else if (document.location.pathname.includes("/pricing"))
      presenceData.details = "Viewing pricing";
    else if (document.location.pathname.includes("/enterprise"))
      presenceData.details = "Viewing enterprise";
    else if (document.location.pathname.includes("/contacts"))
      presenceData.details = "Contacting Crowdin";
    else if (document.location.pathname.includes("/feature-request"))
      presenceData.details = "Viewing feature requests";
    // TODO add check for when the user is submitting a feature request/viewing an existing request (iFrame)
  }

  presence.setActivity(presenceData);
});
