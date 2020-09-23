const presence = new Presence({
  clientId: "655480486046466098"
});

const browsingStamp = Math.floor(Date.now() / 1000);
const presenceData : PresenceData = {
  startTimestamp: browsingStamp,
  largeImageKey: "gly-logo"
}

presence.on("UpdateData", () => {
  const page = document.location.pathname;

  if (page.startsWith('/feed') || page == '/') {
    presenceData.details = 'Ana sayfa';
    page.startsWith('/feed') ? presenceData.state = 'Gönderilerine bakıyor...' : undefined;
  }

  // Explore
  if (page.startsWith("/explore")) {
    presenceData.details = 'Keşfet bölümünde...'
  }

  // Hashtags
  if (page.startsWith('/hashtag-')) {
    presenceData.details = 'Bir etikete bakıyor...';
    presenceData.state = document.querySelector("#content > div > div:nth-child(2) > div.eksigimneanlamiyorum > div > a")?.textContent
  }

  if (page.startsWith('/news')) presenceData.details = 'Haberlere göz atıyor...'

  // Users
  if (page.startsWith("/@")) {
    let profile = document.querySelector("#profiletop_username")?.textContent;
    presenceData.details = 'Bir profile göz atıyor...';
    presenceData.state = profile;
  }


  // Server Errors

  if (page.startsWith("/404")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: 404",
      state: "Sayfa bulunamadı.",
      startTimestamp: browsingStamp
    });
  }
  if (page.startsWith("/403")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: 403",
      state: "Yasaklı bölge!",
      startTimestamp: browsingStamp
    });
  }
  if (page.startsWith("/503") || page.startsWith("/500")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: " + page.substring(1),
      state: "Sunucuya şu anda ulaşılamıyor.",
      startTimestamp: browsingStamp
    });
  }
  if (page.startsWith("/400")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: 400",
      state: "Geçersiz istek.",
      startTimestamp: browsingStamp
    });
  }

  if ((typeof presenceData.details) === 'string') {
    presence.setActivity(presenceData);
  } else presence.setActivity({ details: 'Bilinmeyen bir sayfada...', startTimestamp: browsingStamp, largeImageKey: 'gly-logo' });
});
