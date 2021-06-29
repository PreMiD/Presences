var presence = new Presence({
    clientId: "795826688364904468"
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
var page = document.location.pathname.startsWith;
var title: any;
var user: any;
var search: any;
const nome = document.querySelector(".playkit-channels-navigation__program-name");
const metadata = document.querySelector(".playkit-channels-navigation__program-metadata");

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "canaisglobo"
  };

  if (document.location.hostname == "canaisglobo.globo.com") {
    if (document.location.pathname == "/") {
      if (document.querySelector("div.playkit-warning-box__header > h3")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Página inicial";
      } else {
        presenceData.details = "Canais OFF - " + nome.textContent;
        presenceData.state = metadata.textContent;
        presenceData.smallImageKey = "live";
        presenceData.largeImageKey = "canaloff";
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname == "/explore") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Explore";
    } else if (document.location.pathname == "/programacao") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Programação";
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
    } else if (document.location.pathname.includes("/configuracoes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Configurações";
    } else if (document.location.pathname.includes("/minha-lista")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Minha Lista";
    } else if (document.location.pathname.includes("/conheca")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Conheça";
    } else if (document.location.pathname.includes("/conta-familia")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Conta Família";
    } else if (document.location.pathname.includes("/categorias/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo a categoria:";
      presenceData.state = document.querySelector(
        "div.CategoryPageStyled__CategoryWrapper-sc-1921698-0.hPaPNv > div > h2"
      ).textContent;
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

      let title = document.querySelector(".playkit-video-info__link-text")
        .textContent;
      let user = document.querySelector(
        ".playkit-video-info__ep-title"
      ).textContent;
      presenceData.state = user;

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
    } else if (document.location.pathname.includes("/canal-off/3775790")) {
      presenceData.details = "Canais OFF - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "canaloff";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/sportv-3/3180413")) {
      presenceData.details = "SporTV 3 - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "sportv3";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/sportv-2/3180373")) {
      presenceData.details = "SporTV 2 - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "sportv2";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/sportv/3180419")) {
      presenceData.details = "SporTV - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "sportv";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/globonews/3180453")) {
      presenceData.details = "GloboNews - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "globonews";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/gnt/4164401")) {
      presenceData.details = "GNT - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "gnt";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/viva/4093218")) {
      presenceData.details = "Viva - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "viva";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/multishow/4163749")) {
      presenceData.details = "Multishow - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "multishow";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/mais-na-tela/4166185")) {
      presenceData.details = "Mais na Tela - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "maisnatela";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/gloob/4163742")) {
      presenceData.details = "Gloob - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "gloob";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/gloobinho/6140830")) {
      presenceData.details = "Gloobinho - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "gloobinho";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/bis/4163157")) {
      presenceData.details = "BIS - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "bis";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/canal-brasil/3775811")) {
      presenceData.details = "Canal Brasil - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "canalbrasil";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/universal/5497510")) {
      presenceData.details = "Universal TV - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "universaltv";
      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname.includes("/studio-universal/6939705")
    ) {
      presenceData.details = "Studio Universal - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "studiouniversal";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/syfy/7301289")) {
      presenceData.details = "SYFY - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "syfy";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/megapix/7301516")) {
      presenceData.details = "Megapix";
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "megapix";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/combate/3180444")) {
      presenceData.details = "Combate - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "combate";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/premiere/2752761")) {
      presenceData.details = "Premiere - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "premiere";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/futura/4500346")) {
      presenceData.details = "Futura - " + nome.textContent;
      presenceData.state = metadata.textContent;
      presenceData.smallImageKey = "live";
      presenceData.largeImageKey = "futura";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/c/")) {
      if (document.location.pathname.includes("/multishow")) {
        presenceData.details = "Multishow";
        presenceData.largeImageKey = "multishow";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/globonews")) {
        presenceData.details = "GloboNews";
        presenceData.largeImageKey = "globonews";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/sportv")) {
        presenceData.details = "SporTV";
        presenceData.largeImageKey = "sportv";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/gnt")) {
        presenceData.details = "GNT";
        presenceData.largeImageKey = "gnt";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/viva")) {
        presenceData.details = "Viva";
        presenceData.largeImageKey = "viva";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/gloob")) {
        presenceData.details = "Gloob";
        presenceData.largeImageKey = "gloob";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/gloobinho")) {
        presenceData.details = "Gloobinho";
        presenceData.largeImageKey = "gloobinho";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/megapix")) {
        presenceData.details = "Megapix";
        presenceData.largeImageKey = "megapix";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/universal")) {
        presenceData.details = "Universal+";
        presenceData.largeImageKey = "universalplus";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/canal-brasil")) {
        presenceData.details = "Canal Brasil";
        presenceData.largeImageKey = "canalbrasil";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/canal-off")) {
        presenceData.details = "Canal OFF";
        presenceData.largeImageKey = "canaloff";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/bis")) {
        presenceData.details = "BIS";
        presenceData.largeImageKey = "bis";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/mais-na-tela")) {
        presenceData.details = "Mais na Tela";
        presenceData.largeImageKey = "maisnatela";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/bbbpayperview")) {
        presenceData.details = "Big Brother Brasil Pay-Per-View";
        presenceData.largeImageKey = "bbb";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/futura")) {
        presenceData.details = "Futura";
        presenceData.largeImageKey = "futura";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/combate/")) {
        presenceData.details = "Combate";
        presenceData.largeImageKey = "combate";
        presenceData.startTimestamp = browsingStamp;
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
