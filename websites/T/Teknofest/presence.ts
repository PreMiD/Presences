const presence = new Presence({
  clientId: "903957474489548813"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    searchURL = new URL(document.location.href),
    searchResult = searchURL.searchParams.get("q"),
    searchCategory = searchURL.searchParams.get("k");
  if (window.location.pathname.toLowerCase() === "/") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Anasayfa";
  } else if (window.location.pathname.toLowerCase() === "/yarismalar.html") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Yarışmalar";
  } else if (window.location.pathname.toLowerCase() === "/hakkimizda.php") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "Hakkımızda";
  } else if (window.location.pathname.toLowerCase() === "/iletisim.html") {
    presenceData.details = "Bir sayfa görüntülüyor:";
    presenceData.state = "İletişim";
  }
 
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
