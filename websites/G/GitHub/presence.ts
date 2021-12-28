const presence = new Presence({
  clientId: "607587875122446359"
});

presence.on("UpdateData", async () => {
  const profile: { [key: string]: HTMLElement } = {
      name: document.querySelector(".vcard-names .p-name"),
      nickname: document.querySelector(".vcard-names .p-nickname")
    },
    organization: { [key: string]: HTMLElement } = {
      name: document.querySelector(
        "#js-pjax-container > div > header > div.container-xl.pt-4.pt-lg-0.p-responsive.clearfix > div > div.flex-1 > h1"
      )
    },
    repository: { [key: string]: HTMLElement } = {
      author: document.querySelector(".author a"),
      name: document.querySelector(
        "#js-repo-pjax-container > div > div > div > h1 > strong > a"
      ),
      location: document.querySelector(
        "#branch-select-menu > summary > span.css-truncate-target"
      )
    },
    PRandIssues: { [key: string]: HTMLElement } = {
      title: document.querySelector(
        "div.gh-header-show h1 span.js-issue-title"
      ),
      id: document.querySelector("#span.f1-light")
    },
    nodeListOf: { [key: string]: NodeListOf<HTMLElement> } = {
      PRandIssueAuthor: document.querySelectorAll(
        "div div.timeline-comment-header.clearfix h3 strong a"
      ),
      repLoc2: document.querySelectorAll("#blob-path")
    },
    browsingTimestamp = Math.floor(Date.now() / 1000);
  let profileTabs: string, profileCurrentTab: string;

  if (profile.name) {
    profileTabs = `/${profile.nickname.textContent}?tab=`;
    profileCurrentTab = new URL(document.location.href).searchParams.get("tab");
  }

  const presenceData: PresenceData = {
    details: "Unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/" || !document.location.pathname)
    presenceData.details = "Home";
  else if (document.location.pathname.startsWith("/login"))
    presenceData.details = "Logging in";
  else if (document.location.pathname.startsWith("/settings"))
    presenceData.details = "Settings";
  else if (
    document.location.pathname.startsWith("/explore") ||
    document.location.pathname.startsWith("/discover")
  )
    presenceData.details = "Browsing repositories...";
  else if (document.location.pathname.startsWith("/marketplace"))
    presenceData.details = "Browsing marketplace...";
  else if (document.location.pathname.startsWith("/pulls"))
    presenceData.details = "Browsing pull requests...";
  else if (document.location.pathname === "/notifications")
    presenceData.details = "Browsing notifications...";
  else if (
    document.location.pathname.startsWith("/notifications/subscriptions")
  )
    presenceData.details = "Browsing subscriptions...";
  else if (document.location.pathname.startsWith("/watching"))
    presenceData.details = "Browsing interested repositories...";
  else if (document.location.pathname === "/new")
    presenceData.details = "Creating a new repository...";
  else if (document.location.pathname.startsWith("/new/import"))
    presenceData.details = "Importing a repository...";
  else if (document.location.pathname.startsWith("/new/project"))
    presenceData.details = "Creating a new project...";
  else if (document.location.pathname.startsWith("/organizations/new"))
    presenceData.details = "Creating a new organization...";
  else if (document.location.pathname.startsWith("/topics"))
    presenceData.details = "Browsing topics...";
  else if (document.location.pathname === "/trending")
    presenceData.details = "Browsing trending repositories...";
  else if (document.location.pathname.startsWith("/trending/developers"))
    presenceData.details = "Browsing trending developers...";
  else if (document.location.pathname.startsWith("/collections"))
    presenceData.details = "Browsing collections...";
  else if (document.location.pathname.startsWith("/events"))
    presenceData.details = "Browsing events...";
  else if (document.location.pathname.startsWith("/codespaces"))
    presenceData.details = "Browsing codespaces...";
  else if (document.location.pathname.includes("/search")) {
    presenceData.details = "Searching for: ";
    presenceData.state = new URL(document.location.href).searchParams.get("q");
  }

  const pathData: string[] = document.location.pathname.split("/");
  if (repository.author && repository.name) {
    if (
      repository.author.textContent.length > 0 &&
      repository.name.textContent.length > 0 &&
      document.location.pathname.toLowerCase() ===
        `/${repository.author.textContent.toLowerCase()}/${repository.name.textContent.toLowerCase()}`
    ) {
      presenceData.details = "Browsing a repository...";

      presenceData.state = `${repository.author.textContent} / ${repository.name.textContent}`;
    } else if (
      repository.author.textContent.length > 0 &&
      repository.name.textContent.length > 0 &&
      document.location.pathname.includes("/tree/") &&
      repository.location.textContent.length > 0
    ) {
      presenceData.details = `Browsing ${repository.author.textContent}/${repository.name.textContent}`;

      presenceData.state = `📂 ${document.location.pathname
        .split("/")
        .slice(4)
        .join("/")}`;
    } else if (
      repository.author.textContent.toString().length > 0 &&
      repository.name.textContent.toString().length > 0 &&
      document.location.pathname.includes("/blob/") &&
      nodeListOf.repLoc2.length > 0
    ) {
      presenceData.details = `📂 Looking at a file from ${repository.author.textContent}/${repository.name.textContent}`;

      presenceData.state = `📝 ${
        document.querySelector("h2#blob-path > strong").textContent
      }`;
    } else if (
      document.location.pathname.toLowerCase() ===
      `/${repository.author.textContent.toLowerCase()}/${repository.name.textContent.toLowerCase()}/issues/`
    ) {
      presenceData.details = "Browsing issues from:";
      presenceData.state = `${repository.author.textContent} / ${repository.name.textContent}`;
    } else if (
      repository.author.textContent.length > 0 &&
      repository.name.textContent.length > 0 &&
      document.location.pathname.includes("/pulls")
    ) {
      presenceData.details = "Browsing pull requests from:";
      presenceData.state = `${repository.author.textContent} / ${repository.name.textContent}`;
    } else if (
      document.location.pathname
        .toLowerCase()
        .includes(
          `/${repository.author.textContent.toLowerCase()}/${repository.name.textContent.toLowerCase()}/pull/`
        )
    ) {
      presenceData.details = `Looking on pull request #${
        document.location.pathname.split("/").slice(2)[2]
      }`;

      presenceData.state = `${nodeListOf.PRandIssueAuthor[0].textContent} - ${PRandIssues.title.textContent}`;
    } else if (
      document.location.pathname
        .toLowerCase()
        .includes(
          `/${repository.author.textContent.toLowerCase()}/${repository.name.textContent.toLowerCase()}/issues/`
        )
    ) {
      presenceData.details = `Looking on issue #${
        document.location.pathname.split("/").slice(2)[2]
      }`;

      presenceData.state = `${nodeListOf.PRandIssueAuthor[0].textContent} - ${PRandIssues.title.textContent}`;
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
      presenceData.details = `Browsing insights from ${repository.author.textContent} / ${repository.name.textContent}`;

      presenceData.state = document.querySelector(
        "nav a.js-selected-navigation-item.selected.menu-item"
      ).textContent;
    } else {
      presenceData.details = `Browsing ${
        pathData[3] === "pulls" ? "pull requests" : pathData[3]
      } from:`;
      presenceData.state = `${repository.author.textContent} / ${repository.name.textContent}`;
    }
  } else if (
    repository.author &&
    !repository.name &&
    document.location.pathname.includes("/runs")
  ) {
    presenceData.details = `Viewing action from ${pathData[1]}/${pathData[2]}`;
    presenceData.state = document.querySelector(
      "#repo-content-pjax-container > div > div.js-updatable-content.js-socket-channel.d-flex.flex-items-start.flex-md-items-center.pb-3.pb-md-4.pl-0.pl-md-2.mt-n2.mb-1.ml-1 > div.d-flex.flex-auto.mr-3 > h3 > span"
    ).textContent;
  } else if (
    !repository.author &&
    !repository.name &&
    document.location.pathname.includes("/issues")
  )
    presenceData.details = "Browsing issues...";

  if (profile.name && profile.nickname) {
    if (!document.location.pathname.indexOf(profileTabs)) {
      presenceData.details = "Browsing a profile...";

      if (profile.name.textContent.length === 0)
        presenceData.state = profile.nickname.textContent;
      else if (profile.nickname.textContent.length === 0)
        presenceData.state = profile.name.textContent;
      else
        presenceData.state = `${profile.name.textContent} | ${profile.nickname.textContent}`;
    } else if (document.location.pathname.indexOf(profileTabs)) {
      presenceData.details = `Browsing ${profileCurrentTab} from:`;

      if (profile.name.textContent.length === 0)
        presenceData.state = profile.nickname.textContent;
      else if (profile.nickname.textContent.length === 0)
        presenceData.state = profile.name.textContent;
      else
        presenceData.state = `${profile.name.textContent} | ${profile.nickname.textContent}`;

      if (profileCurrentTab === null) {
        presenceData.details = "Browsing a profile...";

        if (profile.name.textContent.length === 0)
          presenceData.state = profile.nickname.textContent;
        else if (profile.nickname.textContent.length === 0)
          presenceData.state = profile.name.textContent;
        else
          presenceData.state = `${profile.name.textContent} | ${profile.nickname.textContent}`;
      }
    }
  } else if (organization.name) {
    presenceData.details = "Viewing an organization";
    presenceData.state = organization.name.textContent;
  } else if (
    !organization.name &&
    document.location.pathname.includes("/orgs/")
  ) {
    const pathData: string[] = document.location.pathname.split("/").slice(2);

    presenceData.details = `Viewing ${pathData[1]} from`;
    [presenceData.state] = pathData;
  }
  presence.setActivity(presenceData);
});
