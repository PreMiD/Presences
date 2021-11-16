const presence = new Presence({
    clientId: "909114264206327858"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "saaa",
	smallImageKey: "ccc",
    smallImageText: "www.runo.cc",
    startTimestamp: browsingStamp,
		buttons: [
    {
            label: "Runo'ya gir!",
            url: "https://runo.cc/"
        }
    ]
  };
  
    if (document.location.pathname.startsWith("/index")) {
      presenceData.details = "Şuanda index sayfasında,";
      presenceData.state = "hesabına giriş yapıyor...";
    } else if (document.location.pathname.startsWith("/me")) {
      presenceData.details = "Şuanda kendi sayfasında,";
      presenceData.state = "hotele giriş yapmaya hazırlanıyor...";
    } else if (document.location.pathname.startsWith("/client")) {
      presenceData.details = "Hotele giriş yaptı,";
      presenceData.state = "şuanda oyunda...";
    } else if (document.location.pathname.startsWith("/register")) {
      presenceData.details = "Şuanda kayıt sayfasında,";
      presenceData.state = "hotele kayıt oluyor...";
    } else if (document.location.pathname.startsWith("/forgot")) {
      presenceData.details = "Şuanda şifremi unuttum sayfasında";
      presenceData.state = "galiba şifresini unutmuş...";
    } else if (document.location.pathname.startsWith("/settings/1")) {
      presenceData.details = "Şuanda genel ayarlar sayfasında,";
      presenceData.state = "genel ayarları değiştiriyor";
    } else if (document.location.pathname.startsWith("/settings")) {
      presenceData.details = "Şuanda genel ayarlar sayfasında,";
      presenceData.state = "Genel ayarları Değiştiriyor...";
    } else if (document.location.pathname.startsWith("/settings/2")) {
      presenceData.details = "Şuanda e-posta değiştirme sayfasında,";
      presenceData.state = "e-postasını değiştiriyor...";
    } else if (document.location.pathname.startsWith("/settings/3")) {
      presenceData.details = "Şuanda şifre değiştirme sayfasında,";
      presenceData.state = "şifresini değiştiriyor...";
    
  } else if (document.location.pathname.startsWith("/community")) {
      presenceData.details = "Şuanda topluluk sayfasında,";
      presenceData.state = "birşeylere göz atıyor...";
    } else if (document.location.pathname.startsWith("/staffs")) {
      presenceData.details = "Şuanda personeller sayfasında,";
      presenceData.state = "personellere bakıyor...";
    } else if (document.location.pathname.includes("/article/")) {
      presenceData.details = document.title;
      presenceData.state = "adlı habere bakıyor...";
    } else if (document.location.pathname.includes("/home/")) {
      presenceData.details = `Şuanda ${
        document.location.pathname.split("/")[2]
      } adlı`;
      presenceData.state = "kişinin profiline Bbkıyor...";
    } else if (document.location.pathname.startsWith("/xler")) {
      presenceData.details = "Şuanda büyükelçiler sayfasında,";
      presenceData.state = "büyükelçilere bakıyor...";
    } else if (document.location.pathname.startsWith("/TopUsers")) {
      presenceData.details = "Şuanda liderler sayfasında,";
      presenceData.state = "liderlere bakıyor...";
    } else if (document.location.pathname.startsWith("/youtuber")) {
      presenceData.details = "Şuanda youtuberler sayfasında,";
      presenceData.state = "youtuberlara bakıyor...";
    } else if (document.location.pathname.startsWith("/fansite")) {
      presenceData.details = "Şuanda fansite sayfasında,";
      presenceData.state = "fansitelere bakıyor...";
    } else if (document.location.pathname.startsWith("/shop")) {
      presenceData.details = "Şuanda market sayfasında,";
      presenceData.state = "rozetlere bakıyor...";
    } else if (document.location.pathname.startsWith("/vip")) {
      presenceData.details = "Şuanda vip sayfasında,";
      presenceData.state = "viplere bakıyor...";
    } else if (document.location.pathname.startsWith("/credits")) {
      presenceData.details = "Şuanda kredi sayfasında,";
      presenceData.state = "kredi hakkında bilgiye bakıyor...";
    }
  
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
