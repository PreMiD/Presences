const presence = new Presence({
  clientId: "706574162331697163"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Na página inicial...";

    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "www.mixmods.com.br";
  } else if (document.location.pathname.match("/search/label")) {
    const [url] = document.location.href.split("/label/")[1].split("?&max");
    presenceData.details = "Visualizando categoria:";
    presenceData.state = decodeURI(url.split("?&max")[0]);
  } else if (document.location.pathname.startsWith("/p")) {
    switch (document.location.pathname) {
      case "/p/about.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Sobre Nós";

        break;
      case "/p/lista-de-crash-e-solucoes.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Lista de Crash";

        break;
      case "/p/recomendados.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Recomendados";

        break;
      case "/p/disclaimer.html":
        presenceData.details = "Visualizando:";
        presenceData.state = "Disclaimer";

        break;
    }
  } else if (document.getElementsByClassName("label-info breadcrumbs")[0]) {
    presenceData.details = "Visualizando um post:";
    presenceData.state = document.getElementsByClassName(
      "post-title entry-title"
    )[0].textContent;

    presenceData.smallImageKey = "user";
    presenceData.smallImageText = `Postado por Junior_Djjr em ${
      document.querySelector("[itemprop=datePublished]").textContent
    }`;
  } else {
    presenceData.details = "Navegando no site";
    const [, url] = document.location.href.split("#");
    presenceData.state = `Página ${url.split("=")[1]}`;
  }

  presence.setActivity(presenceData);
});
