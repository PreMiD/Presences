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
  const presenceData: presenceData = {
    largeImageKey: "globo"
  };

  if (document.location.hostname == "globoplay.globo.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo a página inicial";
    } else if (document.location.pathname.includes("/categorias/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(
        "#app > div > div > div > div.application-controller__view > span > div > div > div > div.page-template__header > h1"
      );
      presenceData.details = "Vendo a categoria:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/busca")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Se preparando para";
      presenceData.state = "pesquisar algo...";
      search = document.querySelector("#search-bar-input");
      if (search.value.length > 2) {
        presenceData.details = "Pesquisando por:";
        presenceData.state = search.value;
      }
    } else if (document.location.pathname.includes("/programacao")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo a programação";
    } else if (document.location.pathname.includes("/configuracoes")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo minhas configurações";
    } else if (document.location.pathname.includes("/minha-lista")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo a Minha Lista";
    } else if (document.location.pathname.includes("/p/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(
        "#app > div > div > div > div.application-controller__view > span > div > div > div.program-header > div > div.playkit-container > div > div.playkit-media-cover__header > h1"
      );
      presenceData.details = "Vendo o programa:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/t/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(
        "#app > div > div > div > div.application-controller__view > span > div > div > div.title-header > div > div.playkit-container > div > div.playkit-media-cover__header > h1"
      );
      presenceData.details = "Vendo o filme:";
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
        title = document.querySelector(".playkit-video-info__link-text")
          .textContent;
        presenceData.state = document.querySelector(
          ".playkit-video-info__ep-title"
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
    } else if (document.location.pathname.includes("/agora-na-globo/")) {
      presenceData.details = document.querySelector(
        ".playkit-channels-navigation__program-name"
      ).textContent;
      presenceData.state = document.querySelector(
        ".playkit-channels-navigation__program-time"
      ).textContent;
      presenceData.smallImageKey = "live";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/transmissoes/")) {
      if (document.location.pathname.includes("/244881")) {
        presenceData.details = "Acompanhando a casa do BBB";
        presenceData.smallImageKey = "live";
        presenceData.startTimestamp = browsingStamp;
      } else {
        presenceData.details = "Vendo a câmera do BBB:";
        presenceData.state = document.querySelector(
          ".playkit-channels-navigation__program-name"
        ).textContent;
        presenceData.smallImageKey = "live";
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
