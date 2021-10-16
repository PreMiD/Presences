const presence = new Presence({
    clientId: "672156210627084328"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "animesoul",
    startTimestamp: browsingStamp,
    details: "Viewing home page"
  };
  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/home/"
  )
    data.details = "Viewing home page";
  else if (document.location.pathname.includes("/user"))
    data.details = `Viewing ${document.title}`;
  else if (document.location.pathname.includes("/dashboard"))
    data.details = "Viewing the Dashboard";
  else if (document.location.pathname.includes("/premium"))
    data.details = "Viewing Premium";
  else if (document.location.pathname.includes("/giveaway"))
    data.details = "Viewing Giveaways";
  else if (document.location.pathname.includes("/settings"))
    data.details = "Viewing Settings";
  else if (document.location.pathname.includes("/market"))
    data.details = "Viewing the Market";
  else if (document.location.pathname.includes("/notifications"))
    data.details = "Viewing Notifications";
  else if (document.location.pathname.includes("/events"))
    data.details = "Viewing AS Events";
  /// Anime Soul anime section ///
  else if (document.location.pathname.includes("/anime"))
    data.details = "Viewing Anime";
  /// Anime Soul shop section ///
  else if (document.location.pathname.includes("/shop"))
    data.details = "Viewing the Shop";
  else if (document.location.pathname.includes("/bank"))
    data.details = "Viewing the Bank";
  else if (document.location.pathname.includes("/cards"))
    data.details = "Viewing the Cards";
  else if (document.location.pathname.includes("/card-abilities"))
    data.details = "Viewing Card Abilities";
  else if (document.location.pathname.includes("/card-events"))
    data.details = "Viewing Card Events";
  else if (document.location.pathname.includes("/inventory"))
    data.details = "Viewing Inventory";
  else if (document.location.pathname.includes("/fusion"))
    data.details = "Fusing Cards";
  else if (document.location.pathname.includes("/auction"))
    data.details = "Viewing the Auction";
  else if (document.location.pathname.includes("/trades"))
    data.details = "Viewing Trades List";
  /// Anime Soul games section ///
  else if (document.location.pathname.includes("/this-or-that"))
    data.details = "Playing This or That";
  else if (document.location.pathname.includes("/mini-games"))
    data.details = "Playing Mini Games";
  /// Anime Soul community section ///
  else if (document.location.pathname.includes("/creators"))
    data.details = "Viewing AS Creators";
  else if (document.location.pathname.includes("/medals"))
    data.details = "Viewing AS Medals";
  else if (document.location.pathname.includes("/friends"))
    data.details = "Viewing AS Friends";
  else if (document.location.pathname.includes("/leaderboards"))
    data.details = "Viewing Leaderboards";
  else if (document.location.pathname.includes("/servers"))
    data.details = "Viewing AS Servers";
  /// Anime Soul support section ///
  else if (document.location.pathname.includes("/appeals"))
    data.details = "Viewing Appeals";
  else if (document.location.pathname.includes("/updates"))
    data.details = "Viewing Updates";
  else if (document.location.pathname.includes("/guides"))
    data.details = "Viewing Guides";
  else if (document.location.pathname.includes("/rules"))
    data.details = "Reading the rules";
  else if (document.location.pathname.includes("/staff-list"))
    data.details = "Viewing Staff List";
  else if (document.location.pathname.includes("/staff"))
    data.details = "Viewing Hidden Page";

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
