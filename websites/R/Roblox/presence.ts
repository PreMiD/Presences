const presence = new Presence({
    clientId: "612416330003382314"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let profileName,
  profileTabs,
  messageTab,
  friendsTab,
  inventoryTab,
  groupName,
  groupTab,
  gameTab;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      details: "Unknown page",
      largeImageKey: "lg"
    },
    gameName = <HTMLHeadingElement>(
      document.querySelector(
        "div.game-calls-to-action > div.game-title-container > h2"
      )
    );

  if (document.location.pathname.includes("/home")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Home";

    presenceData.startTimestamp = browsingStamp;
  } else if (
    document.location.pathname.includes("/users") &&
    document.location.pathname.includes("/profile")
  ) {
    profileName = <HTMLHeadingElement>(
      document.querySelector(
        "div.profile-header-top > div.header-caption > div.header-title > h2"
      )
    );

    profileTabs = <HTMLAnchorElement>(
      document.querySelector("#horizontal-tabs li.rbx-tab.active a")
    );

    //console.log(profileTabs.innerText);

    if (profileTabs.innerText == "Creations") {
      presenceData.details = "Profile: " + profileName.innerText;

      presenceData.state = "Browsing creations...";

      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "Looking on a profile: ";

      presenceData.state = profileName.innerText;

      presenceData.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.includes("/my/messages")) {
    messageTab = <HTMLLIElement>(
      document.querySelector(
        "#wrap > div.container-main > div.content > div.messages-container.ng-scope > div > ul > li.rbx-tab.ng-scope.active"
      )
    );

    presenceData.details = "Messages";

    presenceData.state = "Tab: " + messageTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/users/friends")) {
    friendsTab = <HTMLAnchorElement>(
      document.querySelector(".rbx-tab-heading.active")
    );

    presenceData.details = "Friends";

    presenceData.state = "Tab: " + friendsTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/my/avatar")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Avatar Editor";

    presenceData.startTimestamp = browsingStamp;
  } else if (
    document.location.pathname.includes("/users") &&
    document.location.pathname.includes("/inventory")
  ) {
    inventoryTab = <HTMLLIElement>(
      document.querySelector("#vertical-menu > li.menu-option.ng-scope.active")
    );

    presenceData.details = "Inventory";

    presenceData.state = inventoryTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/groups/join") {
    presenceData.details = "Browsing groups...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (
    document.location.pathname.includes("/groups") &&
    !document.location.pathname.includes("/search")
  ) {
    groupName = <HTMLHeadingElement>document.querySelector(".group-name");

    groupTab = <HTMLLIElement>(
      document.querySelector("#horizontal-tabs li.rbx-tab.active")
    );

    presenceData.details = groupName.innerText;

    presenceData.state = "Tab: " + groupTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/search/groups")) {
    const searchURL = new URL(document.location.href),
      searchResult = searchURL.searchParams.get("keyword");

    presenceData.details = "Searching for a group:";

    presenceData.state = searchResult;

    presenceData.smallImageKey = "search";

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/feeds")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Feed";

    presenceData.startTimestamp = browsingStamp;
  } else if (
    (document.location.pathname == "/games/" ||
      document.location.pathname == "/games") &&
    gameName == null
  ) {
    presenceData.details = "Browsing games...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/games/")) {
    gameTab = <HTMLLIElement>(
      document.querySelector("#horizontal-tabs li.rbx-tab.active")
    );

    presenceData.details = "Game: " + gameName.innerText;

    presenceData.state = "Tab: " + gameTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/catalog/")) {
    const searchURL = new URL(document.location.href),
      searchResult = searchURL.searchParams.get("Keyword");

    presenceData.details = "Current page:";

    presenceData.state = "Catalog";

    presenceData.startTimestamp = browsingStamp;

    if (searchResult) {
      presenceData.details = "Searching for an item: ";

      presenceData.state = searchResult;

      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/search/users")) {
    const searchURL = new URL(document.location.href),
      searchResult = searchURL.searchParams.get("keyword");

    presenceData.details = "Searching for an user:";

    presenceData.state = searchResult;

    presenceData.smallImageKey = "search";

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/develop")) {
    presenceData.details = "Developer Page";
    const developTabs = (<HTMLDivElement>(
      document.querySelector("#DevelopTabs .tab-active")
    )).innerText;
    if (developTabs == "My Creations") {
      presenceData.state =
        "Tab: " +
        developTabs +
        " > " +
        (<HTMLAnchorElement>document.querySelector(".tab-item-selected"))
          .innerText;
    } else if (developTabs == "Library") {
      presenceData.state =
        "Tab: " +
        developTabs +
        " > " +
        (<HTMLAnchorElement>document.querySelector(".selectedAssetTypeFilter"))
          .innerText;
    } else {
      presenceData.state = "Tab: " + developTabs;
    }
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/robux")) {
    presenceData.details = "Current page:";
    presenceData.state = "Robux";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/catalog")) {
    presenceData.details = "Current page:";
    presenceData.state = "Avatar Shop";
    presenceData.startTimestamp = browsingStamp;
  }

  if (document.querySelector(".notification-stream-container") != null) {
    presenceData.details = "Viewing Notifications";
    delete presenceData.state;
    presenceData.startTimestamp = browsingStamp;
  }

  presence.setActivity(presenceData);
});
