const presence = new Presence({
  clientId: "839455068855861248"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  },
    pathname = document.location.pathname;
    console.log(pathname);
    if (pathname === "/"){
      data.details = "Viewing the Homepage";
      data.startTimestamp = browsingStamp;
    }
    
    presence.setActivity(data);
  });
  