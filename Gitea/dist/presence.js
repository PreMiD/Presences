var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "682218734391394338",
    mediaKeys: false
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
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
    presence.setActivity(presenceData);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLElBQUk7UUFDbkIsY0FBYyxFQUFFLGFBQWE7S0FDOUIsQ0FBQztJQUNGLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7S0FDcEQ7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsRUFBRTtRQUMxRyxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQTtLQUN2QztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFBO0tBQ3ZDO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQTtLQUNqRDtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NB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