const presence = new Presence({
  clientId: "682593223948238849"
});
const presenceGit = new Presence({
  clientId: "682593596301508662"
});
const presenceCommunity = new Presence({
  clientId: "682593903656173569"
});
const presenceAnigifs = new Presence({
  clientId: "682594082274410511"
});
const presenceLabs = new Presence({
  clientId: "682595885880049668"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (
    document.location.hostname == "taigabot.net" ||
    document.location.hostname == "beta.taigabot.net"
  ) {
    presenceData.details = "taiga Website";
    if (document.location.pathname == "/") {
      presenceData.state = "Viewing the Frontpage...";
    } else if (document.location.pathname == "/information") {
      presenceData.state = "Viewing the Information Page...";
    } else if (document.location.pathname == "/information/faq") {
      presenceData.state = "Viewing Frequently Asked Questions...";
    } else if (document.location.pathname == "/information/commands") {
      presenceData.state = "Viewing Commands...";
    } else if (document.location.pathname == "/information/languages") {
      presenceData.state = "Viewing Supported Languages...";
    } else if (document.location.pathname == "/information/roadmap") {
      presenceData.state = "Viewing the Roadmap...";
    } else if (document.location.pathname == "/staff") {
      presenceData.state = "Viewing Staff Members...";
    } else if (document.location.pathname == "/leaderboard") {
      presenceData.state = "Viewing the Leaderboard...";
    }
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "api.taigabot.net") {
    presenceData.details = "taiga API";
    if (document.location.pathname.startsWith("/docs")) {
      presenceData.state = "Reading the Documentation";
    } else {
      presenceData.state = "Endpoint: " + document.location.pathname;
    }
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "cdn.taigabot.net") {
    presenceData.details = "taiga CDN";
    if (
      document.location.pathname.endsWith(".pdf") ||
      document.location.pathname.endsWith(".zip") ||
      document.location.pathname.endsWith(".svg") ||
      document.location.pathname.endsWith(".png") ||
      document.location.pathname.endsWith(".jpg") ||
      document.location.pathname.endsWith(".svg") ||
      document.location.pathname.endsWith(".css") ||
      document.location.pathname.endsWith(".ico")
    ) {
      presenceData.state =
        "Viewing a File... (" + document.location.pathname + ")";
    }
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "cdnadmin.taigabot.net") {
    presenceData.details = "taiga CDN Admin Interface";
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "legal.taigabot.net") {
    presenceData.details = "taiga Documents";
    if (document.location.pathname.endsWith(".pdf")) {
      presenceData.state =
        "Reading a Document... (" +
        document.location.pathname.split("/")[
          document.location.pathname.split("/").length - 1
        ] +
        ")";
    }
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "taipl.taigabot.net") {
    presenceData.details = "taiga Plugin Engine";
    if (document.location.pathname == "/") {
      presenceData.state = "Viewing the Frontpage...";
    } else if (document.location.pathname.startsWith("/docs")) {
      presenceData.state = "Reading the Documentation...";
    }
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "telegram.taigabot.net") {
    presenceData.details = "Checking out taiga on Telegram...";
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "translate.taigabot.net") {
    presenceData.details = "taiga Translate";
    if (document.location.pathname == "/login") {
      presenceData.state = "Logging in...";
    } else if (document.location.pathname == "/signup") {
      presenceData.state = "Signing up...";
    } else if (document.location.pathname.startsWith("/projects")) {
      const urlParams = document.location.pathname.split("/");
      if (urlParams.length == 2) {
        presenceData.state = "Viewing their Projects...";
      } else if (urlParams.length == 4) {
        presenceData.state = "";
        if (urlParams[3] == "terms") {
          presenceData.state = "Viewing Project Terms...";
        } else if (urlParams[3] == "translations") {
          presenceData.state = "Translating...";
        } else if (urlParams[3] == "team") {
          presenceData.state = "Viewing Project Members...";
        } else if (urlParams[3] == "import") {
          presenceData.state = "Importing Strings...";
        } else if (urlParams[3] == "export") {
          presenceData.state = "Exporting Strings...";
        } else if (urlParams[3] == "api") {
          presenceData.state = "Viewing API Keys...";
        } else if (urlParams[3] == "settings") {
          presenceData.state = "Changing Project Settings...";
        }
        presenceData.state +=
          " (Project: " +
          document.querySelector(".font-serif.text-white.truncate.mb-1")
            .textContent +
          ")";
      }
    } else if (document.location.pathname == "/user-settings") {
      presenceData.details = "Changing their Settings...";
    }
    presence.setActivity(presenceData);
  }
});

presenceGit.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "git.taigabot.net") {
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
          const branch = document.getElementsByClassName(
            "octicon-git-branch"
          )[1].parentNode.lastChild.textContent;
          presenceData.state = "Viewing Files... (" + branch + " Branch)";
        } else if (document.location.pathname.split("/")[3] == "commits") {
          const branch = document.getElementsByClassName(
            "octicon-git-branch"
          )[1].parentNode.lastChild.textContent;
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
    presenceGit.setActivity(presenceData);
  }
});

presenceCommunity.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "community.taigabot.net") {
    // taiga Community isn't public yet (you can't register) so there's no extensive Presence yet
    presenceCommunity.setActivity(presenceData);
  }
});

presenceAnigifs.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "anigifs.taigabot.net") {
    const urlArgs = document.location.pathname.split("/");
    console.log(urlArgs.length);
    if (urlArgs.length < 3) {
      presenceData.details = "Viewing the Frontpage";
    } else {
      const imageTypeIds: Array<string> = ["hug"];
      const imageTypeNames: Array<string> = ["Interactions: Hug"];
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
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "labs.taigabot.net") {
    if (document.location.pathname == "/") {
      presenceData.details = "Viewing the Frontpage...";
    } else {
      const appsTypeIds: Array<string> = ["card-tool"];
      const appsTypeNames: Array<string> = ["taiga Card Tool"];
      const urlArgs = document.location.pathname.split("/");
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
