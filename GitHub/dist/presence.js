var presence = new Presence({
    clientId: "607587875122446359"
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
    const presenceData = {
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
            repositoryLocation.forEach((item) => {
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
            repositoryLocation2.forEach((item) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQztBQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFakQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxXQUFnQixFQUFFLGVBQW9CLENBQUM7SUFFM0MsSUFBSSxnQkFBcUIsRUFDdkIsY0FBbUIsRUFDbkIsa0JBQXVCLEVBQ3ZCLG1CQUF3QixDQUFDO0lBRTNCLElBQUksZ0JBQXFCLEVBQUUsaUJBQXNCLEVBQUUsYUFBa0IsQ0FBQztJQUV0RSxJQUFJLFVBQWUsRUFBRSxXQUFnQixFQUFFLE9BQVksQ0FBQztJQUVwRCxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzdELGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFFckUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxjQUFjLEdB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