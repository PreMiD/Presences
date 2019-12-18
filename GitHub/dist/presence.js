var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var profileName, profileNickname, repositoryAuthor, repositoryName, repositoryLocation, repositoryLocation2, pullRequestTitle, pullRequestAuthor, pullRequestID, issueTitle, issueAuthor, issueID, profileTabs, profileCurrentTab, presenceData, repLoc, repLoc2, insightsTab;
    return __generator(this, function (_a) {
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
            profileTabs = "/" + profileNickname.innerText + "?tab=";
            profileCurrentTab = profileURL.searchParams.get("tab");
        }
        presenceData = {
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
        else if (document.location.pathname.startsWith("/issues")) {
            presenceData.state = "Browsing issues...";
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
                repositoryLocation.forEach(function (item) {
                    repLoc = item.innerText;
                });
                presenceData.details = "Browsing " + repositoryAuthor.innerText + "/" + repositoryName.innerText;
                presenceData.state = repLoc;
                presenceData.startTimestamp = browsingStamp;
            }
            else if (repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/blob/") && repositoryLocation2.length > 0) {
                repositoryLocation2.forEach(function (item) {
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
                insightsTab = document.querySelector("nav a.js-selected-navigation-item.selected.menu-item");
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
        return [2 /*return*/];
    });
}); });
/**
* Get Timestamps
* @param {Number} videoTime Current video time seconds
* @param {Number} videoDuration Video duration seconds
*/
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
