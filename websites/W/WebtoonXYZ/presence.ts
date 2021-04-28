const presence = new Presence({
  clientId: "836962986451140609"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  },
    pathname = document.location.pathname;
    if(pathname == "/")
      data.details = "Viewing the homepage"
    presence.setActivity(data);
  });
  