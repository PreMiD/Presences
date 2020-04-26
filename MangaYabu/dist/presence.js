var presence = new Presence ({
    clientId: "704006227276857385"
});

let browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };

    if (document.location.pathname == '/') {
        if (document.title.includes('Você pesquisou por')) {
            presenceData.details = 'Pesquisando';
            presenceData.smallImageKey = 'pesquisa';
            presenceData.smallImageText = 'Pesquisando';
            presenceData.state = document.querySelector('h1.loop-heading').textContent.slice(20);
            presenceData.startTimestamp = browsingStamp;
        } else {
            presenceData.details = 'Página inicial';
            presenceData.smallImageKey = 'inicio';
            presenceData.smallImageText = 'Início';
            presenceData.startTimestamp = browsingStamp;
        };
    } else if (document.location.pathname.includes('lista-de-mangas')) {
        presenceData.details = 'Vendo a lista de mangás';
        presenceData.smallImageKey = 'lista';
        presenceData.smallImageText = 'Vendo a lista de obras';
        presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes('manga')) {
        presenceData.details = 'Vendo página de obra';
        presenceData.state = document.querySelector('div.row div.left20.right20 h1').innerText;
        presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes('ler')) {
        presenceData.details = document.querySelector('div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1').innerText.slice(0, document.querySelector('div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1').innerText.search('Capítulo') - 2);
        presenceData.state = document.querySelector('div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1').innerText.slice(document.querySelector('div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1').innerText.search('Capítulo'));
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = 'lendo';
        presenceData.smallImageText = 'Lendo';
    } else if (presenceData.state == null) {
        presence.setTrayTitle();
        presence.setActivity();
    };
    presence.setActivity(presenceData);
})