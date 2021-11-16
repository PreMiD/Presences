const presence = new Presence({
  clientId: "706574162331697163"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Na página inicial...";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "www.mixmods.com.br";
  } else if (document.location.pathname.match("/search/label")) {
    const [url] = document.location.href.split("/label/")[1].split("?&max"),
      [test] = url.split("?&max");
    presenceData.details = "Visualizando categoria:";
    presenceData.state = decodeURI(test);
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.pathname.startsWith("/p")) {
    switch (document.location.pathname) {
      case "/p/about.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Sobre Nós";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/p/lista-de-crash-e-solucoes.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Lista de Crash";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/p/recomendados.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Recomendados";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/p/disclaimer.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Disclaimer";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
    }
  } else if (document.getElementsByClassName("label-info breadcrumbs")[0]) {
    presenceData.details = "Visualizando um post:";
    presenceData.state = document.getElementsByClassName(
      "post-title entry-title"
    )[0].textContent;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = `Postado por Junior_Djjr em ${
      document.querySelector("[itemprop=datePublished]").textContent
    }`;
  } else {
    presenceData.details = "Navegando no site";
    const [, url] = document.location.href.split("#"),
      [, text] = url.split("=");
    presenceData.state = `Página ${text}`;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }

  presence.setActivity(presenceData);
});
