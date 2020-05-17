const presence = new Presence({
  clientId: "704184471104126976"
});
var getTimestamps = function (
  videoTime: number,
  videoDuration: number
): number[] {
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(startTime - videoTime + videoDuration);
  return [startTime, endTime];
};
var getCustomVideoTime = function (video: any, number: number): string {
  const date = [
    new Date(Math.floor(video.currentTime * 1000)),
    new Date(Math.floor(video.duration * 1000))
  ];
  let videoData =
    date[number].getUTCHours() == 0
      ? ""
      : `0${date[number].getUTCHours()}`.substr(-2) + ":";
  videoData +=
    `0${date[number].getUTCMinutes()}`.substr(-2) +
    ":" +
    `0${date[number].getUTCSeconds()}`.substr(-2);
  return videoData;
};
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  var presenceData: presenceData = {
    largeImageKey: "dalogo",
    startTimestamp: browsingStamp
  };

  var pathName = document.location.pathname;
  if (pathName == "/" || pathName == "/inicio") presenceData.details = "Início";
  else if (pathName.startsWith("/online")) {
    const video = document.querySelector("video");
    const audio = document
      .querySelector("h1.baseline")
      .textContent.split(" ")
      .slice(-1)[0];
    let player = "";
    const title = document.querySelector("a#anime_name").textContent;
    let type = document
      .querySelectorAll(".btn.blue")[1]
      .getAttribute("href")
      .split("/")
      .slice(-3)[0];
    let typeNumber = document
      .querySelectorAll(".btn.blue")[1]
      .getAttribute("href")
      .split("/")
      .slice(-2)[0];
    switch (type) {
      default:
        type = "Episódio ";
        break;
      case "ova":
        type = "OVA ";
        break;
      case "especial":
        type = "Especial ";
        break;
      case "filme":
        type = "Filme ";
        break;
    }
    if (video && !isNaN(video.duration)) {
      player = document.querySelector(".btn.blue.active").textContent;
      if (getCustomVideoTime(video, 0) != getCustomVideoTime(video, 1))
        typeNumber += ` - ${getCustomVideoTime(video, 0)}/${getCustomVideoTime(
          video,
          1
        )}`;
      else typeNumber += " - Finalizado";
      const timestamps = getTimestamps(video.currentTime, video.duration);
      if (!video.paused && video.readyState >= 1) {
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = `${audio} - ${player}`;
      } else if (!isNaN(video.duration)) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = `${audio} - ${player}`;
      }
    }
    presenceData.details = title;
    presenceData.state = `${type}${typeNumber}`;
  } else if (pathName.startsWith("/perfil")) {
    let rpdetails = "Olhando um Perfil:";
    let username = document.querySelector("h1>b>font").textContent;
    const avaliableList = function (b: number): string {
      var a = document
        .querySelectorAll("div.black>a")
        // eslint-disable-next-line no-unexpected-multiline
        [b].textContent.match(/(?<= ).*$/g)[0];
      return a;
    };
    const seguidores =
      avaliableList(1) != "Lista de Animes"
        ? avaliableList(4)
        : avaliableList(5);
    const seguindo =
      avaliableList(1) != "Lista de Animes"
        ? avaliableList(5)
        : avaliableList(6);
    if (pathName.endsWith(username.toLowerCase())) username += " - Publicações";
    else if (pathName.endsWith("/lista-de-animes")) {
      if (document.querySelector("#pcontent > div > a.active"))
        username +=
          " - Lista de Animes: " +
          document
            .querySelector("#pcontent > div > a.active")
            .textContent.match(/(?<= ).*$/g)[0];
    } else if (pathName.endsWith("/estatisticas"))
      username += " - Estatísticas";
    else if (pathName.endsWith("/resenhas")) username += " - Resenhas";
    else if (pathName.endsWith("/personagens-favoritos"))
      username += " - Personagens Favoritos";
    else if (pathName.endsWith("/seguidores")) username += ` - ${seguidores}`;
    else if (pathName.endsWith("/seguindo")) username += ` - ${seguindo}`;
    else if (
      pathName.endsWith("/editar") &&
      username ==
        document.querySelector("li>a>img").getAttribute("data-usuario")
    )
      rpdetails = "Editando Perfil";
    presenceData.details = rpdetails;
    presenceData.state = username;
  } else if (pathName.startsWith("/lista-completa")) {
    const query = document.querySelectorAll("ul.pagination > li > a");
    let Paginator = "";
    let PaginatorCurrent = "";
    let PaginatorMax = "";
    if (query.length <= 0) Paginator = "Página 1/1";
    else {
      PaginatorCurrent = document.getElementsByClassName("tpl-parse btn red")[0]
        .textContent;
      PaginatorMax = query[query.length - 1]
        .getAttribute("data-url")
        .match(/(?<=\/lista-completa\/).*(?=\?)/g)[0];
      Paginator = `Página ${PaginatorCurrent}/${PaginatorMax}`;
    }
    presenceData.details = "Lista Completa de Animes";
    presenceData.state = Paginator;
  } else if (pathName.startsWith("/lancamentos")) {
    let tipoDeLista;
    pathName.includes("calendario")
      ? (tipoDeLista = "Modo Calendário")
      : (tipoDeLista = "Lista lado a lado");
    presenceData.details = "Lançamentos";
    presenceData.state = tipoDeLista;
  } else if (pathName.startsWith("/temporadas")) {
    const args = window.location.search;
    let ano = ` - ${new Date().getFullYear()}`;
    let temporada = "";
    if (args.indexOf("&") != -1) {
      ano = args.match(/(?<=ano=).*$/g)[0];
      if (ano.length > 4) ano = "";
      else ano = ` - ${ano}`;
    }
    presenceData.details = "Temporadas";
    if (args != "") {
      if (args.includes("temporada")) {
        temporada = decodeURI(
          args.slice(1).split("&")[0].split("=")[1].replace("verao", "Verão")
        );
        temporada = temporada.charAt(0).toUpperCase() + temporada.slice(1);
      } else ano = ano.replace(" - ", "");
      presenceData.state = temporada + ano;
    }
  } else if (pathName.startsWith("/rankings")) {
    presenceData.details = "Rankings";
  } else if (pathName.startsWith("/forum")) {
    const qtopicTag = document.getElementById("fTag");
    const qtopicTitle = document.getElementById("fTitulo");
    let topicTag;
    let topicTitle;
    if (pathName.endsWith("novo-topico")) {
      const user = document
        .querySelector("li>a>img")
        .getAttribute("data-usuario");
      presenceData.details = "Fórum - " + qtopicTag.innerText;
      presenceData.state = `${user}: ${qtopicTitle.innerText}`;
      presenceData.smallImageKey = "writing";
    } else {
      let section = "";
      let author = "";
      if (!qtopicTag && !qtopicTitle) {
        const q = document.querySelector("header>h1>b");
        let child = q.firstChild;
        while (child) {
          if (child.nodeType === 3) section += child.nodeValue;
          child = child.nextSibling;
        }
        section = ` - ${section.replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")}`;
        topicTag = "";
        topicTitle = "";
      } else {
        topicTag = ` - ${qtopicTag.innerText}`;
        topicTitle = qtopicTitle.innerText;
        author = `${document
          .getElementsByClassName("t-center truncate")[0]
          .getAttribute("title")}: `;
      }
      presenceData.details = `Fórum${topicTag}${section}`;
      if (topicTitle != "") presenceData.state = `${author}${topicTitle}`;

      if (qtopicTag && qtopicTitle) {
        const date = document.querySelector("div.p1.black.col-12");
        const postID = pathName.split("/")[2];
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = `(${postID}) ${
          date.textContent.split("\n")[0]
        }`;
      }
    }
  } else if (pathName.startsWith("/equipe-membros")) {
    presenceData.details = "Equipe";
  } else if (pathName.startsWith("/conquistas")) {
    presenceData.details = "Lista de Conquistas";
  } else if (pathName.startsWith("/postagem")) {
    const validPost = document.querySelector("#main>div>div.col-12.user-posts");
    if (
      validPost &&
      validPost.getAttribute("data-id") == pathName.split("/").slice(-1)[0]
    ) {
      presenceData.details = "Lendo Publicação";
      const user = document.querySelector(
        "#content>#main>div>div>div.topline>a"
      ).textContent;
      const dateTime = document.querySelector(
        "#content>#main>div>div>div.topline>small>time"
      ).textContent;
      presenceData.state = `${user} - ${dateTime}`;
      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = `Post ID: ${validPost.getAttribute(
        "data-id"
      )}`;
    }
  } else if (pathName.startsWith("/anime-info")) {
    const sinfoName = pathName.split("/");
    let infoName;
    const animeName = document.querySelector("h3.truncate").textContent;
    const altNames = document.querySelector("div>div>div>div>p>b").textContent;
    switch (sinfoName[sinfoName.length - 1]) {
      default:
        infoName = "Visão Geral";
        break;
      case "legendados":
        infoName = document.querySelectorAll("div>a.p1")[1].textContent;
        break;
      case "dublados":
        infoName = document.querySelectorAll("div>a.p1")[2].textContent;
        break;
      case "filmes":
        infoName = document.querySelectorAll("div>a.p1")[3].textContent;
        break;
      case "especiais":
        infoName = document.querySelectorAll("div>a.p1")[4].textContent;
        break;
      case "resenhas":
        infoName = document.querySelectorAll("div>a.p1")[5].textContent;
        break;
      case "personagens":
        infoName = document.querySelectorAll("div>a.p1")[6].textContent;
        break;
      case "relacionados":
        infoName = document.querySelectorAll("div>a.p1")[7].textContent;
        break;
    }
    if (
      pathName.split("/").slice(-2)[0] == "resenhas" &&
      document.querySelector("#pcontent>div.col-12>div.col-12")
    )
      infoName = `Resenha ID: ${pathName.split("/").slice(-1)[0]}`;
    presenceData.details = "Olhando Info do Anime:";
    presenceData.state = `${animeName} (${altNames})`;
    presenceData.smallImageKey = "search";
    const votado = document
      .querySelectorAll("#pcontent>div>div>span")[0]
      .textContent.split(" ")[1];
    const popular = document
      .querySelectorAll("#pcontent>div>div>span")[1]
      .textContent.split(" ")[1];
    presenceData.smallImageText = `${infoName} | Rank: ${votado}/${popular}`;
  } else if (pathName.startsWith("/historico")) {
    let sectionList = "";
    if (document.querySelector("div > div > a.active"))
      sectionList = ` - ${
        document
          .querySelector("div > div > a.active")
          .textContent.match(/(?<= ).*$/g)[0]
      }`;
    presenceData.details = "Histórico" + sectionList;
  } else if (pathName.startsWith("/assistir-mais-tarde"))
    presenceData.details = "Assistir Mais Tarde";
  else if (pathName.startsWith("/feed")) presenceData.details = "Feed";
  else if (pathName.startsWith("/loja")) presenceData.details = "Loja";
  else if (pathName.startsWith("/horas-assistidas"))
    presenceData.details = "Gráfico de Horas Assistindo";
  else if (pathName.startsWith("/caixa-da-sorte"))
    presenceData.details = "Caixas da Sorte";
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
