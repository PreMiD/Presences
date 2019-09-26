var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "607587875122446359",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var search = "/search?q=";
var searchURL = new URL(document.location.href);
var searchResult = searchURL.searchParams.get("q");
var profileURL = new URL(document.location.href);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var profileName, profileNickname;
    var repositoryAuthor, repositoryName, repositoryLocation, repositoryLocation2;
    var pullRequestTitle, pullRequestAuthor, pullRequestID;
    var issueTitle, issueAuthor, issueID;
    profileName = document.querySelector('.vcard-names .p-name');
    profileNickname = document.querySelector('.vcard-names .p-nickname');
    repositoryAuthor = document.querySelector('.author a');
    repositoryName = document.querySelector('.public strong a');
    repositoryLocation = document.querySelectorAll('.breadcrumb.mb-2');
    repositoryLocation2 = document.querySelectorAll('#blob-path');
    pullRequestTitle = issueTitle = document.querySelector("div.gh-header-show h1 span.js-issue-title");
    pullRequestAuthor = issueAuthor = document.querySelectorAll("div div.timeline-comment-header.clearfix h3 strong a");
    pullRequestID = issueID = document.querySelector("div.gh-header-show h1 span.gh-header-number");
    if (profileName) {
        var profileTabs = "/" + profileNickname.innerText + "?tab=";
        var profileCurrentTab = profileURL.searchParams.get("tab");
    }
    let presenceData = {
        details: "In construction",
        state: "-",
        largeImageKey: "lg"
    };
    if (document.location.pathname == "/" || !document.location.pathname) {
        presenceData.state = "Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/settings")) {
        presenceData.state = "Settings";
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/explore") || document.location.pathname.startsWith("/discover")) {
        presenceData.state = "Browsing repositories...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/marketplace")) {
        presenceData.state = "Browsing marketplace...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/pulls")) {
        presenceData.state = "Browsing pull requests...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname == "/notifications") {
        presenceData.state = "Browsing notifications...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/notifications/subscriptions")) {
        presenceData.state = "Browsing subscriptions...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/watching")) {
        presenceData.state = "Browsing interested repositories...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname == "/new") {
        presenceData.state = "Creating a new repository...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/new/import")) {
        presenceData.state = "Importing a repository...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/new/project")) {
        presenceData.state = "Creating a new project...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/organizations/new")) {
        presenceData.state = "Creating a new organization...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/topics")) {
        presenceData.state = "Browsing topics...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname == "/trending") {
        presenceData.state = "Browsing trending repositories...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/trending/developers")) {
        presenceData.state = "Browsing trending developers...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/collections")) {
        presenceData.state = "Browsing collections...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/events")) {
        presenceData.state = "Browsing events...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.indexOf(search)) {
        presenceData.details = "Searching for: ";
        presenceData.state = searchResult;
        presenceData.startTimestamp = browsingStamp;
    }
    if (repositoryAuthor && repositoryName) {
        if (repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname == ("/" + repositoryAuthor.innerText + "/" + repositoryName.innerText)) {
            presenceData.details = "Browsing a repository...";
            presenceData.state = repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/tree/") && repositoryLocation.length > 0) {
            var repLoc;
            repositoryLocation.forEach(item => {
                repLoc = item.innerText;
            });
            presenceData.details = "Browsing " + repositoryAuthor.innerText + "/" + repositoryName.innerText;
            presenceData.state = repLoc;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/blob/") && repositoryLocation2.length > 0) {
            var repLoc2;
            repositoryLocation2.forEach(item => {
                repLoc2 = item.innerText;
            });
            presenceData.details = "Looking at a file from " + repositoryAuthor.innerText + "/" + repositoryName.innerText;
            presenceData.state = repLoc2;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname == ("/" + repositoryAuthor.innerText + "/" + repositoryName.innerText + "/issues/")) {
            presenceData.details = "Browsing issues from:";
            presenceData.state = repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/pulls")) {
            presenceData.details = "Browsing pull requests from:";
            presenceData.state = repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/" + repositoryAuthor.innerText + "/" + repositoryName.innerText + "/pull/")) {
            presenceData.details = "Looking on pull request " + pullRequestID.innerText;
            presenceData.state = pullRequestAuthor[0].innerText + " - " + pullRequestTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/" + repositoryAuthor.innerText + "/" + repositoryName.innerText + "/issues/")) {
            presenceData.details = "Looking on issue " + issueID.innerText;
            presenceData.state = issueAuthor[0].innerText + " - " + issueTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/pulse") || document.location.pathname.includes("/graphs/contributors") || document.location.pathname.includes("/community") || document.location.pathname.includes("/graphs/commit-activity") || document.location.pathname.includes("/graphs/code-frequency") || document.location.pathname.includes("/network/dependencies") || document.location.pathname.includes("/graphs/commit-activity") || document.location.pathname.includes("/network") || document.location.pathname.includes("/network/members")) {
            var insightsTab = document.querySelector("nav a.js-selected-navigation-item.selected.menu-item");
            presenceData.details = "Browsing insights from " + repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.state = insightsTab.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/projects")) {
            presenceData.details = "Browsing projects from:";
            presenceData.state = repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/issues")) {
            presenceData.details = "Browsing issues from:";
            presenceData.state = repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/upload")) {
            presenceData.details = "Uploading files to:";
            presenceData.state = repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (!repositoryAuthor && !repositoryName && document.location.pathname.includes("/issues")) {
        presenceData.details = "Browsing issues...";
        presenceData.startTimestamp = browsingStamp;
    }
    if (profileName && profileNickname) {
        if (!document.location.pathname.indexOf(profileTabs)) {
            presenceData.details = "Browsing a profile...";
            if (profileName.innerText.length == 0 || profileName == null) {
                presenceData.state = profileNickname.innerText;
            }
            else if (profileNickname.innerText.length == 0 || profileNickname == null) {
                presenceData.state = profileName.innerText;
            }
            else
                presenceData.state = profileName.innerText + " | " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.indexOf(profileTabs)) {
            presenceData.details = "Browsing " + profileCurrentTab + " from:";
            if (profileName.innerText.length == 0 || profileName == null) {
                presenceData.state = profileNickname.innerText;
            }
            else if (profileNickname.innerText.length == 0 || profileNickname == null) {
                presenceData.state = profileName.innerText;
            }
            else
                presenceData.state = profileName.innerText + " | " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
            if (profileCurrentTab == null) {
                presenceData.details = "Browsing a profile...";
                if (profileName.innerText.length == 0 || profileName == null) {
                    presenceData.state = profileNickname.innerText;
                }
                else if (profileNickname.innerText.length == 0 || profileNickname == null) {
                    presenceData.state = profileName.innerText;
                }
                else
                    presenceData.state = profileName.innerText + " | " + profileNickname.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
        }
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUM7QUFDMUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxJQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWpELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLFdBQWlCLEVBQUUsZUFBcUIsQ0FBQztJQUU3QyxJQUFJLGdCQUFzQixFQUFFLGNBQW9CLEVBQUUsa0JBQXdCLEVBQUUsbUJBQXlCLENBQUM7SUFFdEcsSUFBSSxnQkFBc0IsRUFBRSxpQkFBdUIsRUFBRSxhQUFtQixDQUFDO0lBRXpFLElBQUksVUFBZ0IsRUFBRSxXQUFpQixFQUFFLE9BQWEsQ0FBQztJQUd2RCxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzdE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