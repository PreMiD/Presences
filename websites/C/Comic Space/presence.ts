const presence = new Presence({
  clientId: "710514125675036763"
});

let paginaAtual: HTMLElement, ultimaPagina: HTMLElement;
const nomeObra: HTMLElement = document.querySelector(
    "body > main > div > div > div.col-sm-12 > div.manga-page > div.pst-block-head-manga > h2"
  ),
  categoriasObra: HTMLElement = document.querySelector(
    "body > main > div > div > div.col-sm-12 > div.manga-page > div.info-manga-esq > div:nth-child(1) > div.info-manga > dl > dt:nth-child(3)"
  ),
  noticiaTitulo: HTMLElement = document.querySelector(
    "body > main > div > div:nth-child(1) > div > h2"
  ),
  nomeObraLeitor: HTMLElement = document.querySelector(
    "#navbar-collapse-1 > ul > li:nth-child(1) > a"
  ),
  leitorCapitulo: HTMLElement = document.querySelector(
    "#chapter-list > ul > li.active > a"
  ),
  categoria1: HTMLElement = document.querySelector(
    "body > main > div > div > div.col-sm-12 > div.manga-page > div.info-manga-esq > div:nth-child(1) > div.info-manga > dl > dt:nth-child(4)"
  );
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path: string = document.location.pathname;

  presenceData.startTimestamp = Math.floor(Date.now() / 1000);

  if (path === "/") presenceData.details = "Início";
  else if (path === "/manga-list") {
    paginaAtual = document.querySelector(
      "body > main > div > div.row.row-branca > div > div > div.type-content > div.row > div > div.row > div > ul > li.active > span"
    );
    ultimaPagina = document.querySelector(
      "body > main > div > div.row.row-branca > div > div > div.type-content > div.row > div > div.row > div > ul > li:nth-child(6) > a"
    );
    presenceData.details = "Lista de Mangás";
    presenceData.state = `Página ${paginaAtual.innerText} de ${ultimaPagina.innerText}`;
  } else if (path === "/latest-release") {
    paginaAtual = document.querySelector(
      "body > main > div > div:nth-child(1) > div > div.row > div > ul > li.active > span"
    );
    ultimaPagina = document.querySelector(
      "body > main > div > div:nth-child(1) > div > div.row > div > ul > li:nth-child(12) > a"
    );
    presenceData.details = "Últimas Atualizações";
    presenceData.state = `Página ${paginaAtual.innerText} de ${ultimaPagina.innerText}`;
  } else if (path.includes("/manga/")) {
    document.location.pathname.split("/").length - 1 === 4
      ? ((presenceData.details = nomeObraLeitor.innerText.replace(
          "Manga",
          " "
        )),
        (presenceData.state = leitorCapitulo.innerText
          .slice(0, leitorCapitulo.innerText.search(":") + 1)
          .replace(":", ""))) //,
      : ((presenceData.details = nomeObra.innerText),
        categoria1.innerText.includes("Categoria")
          ? (presenceData.state = categoria1.innerText)
          : (presenceData.state = categoriasObra.innerText));
  } else if (path.includes("/news/")) {
    presenceData.details = "Nóticias";
    presenceData.state = noticiaTitulo.innerText;
  } else presenceData.details = "Navegando...";

  presence.setActivity(presenceData);
});
