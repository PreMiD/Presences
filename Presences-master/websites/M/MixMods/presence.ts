const presence = new Presence({
  clientId: "706574162331697163"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.details = "Na página principal...";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.pathname.match("/search/label")) {
    presenceData.details = "Vendo alguma categoria...";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.pathname.startsWith("/p")) {
    switch (document.location.pathname) {
      case "/p/about.html":
        presenceData.details = "Lendo o Sobre Nós";
        break;
      case "/p/lista-de-crash-e-solucoes.html":
        presenceData.details = "Lendo a Lista de Crash e Soluções";
        break;
      case "/p/recomendados.html":
        presenceData.details = "Vendo os Recomendados";
        break;
      case "/p/disclaimer.html":
        presenceData.details = "Lendo o Disclaimer";
        break;
    }
  } else if (document.getElementsByClassName("label-info breadcrumbs")[0]) {
    presenceData.details = "Vendo uma postagem";
    const name = document.getElementsByClassName("post-title entry-title")[0]
      .textContent;
    presenceData.state = name;
  } else {
    presenceData.details = "Navegando no site";
    const url = document.location.href.split("#")[1];
    const text = url.split("=")[1];
    presenceData.state = `Página ${text}`;
  }

  presence.setActivity(presenceData);
});
