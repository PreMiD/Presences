var presence = new Presence({
    clientId: "607587875122446359"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var search = "/search?q=";
var searchURL = new URL(document.location.href);
var searchResult = searchURL.searchParams.get("q");
var profileURL = new URL(document.location.href);
presence.on("UpdateData", async () => {
    var profileName, profileNickname;
    var repositoryAuthor, repositoryName, repositoryLocation, repositoryLocation2;
    var pullRequestTitle, pullRequestAuthor, pullRequestID;
    var issueTitle, issueAuthor, issueID;
    profileName = document.querySelector(".vcard-names .p-name");
    profileNickname = document.querySelector(".vcard-names .p-nickname");
    repositoryAuthor = document.querySelector(".author a");
    repositoryName = document.querySelector(".public strong a");
    repositoryLocation = document.querySelectorAll(".breadcrumb.mb-2");
    repositoryLocation2 = document.querySelectorAll("#blob-path");
    pullRequestTitle = issueTitle = document.querySelector("div.gh-header-show h1 span.js-issue-title");
    pullRequestAuthor = issueAuthor = document.querySelectorAll("div div.timeline-comment-header.clearfix h3 strong a");
    pullRequestID = issueID = document.querySelector("div.gh-header-show h1 span.gh-header-number");
    if (profileName) {
        var profileTabs = "/" + profileNickname.innerText + "?tab=";
        var profileCurrentTab = profileURL.searchParams.get("tab");
    }
    let presenceData = {
        details: "Unknown page",
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
    else if (document.location.pathname.startsWith("/explore") ||
        document.location.pathname.startsWith("/discover")) {
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
        if (repositoryAuthor.innerText.length > 0 &&
            repositoryName.innerText.length > 0 &&
            document.location.pathname ==
                "/" + repositoryAuthor.innerText + "/" + repositoryName.innerText) {
            presenceData.details = "Browsing a repository...";
            presenceData.state =
                repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (repositoryAuthor.innerText.length > 0 &&
            repositoryName.innerText.length > 0 &&
            document.location.pathname.includes("/tree/") &&
            repositoryLocation.length > 0) {
            var repLoc;
            repositoryLocation.forEach(item => {
                repLoc = item.innerText;
            });
            presenceData.details =
                "Browsing " +
                    repositoryAuthor.innerText +
                    "/" +
                    repositoryName.innerText;
            presenceData.state = repLoc;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (repositoryAuthor.innerText.length > 0 &&
            repositoryName.innerText.length > 0 &&
            document.location.pathname.includes("/blob/") &&
            repositoryLocation2.length > 0) {
            var repLoc2;
            repositoryLocation2.forEach(item => {
                repLoc2 = item.innerText;
            });
            presenceData.details =
                "Looking at a file from " +
                    repositoryAuthor.innerText +
                    "/" +
                    repositoryName.innerText;
            presenceData.state = repLoc2;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname ==
            "/" +
                repositoryAuthor.innerText +
                "/" +
                repositoryName.innerText +
                "/issues/") {
            presenceData.details = "Browsing issues from:";
            presenceData.state =
                repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (repositoryAuthor.innerText.length > 0 &&
            repositoryName.innerText.length > 0 &&
            document.location.pathname.includes("/pulls")) {
            presenceData.details = "Browsing pull requests from:";
            presenceData.state =
                repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/" +
            repositoryAuthor.innerText +
            "/" +
            repositoryName.innerText +
            "/pull/")) {
            presenceData.details =
                "Looking on pull request " + pullRequestID.innerText;
            presenceData.state =
                pullRequestAuthor[0].innerText + " - " + pullRequestTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/" +
            repositoryAuthor.innerText +
            "/" +
            repositoryName.innerText +
            "/issues/")) {
            presenceData.details = "Looking on issue " + issueID.innerText;
            presenceData.state =
                issueAuthor[0].innerText + " - " + issueTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/pulse") ||
            document.location.pathname.includes("/graphs/contributors") ||
            document.location.pathname.includes("/community") ||
            document.location.pathname.includes("/graphs/commit-activity") ||
            document.location.pathname.includes("/graphs/code-frequency") ||
            document.location.pathname.includes("/network/dependencies") ||
            document.location.pathname.includes("/graphs/commit-activity") ||
            document.location.pathname.includes("/network") ||
            document.location.pathname.includes("/network/members")) {
            var insightsTab = document.querySelector("nav a.js-selected-navigation-item.selected.menu-item");
            presenceData.details =
                "Browsing insights from " +
                    repositoryAuthor.innerText +
                    " / " +
                    repositoryName.innerText;
            presenceData.state = insightsTab.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/projects")) {
            presenceData.details = "Browsing projects from:";
            presenceData.state =
                repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/issues")) {
            presenceData.details = "Browsing issues from:";
            presenceData.state =
                repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("/upload")) {
            presenceData.details = "Uploading files to:";
            presenceData.state =
                repositoryAuthor.innerText + " / " + repositoryName.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (!repositoryAuthor &&
        !repositoryName &&
        document.location.pathname.includes("/issues")) {
        presenceData.details = "Browsing issues...";
        presenceData.startTimestamp = browsingStamp;
    }
    if (profileName && profileNickname) {
        if (!document.location.pathname.indexOf(profileTabs)) {
            presenceData.details = "Browsing a profile...";
            if (profileName.innerText.length == 0) {
                presenceData.state = profileNickname.innerText;
            }
            else if (profileNickname.innerText.length == 0) {
                presenceData.state = profileName.innerText;
            }
            else
                presenceData.state =
                    profileName.innerText + " | " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.indexOf(profileTabs)) {
            presenceData.details = "Browsing " + profileCurrentTab + " from:";
            if (profileName.innerText.length == 0) {
                presenceData.state = profileNickname.innerText;
            }
            else if (profileNickname.innerText.length == 0) {
                presenceData.state = profileName.innerText;
            }
            else
                presenceData.state =
                    profileName.innerText + " | " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
            if (profileCurrentTab == null) {
                presenceData.details = "Browsing a profile...";
                if (profileName.innerText.length == 0) {
                    presenceData.state = profileNickname.innerText;
                }
                else if (profileNickname.innerText.length == 0) {
                    presenceData.state = profileName.innerText;
                }
                else
                    presenceData.state =
                        profileName.innerText + " | " + profileNickname.innerText;
                presenceData.startTimestamp = browsingStamp;
            }
        }
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQzFCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVqRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFdBQWdCLEVBQUUsZUFBb0IsQ0FBQztJQUUzQyxJQUFJLGdCQUFxQixFQUN2QixjQUFtQixFQUNuQixrQkFBdUIsRUFDdkIsbUJBQXdCLENBQUM7SUFFM0IsSUFBSSxnQkFBcUIsRUFBRSxpQkFBc0IsRUFBRSxhQUFrQixDQUFDO0lBRXRFLElBQUksVUFBZSxFQUFFLFdBQWdCLEVBQUUsT0FBWSxDQUFDO0lBRXBELFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDN0QsZUFBZSxHQUFHLFFBQVEsQ0FBQyxh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