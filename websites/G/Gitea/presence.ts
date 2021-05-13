var presence = new Presence({
  clientId: "682218734391394338"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.pathname == "/") {
    presenceData.details = "Viewing the front page...";
  } else if (
    document.location.pathname == "/user/login" ||
    document.location.pathname == "/user/login/openid"
  ) {
    presenceData.details = "Logging in...";
  } else if (document.location.pathname == "/user/sign_up") {
    presenceData.details = "Signing up...";
  } else if (document.location.pathname == "/issues") {
    presenceData.details = "Viewing their Issues...";
  } else if (document.location.pathname == "/pulls") {
    presenceData.details = "Viewing their Pull Requests...";
  } else if (document.location.pathname == "/milestones") {
    presenceData.details = "Viewing their Milestones...";
  } else if (document.location.pathname == "/explore/repos") {
    presenceData.details = "Exploring Repositories...";
  } else if (document.location.pathname == "/explore/users") {
    presenceData.details = "Exploring Users...";
  } else if (document.location.pathname == "/explore/organizations") {
    presenceData.details = "Exploring Organizations...";
  } else if (document.location.pathname.startsWith("/user/settings")) {
    presenceData.details = "Changing their Settings...";
  } else if (document.location.pathname.startsWith("/notifications")) {
    presenceData.details = "Checking their Notifications...";
  } else if (document.location.pathname.startsWith("/repo/create")) {
    presenceData.details = "Creating a new Repository...";
  } else if (document.location.pathname.startsWith("/repo/migrate")) {
    presenceData.details = "Creating a new Migration Repository...";
  } else if (document.location.pathname.startsWith("/org/create")) {
    presenceData.details = "Creating a new Organization...";
  } else {
    if (document.querySelector(".user.profile")) {
      // Profile Page
      const searchParams = new URLSearchParams(window.location.search);
      presenceData.details =
        "Viewing Profile: " +
        document.getElementsByClassName("username")[0].innerHTML;
      if (
        document.getElementsByClassName("username")[0].parentElement
          .firstElementChild
      ) {
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
        } else if (tab == "stars") {
          presenceData.state = "Tab: Starred Repositories";
        } else if (tab == "following") {
          presenceData.state = "Tab: Following";
        } else if (tab == "followers") {
          presenceData.state = "Tab: Followers";
        }
      } else {
        presenceData.state = "Tab: Repositories";
      }
    } else if (document.querySelector("#org-info")) {
      // Organization Page
      const displayName = document
        .querySelector("#org-info")
        .querySelector(".ui.header")
        .textContent.replace(/\s*(?=(shaare))/gm, "")
        .replace(/(?<=(shaare))\s*/gm, "");
      const orgName = document.location.pathname.split("/")[1];
      if (displayName == orgName) {
        presenceData.details = "Viewing Organization: " + orgName;
      } else {
        presenceData.details =
          "Viewing Organization: " + displayName + " (" + orgName + ")";
      }
    } else if (document.querySelector(".repository")) {
      // Repository Page
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
        } else {
          presenceData.state = "Viewing Issues...";
        }
      } else if (document.location.pathname.split("/")[3] == "pulls") {
        if (document.getElementById("issue-title")) {
          presenceData.state =
            "Viewing a Pull Request... (" +
            document.querySelector(".index").textContent +
            ")";
        } else {
          presenceData.state = "Viewing Pull Requests...";
        }
      } else if (document.location.pathname.split("/")[3] == "releases") {
        presenceData.state = "Viewing Releases...";
      } else if (document.location.pathname.split("/")[3] == "wiki") {
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
      } else if (document.location.pathname.split("/")[3] == "activity") {
        presenceData.state = "Viewing Activity...";
      } else if (document.location.pathname.split("/")[3] == "src") {
        const branch =
          document.getElementsByClassName("octicon-git-branch")[1].parentNode
            .lastChild.textContent;
        presenceData.state = "Viewing Files... (" + branch + " Branch)";
      } else if (document.location.pathname.split("/")[3] == "commits") {
        const branch =
          document.getElementsByClassName("octicon-git-branch")[1].parentNode
            .lastChild.textContent;
        presenceData.state = "Viewing Commits... (" + branch + " Branch)";
      } else if (document.location.pathname.split("/")[3] == "branches") {
        presenceData.state = "Viewing Branches";
      } else if (document.location.pathname.split("/")[3] == "forks") {
        presenceData.state = "Viewing Forks";
      } else if (document.location.pathname.split("/")[3] == "stars") {
        presenceData.state = "Viewing Stargazers";
      } else if (document.location.pathname.split("/")[3] == "watchers") {
        presenceData.state = "Viewing Watchers";
      } else if (document.location.pathname.split("/")[3] == "labels") {
        presenceData.state = "Viewing Labels";
      } else if (!document.location.pathname.split("/")[3]) {
        presenceData.state = "Viewing Files... (master Branch)";
      }
    }
  }
  presence.setActivity(presenceData);
});
