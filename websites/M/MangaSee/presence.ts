const presence = new Presence({
  clientId: "836662139926216724"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
    pathname = document.location.pathname;
    if (pathname === "/"){
      data.details = "Viewing the Homepage";
    }
    
    presence.setActivity(data);
  });