var presence = new Presence({
    clientId: "708779444541849640"
});

function Timestamps(videoTime, videoDuration): any {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}

const nomeObraAnime: any= document.querySelector("#weds > div > div.pageAnime > div > div > div.right > div.animeFirstContainer > h1");
const filtroObraAnime: any = document.querySelector("#weds > div > div.pageAnime > div > div > div.right > a > button");
const nomeEpisodio: any  = document.querySelector("#weds > div > div.headerEP > div > h1");
const numeroEpisodio: any  = document.querySelector("#weds > div > div.headerEP > div > div.controlesEP > div:nth-child(2) > h2");
const statusLista: any  = document.querySelector("#ani_status");
const generolista: any  = document.querySelector("#ani_genero");
const paginaAtual: any  = document.querySelector("#weds > div > div.ultAnis.mwidth > div.paginacao > span.page-numbers.current");
const ultimaPagina: any  = document.querySelector("#weds > div > div.ultAnis.mwidth > div.paginacao > a:nth-child(5)");
const pesquisaTitulo: any  = document.querySelector("body > div > div.SectionBusca.mwidth > div.tituloSection");

presence.on("UpdateData", async () => {
    const presenceData: presenceData = {
        largeImageKey: "logo"
    };

    const path = document.location.pathname;
    
    if (path == '/') {
        if (pesquisaTitulo != null) {
            if (pesquisaTitulo.innerText.includes('VOCÊ PESQUISOU POR')) {
                presenceData.details = 'Em pesquisa por: ';
                presenceData.state = pesquisaTitulo.innerText.slice(19);
                presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            }
        } else {
            presenceData.details = 'Início';
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        }
    } else if (path.includes('/anime/')) {
        if (path == '/anime/') {
            presenceData.details = 'Vendo animes';
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        } else {
            presenceData.details = nomeObraAnime.innerText;
            presenceData.state = 'Filtrar por: ' + filtroObraAnime.innerText;
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        }
    } else if (path.includes('/video/')) {
        if (path == '/video/') {
            presenceData.details = 'Lista de vídeos';
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        } else {
            const video: any = document.querySelector('video');
            const timestamps: any = Timestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.details = nomeEpisodio.innerText;
            presenceData.state = numeroEpisodio.innerText;
            if (!video.paused) {    
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.smallImageKey = 'play';
                presenceData.smallImageText = 'Assistindo';     
            }
        }
    } else if (path.includes('/lista-de-animes-online')) {
        presenceData.details = 'Animes' + ' | Página: ' + paginaAtual.innerText + ' de ' + ultimaPagina.innerText;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        if (statusLista[statusLista.selectedIndex].innerText != 'Selecione o Status') {
            presenceData.state = statusLista[statusLista.selectedIndex].innerText;
        } else if (generolista[generolista.selectedIndex].innerText != 'Selecione o Gênero') {
            presenceData.state = generolista[generolista.selectedIndex].innerText;
        }
    } else {
        presenceData.details = 'Navegando... ';
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    presence.setActivity(presenceData);
});
