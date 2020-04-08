var presence = new Presence({
    clientId: "682218734391394338"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
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
            const searchParams = new URLSearchParams(window.location.search);
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
            const tab = searchParams.get("tab");
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
            const displayName = document
                .querySelector("#org-info")
                .querySelector(".ui.header")
                .textContent.replace(/\s*(?=(shaare))/gm, "")
                .replace(/(?<=(shaare))\s*/gm, "");
            const orgName = document.location.pathname.split("/")[1];
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
                const branch = document.getElementsByClassName("octicon-git-branch")[1]
                    .parentNode.lastChild.textContent;
                presenceData.state = "Viewing Files... (" + branch + " Branch)";
            }
            else if (document.location.pathname.split("/")[3] == "commits") {
                const branch = document.getElementsByClassName("octicon-git-branch")[1]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsYUFBYTtLQUM5QixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztLQUNwRDtTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsRUFDbEQ7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztLQUNsRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7S0FDekQ7U0FBTSxJQUFJ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