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
    },
    showChat = await presence.getSetting("showchat"),
    showProfile = await presence.getSetting("showprofile");

  presenceData.startTimestamp = getTimeStamp();
  if (document.location.pathname.includes("/player/")) {
    if (showProfile) {
      const player_nickname = document.querySelector(
        "#player-profile-header-heading > div:nth-child(2) > div > div > div.medium.normal-color-name"
      ).textContent;
      try {
        presenceData.details = `Player: ${player_nickname}`;
        const player_clan = document.querySelector(
          "#s4db-player-view-clan > a"
        ).textContent;
        presenceData.details += `(${player_clan})`;
      } catch {
        presenceData.details = `Player: ${player_nickname}`;
      }
    } else {
      presenceData.details = `Viewing a profile`;
    }
    presenceData.state = "Viewing Statistics";
    if (document.location.pathname.includes("/matches")) {
      presenceData.state = "Viewing Match History";
    } else if (document.location.pathname.includes("/characters")) {
      presenceData.state = "Viewing Characters";
    } else if (document.location.pathname.includes("/inventory")) {
      presenceData.state = "Viewing Inventory";
    }
  } else if (document.location.pathname.includes("/news")) {
    try {
      const news_title = document
        .querySelector(
          "#uniteddb-content > div.container.news-container > div.news-heading.with-button"
        )
        .textContent.split(" — ")[0];
      presenceData.details = "Reading news:";
      presenceData.state = `${news_title}`;
    } catch {
      presenceData.details = "Viewing a page:";
      presenceData.state = "News";
    }
  } else if (document.location.pathname.includes("/clan")) {
    const clan_name = document.querySelector(
        "#player-profile-header-heading > div.medium.normal-color-name"
      ).textContent,
      clan_members = document.querySelector(
        "#clan-data-container > div > div.col-sm-3 > div > div.xero-pane-body > ul > li"
      ).lastChild.textContent,
      clan_leader = document.querySelector(
        "#clan-data-container > div > div.col-sm-9 > div:nth-child(2) > div > div > a > div.media-body.ml-2 > div.bold"
      ).textContent;
    presenceData.details = `Clan: ${clan_name}`;
    presenceData.state = `Leader: ${clan_leader}, ${clan_members}`;
  } else if (document.location.pathname.includes("/leaderboards")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Leaderboards";
  } else if (document.location.pathname.includes("/support")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Support";
    if (document.location.pathname.includes("/ticket/new")) {
      presenceData.details = "Support";
      presenceData.state = "Writing a ticket...";
    } else if (document.location.pathname.includes("/ticket/")) {
      presenceData.details = "Support";
      presenceData.state = "Viewing a ticket";
    }
  } else if (document.location.pathname.includes("/careers")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Careers";
    if (document.location.pathname.includes("/careers/position/")) {
      const careers_position = document.querySelector(
        "#uniteddb-content > div.container.news-container > div.news-heading.with-button"
      ).textContent;
      presenceData.details = "Careers";
      presenceData.state = `Viewing ${careers_position}`;
    } else if (document.location.pathname.includes("/careers/application/")) {
      presenceData.details = "Careers";
      presenceData.state = "Viewing applications";
    }
  } else if (document.location.pathname.includes("/download")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Download";
  } else if (document.location.pathname.includes("/challenge")) {
    const challenges_title = document.querySelector(
      "#settings-data-container > div.xero-header-standalone"
    ).textContent;
    presenceData.details = "Viewing a page:";
    presenceData.state = `Challenges (${challenges_title})`;
  } else if (document.location.pathname.includes("/notifications")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Notifications";
  } else if (document.location.pathname.includes("/chat")) {
    if (showChat) {
      try {
        const chat_opponent = document.querySelector(
          "#s4db-chat-content-header-name > a"
        ).textContent;
        presenceData.details = "Chatting with";
        presenceData.state = chat_opponent;
      } catch {
        presenceData.details = "Chatting in";
        presenceData.state = "a group chat";
      }
    } else {
      presenceData.details = "Chatting with";
      presenceData.state = "Anonymous";
    }
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Settings";
    if (document.location.pathname.includes("/overview")) {
      presenceData.details = "Settings";
      presenceData.state = "Overview";
    } else if (document.location.pathname.includes("/security")) {
      presenceData.details = "Settings";
      presenceData.state = "Security";
    } else if (document.location.pathname.includes("/clan")) {
      presenceData.details = "Settings";
      presenceData.state = "Clan";
    } else if (document.location.pathname.includes("/transactions")) {
      presenceData.details = "Settings";
      presenceData.state = "Transaction History";
    }
  } else if (document.location.pathname.includes("/signin")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Sign In";
    if (document.location.pathname.includes("/setup")) {
      presenceData.details = "Sign Up";
      presenceData.state = "Choosing a nickname...";
    }
  } else if (document.location.pathname.includes("/signup")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Sign Up";
  } else if (document.location.pathname.includes("/recover")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Account recover";
  } else if (document.location.pathname.endsWith("/terms")) {
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
