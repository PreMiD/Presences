var presence = new Presence({
    clientId: "682218734391394338"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
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
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsYUFBYTtLQUM3QixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztLQUNuRDtTQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsRUFDakQ7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztLQUN2QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDbkQsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztLQUNqRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7S0FDeEQ7U0FBTSxJQUFJ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