const presence = new Presence({
  clientId: "629380028576301093"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "dblregular"
  };
  presenceData.details = "Viewing Page:";

  //Discord Bot List
  if (window.location.pathname.startsWith("/moderation")) {
    presenceData.details = "Viewing DBL Staff section:";
    presenceData.largeImageKey = "dblstaff";

    if (window.location.pathname == "/moderation") {
      const personalquota =
        document.getElementsByClassName("quotaindiv")[0].textContent;
      const botamount = personalquota.substring(
        personalquota.indexOf("reviewed") + 9,
        personalquota.indexOf("/")
      );
      presenceData.state = "Reviewed " + botamount + " bots this week";
    } else if (window.location.pathname == "/moderation/approve") {
      presenceData.state = "Verification Queue";
    } else if (window.location.pathname == "/moderation/certify") {
      presenceData.state = "Certification Queue";
    } else if (window.location.pathname == "/moderation/reports") {
      presenceData.state = "Reports Queue";
    } else if (window.location.pathname == "/moderation/reviews") {
      presenceData.state = "Reviews Dashboard";
    } else if (window.location.pathname.startsWith("/moderation/decline")) {
      presenceData.state = document.querySelector("#botlistitle").textContent;
    }
  } else if (window.location.pathname.startsWith("/bot/")) {
    if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Discord bot:";
      presenceData.state = document
        .querySelector("#botlistitle")
        .textContent.substring(8);
    } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting for a Discord bot:";
      presenceData.state = document
        .querySelector("#totalContent > div > p")
        .textContent.trim();
    } else if (window.location.pathname.endsWith("/report")) {
      //Might not be the smartest idea to expose someone reporting bots
      presenceData.state = "Discord Bot List";
    } else if (window.location.pathname.endsWith("/new")) {
      presenceData.state = "Add a bot";
    } else if (document.querySelector(".entity-queue-message__indicator")) {
      presenceData.details =
        "Viewing a Discord bot: " +
        document.querySelector(".entity-header__name").textContent.trim();
      presenceData.largeImageKey = "dblstaff";
      presenceData.state = "Bot isn't approved yet";
    } else {
      presenceData.details = "Viewing a Discord bot:";
      presenceData.state = document
        .querySelector(".entity-header__name")
        .textContent.trim();
    }
  } else if (window.location.pathname.startsWith("/list/")) {
    presenceData.details = "Viewing a list of Discord bots:";
    presenceData.state = document
      .querySelector("#botlistitle")
      .textContent.split("-")[0]
      .trim();
  } else if (window.location.pathname.startsWith("/tag/")) {
    presenceData.details = "Viewing Discord bots with tag:";
    presenceData.state = document
      .querySelector("#botlistitle")
      .textContent.split("-")[0]
      .trim();
  } else if (
    window.location.pathname.startsWith("/user/") ||
    window.location.pathname == "/me"
  ) {
    presenceData.details = "Viewing a profile:";
    presenceData.state = document.querySelector(".header").textContent;
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
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector("#botlistitle").textContent;
    } else if (document.querySelector(".entity-header__name")) {
      if (document.querySelectorAll(".entity-header__button").length < 2) {
        presenceData.details =
          "Viewing a Discord Server | Server isn't published yet.";
        presenceData.state = document
          .querySelector(".entity-header__name")
          .textContent.trim();
      } else presenceData.details = "Viewing a Discord Server:";
      presenceData.state = document
        .querySelector(".entity-header__name")
        .textContent.trim();
    } else if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Discord Server:";
      presenceData.state = document
        .querySelector("#botlistitle")
        .textContent.substring(8);
    } else if (window.location.pathname.startsWith("/servers/new")) {
      presenceData.details = "Adding a new Discord server...";
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
