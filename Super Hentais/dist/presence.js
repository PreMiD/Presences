var presence = new Presence({
    clientId: "676484776403795968"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "shentais"
    };
    if (document.location.pathname == "/") {
        (data.details = "Página principal"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/ultimos-adicionados")) {
        (data.details = "Checando Lançamentos"),
            (data.state =
                "Classificada por" +
                    ": " +
                    document.querySelector(".buttonLink.active").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/busca")) {
        var inputp5 = document.querySelector(".search input").value;
        (data.details = "Página de Busca"),
            (data.state = "Buscando por: " + inputp5);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/genero")) {
        data.details = "Pesquisando por Gêneros";
        if (document.querySelector(".list-item.active") === null) {
            data.state = "Escolhendo um Gênero.";
            presence.setActivity(data);
        }
        else {
            data.state = document.querySelector(".list-item.active").innerText;
            presence.setActivity(data);
        }
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/sugestao")) {
        (data.details = "Página de Sugestões e Críticas"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/suporte")) {
        (data.details = "Página de Suporte"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/lista")) {
        (data.details = "Lista de hentais e conteúdos eróticos"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/contato")) {
        (data.details = "Página de contato Super Hentais"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/chat")) {
        (data.details = "Chat Super Hentais"),
            (data.state = "Conversando & observando!");
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/image")) {
        var name = document.querySelector("div.box_content > a.buttonLink.active")
            .textContent;
        if (document.querySelector("div.menu_filter_box2.box_content > ul > p > a.buttonLink.active") === null) {
            data.details = name;
            data.state = document.querySelector(".boxBarraInfo h1").innerText;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            (data.details = name),
                (data.state =
                    "Tipo de imagens" +
                        ": " +
                        document
                            .querySelector("div.menu_filter_box2.box_content > ul > p > a.buttonLink.active")
                            .innerText.replace("Imagens", ""));
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/hentai")) {
        (data.details = "Lista de conteúdos"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/sem-censura")) {
        (data.details = "Lista de conteúdos e Hentais sem censura"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/parody-hentai-anime")) {
        (data.details = "Parody Hentai em Vídeo, seu anime cada vez melhor"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/cartoon-ero")) {
        (data.details = "Lista de Cartoons Eróticos"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/parody-cartoon-ero")) {
        (data.details = "Parody Cartoon em Vídeo, seu cartoon cada vez melhor"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/hq-ero")) {
        (data.details = "Lista de HQ e Gibi Erótico, Desenhos Porno"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/parody-hentai-manga")) {
        (data.details = "Lista de Parodia Manga"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/parody-hq-ero")) {
        (data.details = "Lista de Parodia HQ e Gibi erótico"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/doujinshi")) {
        (data.details = "Lista de Doujinshi"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/lancamento")) {
        (data.details = "Página de conteúdos em lançamento!"),
            (data.state =
                "Dia de lançamentos" +
                    ": " +
                    document.querySelector(".buttonLink.active").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/top")) {
        (data.details = "Top 100 Conteúdo do dia"),
            (data.state =
                "Classificada por" +
                    ": " +
                    document
                        .querySelector(".buttonLink.active")
                        .innerText.replace("Top 100 -", ""));
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/top-user")) {
        (data.details = "Top User Rank de Moedas"),
            (data.state =
                "Classificada por" +
                    ": " +
                    document
                        .querySelector(".buttonLink.active")
                        .innerText.replace("Top", ""));
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/hunter")) {
        (data.details = "Página do Hunter"),
            (data.state =
                "Checando: " +
                    document.querySelector("#corpo > div:nth-child(1) > div.box_content > div > select > option:nth-child(1)").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/indicacao")) {
        (data.details = "Indicação de Conteúdo!"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/pedidos")) {
        (data.details = "Página de pedidos"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/equipe")) {
        (data.details = "Página da Equipe Super Hentais"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/tutorial")) {
        (data.details = "Página de Tutorial de Funções do site!"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/termos-de-uso.php")) {
        (data.details = "Termos de uso!"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/assistir-hentai-online")) {
        var titulo = document.querySelector(".boxBarraInfo h1").textContent;
        var selecionada = document.querySelector(".buttonLink.active").textContent;
        (data.details = titulo), (data.state = "Classificada por: " + selecionada);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/hentai-anime")) {
        var name = document.querySelector(".boxBarraInfo h1").textContent;
        if (document.querySelector("#corpo > div > div.conteudoBox.js_videoBox > div.boxSubTitulo > h2") === null) {
            (data.details = "Visualizando Hentai - Anime"), (data.state = name);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            (data.details = name),
                (data.state = document.querySelector("#corpo > div > div:nth-child(5) > div.videoSidebar > div.boxMenuEps > div:nth-child(1) > div.epsBoxSobre > a").innerText);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/hentai-manga")) {
        var name = document.querySelector(".boxBarraInfo h1").textContent;
        if (document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null) {
            (data.details = "Visualizando Hentai - Manga"), (data.state = name);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            (data.details = name),
                (data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/hq-ero")) {
        var name = document.querySelector(".boxBarraInfo h1").textContent;
        if (document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null) {
            (data.details = "Visualizando HQ - Ero"), (data.state = name);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            (data.details = name),
                (data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/parody-hq-ero")) {
        var name = document.querySelector(".boxBarraInfo h1").textContent;
        if (document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null) {
            (data.details = "Visualizando Parodia HQ - Ero"), (data.state = name);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            (data.details = name),
                (data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/doujinshi")) {
        var name = document.querySelector(".boxBarraInfo h1").textContent;
        if (document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2") === null) {
            (data.details = "Visualizando Doujinshi - Ero"), (data.state = name);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            (data.details = name),
                (data.state = document.querySelector("#corpo > div.conteudoBox.box_suport > div.boxSubTitulo > h2").innerText);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/perfil")) {
        data.details =
            "Meu perfil: " +
                document.querySelector("#corpo > header > div.perfil_header_photos > div.perfil_box_photo > h1").innerText;
        if (document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull") === null) {
            data.state = "Sem descrição ou Editando perfil.";
            presence.setActivity(data);
        }
        else {
            data.state = document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull").innerText;
            presence.setActivity(data);
        }
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/enviar-imagem")) {
        (data.details = "Enviar imagens & Minhas imagens"),
            (data.state = document.querySelector("#corpo > div > div.boxBarraInfo > h1").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/minhas-galerias")) {
        (data.details = "Minha Lista de Galerias"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/mensagem")) {
        data.details = "Minhas mensagens";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/amigos")) {
        (data.details = "Lista de amigos"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsVUFBVTtLQUN6QixDQUFDO0lBSUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDdEMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ3pFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUN0QyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNWLGtCQUFrQjtvQkFDbEIsSUFBSTtvQkFDSixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFB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