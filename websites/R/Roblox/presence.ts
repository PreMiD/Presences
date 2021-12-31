const presence = new Presence({
    clientId: "612416330003382314"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let profileName,
  profileTabs,
  profileAvatar,
  messageTab,
  friendsTab,
  inventoryTab,
  groupName,
  groupImage,
  groupTab,
  gameTab;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      details: "Unknown page",
      largeImageKey: "lg",
      startTimestamp: browsingTimestamp
    },
    gameName = document.querySelector<HTMLHeadingElement>(
      "div.game-calls-to-action > div.game-title-container > h2"
    ),
    imagesEnabled = await presence.getSetting<boolean>("images");

  if (document.location.pathname.includes("/home")) {
    presenceData.details = "Current page: ";
    presenceData.state = "Home";
  } else if (
    document.location.pathname.includes("/users") &&
    document.location.pathname.includes("/profile")
  ) {
    profileName = document.querySelector<HTMLHeadingElement>(
      "div.profile-header-top > div.header-caption div.header-title > h2"
    );

    profileTabs = document.querySelector<HTMLAnchorElement>(
      "#horizontal-tabs li.rbx-tab.active a"
    );

    profileAvatar = document.querySelector<HTMLImageElement>(
      ".avatar-headshot-lg thumbnail-2d img[image-load]"
    );

    if (profileTabs.textContent === "Creations") {
      presenceData.details = `Profile: ${profileName.textContent}`;

      presenceData.state = "Browsing creations...";
    } else {
      presenceData.details = "Looking on a profile: ";

      presenceData.state = profileName.textContent;
    }

    if (imagesEnabled && profileAvatar)
      presenceData.largeImageKey = profileAvatar.src;
  } else if (document.location.pathname.includes("/my/messages")) {
    messageTab = document.querySelector<HTMLLIElement>(
      "#wrap > div.container-main > div.content > div.messages-container.ng-scope > div > ul > li.rbx-tab.ng-scope.active"
    );

    presenceData.details = "Messages";

    presenceData.state = `Tab: ${messageTab.textContent}`;
  } else if (document.location.pathname.includes("/users/friends")) {
    friendsTab = document.querySelector<HTMLAnchorElement>(
      ".rbx-tab-heading.active"
    );

    presenceData.details = "Friends";

    presenceData.state = `Tab: ${friendsTab.textContent}`;
  } else if (document.location.pathname.includes("/my/avatar")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Avatar Editor";
  } else if (
    document.location.pathname.includes("/users") &&
    document.location.pathname.includes("/inventory")
  ) {
    inventoryTab = document.querySelector<HTMLLIElement>(
      "#vertical-menu > li.menu-option.ng-scope.active"
    );

    presenceData.details = "Inventory";

    presenceData.state = inventoryTab.textContent;
  } else if (document.location.pathname === "/groups/join") {
    presenceData.details = "Browsing groups...";

    delete presenceData.state;
  } else if (
    document.location.pathname.includes("/groups") &&
    !document.location.pathname.includes("/search")
  ) {
    groupName = <HTMLHeadingElement>(
      document.querySelector(".group-title .group-name.text-overflow")
    );

    groupTab = <HTMLLIElement>(
      document.querySelector("#horizontal-tabs li.rbx-tab.active")
    );

    groupImage = <HTMLImageElement>(
      document.querySelector(".group-image thumbnail-2d img[image-load]")
    );

    presenceData.details = groupName.textContent;

    presenceData.state = `Tab: ${groupTab.textContent}`;

    if (imagesEnabled && groupImage)
      presenceData.largeImageKey = groupImage.src;
  } else if (document.location.pathname.includes("/search/groups")) {
    const searchResult = new URL(document.location.href).searchParams.get(
      "keyword"
    );

    presenceData.details = "Searching for a group:";

    presenceData.state = searchResult;

    presenceData.smallImageKey = "search";
  } else if (document.location.pathname.includes("/feeds")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Feed";
  } else if (
    (document.location.pathname === "/games/" ||
      document.location.pathname === "/games") &&
    !gameName
  ) {
    presenceData.details = "Browsing games...";

    delete presenceData.state;
  } else if (document.location.pathname.includes("/games/")) {
    gameTab = document.querySelector<HTMLLIElement>(
      "#horizontal-tabs li.rbx-tab.active"
    );

    presenceData.details = `Game: ${gameName.textContent}`;

    presenceData.state = `Tab: ${gameTab.textContent}`;
  } else if (document.location.pathname.includes("/catalog/")) {
    const searchResult = new URL(document.location.href).searchParams.get(
      "Keyword"
    );

    presenceData.details = "Current page:";

    presenceData.state = "Catalog";

    if (searchResult) {
      presenceData.details = "Searching for an item: ";

      presenceData.state = searchResult;

      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/search/users")) {
    presenceData.details = "Searching for an user:";
    presenceData.state = new URL(document.location.href).searchParams.get(
      "keyword"
    );
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname.includes("/develop")) {
    presenceData.details = "Developer Page";
    const developTabs = document.querySelector<HTMLDivElement>(
      "#DevelopTabs .tab-active"
    ).textContent;
    if (developTabs === "My Creations") {
      presenceData.state = `Tab: ${developTabs} > ${
        document.querySelector<HTMLAnchorElement>(".tab-item-selected")
          .textContent
      }`;
    } else if (developTabs === "Library") {
      presenceData.state = `Tab: ${developTabs} > ${
        document.querySelector<HTMLAnchorElement>(".selectedAssetTypeFilter")
          .textContent
      }`;
    } else presenceData.state = `Tab: ${developTabs}`;
  } else if (document.location.pathname.includes("/robux")) {
    presenceData.details = "Current page:";
    presenceData.state = "Robux";
  } else if (document.location.pathname.includes("/catalog")) {
    presenceData.details = "Current page:";
    presenceData.state = "Avatar Shop";
  }

  if (document.querySelector(".notification-stream-container")) {
    presenceData.details = "Viewing Notifications";
    delete presenceData.state;
  }
  if (document.location.hostname === "devforum.roblox.com") {
    // For some reason almost every single HTMLElement needed returned with value "null" so document.title was used
    delete presenceData.largeImageKey;
    presenceData.details = "Visiting the DevForum";
    presenceData.largeImageKey = "https://i.imgur.com/07YmNQw.png";
    if (document.location.pathname === "/categories")
      presenceData.state = "Browsing categories";
    else if (document.location.pathname === "/latest")
      presenceData.state = "Browsing latest posts";
    else if (document.location.pathname.startsWith("/top"))
      presenceData.state = "Browsing top posts";
    else if (document.location.pathname.startsWith("/c")) {
      presenceData.state = `Category: ${document.title.substring(
        document.title.indexOf("Latest") + 6,
        document.title.indexOf("topics") - 1
      )}`;
    } else if (document.location.pathname.startsWith("/t")) {
      presenceData.state = `Reading: ${
        document.querySelector<HTMLAnchorElement>(
          "#topic-title > div > div > h1 > a"
        ).textContent
      }`;
    } else if (document.location.pathname.startsWith("/u")) {
      presenceData.state = `Viewing user: ${document.title.substring(
        document.title.indexOf("-") + 1,
        document.title.lastIndexOf("-") - 1
      )}`;
    } else if (document.location.pathname.startsWith("/search")) {
      presenceData.state = `Searching for: ${document.title.substring(
        document.title.indexOf("'") + 1,
        document.title.lastIndexOf("'")
      )}`;
    } else if (document.location.pathname.startsWith("/badges")) {
      if (document.location.pathname === "/badges")
        presenceData.state = "Viewing all badges";
      else
        presenceData.state = `Viewing badge: ${document.title.split(/[-]/, 1)}`;
    } else if (document.location.pathname.startsWith("/g")) {
      if (document.location.pathname === "/g")
        presenceData.state = "Browsing groups";
      else {
        presenceData.state = `Viewing group: ${document.title.substring(
          document.title.indexOf("-") + 1,
          document.title.lastIndexOf("-") - 1
        )}`;
      }
    } else if (document.location.pathname === "/tags")
      presenceData.state = "Browsing tags";
    else if (document.location.pathname.startsWith("/tag")) {
      presenceData.state = `Browsing tag: ${document.title.substring(
        document.title.indexOf("Latest") + 6,
        document.title.indexOf("topics") - 1
      )}`;
    } else if (document.location.href === "https://devforum.roblox.com/")
      presenceData.state = "Home page";
  }
  presence.setActivity(presenceData);
});
