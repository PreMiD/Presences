let presence = new Presence({
  clientId: "703601006994260131"
});

let browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "ibd",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "ihsanbakidogan.com") {
  if (document.location.pathname.startsWith("/index")) {
      presenceData.details = "şu anda Ana Sayfaya,";
      presenceData.state = "göz atıyor...";
    } else if (document.location.pathname.startsWith("/hakkimda")) {
      presenceData.details = "şu anda Hakkımda sayfasına,";
      presenceData.state = "göz atıyor...";
    } else if (document.location.pathname.includes("/blog/gonderi/")) {
      presenceData.details = document.title;
      presenceData.state = "adlı yazıyı okuyor...";
    } else if (document.location.pathname.includes("/kategori/")) {
      presenceData.details = document.title + " adlı";
      presenceData.state = "kategorideki yazılara bakıyor...";
    }
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
});
