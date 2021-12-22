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
  }

 } 
  
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
