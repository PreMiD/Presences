let presence = new Presence({
  clientId: "672156210627084328"
}),
 browsingStamp = Math.floor(Date.now() / 1000),
 user;
presence.on("UpdateData", async () => {
  const data = {
    largeImageKey: "animesoul",
    startTimestamp: 1577232000,
    details: "Viewing home page"
  };
  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/home/"
  ) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing home page";
  } else if (document.location.pathname.includes("/user")) {
    user = document.title;
    data.startTimestamp = browsingStamp;
    data.details = `Viewing ${user}`;
  } else if (document.location.pathname.includes("/dashboard")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing the Dashboard";
  } else if (document.location.pathname.includes("/premium")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Premium";
  } else if (document.location.pathname.includes("/giveaway")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Giveaways";
  } else if (document.location.pathname.includes("/settings")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Settings";
  } else if (document.location.pathname.includes("/market")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing the Market";
  } else if (document.location.pathname.includes("/notifications")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Notifications";
  } else if (document.location.pathname.includes("/events")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing AS Events";
  } else if (document.location.pathname.includes("/articles")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Articles";
  } else if (document.location.pathname.includes("/achievements")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Achievements";
  } else if (document.location.pathname.includes("/messages")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Messages";
  } else if (document.location.pathname.includes("/keysgiveaways")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Keys Giveaway";
  }

  /// Anime Soul anime section ///
  else if (document.location.pathname.includes("/anime")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Anime";
  }

  /// Anime Soul shop section ///
  else if (document.location.pathname.includes("/shop")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing the Shop";
  } else if (document.location.pathname.includes("/bank")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing the Bank";
  } else if (document.location.pathname.includes("/cards")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing the Cards";
  } else if (document.location.pathname.includes("/card-abilities")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Card Abilities";
  } else if (document.location.pathname.includes("/card-events")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Card Events";
  } else if (document.location.pathname.includes("/inventory")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Inventory";
  } else if (document.location.pathname.includes("/fusion")) {
    data.startTimestamp = browsingStamp;
    data.details = "Fusing Cards";
  } else if (document.location.pathname.includes("/auction")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing the Auction";
  } else if (document.location.pathname.includes("/trades")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Trades";
  } else if (document.location.pathname.includes("/stacks")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Stacks";
  }

  /// Anime Soul games section ///
  else if (document.location.pathname.includes("/games")) {
    data.startTimestamp = browsingStamp;
    data.details = "Playing Games";
  } else if (document.location.pathname.includes("/this-or-that")) {
    data.startTimestamp = browsingStamp;
    data.details = "Playing This or That";
  } else if (document.location.pathname.includes("/mini-games")) {
    data.startTimestamp = browsingStamp;
    data.details = "Playing Mini Games";
  }

  /// Anime Soul community section ///
  else if (document.location.pathname.includes("/creators")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing AS Creators";
  } else if (document.location.pathname.includes("/medals")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing AS Medals";
  } else if (document.location.pathname.includes("/friends")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing AS Friends";
  } else if (document.location.pathname.includes("/leaderboards")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Leaderboards";
  } else if (document.location.pathname.includes("/servers")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing AS Servers";
  } else if (document.location.pathname.includes("/cardmakers/leaderboard")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing AS Card Makers";
  }

  /// Anime Soul support section ///
  else if (document.location.pathname.includes("/appeals")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Appeals";
  } else if (document.location.pathname.includes("/updates")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Updates";
  } else if (document.location.pathname.includes("/guides")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Guides";
  } else if (document.location.pathname.includes("/rules")) {
    data.startTimestamp = browsingStamp;
    data.details = "Reading the rules";
  } else if (document.location.pathname.includes("/staff-list")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Staff List";
  } else if (document.location.pathname.includes("/staff")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Hidden Page";
  } else if (document.location.pathname.includes("/support/category")) {
    data.startTimestamp = browsingStamp;
    data.details = document.title;
  } else if (document.location.pathname.includes("/support/thread")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Threads";
  } else if (document.location.pathname.includes("/support")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Support HQ Forum";
  } else if (document.location.pathname.includes("/tasks")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Tasks";
  }
    presence.setActivity(data);
  presence.setActivity(data);
});
