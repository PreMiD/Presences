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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzlCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDOUIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ2xDLFFBQVEsRUFBRSxvQkFBb0I7Q0FDOUIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUM7SUFDL0IsUUFBUSxFQUFFLG9CQUFvQjtDQUM5QixDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLElBQUk7UUFDbkIsY0FBYyxFQUFFLGFBQWE7S0FDN0IsQ0FBQztJQUNGLElBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYztRQUM1QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsRUFDaEQ7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1NB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