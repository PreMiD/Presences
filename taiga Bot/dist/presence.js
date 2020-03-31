let presence = new Presence({
    clientId: "682593223948238849"
});
let presenceGit = new Presence({
    clientId: "682593596301508662"
});
let presenceCommunity = new Presence({
    clientId: "682593903656173569"
});
let presenceAnigifs = new Presence({
    clientId: "682594082274410511"
});
let presenceLabs = new Presence({
    clientId: "682595885880049668"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "taigabot.net" ||
        document.location.hostname == "beta.taigabot.net") {
        presenceData.details = "taiga Website";
        if (document.location.pathname == "/") {
            presenceData.state = "Viewing the Frontpage...";
        }
        else if (document.location.pathname == "/information") {
            presenceData.state = "Viewing the Information Page...";
        }
        else if (document.location.pathname == "/information/faq") {
            presenceData.state = "Viewing Frequently Asked Questions...";
        }
        else if (document.location.pathname == "/information/commands") {
            presenceData.state = "Viewing Commands...";
        }
        else if (document.location.pathname == "/information/languages") {
            presenceData.state = "Viewing Supported Languages...";
        }
        else if (document.location.pathname == "/information/roadmap") {
            presenceData.state = "Viewing the Roadmap...";
        }
        else if (document.location.pathname == "/staff") {
            presenceData.state = "Viewing Staff Members...";
        }
        else if (document.location.pathname == "/leaderboard") {
            presenceData.state = "Viewing the Leaderboard...";
        }
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "api.taigabot.net") {
        presenceData.details = "taiga API";
        if (document.location.pathname.startsWith("/docs")) {
            presenceData.state = "Reading the Documentation";
        }
        else {
            presenceData.state = "Endpoint: " + document.location.pathname;
        }
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "cdn.taigabot.net") {
        presenceData.details = "taiga CDN";
        if (document.location.pathname.endsWith(".pdf") ||
            document.location.pathname.endsWith(".zip") ||
            document.location.pathname.endsWith(".svg") ||
            document.location.pathname.endsWith(".png") ||
            document.location.pathname.endsWith(".jpg") ||
            document.location.pathname.endsWith(".svg") ||
            document.location.pathname.endsWith(".css") ||
            document.location.pathname.endsWith(".ico")) {
            presenceData.state =
                "Viewing a File... (" + document.location.pathname + ")";
        }
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "cdnadmin.taigabot.net") {
        presenceData.details = "taiga CDN Admin Interface";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "legal.taigabot.net") {
        presenceData.details = "taiga Documents";
        if (document.location.pathname.endsWith(".pdf")) {
            presenceData.state =
                "Reading a Document... (" +
                    document.location.pathname.split("/")[document.location.pathname.split("/").length - 1] +
                    ")";
        }
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "taipl.taigabot.net") {
        presenceData.details = "taiga Plugin Engine";
        if (document.location.pathname == "/") {
            presenceData.state = "Viewing the Frontpage...";
        }
        else if (document.location.pathname.startsWith("/docs")) {
            presenceData.state = "Reading the Documentation...";
        }
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "telegram.taigabot.net") {
        presenceData.details = "Checking out taiga on Telegram...";
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "translate.taigabot.net") {
        presenceData.details = "taiga Translate";
        if (document.location.pathname == "/login") {
            presenceData.state = "Logging in...";
        }
        else if (document.location.pathname == "/signup") {
            presenceData.state = "Signing up...";
        }
        else if (document.location.pathname.startsWith("/projects")) {
            let urlParams = document.location.pathname.split("/");
            if (urlParams.length == 2) {
                presenceData.state = "Viewing their Projects...";
            }
            else if (urlParams.length == 4) {
                presenceData.state = "";
                if (urlParams[3] == "terms") {
                    presenceData.state = "Viewing Project Terms...";
                }
                else if (urlParams[3] == "translations") {
                    presenceData.state = "Translating...";
                }
                else if (urlParams[3] == "team") {
                    presenceData.state = "Viewing Project Members...";
                }
                else if (urlParams[3] == "import") {
                    presenceData.state = "Importing Strings...";
                }
                else if (urlParams[3] == "export") {
                    presenceData.state = "Exporting Strings...";
                }
                else if (urlParams[3] == "api") {
                    presenceData.state = "Viewing API Keys...";
                }
                else if (urlParams[3] == "settings") {
                    presenceData.state = "Changing Project Settings...";
                }
                presenceData.state +=
                    " (Project: " +
                        document.querySelector(".font-serif.text-white.truncate.mb-1")
                            .textContent +
                        ")";
            }
        }
        else if (document.location.pathname == "/user-settings") {
            presenceData.details = "Changing their Settings...";
        }
        presence.setActivity(presenceData);
    }
});
presenceGit.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "git.taigabot.net") {
        if (document.location.pathname == "/") {
            presenceData.details = "Viewing the front page...";
        }
        else if (document.location.pathname == "/user/login" ||
            document.location.pathname == "/user/login/openid") {
            presenceData.details = "Logging in...";
        }
        else if (document.location.pathname == "/user/sign_up") {
            presenceData.details = "Signing up...";
        }
        else if (document.location.pathname == "/issues") {
            presenceData.details = "Viewing their Issues...";
        }
        else if (document.location.pathname == "/pulls") {
            presenceData.details = "Viewing their Pull Requests...";
        }
        else if (document.location.pathname == "/milestones") {
            presenceData.details = "Viewing their Milestones...";
        }
        else if (document.location.pathname == "/explore/repos") {
            presenceData.details = "Exploring Repositories...";
        }
        else if (document.location.pathname == "/explore/users") {
            presenceData.details = "Exploring Users...";
        }
        else if (document.location.pathname == "/explore/organizations") {
            presenceData.details = "Exploring Organizations...";
        }
        else if (document.location.pathname.startsWith("/user/settings")) {
            presenceData.details = "Changing their Settings...";
        }
        else if (document.location.pathname.startsWith("/notifications")) {
            presenceData.details = "Checking their Notifications...";
        }
        else if (document.location.pathname.startsWith("/repo/create")) {
            presenceData.details = "Creating a new Repository...";
        }
        else if (document.location.pathname.startsWith("/repo/migrate")) {
            presenceData.details = "Creating a new Migration Repository...";
        }
        else if (document.location.pathname.startsWith("/org/create")) {
            presenceData.details = "Creating a new Organization...";
        }
        else {
            if (document.querySelector(".user.profile")) {
                let searchParams = new URLSearchParams(window.location.search);
                presenceData.details =
                    "Viewing Profile: " +
                        document.getElementsByClassName("username")[0].innerHTML;
                if (document.getElementsByClassName("username")[0].parentElement
                    .firstElementChild) {
                    presenceData.details +=
                        " (" +
                            document.getElementsByClassName("username")[0].parentElement
                                .firstElementChild.textContent +
                            ")";
                }
                let tab = searchParams.get("tab");
                if (tab) {
                    if (tab == "activity") {
                        presenceData.state = "Tab: Public Activity";
                    }
                    else if (tab == "stars") {
                        presenceData.state = "Tab: Starred Repositories";
                    }
                    else if (tab == "following") {
                        presenceData.state = "Tab: Following";
                    }
                    else if (tab == "followers") {
                        presenceData.state = "Tab: Followers";
                    }
                }
                else {
                    presenceData.state = "Tab: Repositories";
                }
            }
            else if (document.querySelector("#org-info")) {
                let displayName = document
                    .querySelector("#org-info")
                    .querySelector(".ui.header")
                    .textContent.replace(/\s*(?=(shaare))/gm, "")
                    .replace(/(?<=(shaare))\s*/gm, "");
                let orgName = document.location.pathname.split("/")[1];
                if (displayName == orgName) {
                    presenceData.details = "Viewing Organization: " + orgName;
                }
                else {
                    presenceData.details =
                        "Viewing Organization: " + displayName + " (" + orgName + ")";
                }
            }
            else if (document.querySelector(".repository")) {
                presenceData.details =
                    "Viewing Repository: " +
                        document.location.pathname.split("/")[1] +
                        "/" +
                        document.location.pathname.split("/")[2];
                if (document.location.pathname.split("/")[3] == "issues") {
                    if (document.getElementById("issue-title")) {
                        presenceData.state =
                            "Viewing an Issue... (" +
                                document.querySelector(".index").textContent +
                                ")";
                    }
                    else {
                        presenceData.state = "Viewing Issues...";
                    }
                }
                else if (document.location.pathname.split("/")[3] == "pulls") {
                    if (document.getElementById("issue-title")) {
                        presenceData.state =
                            "Viewing a Pull Request... (" +
                                document.querySelector(".index").textContent +
                                ")";
                    }
                    else {
                        presenceData.state = "Viewing Pull Requests...";
                    }
                }
                else if (document.location.pathname.split("/")[3] == "releases") {
                    presenceData.state = "Viewing Releases...";
                }
                else if (document.location.pathname.split("/")[3] == "wiki") {
                    presenceData.state = "Viewing Wiki...";
                    if (document.querySelector(".basic.small.button")) {
                        presenceData.state +=
                            " (" +
                                document
                                    .querySelector(".basic.small.button")
                                    .firstElementChild.innerHTML.match(/<strong>.*<\/strong>/m)[0]
                                    .replace(/(<strong>|<\/strong>)/gm, "") +
                                ")";
                    }
                }
                else if (document.location.pathname.split("/")[3] == "activity") {
                    presenceData.state = "Viewing Activity...";
                }
                else if (document.location.pathname.split("/")[3] == "src") {
                    let branch = document.getElementsByClassName("octicon-git-branch")[1]
                        .parentNode.lastChild.textContent;
                    presenceData.state = "Viewing Files... (" + branch + " Branch)";
                }
                else if (document.location.pathname.split("/")[3] == "commits") {
                    let branch = document.getElementsByClassName("octicon-git-branch")[1]
                        .parentNode.lastChild.textContent;
                    presenceData.state = "Viewing Commits... (" + branch + " Branch)";
                }
                else if (document.location.pathname.split("/")[3] == "branches") {
                    presenceData.state = "Viewing Branches";
                }
                else if (document.location.pathname.split("/")[3] == "forks") {
                    presenceData.state = "Viewing Forks";
                }
                else if (document.location.pathname.split("/")[3] == "stars") {
                    presenceData.state = "Viewing Stargazers";
                }
                else if (document.location.pathname.split("/")[3] == "watchers") {
                    presenceData.state = "Viewing Watchers";
                }
                else if (document.location.pathname.split("/")[3] == "labels") {
                    presenceData.state = "Viewing Labels";
                }
                else if (!document.location.pathname.split("/")[3]) {
                    presenceData.state = "Viewing Files... (master Branch)";
                }
            }
        }
        presenceGit.setActivity(presenceData);
    }
});
presenceCommunity.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "community.taigabot.net") {
        presenceCommunity.setActivity(presenceData);
    }
});
presenceAnigifs.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "anigifs.taigabot.net") {
        let urlArgs = document.location.pathname.split("/");
        console.log(urlArgs.length);
        if (urlArgs.length < 3) {
            presenceData.details = "Viewing the Frontpage";
        }
        else {
            let imageTypeIds = ["hug"];
            let imageTypeNames = ["Interactions: Hug"];
            imageTypeIds.forEach((imageTypeId, index) => {
                if (imageTypeId == urlArgs[urlArgs.length - 1]) {
                    presenceData.details = "Viewing an Image";
                    presenceData.state = imageTypeNames[index];
                }
            });
        }
        presenceAnigifs.setActivity(presenceData);
    }
});
presenceLabs.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "labs.taigabot.net") {
        if (document.location.pathname == "/") {
            presenceData.details = "Viewing the Frontpage...";
        }
        else {
            let appsTypeIds = ["card-tool"];
            let appsTypeNames = ["taiga Card Tool"];
            let urlArgs = document.location.pathname.split("/");
            appsTypeIds.forEach((appsTypeId, index) => {
                if (appsTypeId == urlArgs[1]) {
                    presenceData.details = "Using an App";
                    presenceData.state = appsTypeNames[index];
                }
            });
        }
        presenceLabs.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzdCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUNuQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ2pDLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUM7SUFDOUIsUUFBUSxFQUFFLG9CQUFvQjtDQUMvQixDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLElBQUk7UUFDbkIsY0FBYyxFQUFFLGFBQWE7S0FDOUIsQ0FBQztJQUNGLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYztRQUM1QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsRUFDakQ7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1NB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