const presence = new Presence({
  clientId: "835652520637890620"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  },
    pathname = document.location.pathname

    if (pathname === "/"){
      data.details = "Viewing the Homepage";
      data.startTimestamp = browsingStamp;
    }

    
  presence.setActivity(data);
});
