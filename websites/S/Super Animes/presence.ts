const presence = new Presence({
  clientId: "718017316511678474"
});

function getTimestamps(videoTime, videoDuration): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let currentTime, duration, paused, played, timestamps;

presence.on("iFrameData", (data) => {
  currentTime = data.currentTime;
  duration = data.duration;
  paused = data.paused;
  played = data.played;
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };
  const tempo = Math.floor(Date.now() / 1000),
    path = document.location.pathname,
    titulo = document.title,
    comentario: HTMLElement = document.querySelector(
      "#corpo > div.conteudoBox.commentBoxAncora > div.commentMain > div.js_comment_view_box"
    ),
    nome: HTMLElement = document.querySelector("div.boxBarraInfo > h1"),
    infoDiv: HTMLElement = document.querySelector(
      "#menuH > div.js_viewCliente"
    ),
    infoDivTitulo: HTMLElement = document.querySelector(
      "#menuH > div.js_viewCliente > div > p"
    ),
    barraPesquisa: HTMLInputElement = document.querySelector(
      "#corpo > div.conteudoBox > div:nth-child(2) > div > input"
    ),
    paginacao: HTMLSelectElement = document.querySelector(
      "#corpo > div.paginacao > div:nth-child(2) > select"
    ),
    generosObra: HTMLElement = document.querySelector(
      "#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > li:nth-child(1) > span"
    ),
    lancamentosCategorizar: HTMLElement = document.querySelector(
      "#corpo > div:nth-child(2) > div.test > div > a.buttonLink.active"
    ),
    topCategorizar: HTMLElement = document.querySelector(
      "#corpo > div.conteudoBox > div:nth-child(5) > a.buttonLink.active"
    ),
    selectHunter: HTMLSelectElement = document.querySelector(
      "#corpo > div:nth-child(1) > div.box_content > div > select"
    ),
    indicacaoTipo: HTMLSelectElement =
      document.querySelector("#conteudoSelect"),
    indicacaoGenero: HTMLSelectElement =
      document.querySelector("#generoSelect"),
    nomePerfil: HTMLElement = document.querySelector(
      "#corpo > header > div.perfil_header_photos > div.perfil_box_photo > h1"
    ),
    descricaoPerfil: HTMLElement = document.querySelector(
      "#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull"
    ),
    nomeidentificadorPerfilAmigos: HTMLElement = document.querySelector(
      "#corpo > div.conteudoBoxHome > h2"
    ),
    nomeidentificadorPerfil: HTMLElement = document.querySelector(
      "#corpo > div.conteudoBox > h1"
    );

  if (path == "/") {
    presenceData.details = "Na página inicial";
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/busca")) {
    presenceData.details = "Página de Busca";
    if (barraPesquisa.value.length > 1) {
      presenceData.state = "Pesquisando: " + barraPesquisa.value;
    }
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/genero")) {
    if (titulo != "Lista de Gêneros") {
      presenceData.details =
        "Gênero: " + titulo.slice(titulo.search("Genero") + 6);
      presenceData.state =
        "Página " +
        paginacao.value +
        " de " +
        paginacao.lastElementChild.textContent.slice(
          paginacao.lastElementChild.textContent.search("Página") + 6
        );
    } else {
      presenceData.details = "Página de Gêneros";
      presenceData.state = "Escolhendo um gênero";
    }
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/lista")) {
    presenceData.details = "Lista de conteúdo";
    presenceData.state =
      "Página " +
      paginacao.value +
      " de " +
      paginacao.lastElementChild.textContent.slice(
        paginacao.lastElementChild.textContent.search("Página") + 6
      );
    presenceData.startTimestamp = tempo;
  } else if (
    path.includes("/anime") ||
    path.includes("/cartoon") ||
    path.includes("/tokusatsu") ||
    path.includes("/donghua") ||
    path.includes("live-action") ||
    path.includes("ova")
  ) {
    if (nome.textContent.includes("- Super Animes")) {
      presenceData.details = titulo.slice(0, titulo.search("- Super Animes"));
      presenceData.state =
        "Página " +
        paginacao.value +
        " de " +
        paginacao.lastElementChild.textContent.slice(
          paginacao.lastElementChild.textContent.search("Página") + 6
        );
      presenceData.startTimestamp = tempo;
    } else {
      if (path.split("/").length - 1 == 3) {
        if (nome.textContent.includes("Episódio")) {
          presenceData.details = nome.textContent.slice(
            0,
            nome.textContent.search("Episódio")
          );
          presenceData.state = nome.textContent.slice(
            nome.textContent.search("Episódio")
          );
        }
        if (nome.textContent.includes("filme")) {
          presenceData.details = nome.textContent.slice(
            0,
            nome.textContent.search("filme")
          );
          presenceData.state =
            "F" +
            nome.textContent.slice(nome.textContent.search("filme")).slice(1);
        }
        if (nome.textContent.includes("ova")) {
          presenceData.details = nome.textContent.slice(
            0,
            nome.textContent.search("ova")
          );
          presenceData.state =
            "O" +
            nome.textContent.slice(nome.textContent.search("ova")).slice(1);
        }
        if (played) {
          !paused
            ? ((timestamps = getTimestamps(
                Math.floor(currentTime),
                Math.floor(duration)
              )),
              (presenceData.startTimestamp = timestamps[0]),
              (presenceData.endTimestamp = timestamps[1]),
              (presenceData.smallImageKey = "assistindo"),
              (presenceData.smallImageText = "Assistindo"))
            : ((presenceData.smallImageKey = "pausado"),
              (presenceData.smallImageText = "Pausado"));
        }
      } else if (path.split("/").length - 1 == 2) {
        presenceData.details = nome.textContent;
        generosObra.innerText != "Desconhecido"
          ? (presenceData.state =
              "Gêneros: " +
              generosObra.textContent
                .split(" ")
                .join(", ")
                .slice(1)
                .slice(0, -2))
          : (presenceData.state = "Gênero: Desconhecido");
        presenceData.startTimestamp = tempo;
      }
    }
  } else if (path.includes("/hangman")) {
    presenceData.details = "Jogo da Forca";
    presenceData.startTimestamp = tempo;
    if (titulo != "Jogo da Forca - Super Animes") {
      presenceData.details = "Jogando Jogo da Forca";
      presenceData.state = "Sala: " + nome.textContent.slice(14);
    } else if (titulo == "Jogo da Forca - Super Animes") {
      presenceData.state = "Escolhendo uma partida...";
    }
  } else if (path.includes("/perfil")) {
    presenceData.details = "Perfil: " + nomePerfil.innerText;
    if (
      nome != null &&
      nome.textContent.includes("Lista de Todos os Marcados")
    ) {
      presenceData.state = "Conteúdos marcados";
    } else if (document.URL.includes("/perfil?editar=true")) {
      presenceData.state = "Editando o perfil";
    } else if (document.URL.includes("?more-itens=true")) {
      presenceData.state = "Mais links";
    } else if (path.includes("/mensagem")) {
      presenceData.state = "Lista de mensagens";
    } else if (descricaoPerfil != null) {
      presenceData.state = descricaoPerfil.innerText
        .replace("❞", "")
        .replace("❝", "");
    } else if (nome != null && nome.textContent.includes("Lista de Favorito")) {
      presenceData.state = "Lista de favoritos";
    } else if (
      nome != null &&
      nome.textContent.includes("Lista de Ver Depois")
    ) {
      presenceData.state = "Lista de assistir depois";
    } else if (
      nome != null &&
      nome.textContent.includes("Lista de Arquivado / Abandonado")
    ) {
      presenceData.state = "Lista de dropados";
    } else if (
      nome != null &&
      nome.textContent.includes("Lista de Notificados")
    ) {
      presenceData.state = "Lista de notificados";
    } else if (nome != null && nome.textContent.includes("Lista de Seguindo")) {
      presenceData.state = "Lista de seguidos";
    } else if (nome != null && nome.textContent.includes("Lista de Em Pausa")) {
      presenceData.state = "Lista de pausados";
    } else if (nome != null && nome.textContent.includes("Lista de Já Visto")) {
      presenceData.state = "Lista de já vistos";
    } else if (
      nomeidentificadorPerfil != null &&
      nomeidentificadorPerfil.textContent.includes("Lista de Galerias")
    ) {
      presenceData.state = "Galeria";
    } else if (
      nomeidentificadorPerfil != null &&
      nomeidentificadorPerfil.textContent.includes("Lista de Imagens")
    ) {
      presenceData.state = "Imagens";
    } else if (
      nomeidentificadorPerfilAmigos != null &&
      nomeidentificadorPerfilAmigos.textContent.includes("Lista de Amigos")
    ) {
      presenceData.state = "Amigos";
    }
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/lancamento")) {
    presenceData.details = "Página de Lançamentos";
    presenceData.state = lancamentosCategorizar.textContent;
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/top-user")) {
    presenceData.details = "Top Usuários";
    presenceData.state =
      "Em " +
      topCategorizar.textContent.slice(
        topCategorizar.textContent.search("Top") + 4
      );
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/top")) {
    presenceData.details = "Top Conteúdo";
    presenceData.state =
      "Do(a) " +
      topCategorizar.textContent.slice(
        topCategorizar.textContent.search("Top 100-") + 10
      );
    presenceData.startTimestamp = tempo;
  } else if (path.includes("/hunter")) {
    presenceData.details = "Página do Hunter";
    presenceData.state = selectHunter.value;
    presenceData.startTimestamp = tempo;
  } else if (path == "/indicacao") {
    presenceData.details = "Indicação de Conteúdo";
    if (indicacaoGenero.value == "" && indicacaoTipo.value == "") {
      presenceData.state = "Selecionando";
    }
    if (indicacaoTipo.value != "") {
      if (indicacaoGenero.value != "") {
        presenceData.state =
          indicacaoTipo[indicacaoTipo.selectedIndex].innerText +
          " |" +
          indicacaoGenero[indicacaoGenero.selectedIndex].innerText;
      } else {
        presenceData.state =
          indicacaoTipo[indicacaoTipo.selectedIndex].innerText;
      }
    } else if (indicacaoGenero.value != "") {
      if (indicacaoTipo.value != "") {
        presenceData.state =
          indicacaoTipo[indicacaoTipo.selectedIndex].innerText +
          " |" +
          indicacaoGenero[indicacaoGenero.selectedIndex].innerText;
      } else {
        presenceData.state =
          indicacaoGenero[indicacaoGenero.selectedIndex].innerText;
      }
    }
    presenceData.startTimestamp = tempo;
  } else if (path == "/chat") {
    presenceData.details = "Página do Chat";
    presenceData.state = "Conversando";
    presenceData.startTimestamp = tempo;
  } else if (path == "/contato") {
    presenceData.details = "Página de contato";
    presenceData.startTimestamp = tempo;
  } else if (path == "/tutorial") {
    presenceData.details = "Página de Tutorial";
    presenceData.state = "Aprendendo com o tutorial...";
    presenceData.startTimestamp = tempo;
  } else if (path == "/mobile") {
    presenceData.details = "Página Mobile";
    presenceData.state = nome.textContent;
    presenceData.startTimestamp = tempo;
  } else if (path == "/faq") {
    presenceData.details = "Página do FAQ";
    presenceData.state = "Página de perguntas frequentes.";
    presenceData.startTimestamp = tempo;
  } else if (path == "/sugestao") {
    presenceData.details = "Pagina de sugestões";
    presenceData.startTimestamp = tempo;
  } else if (path == "/discussao") {
    presenceData.details = "Página de discussão de ideias";
    presenceData.startTimestamp = tempo;
  } else if (path == "/pedidos") {
    presenceData.details = "Página de pedidos";
    presenceData.startTimestamp = tempo;
  } else if (path == "/enquete") {
    presenceData.details = "Página de enquete";
    presenceData.startTimestamp = tempo;
  } else if (path == "/equipe") {
    presenceData.details = "Página da equipe";
    presenceData.state = "Vendo os membros da equipe";
    presenceData.startTimestamp = tempo;
  } else if (path == "/suporte") {
    presenceData.details = "Página de Suporte";
    presenceData.startTimestamp = tempo;
  } else if (path == "/regras") {
    presenceData.details = "Página de regras";
    presenceData.state = "Lendo as regras";
    presenceData.startTimestamp = tempo;
  } else if (path == "/recrutamento") {
    presenceData.details = "Página de recrutamento";
    presenceData.state = "Lendo sobre o recrutamento";
    presenceData.startTimestamp = tempo;
  }

  if (comentario != null) {
    presenceData.state = "Lendo os comentários";
  }

  if (presenceData.details == null) {
    presenceData.details = "Navegando...";
    presenceData.startTimestamp = tempo;
  }

  if (infoDiv != null && infoDiv.style.display != "none") {
    if (infoDivTitulo != null) {
      if (
        infoDivTitulo.textContent.includes(
          "Você precisa esta logado para visualizar suas Notificações!"
        ) ||
        infoDivTitulo.textContent.includes(
          "Você precisa esta logado para visualizar suas Notificações!"
        ) ||
        infoDivTitulo.textContent.includes(
          "Você precisa esta logado para visualizar a lista de Próximos Vídeos a serem Assistidos!"
        ) ||
        infoDivTitulo.textContent.includes(
          "Você precisa esta logado para visualizar a lista de Próximos Vídeos a serem Assistidos!"
        )
      ) {
        delete presenceData.state;
      } else {
        if (
          infoDivTitulo.textContent.includes(
            "Conteúdo(s) marcado(s) como Favorito."
          )
        ) {
          presenceData.state = "Em menu de favoritos";
        } else if (
          infoDivTitulo.textContent.includes("Você tem") &&
          infoDivTitulo.textContent.includes("notificações!")
        ) {
          presenceData.state = "Em menu de notificações";
        } else if (
          infoDivTitulo.textContent.includes(
            "Perfil/Perfis com conteúdos a serem visto"
          )
        ) {
          presenceData.state = "Em menu de conteúdos a serem visto";
        } else if (
          infoDivTitulo.textContent.includes(
            "Conteúdo(s) marcado(s) como Já Visto."
          )
        ) {
          presenceData.state = "Em menu de conteúdos já vistos";
        } else if (
          infoDivTitulo.textContent.includes(
            "Conteúdo(s) marcado(s) como Seguindo."
          )
        ) {
          presenceData.state = "Em menu de conteúdos sendo acompanhados";
        } else if (
          infoDivTitulo.textContent.includes(
            "Conteúdo(s) marcado(s) como Ver Depois."
          )
        ) {
          presenceData.state = "Em menu de assistir depois";
        } else if (
          infoDivTitulo.textContent.includes(
            "Conteúdo(s) marcado(s) como Pausado."
          )
        ) {
          presenceData.state = "Em menu de pausados";
        } else if (
          infoDivTitulo.textContent.includes(
            "Conteúdo(s) marcado(s) como Dropado/Arquivado."
          )
        ) {
          presenceData.state = "Em menu de conteúdos dropados";
        } else if (
          infoDivTitulo.textContent.includes("um conteúdo no histórico")
        ) {
          presenceData.state = "Em menu do histórico";
        } else if (
          infoDivTitulo.textContent.includes("no histórico de Download")
        ) {
          presenceData.state = "Em menu de baixados";
        }
      }
    }
  }
  presence.setActivity(presenceData);
});
