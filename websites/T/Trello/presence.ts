const presence = new Presence({
    clientId: "614583717951963137" // CLIENT ID FOR YOUR PRESENCE
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let board: HTMLElement, profile: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "trello"
    },
    displayPrivateBoards = await presence.getSetting("displayPrivateBoards");

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname === "trello.com") {
    if (document.location.pathname.includes("/b/")) {
      if (
        document.querySelector(
          ".board-header-btn.board-header-btn-org-name.js-open-org-menu"
        ) !== null
      ) {
        if (
          document
            .querySelector("#permission-level > span.board-header-btn-icon")
            .classList.contains("icon-private") &&
          !displayPrivateBoards
        )
          presenceData.details = "Viewing private board";
        else {
          presenceData.details = `Viewing board: ${
            document.querySelector(
              ".js-board-editing-target.board-header-btn-text"
            ).textContent
          }`;
          presenceData.state = `By team: ${document
            .querySelector(
              ".board-header-btn.board-header-btn-org-name.js-open-org-menu"
            )
            .textContent.replace(
              document.querySelector(".org-label").textContent,
              ""
            )}`;
        }
      } else {
        presenceData.details = "Viewing board:";
        if (
          document
            .querySelector("#permission-level > span.board-header-btn-icon")
            .classList.contains("icon-private") &&
          !displayPrivateBoards
        )
          presenceData.details = "Viewing private board";
        else {
          presenceData.state = document.querySelector(
            ".js-board-editing-target.board-header-btn-text"
          ).textContent;
        }
      }
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/c/")) {
      if (
        document
          .querySelector("#permission-level > span.board-header-btn-icon")
          .classList.contains("icon-private") &&
        !displayPrivateBoards
      ) {
        presenceData.details = "Viewing private card";
        presenceData.state = "Private Board";
      } else {
        presenceData.details = `Viewing card: ${
          document.querySelector(".window-title").textContent
        }`;
        presenceData.state = `Board: ${
          document.querySelector(
            ".js-board-editing-target.board-header-btn-text"
          ).textContent
        }`;
        presenceData.smallImageKey = "reading";
      }
    } else if (document.location.pathname.includes("/activity")) {
      [, profile] = document.location.pathname.split("/", 3);
      presenceData.details = `Viewing @${profile}'s`;
      presenceData.state = "recent activites";
    } else if (document.location.pathname.includes("/cards")) {
      [, profile] = document.location.pathname.split("/", 3);
      presenceData.details = `Viewing @${profile}'s`;
      presenceData.state = "recent cards";
    } else if (document.location.pathname.includes("/boards")) {
      [, profile] = document.location.pathname.split("/", 3);
      presenceData.details = `Viewing @${profile}'s boards`;
    } else if (document.location.pathname.includes("/home")) {
      [, profile] = document.location.pathname.split("/", 3);
      presenceData.details = `Viewing Team: ${profile}`;
    } else if (
      document.location.pathname.includes("/account") ||
      document.location.pathname.includes("/billing")
    )
      presenceData.details = "Changing account settings";
    else if (document.location.pathname.includes("/shortcuts"))
      presenceData.details = "Viewing shortcut settings";
    else if (document.location.pathname.includes("/tour"))
      presenceData.details = "Viewing Trello's Tour";
    else if (document.location.pathname.includes("/pricing"))
      presenceData.details = "Viewing Trello's Pricing";
    else if (document.location.pathname.includes("/platforms"))
      presenceData.details = "Viewing Trello's Platforms";
    else if (document.location.pathname.includes("/about")) {
      presenceData.details = "Viewing Trello's";
      presenceData.state = "About page";
    } else if (document.location.pathname.includes("/")) {
      profile = document.querySelector(
        "#content > div > div.tabbed-pane-header > div > div > div > div._2MiqoEbHZgSlXq > span._32mB-ZO8fxjtUy"
      ).textContent;
      if (profile) presenceData.details = "Viewing own profile page";
      else presenceData.details = "Viewing home page";
    }
  } else if (document.location.hostname === "help.trello.com") {
    if (document.location.pathname.includes("/article/")) {
      board = document.querySelector("#fullArticle > h1");
      presenceData.details = "Help Center, article:";
      presenceData.state = board.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/category/")) {
      board = document.querySelector("#categoryHead > h1");
      presenceData.details = "Help Center, category:";
      presenceData.state = board.textContent;
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = "Viewing Trello's";
      presenceData.state = "Help Center";
    }
  } else if (document.location.hostname === "blog.trello.com") {
    if (document.location.pathname.includes("/topic/")) {
      board = document.querySelector(
        "body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-3 > div > div > div > h2"
      );
      presenceData.details = "Blog, topic:";
      presenceData.state = board.textContent;
    } else if (document.location.pathname.includes("/author/")) {
      profile = document.querySelector(
        "body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-6 > div > div > div > div > div > div:nth-child(1) > div > h2"
      )?.textContent;
      presenceData.details = "Blog, viewing profile:";
      presenceData.state = profile;
    } else if (document.location.pathname.includes("/search")) {
      profile = (document.querySelector("#gsc-i-id1") as HTMLInputElement)
        .value;
      presenceData.details = "Blog, searching for:";
      presenceData.state = profile;
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/")) {
      board = document.querySelector("#hs_cos_wrapper_name");
      if (board !== null) {
        presenceData.details = "Blog, article:";
        presenceData.state = board.textContent;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = "Viewing Trello's";
        presenceData.state = "Blog page";
      }
    }
  } else if (document.location.hostname === "developers.trello.com") {
    if (document.location.pathname.includes("/reference")) {
      [, profile] = document.URL.split("#", 2);
      presenceData.details = "Developers, API Docs:";
      presenceData.state = profile;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/docs")) {
      presenceData.details = "Developers, Reading guide";
      presenceData.smallImageKey = "reading";
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
