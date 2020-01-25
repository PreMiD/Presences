var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "650916071360167957"
});
let startedBrowsingTimestamp = Math.floor(Date.now() / 1000), path = document.location.pathname, host = document.location.hostname, mangaName, mangaPage, mangaChapter, presenceData = {
    largeImageKey: "smlg",
    startTimestamp: startedBrowsingTimestamp
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {

     presenceData: presenceData = {
        largeImageKey: "smlg"
    };


    if (host == "www.supermangas.site" && path == "/") {
        presenceData.details = 'Página Inicial';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/perfil")) {
        presenceData.details = "Perfil: " + document.querySelector("#corpo > header > div.perfil_header_photos > div.perfil_box_photo > h1").innerText
        if(document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull") === null){
            presenceData.state = "Perfil sem descrição."
            presence.setActivity(presenceData);
            delete presenceData.startTimestamp;
        } else {
            presenceData.state = document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull").innerText
            presence.setActivity(presenceData);
            delete presenceData.startTimestamp;
        }
        delete presenceData.startTimestamp;
        presence.setActivity(presenceData);
    }
    if (document.title.includes('Top Conteúdo')) {
        presenceData.details = 'Procurando Mangá';
        presenceData.state = document.querySelector("#corpo > div.conteudoBox > h1").innerText;
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/manga/") || path.startsWith("/manhwa/") && path.replace("/manga/", "") || path.startsWith("/manhua/") && path.replace("/manga/", "")) {
        if(document.title.includes("Capítulo", "")){
            mangaPage = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox > div.capPageContent > div.capMenu.capMenuFixedTop > select.capListPage > option.capituloPage.active")
            mangaName = document.querySelector("#corpo > div:nth-child(3) > div.videoSidebar > div.capaCategory > div > h3 > a")
            mangaChapter = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox.focus > div.capPageContent > div.capMenu.capMenuFixedTop.fixed > select.capList > option:nth-child(1)")
            presenceData.details = 'Lendo: ' + mangaName.innerText;
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presenceData.state = mangaChapter.innerText + " - " + mangaPage.textContent.replace("Pagina", "Página");
            presence.setActivity(presenceData);
        } else {
            presenceData.details = 'Visualizando Mangá';
            presenceData.state = document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxBarraInfo > h1").innerText + " - " + document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > div > li:nth-child(1) > span").innerText + " Capítulos";
            presenceData.smallImageText = "Visualizando";
            presenceData.smallImageKey = "visualizando";
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presence.setActivity(presenceData);
        }
    }
    else if (host == "www.supermangas.site" && path.startsWith("/arte")) {
        presenceData.details = "Mangás do Desenhista";
        presenceData.state = document.querySelector("#corpo > div.conteudoBox > div.boxBarraInfo").innerText.replace('Conteúdos do Desenhista', "");
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/contato")) {
        presenceData.details = 'Fale Conosco';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/suporte")) {
        presenceData.details = 'Página de Suporte';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/tutorial")) {
        presenceData.details = 'Página de Tutorial do Site';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/hunter")) {
        presenceData.details = 'Página do Hunter';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/sugestao")) {
        presenceData.details = 'Página de Sugestões e Criticas';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/sugestao")) {
        presenceData.details = 'Página de Sugestões e Criticas';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/indicacao")) {
        presenceData.details = 'Página de Indicações de Manga';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/termos-de-uso.php")) {
        presenceData.details = 'TOS - Termos de Uso';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/lista")) {
        presenceData.details = 'Procurando Mangá';
        presenceData.state = 'Lista de Mangás';
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/lancamento")) {
        presenceData.details = 'Procurando Mangá';
        if(document.URL.includes('seg')){
            presenceData.state = 'Lançamentos - Segunda';
        } else if(document.URL.includes('ter')){
            presenceData.state = 'Lançamentos - Terça';
        } else if(document.URL.includes('qua')){
            presenceData.state = 'Lançamentos - Quarta';
        } else if(document.URL.includes('qui')){
            presenceData.state = 'Lançamentos - Quinta';
        } else if(document.URL.includes('sex')){
            presenceData.state = 'Lançamentos - Sexta';
        } else if(document.URL.includes('sab')){
            presenceData.state = 'Lançamentos - Sábado';
        } else if(document.URL.includes('dom')){
            presenceData.state = 'Lançamentos - Domingo';
        } else if(document.URL.includes('todos')){
            presenceData.state = 'Lançamentos';
        } else {
            presenceData.state = 'Lançamentos';
        }
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if(document.URL.includes("/top-user")){
        let rank = document.querySelector("#corpo > div:nth-child(4) > div.postHomeVideoBox > div.menu_box_action > p:nth-child(2) > a:nth-child(1)")
        if(rank) {
            if(document.URL.includes('moedas')){
                presenceData.details = 'Top User Rank de Moedas';
            } else if(document.URL.includes('acessos')){
                presenceData.details = 'Top User Rank de Acessos';
            } else if(document.URL.includes('hunter')){
                presenceData.details = 'Top User Rank do Hunter';
            } else if(document.URL.includes('image')){
                presenceData.details = 'Top User Rank de Imagens Enviadas';
            }
            presenceData.details = 'Top User Rank de Moedas';
            presenceData.state = 'Seu rank é ' + rank.innerText;
            presence.setActivity(presenceData);
        } else {
            if(document.URL.includes('moedas')){
                presenceData.details = 'Top User Rank de Moedas';
            } else if(document.URL.includes('acessos')){
                presenceData.details = 'Top User Rank de Acessos';
            } else if(document.URL.includes('hunter')){
                presenceData.details = 'Top User Rank do Hunter';
            } else if(document.URL.includes('image')){
                presenceData.details = 'Top User Rank de Imagens Enviadas';
            }
            presenceData.details = 'Top User Rank de Moedas';
            presenceData.state = 'Seu rank é 0°';
            presence.setActivity(presenceData);
        }
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/genero")) {
        presenceData.details = 'Procurando Mangá';
        if(document.title.includes('Genero ')){
            presenceData.state = 'Gênero: ' + document.title.replace('Genero ', "").replace('- Super Mangas', "");
        } else {
            presenceData.state = 'Gênero';
        }
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
}));
