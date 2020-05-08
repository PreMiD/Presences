var presence = new Presence({
    clientId: "641614088215986186",
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
    if(window.location.pathname.includes("/registro")) {
        presenceData.details = "Registro"
    }
    if(window.location.pathname.includes("/blog-da-comunidade")) {
        presenceData.details = "Blog da Comunidade"
    }
    if(window.location.pathname.includes("/faq")) {
        presenceData.details = "FAQ"
    }
    if(window.location.pathname.includes("/perfil")) {
        presenceData.details = "Perfil"
    }
    if(window.location.pathname.includes("/about")) {
        presenceData.details = "Sobre"
    }
    if(window.location.pathname.includes("/preferences")) {
        presenceData.details = "Preferências"
    }
    if(window.location.pathname.includes("/notifications")) {
        presenceData.details = "Notificações"
    }
    if(window.location.pathname.includes("/account")) {
        presenceData.details = "Conta"
    }
    if(window.location.pathname.includes("/friends")) {
        presenceData.details = "Amigos"
    }
    if(window.location.pathname.includes("/membros")) {
        presenceData.details = "Membros"
    }
    if(window.location.pathname.includes("/admin")) {
        presenceData.details = "Painel De Administração"
    }
    if(window.location.pathname.includes("/wp-login")) {
        presenceData.details = "Login Painel"
    }
    if(window.location.pathname.includes("/wp-admin")) {
        presenceData.details = "Painel De Administração"
    }

    presence.setActivity(presenceData);
});
