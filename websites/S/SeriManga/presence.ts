const presence = new Presence({
  clientId: "836589763896541195"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
    pathname = document.location.pathname;
    console.log(pathname);
    if (pathname === "/")
      data.details = "Ana Sayfa";
    else if(pathname.startsWith("/fansublar"))
      data.details = "Çeviri Gruplarına Bakıyor";
      

    presence.setActivity(data);
  });
  