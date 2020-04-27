var presence = new Presence({
    clientId: "612416330003382314"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var profileName, profileTabs, messageTab, friendsTab, inventoryTab, groupName, groupTab, gameName, gameTab;
gameName = document.querySelector("div.game-calls-to-action > div.game-title-container > h2");
presence.on("UpdateData", async () => {
    const presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    if (document.location.pathname.includes("/home")) {
        presenceData.details = "Current page: ";
        presenceData.state = "Home";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/users") &&
        document.location.pathname.includes("/profile")) {
        profileName = document.querySelector("div.profile-header-top > div.header-caption > div.header-title > h2");
        profileTabs = document.querySelector("#horizontal-tabs li.rbx-tab.active a");
        if (profileTabs.innerText == "Creations") {
            presenceData.details = "Profile: " + profileName.innerText;
            presenceData.state = "Browsing creations...";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Looking on a profile: ";
            presenceData.state = profileName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/my/messages")) {
        messageTab = document.querySelector("#wrap > div.container-main > div.content > div.messages-container.ng-scope > div > ul > li.rbx-tab.ng-scope.active");
        presenceData.details = "Messages";
        presenceData.state = "Tab: " + messageTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/users/friends")) {
        friendsTab = document.querySelector("li.rbx-tab.active");
        presenceData.details = "Friends";
        presenceData.state = "Tab: " + friendsTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/my/avatar")) {
        presenceData.details = "Current page: ";
        presenceData.state = "Avatar Editor";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/users") &&
        document.location.pathname.includes("/inventory")) {
        inventoryTab = document.querySelector("#vertical-menu > li.menu-option.ng-scope.active");
        presenceData.details = "Inventory";
        presenceData.state = inventoryTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/groups/join") {
        presenceData.details = "Browsing groups...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/groups") &&
        !document.location.pathname.includes("/search")) {
        groupName = document.querySelector("div.section-content > div.group-header > div.group-caption.group-caption-with-image > h1");
        groupTab = document.querySelector("#horizontal-tabs li.rbx-tab.active");
        presenceData.details = groupName.innerText;
        presenceData.state = "Tab: " + groupTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/search/groups")) {
        var searchURL = new URL(document.location.href);
        var searchResult = searchURL.searchParams.get("keyword");
        presenceData.details = "Searching for a group:";
        presenceData.state = searchResult;
        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/feeds")) {
        presenceData.details = "Current page: ";
        presenceData.state = "Feed";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/games/" && gameName == null) {
        presenceData.details = "Browsing games...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/games/")) {
        gameTab = document.querySelector("#horizontal-tabs li.rbx-tab.active");
        presenceData.details = "Game: " + gameName.innerText;
        presenceData.state = "Tab: " + gameTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/catalog/")) {
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
    }
    else if (document.location.pathname.includes("/search/users")) {
        const searchURL = new URL(document.location.href);
        const searchResult = searchURL.searchParams.get("keyword");
        presenceData.details = "Searching for an user:";
        presenceData.state = searchResult;
        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBZ0IsRUFDbEIsV0FBZ0IsRUFDaEIsVUFBZSxFQUNmLFVBQWUsRUFDZixZQUFpQixFQUNqQixTQUFjLEVBQ2QsUUFBYSxFQUNiLFFBQWEsRUFDYixPQUFZLENBQUM7QUFFZixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDL0IsMERBQTBELENBQzNELENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFFeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFNUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUMvQztRQUNBLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyxxRUFBcUUsQ0FDdEUsQ0FBQztR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