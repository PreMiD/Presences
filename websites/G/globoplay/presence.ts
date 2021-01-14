var presence = new Presence({
    clientId: "641394369651277834"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "globo"
  };

  if (document.location.hostname == "globoplay.globo.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Página inicial";
    } else if (document.location.pathname.includes("/categorias/")) {
      if (document.querySelector("div.highlight__header > p")) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("div.highlight__header > p");
        presenceData.details = "Vendo a categoria:";
        presenceData.state = user.textContent;
        presenceData.smallImageKey = "reading";
      } else if (
        document.querySelector(
          "div.application-controller__view > span > div > div > div > h1"
        )
      ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Vendo a categoria:";
        user = document.querySelector(
          "div.application-controller__view > span > div > div > div > h1"
        );
        presenceData.state = user.textContent;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Categorias";
      }
    } else if (document.location.pathname.includes("/busca")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Se preparando para";
      presenceData.state = "pesquisar algo...";
      search = document.querySelector("#search-bar-input");
      if (search.value.length > 2) {
        presenceData.details = "Pesquisando por:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "search";
      }
    } else if (document.location.pathname.includes("/programacao")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Programação";
    } else if (document.location.pathname.includes("/programas-locais")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Programas Locais";
    } else if (document.location.pathname.includes("/regiao/")) {
      user = document.querySelector("h1.view-title");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo programas locais de " + user.textContent;
    } else if (document.location.pathname.includes("/configuracoes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Configurações";
    } else if (document.location.pathname.includes("/minha-lista")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Minha Lista";
    } else if (document.location.pathname.includes("/t/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(".playkit-media-cover__header-text");
      presenceData.details = "Vendo o programa/filme:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/v/")) {
      var currentTime: any,
        duration: any,
        paused: any,
        timestamps: any,
        video: HTMLVideoElement;
      video = document.querySelector(".id-playback > video");
      (currentTime = video.currentTime),
        (duration = video.duration),
        (paused = video.paused);

      if (document.location.pathname.includes("/programa/")) {
        title = document.querySelector(".video-info__data-program").textContent;
        presenceData.state = document.querySelector(
          ".video-info__data-title"
        ).textContent;
      } else {
        title = document.querySelector(".playkit-video-info__ep-title")
          .textContent;
      }

      if (!isNaN(duration)) {
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];

        presenceData.details = title;

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Olhando para:";
        presenceData.state = title;
      }
    } else if (document.location.pathname.includes("/agora-na-tv/")) {
      presenceData.details = document.querySelector(
        ".playkit-channels-navigation__program-name"
      ).textContent;
      presenceData.state = document.querySelector(
        ".playkit-channels-navigation__program-time"
      ).textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "tvglobo";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/transmissoes/")) {
      const programTitle = document.querySelector(
        "div.playkit-channels-navigation__program-info.playkit-channels-navigation__current-program > span.playkit-channels-navigation__program-name"
      );
      const programMetadata = document.querySelector(
        "div.playkit-channels-navigation__program-info.playkit-channels-navigation__current-program > span.playkit-channels-navigation__program-metadata"
      );
      if (document.location.pathname.includes("/7339131/")) {
        presenceData.details = "Multishow - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "multishow";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339101/")) {
        presenceData.details = "GloboNews - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "globonews";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339108/")) {
        presenceData.details = "SporTV - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "sportv";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339117/")) {
        presenceData.details = "SporTV 2 - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "sportv2";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339123/")) {
        presenceData.details = "SporTV 3 - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "sportv3";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339128/")) {
        presenceData.details = "GNT - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "gnt";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339091/")) {
        presenceData.details = "Viva - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "viva";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339146/")) {
        presenceData.details = "Gloob - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "gloob";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339323/")) {
        presenceData.details = "Gloobinho - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "gloobinho";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339152/")) {
        presenceData.details = "Megapix - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "megapix";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339279/")) {
        presenceData.details = "Universal TV - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "universaltv";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339326/")) {
        presenceData.details = "Studio Universal - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "studiouniversal";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339224/")) {
        presenceData.details = "SYFY - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "syfy";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339060/")) {
        presenceData.details = "Canal Brasil - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "canalbrasil";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339078/")) {
        presenceData.details = "Canal OFF - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "canaloff";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339140/")) {
        presenceData.details = "BIS - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "bis";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7339135/")) {
        presenceData.details = "Mais na Tela - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "maisnatela";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/7420604/")) {
        presenceData.details = "Futura - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "futura";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/8223631/")) {
        presenceData.details = "Premiere - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "premiere";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/8310612/")) {
        presenceData.details = "Combate - " + programTitle.textContent;
        presenceData.state = programMetadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "combate";
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/canais/")) {
      if (document.location.pathname.includes("/globo/")) {
        presenceData.details = "TV Globo";
        presenceData.largeImageKey = "tvglobo";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/multishow/")) {
        presenceData.details = "Multishow";
        presenceData.largeImageKey = "multishow";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/globonews/")) {
        presenceData.details = "GloboNews";
        presenceData.largeImageKey = "globonews";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/sportv/")) {
        presenceData.details = "SporTV";
        presenceData.largeImageKey = "sportv";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/gnt/")) {
        presenceData.details = "GNT";
        presenceData.largeImageKey = "gnt";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/viva/")) {
        presenceData.details = "Viva";
        presenceData.largeImageKey = "viva";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/gloob/")) {
        presenceData.details = "Gloob";
        presenceData.largeImageKey = "gloob";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/gloobinho/")) {
        presenceData.details = "Gloobinho";
        presenceData.largeImageKey = "gloobinho";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/megapix/")) {
        presenceData.details = "Megapix";
        presenceData.largeImageKey = "megapix";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/universal/")) {
        presenceData.details = "Universal+";
        presenceData.largeImageKey = "universalplus";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/canal-brasil/")) {
        presenceData.details = "Canal Brasil";
        presenceData.largeImageKey = "canalbrasil";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/canal-off/")) {
        presenceData.details = "Canal OFF";
        presenceData.largeImageKey = "canaloff";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/bis/")) {
        presenceData.details = "BIS";
        presenceData.largeImageKey = "bis";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/mais-na-tela/")) {
        presenceData.details = "Mais na Tela";
        presenceData.largeImageKey = "maisnatela";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/futura/")) {
        presenceData.details = "Futura";
        presenceData.largeImageKey = "futura";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/premiere/")) {
        presenceData.details = "Premiere";
        presenceData.largeImageKey = "premiere";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/combate/")) {
        presenceData.details = "Combate";
        presenceData.largeImageKey = "combate";
        presenceData.startTimestamp = browsingStamp;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Canais";
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
