const presence = new Presence({
  clientId: "861641600555286528"
});
presence.on("UpdateData", () => {
  const presenceData = {
      largeImageKey: "logo"
  }, page = window.location.pathname, browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;
  if (page.startsWith("/")) 
      presenceData.details = "Anasayfayı Görüntülüyor.";
  
  if (page.startsWith("/members")) 
      presenceData.details = "Bir kullanıcının profilini görüntülüyor.";
  
  else if (page.startsWith("/categories")) 
      presenceData.details = "Bir kategori görüntülüyor.";
  
  else if (page.startsWith("/threads")) 
      presenceData.details = "Bir konuyu görüntülüyor.";
  
  else if (page.startsWith("/whats-new")) 
      presenceData.details = "Yeni konuları görüntülüyor.";
  
  else if (page.endsWith("/duyurular/")) 
      presenceData.details = "Duyurular sayfasını görüntülüyor.";
  
  else if (page.endsWith("/forum-destek/")) 
      presenceData.details = "Forum Destek sayfasını görüntülüyor.";
  
  else if (page.endsWith("/cekilis.84/")) 
      presenceData.details = "Çekiliş sayfasını görüntülüyor.";
  
  else if (page.endsWith("/discord-oyunlari.79/")) 
      presenceData.details = "Discord Oyunları sayfasında dolaşıyor...";
  
  else if (page.endsWith("/discord-icerikleri.83/")) 
      presenceData.details = "Discord İçerikleri sayfasında dolaşıyor...";
  
  else if (page.endsWith("/bot-tanitim/")) 
      presenceData.details = "Bot Tanıtım sayfasında dolaşıyor...";
  
  else if (page.endsWith("/altyapi-paylasim/")) 
      presenceData.details = "Bot Altyapı Paylaşım sayfasında dolaşıyor...";
  
  else if (page.endsWith("/discord-kod-paylasim/")) 
      presenceData.details = "Kod Paylaşım sayfasında dolaşıyor...";
  
  else if (page.endsWith("/discord-kod-destek/")) 
      presenceData.details = "Kod Destek sayfasında dolaşıyor...";
  
  else if (page.endsWith("/discord-sunucu/")) 
      presenceData.details = "Discord Sunucu sayfasında dolaşıyor...";
  
  else if (page.endsWith("/minecraft-genel/")) 
      presenceData.details = "Minecraft Genel sayfasında dolaşıyor...";
  
  else if (page.endsWith("/minecraft-sunucular/")) 
      presenceData.details = "Minecraft Sunucuları sayfasında dolaşıyor...";
  
  else if (page.endsWith("/html-css.43/")) 
      presenceData.details = "Html , Css sayfasında dolaşıyor...";
  
  else if (page.endsWith("/javascript.46/")) 
      presenceData.details = "Javascript sayfasında dolaşıyor...";
  
  else if (page.endsWith("/php.44/")) 
      presenceData.details = "PHP sayfasında dolaşıyor...";
  
  else if (page.endsWith("/python.45/")) 
      presenceData.details = "Python sayfasında dolaşıyor...";
  
  else if (page.endsWith("/java.48/")) 
      presenceData.details = "Java sayfasında dolaşıyor...";
  
  else if (page.endsWith("/c.49/")) 
      presenceData.details = "C sayfasında dolaşıyor...";
  
  else if (page.endsWith("c.50/")) 
      presenceData.details = "C++ sayfasında dolaşıyor...";
  
  else if (page.endsWith("/c.51/")) 
      presenceData.details = "C# sayfasında dolaşıyor...";
  
  else if (page.endsWith("/bash-shell.52/")) 
      presenceData.details = "Bash / Shell sayfasında dolaşıyor...";
  
  else if (page.endsWith("visual-basic-net.74/")) 
      presenceData.details = "Visual Basic .NET sayfasında dolaşıyor...";
  
  else if (page.endsWith("/steam.58/")) 
      presenceData.details = "Steam sayfasında dolaşıyor...";
  
  else if (page.endsWith("/epic-games.59/")) 
      presenceData.details = "Epic Games sayfasında dolaşıyor...";
  
  else if (page.endsWith("/origin.60/")) 
      presenceData.details = "Origin sayfasında dolaşıyor...";
  
  else if (page.endsWith("/uplay.61/")) 
      presenceData.details = "UPlay sayfasında dolaşıyor...";
  
  else if (page.endsWith("/playstation.63/")) 
      presenceData.details = "PlayStation sayfasında dolaşıyor...";
  
  else if (page.endsWith("/xbox.64/")) 
      presenceData.details = "Xbox sayfasında dolaşıyor...";
  
  else if (page.endsWith("nintendo.65/")) 
      presenceData.details = "Nintendo sayfasında dolaşıyor...";
  
  else if (page.endsWith("/genel.67/")) 
      presenceData.details = "Genel sayfasında dolaşıyor...";
  
  else if (page.endsWith("/muezik.69/")) 
      presenceData.details = "Müzik sayfasında dolaşıyor...";
  
  else if (page.endsWith("/film-dizi.70/")) 
      presenceData.details = "Film & Dizi sayfasında dolaşıyor...";
  
  else if (page.endsWith("/tarih-kueltuer.71/")) 
      presenceData.details = "Tarih & Kültür sayfasında dolaşıyor...";
  
  else if (page.endsWith("/youtube-twitch.72/")) 
      presenceData.details = "YouTube & Twitch sayfasında dolaşıyor...";
  
  else if (page.endsWith("/sosyal-medya.73/")) 
      presenceData.details = "Sosyal Medya sayfasında dolaşıyor...";
  
  else if (page.endsWith("/methodlar.77/")) 
      presenceData.details = "Methodlar sayfasında dolaşıyor...";
  
  else if (page.endsWith("/hosting.75/")) 
      presenceData.details = "Hosting sayfasında dolaşıyor...";
  
  else if (page.endsWith("/account-details")) 
      presenceData.details = "Hesap ayarlarına göz atıyor... 👀";
  
  else if (page.endsWith("/signature")) 
      presenceData.details = "Hesap imzasını düzenliyor.";
  
  else if (page.endsWith("/admin")) 
      presenceData.details = "Erişemeyeceği bir yere erişmeye çalışıyor... 👀";
  
  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  } else 
      presence.setActivity(presenceData);
  
});
