const presenceApp = new Presence({
  clientId: "793558459877687326"
})

const  dataPathNames = {
  homepage: "/",
  codes: "/codes/category/",
  profile: "/profile",
}
const dataMessages = {
  lookpage: "Bir sayfa görüntülüyor;",
  lookcodepage: "Bir kategori görüntülüyor;",
  lookcode: " kodunu görüntülüyor",
  lookprofile: "'in profilini görüntülüyor"
}

presenceApp.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if(window.location.pathname == "/"){
    presenceData.details = dataMessages.lookpage;
    presenceData.state = "Ana Sayfa"
  }else if(window.location.pathname.startsWith(dataPathNames.codes)){
    presenceData.details = dataMessages.lookcodepage;
    presenceData.state = window.location.pathname.split(dataPathNames.codes).join("")
    .replace("javascript", "JavaScript")
    .replace("altyap%C4%B1", "Altyapı")
    .replace("python", "Python")
    .replace("html", "Html")
    .replace("ozel5", "5. Seviye özel")
    .replace("ozel15", "15. Seviye özel")
    .replace("ozel30", "30. Seviye özel")
  }else if(window.location.pathname == dataPathNames.profile){
    presenceData.details = document.querySelector("body.sidebar-noneoverflow > div.main-container p")
    .innerHTML.split("#")[0]+dataMessages.lookprofile;
  } else if(window.location.pathname.startsWith("/view")){
    presenceData.details = document.querySelector("div.main-container h1").innerHTML.trim()+dataMessages.lookcode;
  };

  
  if (presenceData.details == null) {
    presenceApp.setTrayTitle();
    presenceApp.setActivity();
  } else {
    presenceApp.setActivity(presenceData);
  }
})