const presence = new Presence({
  clientId: "720373673717923880"
});

presence.on("UpdateData", async () => {
  const tempo = Math.floor(Date.now() / 1000);
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: tempo
  };
  const path = document.location.pathname;
  const titulo = document.title;
  const comentario: HTMLElement = document.querySelector(
    "#corpo > div.conteudoBox.commentBoxAncora > div.commentMain > div.js_comment_view_box"
  );
  const nome: HTMLElement = document.querySelector("div.boxBarraInfo > h1");
  const infoDiv: HTMLElement = document.querySelector(
    "body > div.js_viewCliente"
  );
  const infoDivTitulo: HTMLElement = document.querySelector(
    "body > div.js_viewCliente > div > p"
  );
  const paginaCapitulo: HTMLSelectElement = document.querySelector(
    "#corpo > div.conteudoBox.box_suport > div.capBox > div > div.capMenu.capMenuFixedTop > select.capListPage"
  );
  const barraPesquisa: HTMLInputElement = document.querySelector(
    "#corpo > div.conteudoBox > div:nth-child(2) > div > input"
  );
  const paginacao: HTMLSelectElement = document.querySelector(
    "#corpo > div.paginacao > div:nth-child(2) > select"
  );
  const lancamentosCategorizar: HTMLElement = document.querySelector(
    "#corpo > div:nth-child(2) > div.test > div > a.buttonLink.active"
  );
  const topCategorizar: HTMLElement = document.querySelector(
    "#corpo > div.conteudoBox > div:nth-child(5) > a.buttonLink.active"
  );
  const selectHunter: HTMLSelectElement = document.querySelector(
    "#corpo > div:nth-child(1) > div.box_content > div > select"
  );
  const indicacaoTipo: HTMLSelectElement =
    document.querySelector("#conteudoSelect");
  const indicacaoGenero: HTMLSelectElement =
    document.querySelector("#generoSelect");
  const nomePerfil: HTMLElement = document.querySelector(
    "#corpo > header > div.perfil_header_photos > div.perfil_box_photo > h1"
  );
  const descricaoPerfil: HTMLElement = document.querySelector(
    "#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull"
  );
  const nomeidentificadorPerfilAmigos: HTMLElement = document.querySelector(
    "#corpo > div.conteudoBoxHome > h2"
  );
  const nomeidentificadorPerfil: HTMLElement = document.querySelector(
    "#corpo > div.conteudoBox > h1"
  );
  const generosObra: HTMLElement = document.querySelector(
    "#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > li:nth-child(1) > span"
  );
  const formatoObra: HTMLElement = document.querySelector(
    "#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > li:nth-child(2)"
  );
  if (path == "/") {
    presenceData.details = "Na página inicial";
  } else if (path.includes("/busca")) {
    presenceData.details = "Página de Busca";
    if (barraPesquisa.value.length > 1) {
      presenceData.state = barraPesquisa.value;
    }
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
  } else if (path.includes("/lista")) {
    presenceData.details = "Lista de conteúdo";
    presenceData.state =
      "Página " +
      paginacao.value +
      " de " +
      paginacao.lastElementChild.textContent.slice(
        paginacao.lastElementChild.textContent.search("Página") + 6
      );
  } else if (
    path.includes("/manga") ||
    path.includes("/manhwa") ||
    path.includes("/manhua") ||
    path.includes("/light-novel")
  ) {
    if (
      titulo == "Manhua" ||
      titulo == "Manhwa" ||
      titulo == "Manga" ||
      titulo == "light-novel"
    ) {
      presenceData.details = titulo;
      presenceData.state =
        "Página " +
        paginacao.value +
        " de " +
        paginacao.lastElementChild.textContent.slice(
          paginacao.lastElementChild.textContent.search("Página") + 6
        );
    } else {
      if (path.split("/").length - 1 == 3) {
        if (nome.textContent.includes("Capitulo")) {
          presenceData.details = nome.textContent.slice(
            0,
            nome.textContent.search("Capitulo")
          );
          presenceData.state =
            nome.textContent
              .slice(nome.textContent.search("Capitulo"))
              .replace("Capitulo", "Capítulo") +
            " |" +
            paginaCapitulo[paginaCapitulo.selectedIndex].innerText
              .split("Pag")
              .join("") +
            " de " +
            paginaCapitulo.lastElementChild.textContent.split("Pag").join("");
        }
      } else if (path.split("/").length - 1 == 2) {
        presenceData.details =
          nome.innerText +
          " | " +
          formatoObra.childNodes[1].textContent.slice(1);
        presenceData.state =
          "Gêneros: " +
          generosObra.textContent.split(" ").join(", ").slice(1).slice(0, -2);
      }
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
      presenceData.state = "Lista de notificações";
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
  } else if (path.includes("/lancamento")) {
    presenceData.details = "Página de Lançamentos";
    presenceData.state = lancamentosCategorizar.textContent;
  } else if (path.includes("/top-user")) {
    presenceData.details = "TOP Usuários";
    presenceData.state =
      "Em " +
      topCategorizar.textContent.slice(
        topCategorizar.textContent.search("Top") + 4
      );
  } else if (path.includes("/top")) {
    presenceData.details = "TOP Conteúdo";
    presenceData.state =
      "No(a) " +
      topCategorizar.textContent.slice(
        topCategorizar.textContent.search("Top 100-") + 10
      );
  } else if (path.includes("/hunter")) {
    presenceData.details = "Página do Hunter";
    presenceData.state = selectHunter.value;
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
  } else if (path == "/chat") {
    presenceData.details = "Página do Chat";
    presenceData.state = "Conversando";
  } else if (path == "/contato") {
    presenceData.details = "Página de contato";
  } else if (path == "/tutorial") {
    presenceData.details = "Página de Tutorial";
    presenceData.state = "Aprendendo com o tutorial...";
  } else if (path == "/mobile") {
    presenceData.details = "Página Mobile";
    presenceData.state = nome.textContent;
  } else if (path == "/sugestao") {
    presenceData.details = "Pagina de sugestões";
  } else if (path == "/discussao") {
    presenceData.details = "Página de discussão de ideias";
  } else if (path == "/pedidos") {
    presenceData.details = "Página de pedidos";
  } else if (path == "/enquete") {
    presenceData.details = "Página de enquetes";
  } else if (path == "/equipe") {
    presenceData.details = "Página da equipe";
    presenceData.state = "Vendo os membros da equipe";
  } else if (path == "/suporte") {
    presenceData.details = "Página de Suporte";
  } else if (path == "/regras") {
    presenceData.details = "Página de regras";
    presenceData.state = "Lendo as regras";
  } else if (path == "/recrutamento") {
    presenceData.details = "Página de recrutamento";
    presenceData.state = "Lendo sobre o recrutamento";
  }

  if (comentario != null) {
    presenceData.state = "Lendo os comentários";
  }

  if (presenceData.details == null) {
    presenceData.details = "Navegando...";
  }

  if (infoDiv != null && infoDiv.style.display != "none") {
    if (infoDivTitulo != null) {
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
  presence.setActivity(presenceData);
});
