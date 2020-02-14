var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var presence = new Presence({
    clientId: "676484776403795968",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data = {
        largeImageKey: "shentais"
    };

	// ------------------------------ Páginas do Site ------------------------------ //

    if (document.location.pathname == ("/")) {
        data.details = "Página principal",
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
	else if (document.location.pathname.startsWith("/ultimos-adicionados")) {
		data.details = "Checando Lançamentos",
		data.state = "Classificada por" + ": " + document.querySelector(".buttonLink.active").innerText;
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/busca")) {
		var inputp5 = document.querySelector(".search input").value;
            data.details = "Página de Busca",
            data.state = "Buscando por: " +  inputp5;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/genero")) {
       data.details = "Pesquisando por Gêneros";
        if(document.querySelector(".list-item.active") === null){
            data.state = "Escolhendo um Gênero."
            presence.setActivity(data);
        } else {
            data.state = document.querySelector(".list-item.active").innerText;
            presence.setActivity(data);
        }
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/sugestao")) {
        data.details = "Página de Sugestões e Críticas",
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
	else if (document.location.pathname.startsWith("/suporte")) {
		data.details = "Página de Suporte",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/lista")) {
		data.details = "Lista de hentais e conteúdos eróticos",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/contato")) {
		data.details = "Página de contato Super Hentais",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/chat")) {
		data.details = "Chat Super Hentais",
		data.state = "Conversando & observando!";
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/image")) {
		if(document.querySelector("div.menu_filter_box2.box_content > ul > p > a.buttonLink.active") === null){
			if (document.querySelector("#corpo > div:nth-child(1) > div.boxBarraInfo > h1").textContent){
				data.details = "Visualizando Imagem";
				data.state = document.querySelector("#corpo > div:nth-child(1) > div.boxBarraInfo > h1").innerText;
				data.startTimestamp = browsingStamp;
				presence.setActivity(data);
				data.startTimestamp = browsingStamp;
				presence.setActivity(data);
			} else {
            	data.details = document.querySelector("div.box_content > a.buttonLink.active").textContent;
				data.state = document.querySelector(".boxBarraInfo h1").innerText;
				data.startTimestamp = browsingStamp;
				presence.setActivity(data);
			}
        } else {
			data.details = document.querySelector("div.box_content > a.buttonLink.active").textContent,
            data.state = "Tipo de imagens" + ": " + document.querySelector("div.menu_filter_box2.box_content > ul > p > a.buttonLink.active").innerText.replace("Imagens", "");
			data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
	else if (document.location.pathname.endsWith("/hentai")) {
		data.details = "Lista de conteúdos",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/sem-censura")) {
		data.details = "Lista de conteúdos e Hentais sem censura",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/parody-hentai-anime")) {
		data.details = "Parody Hentai em Vídeo, seu anime cada vez melhor",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/cartoon-ero")) {
		data.details = "Lista de Cartoons Eróticos",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/parody-cartoon-ero")) {
		data.details = "Parody Cartoon em Vídeo, seu cartoon cada vez melhor",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/hq-ero")) {
		data.details = "Lista de HQ e Gibi Erótico, Desenhos Porno",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/parody-hentai-manga")) {
		data.details = "Lista de Parodia Manga",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/parody-hq-ero")) {
		data.details = "Lista de Parodia HQ e Gibi erótico",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/doujinshi")) {
		data.details = "Lista de Doujinshi",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/lancamento")) {
		data.details = "Página de conteúdos em lançamento!",
		data.state = "Dia de lançamentos" + ": " + document.querySelector(".buttonLink.active").innerText;
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/top")) {
		data.details = "Top 100 Conteúdo do dia",
		data.state = "Classificada por" + ": " + document.querySelector(".buttonLink.active").innerText.replace("Top 100 -", "");
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/top-user")) {
		data.details = "Top User Rank de Moedas",
		data.state = "Classificada por" + ": " + document.querySelector(".buttonLink.active").innerText.replace("Top", "");
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/hunter")) {
		data.details = "Página do Hunter",
		data.state = "Checando: " + document.querySelector("#corpo > div:nth-child(1) > div.box_content > div > select > option:nth-child(1)").innerText;
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/indicacao")) {
		data.details = "Indicação de Conteúdo!",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/pedidos")) {
		data.details = "Página de pedidos",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/equipe")) {
		data.details = "Página da Equipe Super Hentais",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/tutorial")) {
		data.details = "Página de Tutorial de Funções do site!",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/termos-de-uso.php")) {
		data.details = "Termos de uso!",
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/assistir-hentai-online")) {
		var titulo = document.querySelector(".boxBarraInfo h1").textContent;
		var selecionada = document.querySelector(".buttonLink.active").textContent;
			data.details = titulo,
			data.state = "Classificada por: " + selecionada;
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
	}

	// ------------------------------ Perfil de hentai anime ------------------------------ //

    else if (document.location.pathname.startsWith("/hentai-anime")) {
		var name = document.querySelector("#corpo > div > div:nth-child(5) > div.videoSidebar > div.capaCategory > div > h3 > a").innerText;
		if(document.querySelector("#corpo > div > div.conteudoBox.js_videoBox > div.boxSubTitulo > h2") === null){
			data.details = "Visualizando Hentai - Anime",
			data.state = name;
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
        } else {
			data.details = name,
            data.state = document.querySelector("#corpo > div > div:nth-child(5) > div.videoSidebar > div.boxMenuEps > div:nth-child(1) > div.epsBoxSobre > a").innerText;
			data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
	}

	// ------------------------------ Perfil de manga hentai ------------------------------ //

	/*else if (document.location.pathname.startsWith("/hentai-manga")) {
		var name = document.querySelector(".boxBarraInfo h1").textContent;
		if(document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null){
            data.details = "Visualizando Hentai - Manga",
            data.state = name;
			data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else {
			data.details = name,
            data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText;
			data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
	}*/
	else if (document.location.pathname.startsWith("/hentai-manga")) {
        if(document.title.includes("Capítulo", "")){
            var mangaPage = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox > div.capPageContent > div.capMenu.capMenuFixedTop > select.capListPage > option.capituloPage.active"),
            mangaName = document.querySelector("#corpo > div:nth-child(4) > div.videoSidebar > div.capaCategory > div > h3 > a"),
            mangaChapter = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxBarraInfo > h1"),
			a = mangaChapter.innerText.replace(mangaName.innerText, "")
			data.details = 'Lendo: ' + mangaName.innerText;
            data.startTimestamp = browsingStamp;
            data.state = a + " - " + mangaPage.textContent.replace("Pagina", "Página");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else {
            data.details = 'Visualizando Hentai - Manga';
            data.state = document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxBarraInfo > h1").innerText + " - " + document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > li:nth-child(5) > span").innerText + " Capítulos";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
		}
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }/*
	else if (document.location.pathname.startsWith("/hq-ero")) {
		var name = document.querySelector(".boxBarraInfo h1").textContent;
		if(document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null){
			data.details = "Visualizando HQ - Ero",
			data.state = name;
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
        } else {
			data.details = name,
			data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText;
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
        }
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}*/
	else if (document.location.pathname.startsWith("/hq-ero")) {
        if(document.title.includes("Capítulo", "")){
            var mangaPage = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox > div.capPageContent > div.capMenu.capMenuFixedTop > select.capListPage > option.capituloPage.active"),
            mangaName = document.querySelector("#corpo > div:nth-child(4) > div.videoSidebar > div.capaCategory > div > h3 > a"),
            mangaChapter = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxBarraInfo > h1"),
			a = mangaChapter.innerText.replace(mangaName.innerText, "")
			data.details = 'Lendo: ' + mangaName.innerText;
            data.startTimestamp = browsingStamp;
            data.state = a + " - " + mangaPage.textContent.replace("Pagina", "Página");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else {
            data.details = 'Visualizando HQ - Ero';
            data.state = document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxBarraInfo > h1").innerText + " - " + document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > li:nth-child(5) > span").innerText + " Capítulos";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
		}
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/manhwa-ero")) {
        if(document.title.includes("Capítulo", "")){
            var mangaPage = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox > div.capPageContent > div.capMenu.capMenuFixedTop > select.capListPage > option.capituloPage.active"),
            mangaName = document.querySelector("#corpo > div:nth-child(4) > div.videoSidebar > div.capaCategory > div > h3 > a"),
            mangaChapter = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxBarraInfo > h1"),
			a = mangaChapter.innerText.replace(mangaName.innerText, "")
			data.details = mangaName.innerText;
            data.startTimestamp = browsingStamp;
            data.state = a + " - " + mangaPage.textContent.replace("Pagina", "Página");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else {
            data.details = 'Visualizando Manhwa - Ero';
            data.state = document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxBarraInfo > h1").innerText + " - " + document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > li:nth-child(5) > span").innerText + " Capítulos";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
		}
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/parody-hq-ero")) {
		var name = document.querySelector(".boxBarraInfo h1").textContent;
		if(document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null){
		    data.details = "Visualizando Parodia HQ - Ero",
		    data.state = name;
		    data.startTimestamp = browsingStamp;
		    presence.setActivity(data);
        } else {
		    data.details = name,
		    data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText;
		    data.startTimestamp = browsingStamp;
		    presence.setActivity(data);
        }
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
  	}
    else if (document.location.pathname.startsWith("/doujinshi")) {
		var name = document.querySelector(".boxBarraInfo h1").textContent;
		if(document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null){
		    data.details = "Visualizando Doujinshi - Ero",
		    data.state = name;
		    data.startTimestamp = browsingStamp;
		    presence.setActivity(data);
        } else {
		    data.details = name,
		    data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText;
		    data.startTimestamp = browsingStamp;
		    presence.setActivity(data);
        }
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
  	}
	// ------------------------------ Perfil do Usuário ------------------------------ //

    else if (document.location.pathname.endsWith("/perfil")) {
		    data.details = "Meu perfil: " + document.querySelector("#corpo > header > div.perfil_header_photos > div.perfil_box_photo > h1").innerText;
		    if(document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull") === null){
		    data.state = "Sem descrição ou Editando perfil."
		    presence.setActivity(data);
        } else {
		    data.state = document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull").innerText;
		    presence.setActivity(data);
        }
		presence.setActivity(data);
  	}
	else if (document.location.pathname.startsWith("/enviar-imagem")) {
		    data.details = "Enviar imagens & Minhas imagens",
			data.state = document.querySelector("#corpo > div > div.boxBarraInfo > h1").innerText;
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
	}
	else if (document.location.pathname.startsWith("/minhas-galerias")) {
		    data.details = "Minha Lista de Galerias",
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/mensagem")) {
		    data.details = "Minhas mensagens";
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/amigos")) {
		    data.details = "Lista de amigos",
			data.startTimestamp = browsingStamp;
			presence.setActivity(data);
	};
});
