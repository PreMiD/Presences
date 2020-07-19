const presence = new Presence({
   clientId: "717913549795622953"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
};

  const browsingStamp = Math.floor(Date.now() / 1000);
  const page = window.location.pathname;
  if(page.toLowerCase() === "/") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Anasayfa";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/bilgilendirme") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Bilgilendirme";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/basvuru") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Yetkili başvurusu";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.startsWith("/hata")) {
  presenceData.details = "Bir hata ile karşılaştı:";
  presenceData.state = `Hata kodu` + ' : ' + window.location.search.slice(5);
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/normal") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Normal Kodlar";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/altin") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Altın Kodlar";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/elmas") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Elmas Kodlar";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/hazir") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Hazır Sistemler";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/topluluk") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Topluluk Kodları";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.startsWith("/code/edit")) {
  presenceData.details = "Bir kod düzenliyor:";
  presenceData.state = window.location.search.slice(8) + ' ' + 'numaralı kodu düzenliyor!'
  presenceData.startTimestamp = browsingStamp;
  } else if(page.startsWith("/code/incele")) {
  presenceData.details = "Bir kod inceliyor:";
  presenceData.state = window.location.search.slice(8) + ' ' + 'numaralı kodu inceliyor!'
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/codepanel") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Kod Paneli";
  presenceData.startTimestamp = browsingStamp;
  } else if(page.startsWith("/code")) {
  presenceData.details = "Bir kod görüntülüyor:";
  presenceData.state = document.querySelector('body > center > div > a:nth-child(6)').textContent + ' ' + 'adlı kodu görüntülüyor!'
  presenceData.startTimestamp = browsingStamp;
  } else if(page.startsWith("/profil")) {
  presenceData.details = "Bir profil görüntülüyor:";
  presenceData.state = document.querySelector('body > div.jumbotron.jumbotron-x > div > center > h2').textContent + ' ' + 'adlı kullanıcının profilini görüntülüyor!'
  presenceData.startTimestamp = browsingStamp;
  } else if(page.toLowerCase() === "/addcode") {
  presenceData.details = "Bir sayfaya görüntülüyor:";
  presenceData.state = "Kod Ekle";
  presenceData.startTimestamp = browsingStamp;
  }
  
    if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
  
});