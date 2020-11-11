const presence = new Presence({
    clientId: "775372570563182592"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  });

function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "xero"
  };
  const path = document.location.pathname;
  presenceData.startTimestamp = getTimeStamp();
  if (path.includes("/player/")) {
    const nickname = document.querySelector(
      "#player-profile-header-heading > div:nth-child(2) > div > div > div.medium.normal-color-name"
    ).textContent;
    presenceData.details = `Player: ${nickname}`;
    presenceData.state = "Viewing Statistics";
    try {
      const clan = document.querySelector("#s4db-player-view-clan > a")
        .textContent;
      presenceData.details += `(${clan})`;
    } catch {
      //catch nothing
    }
    if (path.includes("/matches")) {
      presenceData.state = "Viewing Match History";
    } else if (path.includes("/characters")) {
      presenceData.state = "Viewing Characters";
    } else if (path.includes("/inventory")) {
      presenceData.state = "Viewing Inventory";
    }
  } else if (path.includes("/news")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "News";
    try {
      const news_title_origin = document.querySelector(
        "#uniteddb-content > div.container.news-container > div.news-heading.with-button"
      ).textContent;
      const news_title = news_title_origin.split(" — ")[0];
      presenceData.details = "Reading news:";
      presenceData.state = `${news_title}`;
    } catch {
      //Catch nothing
    }
  } else if (path.includes("/clan")) {
    const clan_name = document.querySelector(
      "#player-profile-header-heading > div.medium.normal-color-name"
    ).textContent;
    const clan_members = document.querySelector(
      "#clan-data-container > div > div.col-sm-3 > div > div.xero-pane-body > ul > li"
    ).lastChild.textContent;
    const clan_leader = document.querySelector(
      "#clan-data-container > div > div.col-sm-9 > div:nth-child(2) > div > div > a > div.media-body.ml-2 > div.bold"
    ).textContent;
    presenceData.details = `Clan: ${clan_name}`;
    presenceData.state = `Leader: ${clan_leader}, ${clan_members}`;
  } else if (path.includes("/leaderboards")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Leaderboards";
  } else if (path.includes("/support")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Support";
    if (path.includes("/ticket/new")) {
      presenceData.details = "Support";
      presenceData.state = "Writing a ticket...";
    } else if (path.includes("/ticket/")) {
      presenceData.details = "Support";
      presenceData.state = "Viewing a ticket";
    }
  } else if (path.includes("/careers")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Careers";
    if (path.includes("/careers/position/")) {
      const careers_position = document.querySelector(
        "#uniteddb-content > div.container.news-container > div.news-heading.with-button"
      ).textContent;
      presenceData.details = "Careers";
      presenceData.state = `Viewing ${careers_position}`;
    } else if (path.includes("/careers/application/")) {
      presenceData.details = "Careers";
      presenceData.state = "Viewing applications";
    }
  } else if (path.includes("/download")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Download";
  } else if (path.includes("/notifications")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Notifications";
  } else if (path.includes("/chat")) {
    const chat_opponent = document.querySelector(
      "#s4db-chat-content-header-name > a"
    ).textContent;
    presenceData.details = "Chatting with";
    presenceData.state = chat_opponent;
  } else if (path.includes("/settings")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Settings";
    if (path.includes("/overview")) {
      presenceData.details = "Settings";
      presenceData.state = "Overview";
    } else if (path.includes("/security")) {
      presenceData.details = "Settings";
      presenceData.state = "Security";
    } else if (path.includes("/clan")) {
      presenceData.details = "Settings";
      presenceData.state = "Clan";
    } else if (path.includes("/transactions")) {
      presenceData.details = "Settings";
      presenceData.state = "Transaction History";
    }
  } else if (path.includes("/signin")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Sign In";
    if (path.includes("/setup")) {
      presenceData.details = "Sign Up";
      presenceData.state = "Choosing a nickname...";
    }
  } else if (path.includes("/signup")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Sign Up";
  } else if (path.includes("/recover")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Account recover";
  } else if (path.endsWith("/terms")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Terms of Service";
  } else {
    presenceData.details = (await strings).browsing;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
