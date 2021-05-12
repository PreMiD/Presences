const presence = new Presence({
    clientId: "823408394098311178"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const privacy = await presence.getSetting("privacy"),
    presenceData: PresenceData = {
      largeImageKey: "malody"
    };
  if (privacy) {
    presenceData.details = "Browsing Malody Website";
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
      presenceData.details = "Malody Main Page";
    } else if (document.location.pathname == "/index") {
      presenceData.smallImageKey = "home";
      presenceData.details = "Viewing Home Page";
    } else if (document.location.pathname.endsWith("/chart")) {
      presenceData.smallImageKey = "store";
      presenceData.details = "Browsing Chart Store";
    } else if (document.location.pathname.startsWith("/page/all/player")) {
      presenceData.smallImageKey = "leaderboard";
      presenceData.details = "Viewing Leaderboard";
      if (document.location.href.endsWith("?from=0&mode=0")) {
        presenceData.smallImageKey = "key";
        presenceData.smallImageText = "KeyMode";
        presenceData.state = "Key Mode";
      } else if (document.location.href.endsWith("?from=0&mode=3")) {
        presenceData.smallImageKey = "catch";
        presenceData.smallImageText = "CatchMode";
        presenceData.state = "Catch Mode";
      } else if (document.location.href.endsWith("?from=0&mode=4")) {
        presenceData.smallImageKey = "pad";
        presenceData.smallImageText = "PadMode";
        presenceData.state = "Pad mode";
      } else if (document.location.href.endsWith("?from=0&mode=5")) {
        presenceData.smallImageKey = "taiko";
        presenceData.smallImageText = "TaikoMode";
        presenceData.state = "Taiko Mode";
      } else if (document.location.href.endsWith("?from=0&mode=6")) {
        presenceData.smallImageKey = "ring";
        presenceData.smallImageText = "RingMode";
        presenceData.state = "Ring Mode";
      } else if (document.location.href.endsWith("?from=0&mode=7")) {
        presenceData.smallImageKey = "slide";
        presenceData.smallImageText = "SlideMode";
        presenceData.state = "Slide Mode";
      } else if (document.location.pathname.endsWith("/player")) {
        presenceData.smallImageKey = "key";
        presenceData.smallImageText = "KeyMode";
        presenceData.state = "Key Mode";
      }
    } else if (document.location.href.includes("/song")) {
      presenceData.smallImageKey = "song";
      presenceData.details = "Viewing a song";
      presenceData.state = document.querySelector(
        "#content > div.song_title.g_rblock > div.right > h2.textfix.title"
      ).textContent;
      presenceData.buttons = [
        {
          label: "View Song",
          url: document.URL
        }
      ];
    } else if (document.location.href.includes("/chart")) {
      presenceData.smallImageKey = "song";
      presenceData.details = document.querySelector(
        "#content > div.song_title.g_rblock > div.right > h2.textfix.title"
      ).textContent;
      presenceData.state = document.querySelector(
        "#content > div.song_title.g_rblock > div.right > h2.mode > span:nth-child(2)"
      ).textContent;
      presenceData.buttons = [
        {
          label: "View Chart",
          url: document.URL
        }
      ];
    } else if (document.location.pathname.startsWith("/store")) {
      if (document.location.pathname.includes("/skin")) {
        presenceData.smallImageKey = "skin";
        presenceData.details = "Browsing Skin Store";
      } else if (document.location.pathname.endsWith("/all")) {
        presenceData.smallImageKey = "store";
        presenceData.details = "Browsing Item Store";
      } else if (document.location.pathname.endsWith("/my")) {
        presenceData.smallImageKey = "inventory";
        presenceData.details = "Viewing Inventory";
      }
    } else if (document.location.pathname.startsWith("/talk")) {
      if (document.location.pathname.includes("/topic")) {
        presenceData.smallImageKey = "chat";
        presenceData.details =
          "Viewing topic: " +
          document.querySelector("#chead > div > a").textContent;
        presenceData.state = document.querySelector(
          "#g_talk > div.g_talk_title > p > span"
        ).textContent;
      } else if (document.location.pathname.includes("/user")) {
        if (document.location.pathname.endsWith("/user")) {
          presenceData.smallImageKey = "talk";
          presenceData.details = "Checking Inbox";
        } else if (document.location.pathname.endsWith("/notify")) {
          presenceData.smallImageKey = "notification";
          presenceData.details = "Viewing Notification";
        }
      } else if (document.location.pathname.includes("/group")) {
        presenceData.details = "Viewing Discussion Page";
        if (document.location.href.endsWith("/1")) {
          presenceData.smallImageKey = "gameplay";
          presenceData.state = "Gameplay Disscussion";
        } else if (document.location.href.endsWith("/2")) {
          presenceData.smallImageKey = "charting";
          presenceData.state = "Chart Discussion";
        } else if (document.location.href.endsWith("/3")) {
          presenceData.smallImageKey = "resource";
          presenceData.state = "Skin & Resource";
        } else if (document.location.href.endsWith("/4")) {
          presenceData.smallImageKey = "feedback";
          presenceData.state = "Feedback";
        }
      }
    } else if (document.location.pathname.startsWith("/accounts")) {
      if (document.location.pathname.includes("/login")) {
        presenceData.details = "Logging in";
      } else if (document.location.pathname.includes("/user")) {
        presenceData.details = "Viewing User: ";
        presenceData.state = document.querySelector(
          "#content > div.user_head.g_rblock > div.right > p.name > span"
        ).textContent;
        presenceData.smallImageKey = "user";
      } else if (document.location.pathname.endsWith("/friend")) {
        presenceData.smallImageKey = "user";
        presenceData.details = "Viewing Friends List";
      } else if (document.location.pathname.includes("/config/profile")) {
        presenceData.smallImageKey = "edit";
        presenceData.details = "Editing Profile";
      }
    } else if (document.location.pathname.includes("/page/userpage/edit/")) {
      presenceData.smallImageKey = "edit";
      presenceData.details =
        document.querySelector("#content > div.g_title").textContent +
        "profile";
    } else if (document.location.pathname.includes("/page/search")) {
      presenceData.smallImageKey = "search";
      presenceData.details = document.querySelector(
        "#content > div.g_title"
      ).textContent;
    } else if (document.location.pathname.includes("/page/all")) {
      presenceData.smallImageKey = "eye";
      presenceData.details = "Viewing All Pages";
    } else if (document.location.pathname.includes("/page/latest")) {
      presenceData.smallImageKey = "eye";
      presenceData.details = "Viewing Recent Changes";
      presenceData.state = "Pages";
    } else if (document.location.pathname.includes("/page/create")) {
      presenceData.smallImageKey = "edit";
      presenceData.details = "Creating a New Page";
    } else if (document.location.href.includes("/page/create?type=6")) {
      presenceData.smallImageKey = "edit";
      presenceData.details = "Creating a Template";
    } else if (document.location.pathname.startsWith("/wiki")) {
      presenceData.smallImageKey = "wiki";
      presenceData.details = "Viewing Wiki";
      presenceData.state = document.querySelector(
        "#content > div.wiki_title.g_rblock > div.title"
      ).textContent;
    }
    presence.setActivity(presenceData);
  }
});
