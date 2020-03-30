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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQzFCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVqRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFdBQWdCLEVBQUUsZUFBb0IsQ0FBQztJQUUzQyxJQUFJLGdCQUFxQixFQUN4QixjQUFtQixFQUNuQixrQkFBdUIsRUFDdkIsbUJBQXdCLENBQUM7SUFFMUIsSUFBSSxnQkFBcUIsRUFBRSxpQkFBc0IsRUFBRSxhQUFrQixDQUFDO0lBRXRFLElBQUksVUFBZSxFQUFFLFdBQWdCLEVBQUUsT0FBWSxDQUFDO0lBRXBELFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDN0QsZUFBZSxHQUFHLFFBQVEsQ0FBQyxh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