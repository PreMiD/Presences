const presence = new Presence({
    clientId: "692436770775760927"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
  });
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Página Inicial";
  } else if (document.location.pathname.includes("/categorias")) {
    presenceData.details = "Categorias";
  } else if (document.location.pathname.includes("/busca/")) {
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
      presenceData.details = "Jogando:";
      presenceData.state = document.querySelector(
        "#game_src > div.fullscreen-header > div:nth-child(1) > div > div > div:nth-child(2) > a > h1"
      ).textContent;
    } else {
      presenceData.details = "Jogando:";
      presenceData.state =
        document.getElementsByClassName("game-header-title")[0].textContent;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
