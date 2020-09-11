const presence = new Presence({
    clientId: "753818401541193859"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mh_l",
    startTimestamp: browsingStamp
  },
    pathname = document.location.pathname,
    hostname = document.location.hostname;

  if(
    hostname === "mangahost2.com" || hostname === "www.mangahost2.com"
    ){
      if(pathname.startsWith("/")){
        presenceData.details = "Vendo:";
        presenceData.state = "Website MangaHost";
      }

      if(pathname.startsWith("/lancamentos")){
        presenceData.details = "Vendo:";
        presenceData.state = "Lançamentos";
      }
      if(pathname.startsWith("/scans")){      
        let pathsplitted = pathname.split('/').slice(-1)[0];
        if (!pathsplitted.includes("scans"))
        {
          let scanName = document.querySelector("h1").textContent;
          presenceData.details = "Vendo Scan:";
          presenceData.state = scanName;  
        }
        else
        {
          presenceData.details = "Vendo:";
          presenceData.state = "Lista de Scanlators";  
        }
      }

      if(pathname.startsWith("/leituras")){
        presenceData.details = "Vendo:";
        presenceData.state = "Leituras Pessoais";
      }

      if(pathname.startsWith("/profile")){
        let username = document.querySelector("h1").textContent;
        presenceData.details = "Vendo Perfil:";
        presenceData.state = username;
      }

      if(pathname.startsWith("/find"))
      {
        let pathsplitted = pathname.split('/').slice(-1)[0];
        presenceData.details = "Pesquisando por:";
        presenceData.state = pathsplitted;
      }

      if(pathname.startsWith("/wp-admin/profile")){
        presenceData.details = "Editando:";
        presenceData.state = "Perfil";
      }
      
      if(pathname.startsWith("/mangas")){
        let pathsplitted = pathname.split('/').slice(-1)[0];
        if (!pathsplitted.startsWith("mangas"))
        {
          let information = pathsplitted
            .replace("-", " ")
            .replace(/(\w)(\w*)/g,
              function(_,g1,g2){return g1.toUpperCase() + g2.toLowerCase();
            });
          presenceData.details = "Vendo Mangás:";
          presenceData.state = information;
        }
        else
        {
          presenceData.details = "Vendo:";
          presenceData.state = "Lista de Mangás";
        }
      }
      
      if(pathname.startsWith("/mangas/novel")){
        presenceData.details = "Vendo:";
        presenceData.state = "Lista de Novels";
      }

      if(pathname.startsWith("/manga/") && pathname.includes("-mh")){
        let pathsplitted = pathname.split('/').slice(-1)[0];
        if (!pathsplitted.includes("-mh"))
        {
          let mangaName = document.querySelector("h1 a").textContent;
          let chapterNumber = pathsplitted[0];

          var e = (document.getElementById("capitulos-3")) as HTMLSelectElement;
          var sel = e.selectedIndex;
          var opt = e.options[sel];
          var CurText = (<HTMLOptionElement>opt).text;
          let pageNumber = CurText;

          presenceData.details = mangaName;
          presenceData.state = "Capítulo " + chapterNumber + " - Pg " + pageNumber;
        }
        else
        {
          presenceData.details = "Vendo Informações:";
          presenceData.state = document.querySelector("h1.title").textContent;
        }
      }
    }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});