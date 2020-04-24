var presence = new Presence({
    clientId: "702935358395908168"
  });
  
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "runo",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "runo.pw") {
	  
    if (document.location.pathname.startsWith("/index")) {
      presenceData.details = "Şuanda İndex Sayfasında,";
      presenceData.state = "Hesabına Giriş Yapıyor...";
	    
    } else if (document.location.pathname.startsWith("/me")) {
      presenceData.details = "Şuanda Kendi Sayfasında,";
      presenceData.state = "Hotele Giriş Yapmaya Hazırlanıyor...";
	    
      } else if (document.location.pathname.startsWith("/client")) {
      presenceData.details = "Hotele Giriş Yaptı,";
      presenceData.state = "Şuanda Oyunda...";
	    
      } else if (document.location.pathname.startsWith("/register")) {
      presenceData.details = "Şuanda Kayıt Sayfasında,";
      presenceData.state = "Hotele Kayıt Oluyor..."
		   
      } else if (document.location.pathname.startsWith("/forgot")) {
      presenceData.details = "Şuanda Şifremi Unuttum Sayfasında";
      presenceData.state = "Galiba Şifresini Unutmuş...";
				   
      } else if (document.location.pathname.startsWith("/settings/1")) {
      presenceData.details = "Şuanda Genel Ayarlar Sayfasında,";
      presenceData.state = "Genel Ayarları Değiştiriyor";
	      
      } else if (document.location.pathname.startsWith("/settings")) {
      presenceData.details = "Şuanda Genel Ayarlar Sayfasında,";
      presenceData.state = "Genel Ayarları Değiştiriyor...";
	      	      
      } else if (document.location.pathname.startsWith("/settings/2")) {
      presenceData.details = "Şuanda E-Posta Değiştirme Sayfasında,";
      presenceData.state = "E-Postasını Değiştiriyor...";
	      	      
      } else if (document.location.pathname.startsWith("/settings/3")) {
      presenceData.details = "Şuanda Şifre Değiştirme Sayfasında,";
      presenceData.state = "Şifresini Değiştiriyor...";
	      	      
								   
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
