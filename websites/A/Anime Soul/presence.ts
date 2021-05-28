const presence = new Presence({
    clientId: "672156210627084328"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: string;
presence.on("UpdateData", async () => {
  const data = {
    largeImageKey: "animesoul",
    startTimestamp: browsingStamp,
    details: "Viewing home page"
  };
  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/home/"
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
  } else if (document.location.pathname.includes("/anime")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Anime";
  } else if (document.location.pathname.includes("/shop")) {
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
    data.details = "Viewing Trades List";
  } else if (document.location.pathname.includes("/this-or-that")) {
    data.startTimestamp = browsingStamp;
    data.details = "Playing This or That";
  } else if (document.location.pathname.includes("/mini-games")) {
    data.startTimestamp = browsingStamp;
    data.details = "Playing Mini Games";
  } else if (document.location.pathname.includes("/creators")) {
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
  } else if (document.location.pathname.includes("/appeals")) {
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
  }
  if (data.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
