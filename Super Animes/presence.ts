var presence = new Presence({
    clientId: "551461273360007217",
    mediaKeys: false
  }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now()/1000);

if(lastPlaybackState != playback) {

    lastPlaybackState = playback
    browsingStamp = Math.floor(Date.now()/1000)
      
}

var iFrameVideo, currentTime, duration, paused, tt, edd;
presence.on("iFrameData", data => {
     //setInterval(function () {
        playback =
            data.iframe_video !== null
                ? true : false;
    //}, 1000);
        console.log(data.iframe_video);
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
        tt = Math.floor(data.iframe_video.currTime);
        edd = Math.floor(data.iframe_video.dur);
    }
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* async () {
    
    presenceData: presenceData = {
        largeImageKey: "sanime"
    };

    if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/termos-de-uso")){
        presenceData.details = 'Termos de uso';
        presence.setActivity(presenceData);
    }        
    var nome = document.querySelector('#geral #corpo .conteudoBox .boxBarraInfo') || document.querySelector('#geral #corpo .conteudoBoxHome .boxBarraInfo')
    if (nome.innerText.includes('Episódio') || nome.innerText.includes('ova') || nome.innerText.includes('filme') || nome.innerText.includes("Teste o vídeo por favor!")) {
        if (iFrameVideo !== null && !isNaN(duration)) {
            var videoTitle, episod, episode, epName;
            videoTitle = document.querySelector('#geral #corpo .conteudoBox .videoSidebar .capaCategory .box');
            episod = document.querySelector('#geral #corpo .conteudoBox .videoSidebar .boxMenuEps .menuEpsList.menuEpsListAtual h5');
            
            var a = '', timestamps = getTimestamps(tt, edd), presenceData = {
                largeImageKey: "sanime",
                smallImageKey: paused ? "pause" : "play",
                smallImageText: paused ? "Pausado" : "Assistindo",
                startTimestamp: getTimestamps(tt),
                endTimestamp: getTimestamps(edd)
            };
            presence.setTrayTitle(paused ? "" : videoTitle.innerText);
            presenceData.details = videoTitle.innerText;
            presenceData.state = episod.innerText;
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        presenceData.details = document.querySelector('#geral #corpo .conteudoBox .videoSidebar .capaCategory .box').innerText;
        presenceData.smallImageKey = paused ? "pause" : "play"
        presenceData.smallImageText = paused ? "Pausado" : "Assistindo"
        if(nome.innerText.includes('filme')){
                presenceData.state = document.querySelector('#geral #corpo .conteudoBox.js_videoBox .boxSubTitulo h2').innerText;      
        } else {
                presenceData.state = document.querySelector('#geral #corpo .conteudoBox .videoSidebar .boxMenuEps .menuEpsList.menuEpsListAtual h5').innerText;       
        }
            presence.setActivity(presenceData);
    } else {
        if(document.location.pathname == "/"){
                presenceData.smallImageKey = 'homepage';
                presenceData.smallImageText = 'Inicio';
                presenceData.state = 'Página Inicial';
                presence.setActivity(presenceData);
        } else if(document.location.pathname == "/lancamento"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lançamentos';
                presence.setActivity(presenceData);
        } else if(document.location.pathname == "/ultimos-adicionados"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Últimos Videos Postados';
                presence.setActivity(presenceData);
        } else if(document.location.pathname == "/lista"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Conteúdo';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/regras"){
                presenceData.details = 'Regras do Site!';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/contato"){
                presenceData.details = 'Entre em contato com o';
                presenceData.state = 'Super Animes';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/indicacao"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Indicação';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/genero"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Gêneros';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/genero"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Gêneros';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/anime"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Animes';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/cartoon"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Cartoons';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/tokusatsu"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Tokusatsu';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/live-action"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Live Actions';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/china"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Conteúdo Chinês';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/ova"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Lista de Ovas';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === "/hunter"){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Hunter';
                presenceData.state = 'Hunter';
                presence.setActivity(presenceData);
        } else if(document.location.pathname === '/help'){
                presenceData.details = 'Ajudando o Site';
                presence.setActivity(presenceData);
        }
        // ------------- Começo Div Visualisando Anime/Cartoon/Tokusatsu/Live Action/China/Ova ------------- //
        let anNome = document.querySelector('#geral #corpo .conteudoBox .boxBarraInfo h1');
        if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/anime/")){
                //let epi = document.querySelectorAll('#geral #corpo .conteudoBox .boxAnime .boxAnimeSobre > https://schema.org/TVSeason > .numberofEpisodes')
                presenceData.details = 'Visualizando Anime';
                presenceData.state = anNome.innerText// + ' (' + epi.innerText + ')';
                presenceData.smallImageText = "Visualizando"
                presenceData.smallImageKey = "visualizando"
                presence.setActivity(presenceData);
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/cartoon/")){
                presenceData.details = 'Visualizando Cartoon';
                presenceData.state = anNome.innerText// + ' (' + epi.innerText + ')';
                presenceData.smallImageText = "Visualizando"
                presenceData.smallImageKey = "visualizando"
                presence.setActivity(presenceData);
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/tokusatsu/")){
                presenceData.details = 'Visualizando Tokusatsu';
                presenceData.state = anNome.innerText// + ' (' + epi.innerText + ')';
                presenceData.smallImageText = "Visualizando"
                presenceData.smallImageKey = "visualizando"
                presence.setActivity(presenceData);
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/live-action/")){
                presenceData.details = 'Visualizando Live Action';
                presenceData.state = anNome.innerText// + ' (' + epi.innerText + ')';
                presenceData.smallImageText = "Visualizando"
                presenceData.smallImageKey = "visualizando"
                presence.setActivity(presenceData);
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/china/")){
                presenceData.details = 'Visualizando Anime Chinês';
                presenceData.state = anNome.innerText// + ' (' + epi.innerText + ')';
                presenceData.smallImageText = "Visualizando"
                presenceData.smallImageKey = "visualizando"
                presence.setActivity(presenceData);
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/ova/")){
                presenceData.details = 'Visualizando Ova';
                presenceData.state = anNome.innerText// + ' (' + epi.innerText + ')';
                presenceData.smallImageText = "Visualizando"
                presenceData.smallImageKey = "visualizando"
                presence.setActivity(presenceData);
        }
        // ------------- Final Div Visualisando Anime/Cartoon/Tokusatsu/Live Action/China/Ova ------------- //
        // ------------- Começo Div Top Conteúdo ------------- //
        let cont = document.querySelector('#geral #corpo .conteudoBox .boxBarraInfo') || document.querySelector('#geral #corpo .conteudoBoxHome .boxBarraInfo')
        if(cont.innerText.includes('Top 100 Conteúdo do Dia')){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Top 100 Conteúdo do Dia';
                presence.setActivity(presenceData);
        } else if(cont.innerText.includes('Top 100 Conteúdo da Semana')){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Top 100 Conteúdo da Semana';
                presence.setActivity(presenceData);
        } else if(cont.innerText.includes('Top 100 Conteúdo do Mês')){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Top 100 Conteúdo do Mês';
                presence.setActivity(presenceData);
        } else if(cont.innerText.includes('Top 100 Conteúdo do Ano')){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Top 100 Conteúdo do Ano';
                presence.setActivity(presenceData);
        } else if(cont.innerText.includes('Top 100 Mais Acessados')){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Top 100 Mais Acessados';
                presence.setActivity(presenceData);
        } else if(cont.innerText.includes('Top 100 Conteúdo Curtidos')){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Procurando Animes...';
                presenceData.state = 'Top 100 Conteúdo Curtidos';
                presence.setActivity(presenceData);
        }
        // ------------- Final Div Top Conteúdo ------------- //
        // ------------- Começo Div Top Usuários------------- //
        let rank = document.querySelector('#geral #corpo .conteudoBox .postHomeVideoBox .menu_box_action p a')
        if(nome.innerText.includes("Acessos")){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Top User Rank de Acessos';
                if(rank) {
                        presenceData.state = 'Seu rank é ' + rank.innerText;
                        presence.setActivity(presenceData);
                } else {
                        delete presenceData.state;
                        presence.setActivity(presenceData);
                }
                presence.setActivity(presenceData);
        } else if(nome.innerText.includes("Moedas")){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Top User Rank de Moedas';
                if(rank) {
                        presenceData.state = 'Seu rank é ' + rank.innerText;
                        presence.setActivity(presenceData);
                } else {
                        delete presenceData.state;
                        presence.setActivity(presenceData);
                }
                presence.setActivity(presenceData);
        } else if(nome.innerText.includes("Caça Hunter")){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Top User Rank do Hunter';
                if(rank) {
                        presenceData.state = 'Seu rank é ' + rank.innerText;
                        presence.setActivity(presenceData);
                } else {
                        delete presenceData.state;
                        presence.setActivity(presenceData);
                }
                presence.setActivity(presenceData);
        } else if(nome.innerText.includes("Embeds")){
                presenceData.smallImageKey = 'search';
                presenceData.smallImageText = 'Procurando';
                presenceData.details = 'Top User Rank de Embeds';
                if(rank) {
                        presenceData.state = 'Seu rank é ' + rank.innerText;
                        presence.setActivity(presenceData);
                } else {
                        delete presenceData.state;
                        presence.setActivity(presenceData);
                }
                presence.setActivity(presenceData);               
        }
        // ------------- Final Div Top ------------- //
        // ------------- Começo Div Perfil ------------- //
        let perfiName = document.querySelector('#geral #corpo .header_main .perfil_header_photos .perfil_box_photo h1'),
            cnt = document.querySelector('#geral #corpo .conteudoBox .boxBarraInfo') || document.querySelector('#geral #corpo .conteudoBoxHome .boxBarraInfo'),
            ctn_Fav = cnt.innerText.replace("Lista de Favorito ", ""),
            ctn_Ass = cnt.innerText.replace("Lista de Assistido ", ""),
            ctn_AssDp = cnt.innerText.replace("Lista de Assistir Depois ", ""),
            ctn_Arqv = cnt.innerText.replace("Lista de Arquivado / Abandonado ", ""),
            ctn_Seg = cnt.innerText.replace("Lista de Seguindo ", ""),
            ctn_ass = cnt.innerText.replace("Lista de Seguindo ", ""),
            ctn_Paus = cnt.innerText.replace("Lista de Em Pausa ", ""),
            ctn_Hunt = cnt.innerText.replace("Lista de Presas Hunter ", ""),
            aaa_ = document.querySelector('#geral #corpo .conteudoBox .boxBarraInfo') || document.querySelector('#geral #corpo .conteudoBoxHome .boxBarraInfo')
        if(aaa_.innerText.includes('Sobre')){
                presenceData.details = 'Visualizando Perfil';
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        }else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/favorito")){
                presenceData.details = 'Lista de Favoritos' + ' ' + ctn_Fav;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/assistido")){
                presenceData.details = 'Lista de Assistidos' + ' ' + ctn_Ass;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/assistir-depois")){
                presenceData.details = 'Lista de Assistir Depois' + ' ' + ctn_AssDp;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/arquivado")){
                presenceData.details = 'Lista de Arquivados' + ' ' + ctn_Arqv;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/seguindo")){
                presenceData.details = 'Lista de Seguidos' + ' ' + ctn_Seg;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/assistindo")){
                presenceData.details = 'Lista de Assistindo' + ' ' + ctn_ass;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/pausa")){
                presenceData.details = 'Lista de Em Pausa' + ' ' + ctn_Paus;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(aaa_.innerText.includes('Lista de Presas Hunter')){
                presenceData.details = 'Hunter Capturados' + ' ' + ctn_Hunt;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        } else if(document.location.hostname == "www.superanimes.org" && document.location.pathname.includes("/amigos")){
                presenceData.details = ctn_Hunt;
                presenceData.state = perfiName.innerText;
                presenceData.smallImageKey = "perfil"
                presenceData.smallImageText = "Perfil"
                presence.setActivity(presenceData);  
        }
        // ------------- Final Div Perfil ------------- //
    }
}));
async function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}