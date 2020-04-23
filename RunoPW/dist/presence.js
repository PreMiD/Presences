var presence = new Presence({
    clientId: "702935358395908168"
  }),
  
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "runo",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "runo.pw") {
	  
    if (document.location.pathname.startsWith("/index")) {
      presenceData.details = "Giriş sayfasına bakıyor...";
      presenceData.state = "İndex Sayfası";
    } else if (document.location.pathname.startsWith("/me")) {
      presenceData.details = "Me sayfasına bakıyor....";
      presenceData.state = "Me Sayfası";
    } else if (document.location.pathname.startsWith("/client")) {
      presenceData.details = "Şuanda client sayfasında!";
      presenceData.state = "www.Runo.Pw";
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
