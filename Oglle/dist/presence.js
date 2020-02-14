var presence = new Presence({
    clientId: "641614088215986186",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };
    presenceData.startTimestamp = browsingStamp;

    if(window.location.pathname.includes()) {
        presenceData.details = "Inicio"
    }
    if(window.location.pathname.includes("/")) {
        presenceData.details = "Inicio"
    }
    if(window.location.pathname.includes("/nossos-programas")) {
        presenceData.details = "Programas"
    }
    if(window.location.pathname.includes("/servicos")) {
        presenceData.details = "Serviços"
    }
    if(window.location.pathname.includes("/noticias")) {
        presenceData.details = "Notícias"
    }
    if(window.location.pathname.includes("/anuncios")) {
        presenceData.details = "Ganhando Dinheiro"
    }

    presence.setActivity(presenceData);
});