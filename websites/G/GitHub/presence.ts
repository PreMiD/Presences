const presence = new Presence({
    clientId: "607587875122446359"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  search = "/search?q=",
  searchURL = new URL(document.location.href),
  searchResult = searchURL.searchParams.get("q"),
  profileURL = new URL(document.location.href);

presence.on("UpdateData", async () => {
  let profileName: HTMLElement = null,
    profileNickname: HTMLElement = null,
    repositoryAuthor: HTMLElement = null,
    repositoryName: HTMLElement = null,
    repositoryLocation: HTMLElement = null,
    repositoryLocation2: NodeListOf<HTMLElement> = null,
    pullRequestTitle: HTMLElement = null,
    pullRequestAuthor: NodeListOf<HTMLElement> = null,
    pullRequestID: HTMLElement = null,
    issueTitle: HTMLElement = null,
    issueAuthor: NodeListOf<HTMLElement> = null,
    issueID: HTMLElement = null;

  profileName = document.querySelector(".vcard-names .p-name");
  profileNickname = document.querySelector(".vcard-names .p-nickname");

  repositoryAuthor = document.querySelector(".author a");
  repositoryName = document.querySelector(
    "body > div.application-main > div > main > div.bg-gray-light.pt-3.hide-full-screen.mb-5 > div > div > h1 > strong > a"
  );
  repositoryLocation = document.querySelector(
    "#branch-select-menu > summary > span.css-truncate-target"
  );
  repositoryLocation2 = document.querySelectorAll("#blob-path");

  pullRequestTitle = issueTitle = document.querySelector(
    "div.gh-header-show h1 span.js-issue-title"
  );
  pullRequestAuthor = issueAuthor = document.querySelectorAll(
    "div div.timeline-comment-header.clearfix h3 strong a"
  );
  pullRequestID = issueID = document.querySelector(
    "#span.f1-light.text-gray-light"
  );

  let profileTabs: string, profileCurrentTab: string;

  if (profileName) {
    profileTabs = "/" + profileNickname.innerText + "?tab=";
    profileCurrentTab = profileURL.searchParams.get("tab");
  }

  const presenceData: PresenceData = {
    details: "Unknown page",
    largeImageKey: "lg"
  };

  if (document.location.pathname == "/" || !document.location.pathname) {
    presenceData.state = "Home";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/settings")) {
    presenceData.state = "Settings";

    delete presenceData.details;
  } else if (
    document.location.pathname.startsWith("/explore") ||
    document.location.pathname.startsWith("/discover")
  ) {
    presenceData.state = "Browsing repositories...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/marketplace")) {
    presenceData.state = "Browsing marketplace...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/pulls")) {
    presenceData.state = "Browsing pull requests...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname == "/notifications") {
    presenceData.state = "Browsing notifications...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (
    document.location.pathname.startsWith("/notifications/subscriptions")
  ) {
    presenceData.state = "Browsing subscriptions...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/watching")) {
    presenceData.state = "Browsing interested repositories...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname == "/new") {
    presenceData.state = "Creating a new repository...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/new/import")) {
    presenceData.state = "Importing a repository...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/new/project")) {
    presenceData.state = "Creating a new project...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/organizations/new")) {
    presenceData.state = "Creating a new organization...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/topics")) {
    presenceData.state = "Browsing topics...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname == "/trending") {
    presenceData.state = "Browsing trending repositories...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/trending/developers")) {
    presenceData.state = "Browsing trending developers...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/collections")) {
    presenceData.state = "Browsing collections...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/events")) {
    presenceData.state = "Browsing events...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/codespaces")) {
    presenceData.state = "Browsing codespaces...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.indexOf(search)) {
    presenceData.details = "Searching for: ";

    presenceData.state = searchResult;

    presenceData.startTimestamp = browsingStamp;
  }
  if (repositoryAuthor && repositoryName) {
    if (
      repositoryAuthor.innerText.length > 0 &&
      repositoryName.innerText.length > 0 &&
      document.location.pathname.toLowerCase() ==
        "/" +
          repositoryAuthor.innerText.toLowerCase() +
          "/" +
          repositoryName.innerText.toLowerCase()
    ) {
      presenceData.details = "Browsing a repository...";

      presenceData.state =
        repositoryAuthor.innerText + " / " + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (
      repositoryAuthor.innerText.length > 0 &&
      repositoryName.innerText.length > 0 &&
      document.location.pathname.includes("/tree/") &&
      repositoryLocation.innerText.length > 0
    ) {
      const repLoc = repositoryLocation.innerText;

      presenceData.details =
        "Browsing " +
        repositoryAuthor.innerText +
        "/" +
        repositoryName.innerText;

      presenceData.state = repLoc;

      presenceData.startTimestamp = browsingStamp;
    } else if (
      repositoryAuthor.innerText.length > 0 &&
      repositoryName.innerText.length > 0 &&
      document.location.pathname.includes("/blob/") &&
      repositoryLocation2.length > 0
    ) {
      const filePath: HTMLElement = document.querySelector("#blob-path");

      presenceData.details =
        "Looking at a file from " +
        repositoryAuthor.innerText +
        "/" +
        repositoryName.innerText;

      presenceData.state =
        filePath.querySelector("details") !== null
          ? filePath.textContent
              .replace(filePath.querySelector("details").textContent, "")
              .trim()
              .slice(0, -1)
          : filePath.textContent.trim();

      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname.toLowerCase() ==
      "/" +
        repositoryAuthor.innerText.toLowerCase() +
        "/" +
        repositoryName.innerText.toLowerCase() +
        "/issues/"
    ) {
      presenceData.details = "Browsing issues from:";

      presenceData.state =
        repositoryAuthor.innerText + " / " + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (
      repositoryAuthor.innerText.length > 0 &&
      repositoryName.innerText.length > 0 &&
      document.location.pathname.includes("/pulls")
    ) {
      presenceData.details = "Browsing pull requests from:";

      presenceData.state =
        repositoryAuthor.innerText + " / " + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname
        .toLowerCase()
        .includes(
          "/" +
            repositoryAuthor.innerText.toLowerCase() +
            "/" +
            repositoryName.innerText.toLowerCase() +
            "/pull/"
        )
    ) {
      presenceData.details =
        "Looking on pull request " + pullRequestID.innerText;

      presenceData.state =
        pullRequestAuthor[0].innerText + " - " + pullRequestTitle.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname
        .toLowerCase()
        .includes(
          "/" +
            repositoryAuthor.innerText.toLowerCase() +
            "/" +
            repositoryName.innerText.toLowerCase() +
            "/issues/"
        )
    ) {
      presenceData.details = "Looking on issue " + issueID.innerText;

      presenceData.state =
        issueAuthor[0].innerText + " - " + issueTitle.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname.includes("/pulse") ||
      document.location.pathname.includes("/graphs/contributors") ||
      document.location.pathname.includes("/community") ||
      document.location.pathname.includes("/graphs/commit-activity") ||
      document.location.pathname.includes("/graphs/code-frequency") ||
      document.location.pathname.includes("/network/dependencies") ||
      document.location.pathname.includes("/graphs/commit-activity") ||
      document.location.pathname.includes("/network") ||
      document.location.pathname.includes("/network/members")
    ) {
      const insightsTab: HTMLElement = document.querySelector(
        "nav a.js-selected-navigation-item.selected.menu-item"
      );

      presenceData.details =
        "Browsing insights from " +
        repositoryAuthor.innerText +
        " / " +
        repositoryName.innerText;

      presenceData.state = insightsTab.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/projects")) {
      presenceData.details = "Browsing projects from:";

      presenceData.state =
        repositoryAuthor.innerText + " / " + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/issues")) {
      presenceData.details = "Browsing issues from:";

      presenceData.state =
        repositoryAuthor.innerText + " / " + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/upload")) {
      presenceData.details = "Uploading files to:";

      presenceData.state =
        repositoryAuthor.innerText + " / " + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;
    }
  } else if (
    !repositoryAuthor &&
    !repositoryName &&
    document.location.pathname.includes("/issues")
  ) {
    presenceData.details = "Browsing issues...";

    presenceData.startTimestamp = browsingStamp;
  }

  if (profileName && profileNickname) {
    if (!document.location.pathname.indexOf(profileTabs)) {
      presenceData.details = "Browsing a profile...";

      if (profileName.innerText.length == 0) {
        presenceData.state = profileNickname.innerText;
      } else if (profileNickname.innerText.length == 0) {
        presenceData.state = profileName.innerText;
      } else
        presenceData.state =
          profileName.innerText + " | " + profileNickname.innerText;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.indexOf(profileTabs)) {
      presenceData.details = "Browsing " + profileCurrentTab + " from:";

      if (profileName.innerText.length == 0) {
        presenceData.state = profileNickname.innerText;
      } else if (profileNickname.innerText.length == 0) {
        presenceData.state = profileName.innerText;
      } else
        presenceData.state =
          profileName.innerText + " | " + profileNickname.innerText;

      presenceData.startTimestamp = browsingStamp;

      if (profileCurrentTab == null) {
        presenceData.details = "Browsing a profile...";

        if (profileName.innerText.length == 0) {
          presenceData.state = profileNickname.innerText;
        } else if (profileNickname.innerText.length == 0) {
          presenceData.state = profileName.innerText;
        } else
          presenceData.state =
            profileName.innerText + " | " + profileNickname.innerText;

        presenceData.startTimestamp = browsingStamp;
      }
    }
  }

  presence.setActivity(presenceData);
});
