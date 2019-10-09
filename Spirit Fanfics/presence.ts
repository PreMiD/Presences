const presence: Presence = new Presence({
    clientId: "628786533587091490"
});
const { pathname } = window.location,
strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});

presence.on("UpdateData", async () => {
    const presenceData: presenceData = {
        largeImageKey: "spirit_lg",
        startTimestamp: Math.floor(Date.now() / 1000),
        details: (await strings).browsing
    },
    nav = document.querySelector('#secaoNav').lastChild.textContent;
    if (pathname.startsWith('/historia')) {
        if (pathname === '/historia/gerenciar') {
            presenceData.details = "Vendo Minhas Histórias";
        } else {
            const title = document.querySelector('.tituloPrincipal').textContent.replace('História ', '').split(' - ');
            if (pathname.match(/\/historia\/(\w+-)+\d+\/\w+/)) {
                presenceData.details = `Lendo ${title[0]}`;
                presenceData.state = `${title[1]} - ${nav}`;
            } else {
                presenceData.details = "Vendo uma história";
                presenceData.state = title[0];
            }
        }
    } else if (pathname.startsWith('/perfil')) {
        presenceData.details = "Vendo um perfil";
        presenceData.state = nav;
    } else if (pathname.startsWith('/home')) {
        presenceData.state = 'Home';
    } else if (pathname.startsWith('/aulas')) {
        presenceData.details = 'Vendo aulas';
        presenceData.state = nav != 'Aulas' ? nav : undefined;
    } else if (pathname.startsWith('/generos')) {
        presenceData.details = 'Navegando por gênero';
        presenceData.state = nav != 'Gêneros' ? nav : undefined;
    } else if (pathname.startsWith('/categorias')) {
        presenceData.details = 'Navegando por categorias';
        presenceData.state = nav != 'Categorias' ? nav : undefined;
    } else if (pathname.startsWith('/tags')) {
        presenceData.details = 'Navegando por tags';
        presenceData.state = nav != 'Tags populares' ? nav : undefined;
    } else if (pathname.startsWith('/historico')) {
        presenceData.details = `Vendo o histórico`;
    } else if (pathname.startsWith('/grupos')) {
        presenceData.state = `Vendo grupos`;
    } else {
        presenceData.state = nav;
    }
    presence.setActivity(presenceData, true);
})