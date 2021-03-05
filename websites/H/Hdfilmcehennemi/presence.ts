const presence = new Presence({
  clientId: "817292272508731392"
})

const pages: {[index: string]:string} = {
  "/film-istekleri-yap/": "Film İstekleri",
  "/site-hakkinda/": "Yasal Bildirim",
  "/iletisim/": "İletişim"
}

const categories: {[index: string]:string} = {
  "/imdb-7-puan-uzeri-filmler/": "Imdb 7+ Filmler",
  "/en-cok-yorumlananlar/": "En Çok Yorumlananlar",
  "/en-cok-begenilen-filmler-izle/": "En Çok Beğenilenler",
  "/dil/turkce-dublajli-film-izleyin/": "Türkçe Dublaj",
  "/dil/turkce-altyazili-film-izleme-sitesi/": "Türkçe Altyazı"
}

presence.on("UpdateData", async () => {

  let page = document.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('s');

  if (!page.endsWith("/")) page = page + "/";

  const presenceData: PresenceData = {
    largeImageKey: "large"
  };

  if (pages[page]) {
    presenceData.details = "Sayfada:";
    presenceData.state = pages[page];
  } else if (categories[page]) {
    presenceData.details = "Film Arıyor:";
    presenceData.state = categories[page];
  } else if (page.includes("/category/") || page.includes("/tur/") || page.includes("/yil/")) {
    presenceData.details = "Film Arıyor:";
    // @ts-ignore
    let category = document.getElementsByClassName("tab-title")[0].firstChild.innerHTML;
    category.includes("Kategorisi") ? category = category.replace(/Kategorisi(.*)/, "") : "";
    category.includes("izle") ? category = category.replace(/izle(.*)/, "") : "";
    presenceData.details = "Geziniyor:";
    presenceData.state = category;
  } else if (document.getElementById("player")) {
    let movieName = document.getElementsByClassName("movie-title")[0].children[1].innerHTML;
    movieName.includes("izle") ? movieName = movieName.replace(/izle(.*)/, "") : "";
    presenceData.details = "Film İzliyor:";
    presenceData.state = movieName;
    /*
    Commented until I find something that fits into guidelines.

    presenceData.buttons = [
      {
        label: "İzle",
        url: window.location.href
      }, {
        label: "Siteye Git",
        url: "https://hdfilmcehennemi.net"
    }];
    */
  } else if (myParam) {
    presenceData.details = "Film Arıyor:";
    presenceData.state = myParam;
  } else {
    presenceData.details = "Geziniyor";
  }


  presence.setActivity(presenceData);
});
