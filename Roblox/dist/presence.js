var presence = new Presence({
    clientId: "612416330003382314"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var profileName, profileTabs, messageTab, friendsTab, inventoryTab, groupName, groupTab, gameName, gameTab;
gameName = document.querySelector("div.game-calls-to-action > div.game-title-container > h2");
presence.on("UpdateData", async () => {
    let presenceData = {
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
        let searchURL = new URL(document.location.href);
        let searchResult = searchURL.searchParams.get("Keyword");
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
        let searchURL = new URL(document.location.href);
        let searchResult = searchURL.searchParams.get("keyword");
        presenceData.details = "Searching for an user:";
        presenceData.state = searchResult;
        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxXQUFnQixFQUNsQixXQUFnQixFQUNoQixVQUFlLEVBQ2YsVUFBZSxFQUNmLFlBQWlCLEVBQ2pCLFNBQWMsRUFDZCxRQUFhLEVBQ2IsUUFBYSxFQUNiLE9BQVksQ0FBQztBQUVmLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMvQiwwREFBMEQsQ0FDM0QsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDaEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUV4QyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUU1QixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFD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