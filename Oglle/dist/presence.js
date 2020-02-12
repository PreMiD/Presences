var presence = new Presence({
    clientId: "630418879411126282",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };
    presenceData.startTimestamp = browsingStamp;

    if(window.location.pathname.includes("/#Inicio")) {
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
    if(window.location.pathname.includes("/#Contato")) {
        presenceData.details = "Contato"
    }
    if(window.location.pathname.includes("/anuncios")) {
        presenceData.details = "Ganhando dinheiro com a Oglle.com.br!"
    }

    presence.setActivity(presenceData);
});
