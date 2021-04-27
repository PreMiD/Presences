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
    if (pathname === "/")
      data.details = "Ana Sayfa";
    else if(pathname == "/fansublar")
      data.details = "Çeviri Gruplarına Bakıyor";
    else if(pathname.startsWith("/fansub")){
      const tlgroup = document.querySelector(".d-table > .d-cell > h1").innerHTML;
      data.details = "Çeviri Grubu Görüntüleniyor:";
      data.state = tlgroup;
    }
    else if(pathname == "/sikca-sorulan-sorular")
      data.details = "Çeviri Sıkça Sorulan Sorular";
    else if(pathname.startsWith("/manga/") && window.location.search.substr(0,5) == "?page"){
      const title = document.querySelector(".back").textContent;
      // let chapter = (<HTMLSelectElement>document.getElementById('chapterSelect')).value;
      let chapter = document.querySelector("#chapterSelect > option:checked").textContent;
      // let sel = document.getElementById("chapterSelect").value;
      

      data.details = title;
      data.state = chapter;
    }
    else if(pathname.startsWith("/manga/")){
      const title = document.querySelector(".name").textContent,
      link = window.location.href;

      data.buttons = [{ label: "View Manga", url: link }];
      data.details = "Çeviri manga:";
      data.state = title;
      data.smallImageKey = "view";
    }

    presence.setActivity(data);
  });
  