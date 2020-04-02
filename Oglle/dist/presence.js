var presence = new Presence({
  clientId: "641614088215986186",
});

var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "logo",
  };
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname.includes()) {
    presenceData.details = "Inicio";
  }
  if (window.location.pathname.includes("/")) {
    presenceData.details = "Inicio";
  }
  if (window.location.pathname.includes("/nossos-programas")) {
    presenceData.details = "Programas";
  }
  if (window.location.pathname.includes("/servicos")) {
    presenceData.details = "Serviços";
  }
  if (window.location.pathname.includes("/noticias")) {
    presenceData.details = "Notícias";
  }
  if (window.location.pathname.includes("/noticia")) {
    presenceData.details = "Lendo Notícia";
  }
  if (window.location.pathname.includes("/trabalhe-conosco")) {
    presenceData.details = "Trabalhe Conosco";
  }
  if (window.location.pathname.includes("/politica-de-privacidade")) {
    presenceData.details = "Politica de Privacidade";
  }
  if (window.location.pathname.includes("/anuncios")) {
    presenceData.details = "Ganhando Dinheiro";
  }
  if (window.location.pathname.includes("/admin")) {
    presenceData.details = "Painel De Administração";
  }
  if (window.location.pathname.includes("/wp-login")) {
    presenceData.details = "Login Painel";
  }
  if (window.location.pathname.includes("/wp-admin")) {
    presenceData.details = "Painel De Administração";
  }

  presence.setActivity(presenceData);
});
