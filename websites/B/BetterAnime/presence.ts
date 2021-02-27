const presence = new Presence({ clientId: "814179995051491338" });

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  const tempo = Math.floor(Date.now() / 1000),
      path = document.location.pathname,
      titulo = document.title,
      link = document.URL;

  if (link.split("/")[3].includes("pesquisa?titulo=")) {
    const result = document.querySelector("#titulo").value;
    presenceData.details = "Página de Busca";
    presenceData.state = "Pesquisando: " + result;
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/animes"){
    presenceData.details = "Lista de Animes";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/filmes"){
    presenceData.details = "Lista de Filmes";
    presenceData.startTimestamp = tempo;
  }
  else if (link.split("/")[3].includes("pesquisa")) {
    presenceData.details = "Lista de Animes e Filmes";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/ultimosLancamentos"){
    presenceData.details = "Ultimos Lançamentos";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/ultimosAdicionados"){
    presenceData.details = "Ultimos Animes Adicionados";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/contatos"){
    presenceData.details = "Entre em Contato";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/login"){
    presenceData.details = "Página de Login";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/register"){
    presenceData.details = "Página de Registro";
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/minha-conta"){
    const perfName = document.querySelector("#page-content > div.container.my-5 > section > div > p.mt-2.user-name").textContent,
    favCount = document.querySelector("#nav-profile-tab > span").textContent,
    perfGenr = document.querySelector("#page-content > div.container.my-5 > section > div > p.font-weight-light").textContent;

    if(perfGenr.includes("Masculino")) {
      presenceData.smallImageKey = "masc2";
      presenceData.smallImageText = "Masculino"
    } else if(perfGenr.includes("Feminino")){
      presenceData.smallImageKey = "fem2";
      presenceData.smallImageText = "Feminino"
    }

    presenceData.details = "Perfil: " + perfName;
    presenceData.state = "Animes Favotiros: " + favCount;
    presenceData.startTimestamp = tempo;
  }
  else if (path == "/minha-conta/changeDetails") {
    presenceData.details = "Editando Perfil";
    presenceData.startTimestamp = tempo;
  }
  else if (link.split("/")[6]) {
    const AniN = document.querySelector("#page-content > main > div > div > div.anime-title > h2 > a").textContent,
          AniEp = document.querySelector("#page-content > main > div > div > div.anime-title > h3").textContent.replace("Episódio ", ""),
          ta = document.URL.split("/")[3].replace("f", "F").replace("a", "A");

    presenceData.details = AniN;
    presenceData.state = "Episódio: " + AniEp;
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = "Pausado";

    presenceData.buttons = [
        {
          label: "Watch " + ta,
          url: document.URL
        }
      ];

    let playback =
    (document.querySelector(".vjs-current-time-display") ||
      document.querySelector(".jw-text-elapsed")) !== null 
      ? true
      : false;

    const video: HTMLVideoElement = document.querySelector(".jw-video")
    if (video !== null && !isNaN(video.duration)) {

      const timestamps = presence.getTimestamps(
              Math.floor(video.currentTime),
              Math.floor(video.duration)
            );
            
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? "Pausado"
        : "Assistindo";
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (link.split("/")[5]){
      
      const nomeAni= document.querySelector("#page-content > main > div.infos_left > div > h2"),
      genAni = document.querySelector("#page-content > main > div.infos_left > div > div.anime-genres"),
      favAni = document.querySelector("#favoritarAnime").getAttribute("data-original-title"),
      t = document.URL.split("/")[3].replace("f", "F").replace("a", "A");

      if(favAni.includes("Desfavoritar")) {
        presenceData.smallImageKey = "fav";
        presenceData.smallImageText = "Favorito"
      } 

      presenceData.buttons = [
        {
          label: "View " + t,
          url: document.URL
        }
      ];

    presenceData.details = nomeAni.textContent;
    presenceData.state = "Generos: " + genAni.innerText.replace("↵", "").split("\n").join(", ");
    presenceData.startTimestamp = tempo;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
