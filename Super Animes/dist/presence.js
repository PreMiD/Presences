var presence = new Presence({
    clientId: "551461273360007217",
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
var iFrameVideo, currentTime, duration, paused, tt, edd;
presence.on("iFrameData", (iframe) => {
    playback = iframe.iframe_video !== null ? true : false;
    console.log(iframe.iframe_video);
    if (playback) {
        iFrameVideo = iframe.iframe_video.iFrameVideo;
        currentTime = iframe.iframe_video.currTime;
        duration = iframe.iframe_video.dur;
        paused = iframe.iframe_video.paused;
        tt = Math.floor(iframe.iframe_video.currTime);
        edd = Math.floor(iframe.iframe_video.dur);
    }
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "sanime",
    };
    if (document.location.hostname == "www.superanimes.org" &&
        document.location.pathname.includes("/termos-de-uso")) {
        data.details = "Termos de uso";
        presence.setActivity(data);
    }
    var nome = document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
        document.querySelector("#geral #corpo .conteudoBoxHome .boxBarraInfo");
    if (nome.innerText.includes("Episódio") ||
        nome.innerText.includes("ova") ||
        nome.innerText.includes("filme") ||
        nome.innerText.includes("Teste o vídeo por favor!")) {
        if (iFrameVideo !== null && !isNaN(duration)) {
            var videoTitle, episod, episode, epName;
            videoTitle = document.querySelector("#geral #corpo .conteudoBox .videoSidebar .capaCategory .box");
            episod = document.querySelector("#geral #corpo .conteudoBox .videoSidebar .boxMenuEps .menuEpsList.menuEpsListAtual h5");
            var data = {
                largeImageKey: "sanime",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused ? "Pausado" : "Assistindo",
                startTimestamp: getTimestamps(tt),
                endTimestamp: getTimestamps(edd),
            };
            presence.setTrayTitle(paused ? "" : videoTitle.innerText);
            data.details = videoTitle.innerText;
            data.state = episod.innerText;
            if (paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
        }
        data.details = document.querySelector("#geral #corpo .conteudoBox .videoSidebar .capaCategory .box").innerText;
        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "Pausado" : "Assistindo";
        if (nome.innerText.includes("filme")) {
            data.state = document.querySelector("#geral #corpo .conteudoBox.js_videoBox .boxSubTitulo h2").innerText;
        }
        else {
            data.state = document.querySelector("#corpo > div > div:nth-child(6) > div.videoSidebar > div.boxMenuEps > div:nth-child(1) > div.epsBoxSobre > a").innerText;
        }
        presence.setActivity(data);
    }
    else {
        if (document.location.pathname == "/") {
            data.smallImageKey = "homepage";
            data.smallImageText = "Inicio";
            data.state = "Página Inicial";
            presence.setActivity(data);
        }
        else if (document.location.pathname == "/lancamento") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lançamentos";
            presence.setActivity(data);
        }
        else if (document.location.pathname == "/ultimos-adicionados") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Últimos Videos Postados";
            presence.setActivity(data);
        }
        else if (document.location.pathname == "/lista") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Conteúdo";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/regras") {
            data.details = "Regras do Site!";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/contato") {
            data.details = "Entre em contato com o";
            data.state = "Super Animes";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/indicacao") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Indicação";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/genero") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Gêneros";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/genero") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Gêneros";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/anime") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Animes";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/cartoon") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Cartoons";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/tokusatsu") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Tokusatsu";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/live-action") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Live Actions";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/china") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Conteúdo Chinês";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/ova") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Lista de Ovas";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/hunter") {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Hunter";
            data.state = "Hunter";
            presence.setActivity(data);
        }
        else if (document.location.pathname === "/help") {
            data.details = "Ajudando o Site";
            presence.setActivity(data);
        }
        let anNome = document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo h1");
        if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/anime/")) {
            data.details = "Visualizando Anime";
            data.state = anNome.innerText;
            data.smallImageText = "Visualizando";
            data.smallImageKey = "visualizando";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/cartoon/")) {
            data.details = "Visualizando Cartoon";
            data.state = anNome.innerText;
            data.smallImageText = "Visualizando";
            data.smallImageKey = "visualizando";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/tokusatsu/")) {
            data.details = "Visualizando Tokusatsu";
            data.state = anNome.innerText;
            data.smallImageText = "Visualizando";
            data.smallImageKey = "visualizando";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/live-action/")) {
            data.details = "Visualizando Live Action";
            data.state = anNome.innerText;
            data.smallImageText = "Visualizando";
            data.smallImageKey = "visualizando";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/china/")) {
            data.details = "Visualizando Anime Chinês";
            data.state = anNome.innerText;
            data.smallImageText = "Visualizando";
            data.smallImageKey = "visualizando";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/ova/")) {
            data.details = "Visualizando Ova";
            data.state = anNome.innerText;
            data.smallImageText = "Visualizando";
            data.smallImageKey = "visualizando";
            presence.setActivity(data);
        }
        let cont = document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
            document.querySelector("#geral #corpo .conteudoBoxHome .boxBarraInfo");
        if (cont.innerText.includes("Top 100 Conteúdo do Dia")) {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Top 100 Conteúdo do Dia";
            presence.setActivity(data);
        }
        else if (cont.innerText.includes("Top 100 Conteúdo da Semana")) {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Top 100 Conteúdo da Semana";
            presence.setActivity(data);
        }
        else if (cont.innerText.includes("Top 100 Conteúdo do Mês")) {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Top 100 Conteúdo do Mês";
            presence.setActivity(data);
        }
        else if (cont.innerText.includes("Top 100 Conteúdo do Ano")) {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Top 100 Conteúdo do Ano";
            presence.setActivity(data);
        }
        else if (cont.innerText.includes("Top 100 Mais Acessados")) {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Top 100 Mais Acessados";
            presence.setActivity(data);
        }
        else if (cont.innerText.includes("Top 100 Conteúdo Curtidos")) {
            data.smallImageKey = "search";
            data.smallImageText = "Procurando";
            data.details = "Procurando Animes...";
            data.state = "Top 100 Conteúdo Curtidos";
            presence.setActivity(data);
        }
        let rank = document.querySelector("#geral #corpo .conteudoBox .postHomeVideoBox .menu_box_action p a");
        if (nome.innerText.includes("Acessos")) {
            data.details = "Top User Rank de Acessos";
            if (rank) {
                data.state = "Seu rank é " + rank.innerText;
                presence.setActivity(data);
            }
            else {
                delete data.state;
                presence.setActivity(data);
            }
            presence.setActivity(data);
        }
        else if (nome.innerText.includes("Moedas")) {
            data.details = "Top User Rank de Moedas";
            if (rank) {
                data.state = "Seu rank é " + rank.innerText;
                presence.setActivity(data);
            }
            else {
                delete data.state;
                presence.setActivity(data);
            }
            presence.setActivity(data);
        }
        else if (nome.innerText.includes("Caça Hunter")) {
            data.details = "Top User Rank do Hunter";
            if (rank) {
                data.state = "Seu rank é " + rank.innerText;
                presence.setActivity(data);
            }
            else {
                delete data.state;
                presence.setActivity(data);
            }
            presence.setActivity(data);
        }
        else if (nome.innerText.includes("Top User Rank de Embeds")) {
            data.details = "Top User Rank de Embeds";
            if (rank) {
                data.state = "Seu rank é " + rank.innerText;
                presence.setActivity(data);
            }
            else {
                delete data.state;
                presence.setActivity(data);
            }
            presence.setActivity(data);
        }
        let perfiName = document.querySelector("#geral #corpo .header_main .perfil_header_photos .perfil_box_photo h1"), cnt = document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
            document.querySelector("#geral #corpo .conteudoBoxHome .boxBarraInfo"), ctn_Fav = cnt.innerText.replace("Lista de Favorito ", ""), ctn_Ass = cnt.innerText.replace("Lista de Assistido ", ""), ctn_AssDp = cnt.innerText.replace("Lista de Assistir Depois ", ""), ctn_Arqv = cnt.innerText.replace("Lista de Arquivado / Abandonado ", ""), ctn_Seg = cnt.innerText.replace("Lista de Seguindo ", ""), ctn_ass = cnt.innerText.replace("Lista de Seguindo ", ""), ctn_Paus = cnt.innerText.replace("Lista de Em Pausa ", ""), ctn_Hunt = cnt.innerText.replace("Lista de Presas Hunter ", ""), aaa_ = document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
            document.querySelector("#geral #corpo .conteudoBoxHome .boxBarraInfo"), bbb_ = document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li:nth-child(3)"), ccc_ = document.querySelector("#corpo > div.conteudoBoxHome > h2"), ddd_2 = document.querySelector("#corpo > div.conteudoBoxHome > div.friend_list > div > div.rows_list.embed-1062831115 > div.box.sendPlayer > b");
        if (aaa_.innerText.includes("Sobre")) {
            data.details = "Perfil: " + perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = bbb_.innerText;
            if (document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull") === null) {
                data.state = "Perfil sem descrição.";
                presence.setActivity(data);
                delete data.startTimestamp;
            }
            else {
                data.state = document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull").innerText;
                presence.setActivity(data);
                delete data.startTimestamp;
            }
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/favorito")) {
            data.details = "Lista de Favoritos" + " " + ctn_Fav;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            data.state = perfiName.innerText;
            presence.setActivity(data);
        }
        else if (document.URL.includes("mod=embed")) {
            data.details = "Moderador: " + perfiName.innerText;
            data.state = "Filtrando Embeds";
            presence.setActivity(data);
        }
        else if (document.URL.includes("mod=log-embed&id=")) {
            data.details = "Moderador: " + ddd_2.innerText;
            data.state = "Log de Embed dos Mods";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/assistido")) {
            data.details = "Lista de Assistidos" + " " + ctn_Ass;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/assistir-depois")) {
            data.details = "Lista de Assistir Depois" + " " + ctn_AssDp;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/arquivado")) {
            data.details = "Lista de Arquivados" + " " + ctn_Arqv;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/seguindo")) {
            data.details = "Lista de Seguidos" + " " + ctn_Seg;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/assistindo")) {
            data.details = "Lista de Assistindo" + " " + ctn_ass;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/pausa")) {
            data.details = "Lista de Em Pausa" + " " + ctn_Paus;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (aaa_.innerText.includes("Lista de Presas Hunter")) {
            data.details = "Hunter Capturados" + " " + ctn_Hunt;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
        else if (document.location.hostname == "www.superanimes.org" &&
            document.location.pathname.includes("/amigos")) {
            data.details = ctn_Hunt;
            data.state = perfiName.innerText;
            data.smallImageKey = "perfil";
            data.smallImageText = "Perfil";
            presence.setActivity(data);
        }
    }
});
async function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFBO0FBRUgsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUE7QUFDNUIsSUFBSSxRQUFRLENBQUE7QUFDWixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUVqRCxJQUFJLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtJQUNsQyxpQkFBaUIsR0FBRyxRQUFRLENBQUE7SUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0NBQzdDO0FBRUQsSUFBSSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQTtBQUN2RCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBRXBDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDaEMsSUFBSSxRQUFRLEVBQUU7UUFDYixXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUE7UUFDN0MsV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFBO1FBQzFDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQTtRQUNsQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUE7UUFDbkMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM3QyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3pDO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLFFBQVE7S0FDdkIsQ0FBQTtJQUVELElBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1FBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNwRDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFBO1FBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDMUI7SUFDRCxJQUFJLElBQUksR0FDUCxRQUFRLENBQUMsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO1FBQ2xFLFFBQVEsQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsQ0FBQTtJQUN2RSxJQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLEVBQ2xEO1FBQ0QsSUFBSSxXQUFXLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdDLElBQUksVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFBO1lBQ3ZDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyw2REFBNkQsQ0FDN0QsQ0FBQTtZQUNELE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5Qix1RkFBdUYsQ0FDdkYsQ0FBQTtZQUVELElBQUksSUFBSSxHQUFHO2dCQUNULGFBQWEsRUFBRSxRQUFRO2dCQUN2QixhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07Z0JBQ3hDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWTtnQkFDakQsY0FBYyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLFlBQVksRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDO2FBQ2hDLENBQUE7WUFDRixRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFBO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUM3QixJQUFJLE1BQU0sRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUE7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTthQUN4QjtTQUNEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyw2REFBNkQsQ0FDN0QsQ0FBQyxTQUFTLENBQUE7UUFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFBO1FBQ3ZELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyx5REFBeUQsQ0FDekQsQ0FBQyxTQUFTLENBQUE7U0FDWDthQUFNO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyw4R0FBOEcsQ0FDOUcsQ0FBQyxTQUFTLENBQUE7U0FDWDtRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDMUI7U0FBTTtRQUNOLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFBO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFBO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUE7WUFDN0IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUE7WUFDMUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksc0JBQXNCLEVBQUU7WUFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFBO1lBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQTtZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFBO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUE7WUFDaEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUE7WUFDaEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUE7WUFDM0IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUE7WUFDeEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ3BELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQTtZQUMvQixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFBO1lBQy9CLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNuRCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQTtZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFBO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUE7WUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQTtZQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFBO1lBQ2pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLGNBQWMsRUFBRTtZQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQTtZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFBO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUE7WUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQTtZQUN2QyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQTtZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQTtZQUNyQixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQTtZQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO1FBRUQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsNkNBQTZDLENBQzdDLENBQUE7UUFDRCxJQUNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzdDO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQTtZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUE7WUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1lBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFDL0M7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFBO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQTtZQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxxQkFBcUI7WUFDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUNqRDtZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFBO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFBO1lBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQ25EO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTtZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUE7WUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1lBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDN0M7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFBO1lBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQTtZQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxxQkFBcUI7WUFDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUMzQztZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUE7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFBO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFBO1lBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7UUFHRCxJQUFJLElBQUksR0FDUCxRQUFRLENBQUMsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO1lBQ2xFLFFBQVEsQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsQ0FBQTtRQUN2RSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFBO1lBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7WUFDakUsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFBO1lBQ3pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFBO1lBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFBO1lBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLHdCQUF3QixDQUFBO1lBQ3JDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFBO1lBQ3hDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7UUFHRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyxtRUFBbUUsQ0FDbkUsQ0FBQTtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTtZQUN6QyxJQUFJLElBQUksRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO2dCQUMzQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQzFCO2lCQUFNO2dCQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtnQkFDakIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUMxQjtZQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUE7WUFDeEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtnQkFDM0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUMxQjtpQkFBTTtnQkFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQ2pCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDMUI7WUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFBO1lBQ3hDLElBQUksSUFBSSxFQUFFO2dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7Z0JBQzNDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDMUI7aUJBQU07Z0JBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUNqQixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQzFCO1lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFBO1lBQ3hDLElBQUksSUFBSSxFQUFFO2dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7Z0JBQzNDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDMUI7aUJBQU07Z0JBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUNqQixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQzFCO1lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjtRQUdELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLHVFQUF1RSxDQUN2RSxFQUNELEdBQUcsR0FDRixRQUFRLENBQUMsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO1lBQ2xFLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLDhDQUE4QyxDQUM5QyxFQUNGLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsRUFDekQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxFQUMxRCxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDLEVBQ2xFLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDL0Isa0NBQWtDLEVBQ2xDLEVBQUUsQ0FDRixFQUNELE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsRUFDekQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxFQUN6RCxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLEVBQzFELFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsRUFDL0QsSUFBSSxHQUNILFFBQVEsQ0FBQyxhQUFhLENBQUMsMENBQTBDLENBQUM7WUFDbEUsUUFBUSxDQUFDLGFBQWEsQ0FDckIsOENBQThDLENBQzlDLEVBQ0YsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLDZEQUE2RCxDQUM3RCxFQUNELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDLEVBQ2xFLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QixnSEFBZ0gsQ0FDaEgsQ0FBQTtRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7WUFFcEMsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUNyQix5REFBeUQsQ0FDekQsS0FBSyxJQUFJLEVBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQTtnQkFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDMUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO2FBQzFCO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMseURBQXlELENBQ3pELENBQUMsU0FBUyxDQUFBO2dCQUNYLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQTthQUMxQjtZQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQy9DO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFBO1lBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFBO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFBO1lBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUE7WUFFL0IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUthLElBQ2IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFDekM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFBO1lBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUE7WUFFcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1lBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFDaEQ7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUE7WUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFBO1lBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFDdEQ7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLDBCQUEwQixHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUE7WUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFBO1lBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ2hEO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFBO1lBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQTtZQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxxQkFBcUI7WUFDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUMvQztZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQTtZQUNsRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUE7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7WUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1lBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDakQ7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUE7WUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFBO1lBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQjtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQzVDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFBO1lBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQTtZQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQTtZQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUE7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7WUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjthQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1lBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDN0M7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUE7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7WUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQjtLQUVEO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFSCxLQUFLLFVBQVUsYUFBYSxDQUFDLFNBQVMsRUFBRSxhQUFhO0lBQ3BELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUMxQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFBO0lBQ3RFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMvQyxDQUFDIn0=