const presence = new Presence({
  clientId: "690628469746434089"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "fifa"
  };

  presenceData.startTimestamp = browsingStamp;

  if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-home.selected"
    ) !== null
  ) {
    // home page selected
    presenceData.details = "Browsing...";
    if (document.querySelector(".ut-objectives-list-view") !== null) {
      // Home > Objectives
      presenceData.details = "Viewing objectives";
      if (
        document
          .querySelector(".tab-menu > div > a:nth-child(1)")
          .className.includes("selected")
      ) {
        presenceData.state = "Season Progress";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(2)")
          .className.includes("selected")
      ) {
        presenceData.state = "Milestones";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(3)")
          .className.includes("selected")
      ) {
        presenceData.state = "Season Objectives";
      }
    } else if (document.querySelector(".SBCHub") !== null) {
      //Home > SBC
      presenceData.details = "Viewing the SBC's";
      if (
        document
          .querySelector(".tab-menu > div > a:nth-child(1)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing all SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(2)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing their favourite SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(3)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing the live SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(4)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing the basic SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(5)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing the advanced SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(6)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing players SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(7)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing icon swap SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(8)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing upgrade SBC's";
      }
    } else if (
      document.querySelector(".sbc-status-container") !== null &&
      document.querySelector(".challenge-content") !== null
    ) {
      presenceData.details = "Viewing SBC challange:";
      presenceData.state = document.querySelector(".title").textContent;
    } else if (document.querySelector(".SBCChallenges") !== null) {
      presenceData.details = "Viewing SBC challange:";
      presenceData.state = document.querySelector(".title").textContent;
    } else if (document.querySelector(".ut-transfer-list-view") !== null) {
      presenceData.details = "Viewing the transfers";
    } else if (document.querySelector(".ut-squad-overview") !== null) {
      presenceData.details = "Viewing squad overview of club:";
      presenceData.state = document.querySelector(".title").textContent;
    }
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-squad.selected"
    ) !== null
  ) {
    // On squads page
    presenceData.details = "Browsing Squads...";
    if (document.querySelector(".totw") !== null) {
      presenceData.details = "Viewing the squad of the week";
    } else if (document.querySelector(".ut-squad-overview") !== null) {
      presenceData.details = "Viewing squad overview of club:";
      presenceData.state = document.querySelector(".title").textContent;
    } else if (document.querySelector(".squad-list") !== null) {
      presenceData.details = "Managing their squad";
    }
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-sbc.selected"
    ) !== null
  ) {
    // On SBC page
    presenceData.details = "Browsing SBC...";
    if (document.querySelector(".SBCHub") !== null) {
      //Home > SBC
      presenceData.details = "Viewing the SBC's";
      if (
        document
          .querySelector(".tab-menu > div > a:nth-child(1)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing all SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(2)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing their favourite SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(3)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing the live SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(4)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing the basic SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(5)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing the advanced SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(6)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing players SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(7)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing icon swap SBC's";
      } else if (
        document
          .querySelector(".tab-menu > div > a:nth-child(8)")
          .className.includes("selected")
      ) {
        presenceData.details = "Viewing upgrade SBC's";
      }
    } else if (
      document.querySelector(".sbc-status-container") !== null &&
      document.querySelector(".challenge-content") !== null
    ) {
      presenceData.details = "Viewing SBC challange:";
      presenceData.state = document.querySelector(".title").textContent;
    } else if (document.querySelector(".SBCChallenges") !== null) {
      presenceData.details = "Viewing SBC challange:";
      presenceData.state = document.querySelector(".title").textContent;
    } else if (document.querySelector(".ut-transfer-list-view") !== null) {
      presenceData.details = "Viewing the transfers";
    } else if (document.querySelector(".ut-squad-overview") !== null) {
      presenceData.details = "Viewing squad overview of club:";
      presenceData.state = document.querySelector(".title").textContent;
    }
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-transfer.selected"
    ) !== null
  ) {
    // On Transfer page
    presenceData.details = "Browsing Transfers...";
    if (document.querySelector(".ut-watch-list-view") !== null) {
      presenceData.details = "Viewing their transfer targets";
    } else if (document.querySelector(".ut-transfer-list-view") !== null) {
      presenceData.details = "Viewing their transfer list";
    } else if (
      document.querySelector(".ut-pinned-list-container.SearchResults") !== null
    ) {
      presenceData.details = "Transfers - Searching for new players";
      presenceData.smallImageKey = "search";
    }
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-store.selected"
    ) !== null
  ) {
    // On store page
    presenceData.details = "Browsing Store...";
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-club.selected"
    ) !== null
  ) {
    // On club page
    presenceData.details = "Browsing through their club...";
    if (document.querySelector(".paginated-item-list") !== null) {
      presenceData.details = "Viewing their players";
      if (
        (
          document.querySelector(
            ".ut-list-header-icon > img"
          ) as HTMLImageElement
        ).src
          .toLowerCase()
          .includes("staff")
      ) {
        presenceData.details = "Viewing their staff";
      } else if (document.querySelector(".consumable") !== null) {
        presenceData.details = "Viewing their consumables";
      } else if (
        (
          document.querySelector(
            ".ut-list-header-icon > img"
          ) as HTMLImageElement
        ).src
          .toLowerCase()
          .includes("items")
      ) {
        presenceData.details = "Viewing their club items";
      } else if (
        document.querySelector(".ut-undodiscard-status-bar") !== null
      ) {
        presenceData.details = "Viewing Quick Sell Recovery";
      }
    } else if (document.querySelector(".consumable-tile") !== null) {
      presenceData.details = "Viewing their consumables";
    } else if (document.querySelector(".celebrations-tile") !== null) {
      presenceData.details = "Viewing their club items";
    }
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-leaderboards.selected"
    ) !== null
  ) {
    // On leaderboards page
    presenceData.details = "Viewing the leaderboards";
    if (
      document
        .querySelector(".tab-menu > div > a:nth-child(1)")
        .className.includes("selected")
    ) {
      presenceData.details = "Viewing leaderboard of:";
      presenceData.state = "Match Earnings";
    } else if (
      document
        .querySelector(".tab-menu > div > a:nth-child(2)")
        .className.includes("selected")
    ) {
      presenceData.details = "Viewing leaderboard of:";
      presenceData.state = "Transfer Profit";
    } else if (
      document
        .querySelector(".tab-menu > div > a:nth-child(3)")
        .className.includes("selected")
    ) {
      presenceData.details = "Viewing leaderboard of:";
      presenceData.state = "Club Value";
    } else if (
      document
        .querySelector(".tab-menu > div > a:nth-child(4)")
        .className.includes("selected")
    ) {
      presenceData.details = "Viewing leaderboard of:";
      presenceData.state = "Top Squad";
    }
  } else if (
    document.querySelector(
      "body > main > section > nav > button.ut-tab-bar-item.icon-settings.selected"
    ) !== null
  ) {
    // On settings page
    presenceData.details = "Viewing their settings";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
