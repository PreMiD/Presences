var presence = new Presence({
    clientId: "692436770775760927"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
  });
var browsingStamp = Math.floor(Date.now() / 1000);
var url = new URLSearchParams(window.location.search).get("site");
var title;
var replace;
presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "logo"
  };
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Página Inicial";
  }
  // if i ever have patience, todo show whay category you are seeing
  else if (document.location.pathname.includes("/categorias")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Categorias";
  } else if (document.location.pathname.includes("/busca/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Pesquisando por:";
    presenceData.state = document.querySelector("input").value;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).search;
  } else if (document.location.pathname.includes("/jogos/")) {
    if (
      document.querySelector(
        "#game_src > div.fullscreen-header > div:nth-child(1) > div > div > div:nth-child(2) > a > h1"
      )
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Jogando:";
      presenceData.state = document.querySelector(
        "#game_src > div.fullscreen-header > div:nth-child(1) > div > div > div:nth-child(2) > a > h1"
      ).textContent;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Jogando:";
      presenceData.state = document.getElementsByClassName(
        "game-header-title"
      )[0].textContent;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
