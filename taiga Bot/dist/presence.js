var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "682593223948238849",
    
});
let presenceGit = new Presence({
    clientId: "682593596301508662",
    
});
let presenceCommunity = new Presence({
    clientId: "682593903656173569",
    
});
let presenceAnigifs = new Presence({
    clientId: "682594082274410511",
    
});
let presenceLabs = new Presence({
    clientId: "682595885880049668",
    
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "taigabot.net" || document.location.hostname == "beta.taigabot.net") {
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
        if (document.location.pathname.endsWith(".pdf") || document.location.pathname.endsWith(".zip") || document.location.pathname.endsWith(".svg") || document.location.pathname.endsWith(".png") || document.location.pathname.endsWith(".jpg") || document.location.pathname.endsWith(".svg") || document.location.pathname.endsWith(".css") || document.location.pathname.endsWith(".ico")) {
            presenceData.state = "Viewing a File... (" + document.location.pathname + ")";
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
            presenceData.state = "Reading a Document... (" + document.location.pathname.split("/")[document.location.pathname.split("/").length - 1] + ")";
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
                presenceData.state += " (Project: " + document.querySelector(".font-serif.text-white.truncate.mb-1").textContent + ")";
            }
        }
        else if (document.location.pathname == "/user-settings") {
            presenceData.details = "Changing their Settings...";
        }
        presence.setActivity(presenceData);
    }
}));
presenceGit.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "git.taigabot.net") {
        if (document.location.pathname == "/") {
            presenceData.details = "Viewing the front page...";
        }
        else if (document.location.pathname == "/user/login" || document.location.pathname == "/user/login/openid") {
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
                presenceData.details = "Viewing Profile: " + document.getElementsByClassName("username")[0].innerHTML;
                if (document.getElementsByClassName("username")[0].parentElement.firstElementChild) {
                    presenceData.details += " (" + document.getElementsByClassName("username")[0].parentElement.firstElementChild.textContent + ")";
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
                let displayName = document.querySelector("#org-info").querySelector(".ui.header").textContent.replace(/\s*(?=(shaare))/gm, "").replace(/(?<=(shaare))\s*/gm, "");
                let orgName = document.location.pathname.split("/")[1];
                if (displayName == orgName) {
                    presenceData.details = "Viewing Organization: " + orgName;
                }
                else {
                    presenceData.details = "Viewing Organization: " + displayName + " (" + orgName + ")";
                }
            }
            else if (document.querySelector(".repository")) {
                presenceData.details = "Viewing Repository: " + document.location.pathname.split("/")[1] + "/" + document.location.pathname.split("/")[2];
                if (document.location.pathname.split("/")[3] == "issues") {
                    if (document.getElementById("issue-title")) {
                        presenceData.state = "Viewing an Issue... (" + document.querySelector(".index").textContent + ")";
                    }
                    else {
                        presenceData.state = "Viewing Issues...";
                    }
                }
                else if (document.location.pathname.split("/")[3] == "pulls") {
                    if (document.getElementById("issue-title")) {
                        presenceData.state = "Viewing a Pull Request... (" + document.querySelector(".index").textContent + ")";
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
                        presenceData.state += " (" + document.querySelector(".basic.small.button").firstElementChild.innerHTML.match(/<strong>.*<\/strong>/m)[0].replace(/(<strong>|<\/strong>)/gm, "") + ")";
                    }
                }
                else if (document.location.pathname.split("/")[3] == "activity") {
                    presenceData.state = "Viewing Activity...";
                }
                else if (document.location.pathname.split("/")[3] == "src") {
                    let branch = document.getElementsByClassName("octicon-git-branch")[1].parentNode.lastChild.textContent;
                    presenceData.state = "Viewing Files... (" + branch + " Branch)";
                }
                else if (document.location.pathname.split("/")[3] == "commits") {
                    let branch = document.getElementsByClassName("octicon-git-branch")[1].parentNode.lastChild.textContent;
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
}));
presenceCommunity.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname == "community.taigabot.net") {
        presenceCommunity.setActivity(presenceData);
    }
}));
presenceAnigifs.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
presenceLabs.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUNILElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzdCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUNuQyxRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUNILElBQUksZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ2pDLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUM7SUFDOUIsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixTQUFTLEVBQUUsS0FBSztDQUNqQixDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGNBQWMsRUFBRSxhQUFhO0tBQzlCLENBQUM7SUFDRixJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGNBQWMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsRUFBRTtRQUNwRyxZQUFZLENBQUMsT0FB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