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
  else if (document.location.pathname.includes("/premium"))
    data.details = "Viewing Premium";
 
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

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
