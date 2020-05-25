var presence = new Presence({
  clientId: "612416330003382314"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var profileName: any,
  profileTabs: any,
  messageTab: any,
  friendsTab: any,
  inventoryTab: any,
  groupName: any,
  groupTab: any,
  gameName: any,
  gameTab: any;

gameName = document.querySelector(
  "div.game-calls-to-action > div.game-title-container > h2"
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    details: "Unknown page",
    largeImageKey: "lg"
  };

  if (document.location.pathname.includes("/home")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Home";

    presenceData.startTimestamp = browsingStamp;
  } else if (
    document.location.pathname.includes("/users") &&
    document.location.pathname.includes("/profile")
  ) {
    profileName = document.querySelector(
      "div.profile-header-top > div.header-caption > div.header-title > h2"
    );

    profileTabs = document.querySelector(
      "#horizontal-tabs li.rbx-tab.active a"
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
    messageTab = document.querySelector(
      "#wrap > div.container-main > div.content > div.messages-container.ng-scope > div > ul > li.rbx-tab.ng-scope.active"
    );

    presenceData.details = "Messages";

    presenceData.state = "Tab: " + messageTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/users/friends")) {
    friendsTab = document.querySelector("li.rbx-tab.active");

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
    inventoryTab = document.querySelector(
      "#vertical-menu > li.menu-option.ng-scope.active"
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
    groupName = document.querySelector(
      "div.section-content > div.group-header > div.group-caption.group-caption-with-image > h1"
    );

    groupTab = document.querySelector("#horizontal-tabs li.rbx-tab.active");

    presenceData.details = groupName.innerText;

    presenceData.state = "Tab: " + groupTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/search/groups")) {
    var searchURL = new URL(document.location.href);

    var searchResult = searchURL.searchParams.get("keyword");

    presenceData.details = "Searching for a group:";

    presenceData.state = searchResult;

    presenceData.smallImageKey = "search";

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/feeds")) {
    presenceData.details = "Current page: ";

    presenceData.state = "Feed";

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname == "/games/" && gameName == null) {
    presenceData.details = "Browsing games...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
  } else if (document.location.pathname.includes("/games/")) {
    gameTab = document.querySelector("#horizontal-tabs li.rbx-tab.active");

    presenceData.details = "Game: " + gameName.innerText;

    presenceData.state = "Tab: " + gameTab.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/catalog/")) {
    const searchURL = new URL(document.location.href);

    const searchResult = searchURL.searchParams.get("Keyword");

    presenceData.details = "Current page:";

    presenceData.state = "Catalog";

    presenceData.startTimestamp = browsingStamp;

    if (searchResult) {
      presenceData.details = "Searching for an item: ";

      presenceData.state = searchResult;

      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/search/users")) {
    const searchURL = new URL(document.location.href);

    const searchResult = searchURL.searchParams.get("keyword");

    presenceData.details = "Searching for an user:";

    presenceData.state = searchResult;

    presenceData.smallImageKey = "search";

    presenceData.startTimestamp = browsingStamp;
  }

  presence.setActivity(presenceData);
});
