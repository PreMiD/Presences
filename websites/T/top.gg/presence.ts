const presence = new Presence({
  clientId: "629380028576301093"
});


presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "dblregular"
    },
    privacy = await presence.getSetting("privacy"),
    showServerInfo = (privacy ? await presence.getSetting("server") : true),
    showBotInfo = (privacy ? await presence.getSetting("bots") : true),
    showProfileVisit = (privacy ? await presence.getSetting("profiles") : true),
    showStaff = await presence.getSetting("staffsection"),
    showReviewCount = await presence.getSetting("reviewedcount"),
    showDecline = await presence.getSetting("decline"),
    isStaff = document.querySelectorAll(".menu")[0].textContent.trim().includes("Moderation");

  if (isStaff) {
    await presence.showSetting("staffsection");
    await presence.showSetting("reviewedcount");
    await presence.showSetting("decline");
  } else {
    await presence.hideSetting("staffsection");
    await presence.hideSetting("reviewedcount");
    await presence.hideSetting("decline");
  }

  presenceData.details = "Viewing Page:";

  //Discord Bot List
  if (window.location.pathname.startsWith("/moderation")) {

    if (!showStaff) {

      presenceData.details = "Discord Bot List";
    } else {
      presenceData.details = "Viewing DBL Staff section";
      presenceData.largeImageKey = "dblstaff";

      if (window.location.pathname == "/moderation") {
        if (showReviewCount) {
          const personalquota = document.getElementsByClassName("quotaindiv")[0]
              .textContent,
            botamount = personalquota.substring(
              personalquota.indexOf("reviewed") + 9,
              personalquota.indexOf("/")
            );
          presenceData.state = "Reviewed " + botamount + " bots this week";
        }
      } else if (window.location.pathname == "/moderation/approve") {
        presenceData.state = "Verification Queue";
      } else if (window.location.pathname == "/moderation/certify") {
        presenceData.state = "Certification Queue";
      } else if (window.location.pathname == "/moderation/reports") {
        presenceData.state = "Reports Queue";
      } else if (window.location.pathname == "/moderation/reviews") {
        presenceData.state = "Reviews Dashboard";
      } else if (window.location.pathname.startsWith("/moderation/decline")) {
        if (showDecline) {
          presenceData.state = document.querySelector("#botlistitle").textContent;
        }
      }
    }
  } else if (window.location.pathname.startsWith("/bot/")) {
    if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Discord bot";
      if (showBotInfo) {
        presenceData.state = document
          .querySelector("#botlistitle")
          .textContent.substring(8);
      }
    } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting for a Discord bot";
      if (showBotInfo) {
        presenceData.state = document
          .querySelector("#entity-title")
          .textContent.trim();
      }
    } else if (window.location.pathname.endsWith("/report")) {
      //Might not be the smartest idea to expose someone reporting bots
      presenceData.state = "Discord Bot List";
    } else if (window.location.pathname.endsWith("/new")) {
      presenceData.state = "Add a bot";
    } else if (document.querySelector(".entity-queue-message__indicator")) {
      if (showBotInfo) {
        presenceData.details =
          "Viewing a Discord bot: " +
          document
            .querySelector(".entity-header__name")
            .textContent.trim();
        if (isStaff) {
          presenceData.largeImageKey = "dblstaff";
        }
        presenceData.state = "Bot isn't approved yet";
      } else {
        presenceData.details =
          "Viewing a Discord bot";
      }
    } else {
      presenceData.details = "Viewing a Discord bot";
      if (showBotInfo) {
        presenceData.state = document
          .querySelector(".entity-header__name")
          .textContent.trim();
      }
    }
  } else if (window.location.pathname.startsWith("/list/")) {
    presenceData.details = "Viewing a list of Discord bots";

    if (showBotInfo) {
      presenceData.state = document
        .querySelector("#botlistitle")
        .textContent.split("-")[0]
        .trim();
    }
  } else if (window.location.pathname.startsWith("/tag/")) {
    if (showBotInfo) {
      presenceData.details = "Viewing Discord bots with tag";

      presenceData.state = document
        .querySelector("#botlistitle")
        .textContent.split("-")[0]
        .trim();
    } else {
      presenceData.details = "Viewing Discord Bots";

    }
  } else if (
    window.location.pathname.startsWith("/user/") ||
    window.location.pathname == "/me"
  ) {
    if (showProfileVisit) {
      presenceData.details = "Viewing a profile:";
      presenceData.state = document.querySelector(
        ".header"
      ).textContent;
    } else {
      presenceData.details = "Viewing a profile";
    }

  } else if (window.location.pathname.startsWith("/api/docs")) {
    presenceData.state = "Discord Bot List API Documentation";
  }

  //Discord Server List
  else if (window.location.pathname.startsWith("/servers")) {

    presenceData.largeImageKey = "dslregular";
    if (
      window.location.pathname.startsWith("/servers/list/") ||
      window.location.pathname.startsWith("/servers/tag/")
    ) {
      if (showServerInfo) {
        presenceData.details = "Viewing:";
        presenceData.state = document.querySelector("#botlistitle").textContent;
      } else {
        presenceData.details = "Viewing Discord Servers";
      }
    } else if (
      document.querySelector(".entity-header__name")
    ) {
      if (document.querySelectorAll(".entity-header__button").length < 2) {
        if (showServerInfo) {
          presenceData.details =
            "Viewing a Discord Server | Server isn't published yet.";
          presenceData.state = document
            .querySelector(".entity-header__name")
            .textContent.trim();
        } else {
          presenceData.details = "Viewing a Discord Server";
        }
      } else presenceData.details = "Viewing a Discord Server";
      if (showServerInfo) {
        presenceData.state = document
          .querySelector(".entity-header__name")
          .textContent.trim();
      }
    } else if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Discord Server";
      if (showServerInfo) {
        presenceData.state = document
          .querySelector("#botlistitle")
          .textContent.substring(8);
      }
    } else if (window.location.pathname.startsWith("/servers/new")) {
      presenceData.details = "Adding a new Discord server...";
    } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting for a Discord Server";
      if (showServerInfo) {
        presenceData.state = document.querySelector("#entity-title").textContent.trim();
      }

    } else if (window.location.pathname.startsWith("/servers/me")) {
      presenceData.state = "My servers";
    } else {
      presenceData.state = "Discord Servers";
    }
  }

  //If it doesn't fit to anything
  else if (document.querySelector("#botlistitle")) {
    presenceData.state = document.querySelector("#botlistitle").textContent;
  }

  //If it really finds nothing
  else {
    presenceData.details = "Viewing something...";
  }

  presence.setActivity(presenceData);
});