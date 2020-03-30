var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "612416330003382314",
    
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var profileName, profileTabs, messageTab, friendsTab, inventoryTab, groupName, groupTab, gameName, gameTab;
gameName = document.querySelector("div.game-calls-to-action > div.game-title-container > h2");
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLFdBQWdCLEVBQ25CLFdBQWdCLEVBQ2hCLFVBQWUsRUFDZixVQUFlLEVBQ2YsWUFBaUIsRUFDakIsU0FBYyxFQUNkLFFBQWEsRUFDYixRQUFhLEVBQ2IsT0FBWSxDQUFDO0FBRWQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLDBEQUEwRCxDQUMxRCxDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUV4QyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUU1QixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM1QztTQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztR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