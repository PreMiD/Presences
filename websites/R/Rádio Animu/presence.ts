const presence = new Presence({
    clientId: "828278673680498699"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing"
  });

const browsingStamp = Math.floor(Date.now() / 1000);
let artist: string;
let title: string;
let playing: boolean ;

presence.on("iFrameData", (data: any) => {
  playing = data.iframe_radio.playing;
  if (playing) {
    artist = data.iframe_radio.artist;
    title = data.iframe_radio.title;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "animu"
  };

  presenceData.startTimestamp = browsingStamp;
  if (playing) {
    presenceData.details = artist;
    presenceData.state = title;
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = (await strings).play;
    presenceData.buttons = [{label: "Ouça aqui!", url: "https://www.animu.com.br/"}];
  } else if (document.location.pathname.includes("/grade/")) {
    presenceData.details = "Grade de Programação";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/pedidos/")) {
    presenceData.details = "Pedidos";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/equipe/")) {
    presenceData.details = "Equipe";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/sobre/")) {
    presenceData.details = "Sobre";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/fazerparte/")) {
    presenceData.details = "Faça Parte da Equipe";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/parceria/")) {
    presenceData.details = "Parceria";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/suafansingaqui/")) {
    presenceData.details = "Sua Fansing Aqui";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/historia/") {
    presenceData.details = "História";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/") {
    presenceData.details = "Página inicial";
    presenceData.smallImageKey = "reading";
  } 

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
