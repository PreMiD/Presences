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

    if(window.location.pathname.toLowerCase().includes("/#Inicio")) {
        presenceData.state = "Inicio"
    }
    if(window.location.pathname.toLowerCase().includes("/nossos-programas")) {
        presenceData.state = "Programas"
    }
    if(window.location.pathname.toLowerCase().includes("/servicos")) {
        presenceData.state = "Serviços"
    }
    if(window.location.pathname.toLowerCase().includes("/noticias")) {
        presenceData.state = "Notícias"
    }
    if(window.location.pathname.toLowerCase().includes("/#Contato")) {
        presenceData.state = "Contato"
    }
    if(window.location.pathname.toLowerCase().includes("/anuncios")) {
        presenceData.state = "Ganhando dinheiro com a Oglle.com.br!"
    }

    presence.setActivity(presenceData);
});