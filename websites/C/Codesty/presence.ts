const presence = new Presence({
  clientId: "838382561800617994"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    pathName = window.location.pathname.toLowerCase();
  if (pathName === "/") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Ses Sıralaması";
  } else if (pathName === "/team") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Takımımız";
  } else if (pathName === "/discord/tools") {
	presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Discord Araçları";
  } else if (pathName === "/member") { 
  	presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Üye Sıralaması";
  } else if (pathName === "/boost") { 
    presenceData.state = "Boost Sıralaması";
  	presenceData.details = "Bir sayfa görüntülüyor:";
  } else if (pathName === "/discover") {
	presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Sunucu Keşfet";
  } else if (pathName === "/bot") {
	presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Bot Daveti";
  } else if (pathName === "/legal") {
	presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Gizlilik Politikası";
  } else if (pathName === "/profile") {
	presenceData.details = "Bir profil görüntülüyor:";
	presenceData.state = document.title.replace('Codesty |', '').replace('Kullanıcısı', '');
  } else if (pathName.startsWith('/dashboard/')) {
	presenceData.details = "Bir sunucu yönetiyor:";
	presenceData.state = document.querySelector('body > section:nth-child(3) > div > div > div.mb-4.is-flex-desktop > div.title-container.mr-6 > h1').innerHTML;
  } else if (pathName.startsWith('/trend/')) {
	presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Oy Sıralaması";
  } else if (pathName.startsWith('/server/')) {
	presenceData.details = "Bir sunucu görüntülüyor:";
    presenceData.state = document.title.replace('Codesty |', '').replace('Sunucusu', '');
  } else if (pathName.startsWith('/u/')) {
	presenceData.details = "Bir profil görüntülüyor:";
	presenceData.state = document.title.replace('Codesty |', '').replace('Kullanıcısı', '');
  } else {
	presenceData.details = "Bir hata ile karşılaştı:";
    presenceData.state = "404 Sayfa Bulunamadı";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
