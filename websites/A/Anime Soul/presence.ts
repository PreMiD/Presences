var presence = new Presence({
  clientId: "672156210627084328"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
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
  } 
  
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
