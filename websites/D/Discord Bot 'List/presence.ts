const presence = new Presence({
  clientId: "750473295140225135"
});

const second = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
if (document.location.hostname == "dis.cordbots.cf") {
    presenceData.details = "Looking at a Page:";
    presenceData.state = "Home page";
    presenceData.startTimestamp = second;
    if (document.location.pathname.includes("/bots")) {
      presenceData.details = "Looking at a Page:";
      presenceData.state = "Bots";
      presenceData.startTimestamp = second;
    } else if (document.location.pathname.includes("/certificate")) {
      presenceData.details = "Looking at a Page:";
      presenceData.state = "Certificate";
      presenceData.startTimestamp = second;
    } else if (document.location.pathname.includes("/add")) {
      presenceData.details = "Looking at a Page:";
      presenceData.state = "Bot Add";
      presenceData.startTimestamp = second;
    } else if(document.location.pathname.includes("/user/")) {
      let isim = document.getElementById("username")
      presenceData.details = "Looking at a profile:";
      presenceData.state = isim.innerText;
      presenceData.startTimestamp = second;
    } else if(document.location.pathname.includes("/bot/")) {
      let botisim = document.getElementById("botisim")
      presenceData.details = "Looking at a Bot:";
      presenceData.state = botisim.innerText || "Not found";
      presenceData.startTimestamp = second;
    }
} // tekrar almak icin yazıyorum bot
      if (presenceData.details == null) {
        // Bu kısım presenceData objesinde "details" anahtarı bulunmadığı zaman devreye girecektir.
        presence.setTrayTitle(); // Mac kullanıcıları için menü yazısını temizler.
        presence.setActivity(); // Bu şekilde fonksiyona bir veri girmeden girerseniz, büyük resim Discord uygulamasının simgesine dönüşecek ve başka bir bilgi gösterilmeyecektir.
    } else {
        // Yukarıdaki durumun dışında herhangi bir şey gerçekleşirse burası devreye girecektir.
        presence.setActivity(presenceData); // Aktiviteyi belirtilen verilerle ayarlar.
    }
  
