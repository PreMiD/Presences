const presence = new Presence({
  clientId: "682593223948238849"
});
const presenceCommunity = new Presence({
  clientId: "682593903656173569"
});
const presenceAnigifs = new Presence({
  clientId: "682594082274410511"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "taigabot.net") {
    presenceData.details = "taiga Website";
    switch (document.location.pathname) {
      case "/": {
        presenceData.state = "Viewing the Frontpage...";
        break;
      }
      case "/features/": {
        presenceData.state = "Viewing the Features Overview...";
        break;
      }
      case "/commands/": {
        presenceData.state = "Viewing the Commands List...";
        break;
      }
      case "/plugins/": {
        presenceData.state = "Reading about Plugins";
        break;
      }
      case "/tradingcards/": {
        presenceData.state = "Reading about Trading Cards";
        break;
      }
      case "/economy/": {
        presenceData.state = "Reading about Economy";
        break;
      }
      case "/localization/": {
        presenceData.state = "Reading about Localization";
        break;
      }
      case "/squads/": {
        presenceData.state = "Reading about Squads";
        break;
      }
      case "/pro/":
      case "/premium/":
      case "/subscriptions/": {
        presenceData.state = "Reading about Subscriptions...";
        break;
      }
      case "/team/": {
        presenceData.state = "Viewing the Team Page...";
        break;
      }
      case "/partners/": {
        presenceData.state = "Viewing the Partners Page...";
        break;
      }
      case "/jobs/": {
        presenceData.state = "Viewing the Jobs Page...";
        break;
      }
      case "/help/": {
        presenceData.state = "Viewing the Help Page...";
        break;
      }
      default: {
        if (document.location.pathname.startsWith("/kb")) {
          presenceData.state = "Reading through the Knowledgebase";
        }
      }
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
  }
});

presenceCommunity.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "community.taigabot.net") {
    // TODO: Presence for Community
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
