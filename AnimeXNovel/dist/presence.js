var presence = new Presence({
    clientId: "700596580218175548"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let resultsInfo, searchTab;
let titulo = document.title;
let pesquisaR = titulo.slice(77);
let tituloLength = titulo.length - 3;
let capituloR = titulo.slice(tituloLength);
let removeanime = titulo.slice(7);
let obraanimeR = removeanime.slice(0, titulo.length - 18);
let listaR = titulo.slice(54);
let obra = document.querySelector('h2.post-title.entry-title')
let noticia = document.querySelector('h2.post-title.entry-title')
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "axn-logo"
    };
    if (document.location.pathname.startsWith("/")) {
        if (document.location.pathname.includes('search')) {
            if (document.location.pathname.includes('label')) {
                if (document.location.pathname.endsWith('o')) {
                    data.details = "Página inícial";
                    data.startTimestamp = browsingStamp;
                } else {
                    data.details = "Vendo a lista de";
                    data.state = listaR;
                    data.startTimestamp = browsingStamp;
                }
            } else {
                data.details = "Pesquisando"
                data.state = pesquisaR;
                data.startTimestamp = browsingStamp;
            }
        } else if (document.location.pathname.endsWith('.html')) {
            if (document.title.match(/\d/g) != null) {
                data.details = titulo;
                data.state = "Capítulo " + capituloR;
                data.startTimestamp = browsingStamp;
            } else if (document.querySelector('div.post-body.entry-content.cl div.ocultar') == null) {
                data.details = "Vendo página";
                data.state = noticia.textContent;
                data.startTimestamp = browsingStamp;
            } else if (document.location.pathname.includes("anime")) {
                data.details = obraanimeR;
                data.state = "Episódio" + capituloR;
                data.startTimestamp = browsingStamp;
            } else if (capitulo == null) {
                data.details = "Vendo página";
                data.state = obra.textContent;
                data.startTimestamp = browsingStamp;
            } 
        };
    };

    presence.setActivity(data);
});
