const presenceApp = new Presence({
  clientId: "793558459877687326"
});

presenceApp.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },

  browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname == "/"){
    presenceData.details = "Bir sayfaya göz atıyor:";
    presenceData.state = document.querySelector("head > title").innerHTML.split("| Odies").join("").trim();
    
  } else if(window.location.pathname.startsWith("/codes/category/")){
    presenceData.details = window.location.pathname.split("category/")[1]
    .replace("javascript", "DiscordJS")
    .replace("eris", "Eris")
    .replace("altyap%C4%B1", "Altyapı")
    .replace("user", "Sizden Gelenler")
    .replace("python", "Python")
    .replace("html", "Html")
    .replace("ozel5", "5. Seviye")
    .replace("ozel15", "15. Seviye")
    .replace("oze30", "30. Seviye ") + " adlı kategoriye göz atıyor";

  } else if(window.location.pathname.startsWith("/view")){
    presenceData.details = document.querySelector("div.main-container h1").innerHTML.trim()+' adlı kodu görüntülüyor';
  }else if(window.location.pathname == "/profile"){
    presenceData.details = document.querySelector("body.sidebar-noneoverflow > div.main-container p").innerHTML.split("#")[0]+" adlı kullanıcının profilini görüntülüyor";
  } else if(window.location.pathname == "/code/new/user"){
    presenceData.details = "Bir kod paylaşıyor";
  };


  if (presenceData.details == null) {
    presenceApp.setTrayTitle();
    presenceApp.setActivity();
  } else {
    presenceApp.setActivity(presenceData);
  };
});

