const presence = new Presence({
    clientId: "836589763896541195"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/") presenceData.details = "Ana Sayfa";
  else if (pathname === "/fansublar")
    presenceData.details = "Çeviri Gruplarına Bakıyor";
  else if (pathname.startsWith("/fansub")) {
    presenceData.details = "Çeviri Grubu Görüntüleniyor:";
    data.state = document.querySelector(".d-table > .d-cell > h1").innerHTML;
  } else if (pathname === "/sikca-sorulan-sorular")
    presenceData.details = "Çeviri Sıkça Sorulan Sorular";
  else if (
    pathname.startsWith("/manga/") &&
    window.location.search.substr(0, 5) === "?page"
  ) {
    presenceData.details = document.querySelector(".back").textContent;
    data.state = `📖 Bölüm ${pathname.substring(
      pathname.lastIndexOf("/") + 1
    )} 📄 ${document
      .querySelector("#pageSelect > option:checked")
      .textContent.replace("\n", "")
      .replace("SAYFA", "")}`;
    data.smallImageKey = "read";
    data.buttons = [{ label: "Sayfaya Git", url: window.location.href }];
  } else if (pathname.startsWith("/manga/")) {
    data.buttons = [{ label: "Sayfaya Git", url: window.location.href }];
    presenceData.details = "Çeviri mangaya:";
    data.state = document.querySelector(".name").textContent;
    data.smallImageKey = "view";
  } else if (
    pathname === "/mangalar" &&
    document.location?.search?.substr(0, 7) === "?search"
  ) {
    presenceData.details = "Arıyor:";
    data.state = new URLSearchParams(document.location.search).get("search");
    data.smallImageKey = "search";
  } else if (pathname === "/mangalar")
    presenceData.details = "Mangaya Göz Atıyor";
  else if (pathname.startsWith("/kategori")) {
    presenceData.details = "Mangaya Göz Atıyor";
    data.state = `Tür: ${document.querySelector(".page__title").textContent}`;
  }
  presence.setActivity(data);
});
