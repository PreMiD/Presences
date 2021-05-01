const presence = new Presence({
    clientId: "836589763896541195"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname;

  if (pathname === "/") data.details = "Ana Sayfa";
  else if (pathname == "/fansublar") data.details = "Çeviri Gruplarına Bakıyor";
  else if (pathname.startsWith("/fansub")) {
    const tlgroup = document.querySelector(".d-table > .d-cell > h1").innerHTML;
    data.details = "Çeviri Grubu Görüntüleniyor:";
    data.state = tlgroup;
  } else if (pathname == "/sikca-sorulan-sorular")
    data.details = "Çeviri Sıkça Sorulan Sorular";
  else if (
    pathname.startsWith("/manga/") &&
    window.location.search.substr(0, 5) == "?page"
  ) {
    const title = document.querySelector(".back").textContent,
      page = document
        .querySelector("#pageSelect > option:checked")
        .textContent.replace("\n", "")
        .replace("SAYFA", ""),
      lastItem = pathname.substring(pathname.lastIndexOf("/") + 1),
      link = window.location.href;

    data.details = title;
    data.state = "📖 Bölüm " + lastItem + " 📄 " + page;
    data.smallImageKey = "read";
    data.buttons = [{ label: "Sayfaya Git", url: link }];
  } else if (pathname.startsWith("/manga/")) {
    const title = document.querySelector(".name").textContent,
      link = window.location.href;

    data.buttons = [{ label: "Sayfaya Git", url: link }];
    data.details = "Çeviri mangaya:";
    data.state = title;
    data.smallImageKey = "view";
  } else if (
    pathname == "/mangalar" &&
    document.location?.search?.substr(0, 7) == "?search"
  ) {
    const urlParams = new URLSearchParams(document.location.search),
      search = urlParams.get("search");
    data.details = "Arıyor:";
    data.state = search;
    data.smallImageKey = "search";
  } else if (pathname == "/mangalar") data.details = "Mangaya Göz Atıyor";
  else if (pathname.startsWith("/kategori")) {
    const ganre = document.querySelector(".page__title").textContent;
    data.details = "Mangaya Göz Atıyor";
    data.state = "Tür: " + ganre;
  }
  presence.setActivity(data);
});
