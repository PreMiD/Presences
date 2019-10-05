var presence = new Presence({
    clientId: "629768767987122217",
    mediaKeys: false
  }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
    presenceData: presenceData = {
        largeImageKey: 'goyabu'
    }

    let path = document.location.pathname,
        host = document.location.hostname,
        browsingStamp = Math.floor(Date.now() / 1000)

    if (host == "goyabu.com" && path == "/") {
        let anSc2 = document.querySelector("#home-content > h1 > span");
        if (anSc2.innerText.includes("VOCÊ PESQUISOU POR:")) {
            let anSc = document.querySelector("#home-content > h1 > span");
            presenceData.details = 'Pesquisando Animes';
            presenceData.state = 'Pesquisou: ' + anSc.textContent.replace("Você pesquisou por: ", "");
            presenceData.smallImageText = 'Pesquisando';
            presenceData.smallImageKey = 'search';
            presenceData.startTimestamp = browsingStamp;
            presence.setActivity(presenceData);
        } else {
            presenceData.details = 'Página Inicial';
            presenceData.startTimestamp = browsingStamp;
            presence.setActivity(presenceData);
        }
    }
    else if (host == "goyabu.com" && path.startsWith("/anime/") && path.replace("/anime/", "")) {
        let aniN = document.querySelector("#channel-content > div.row > div.left20.right20 > h1")
        presenceData.details = 'Visualizando Anime';
        presenceData.state = aniN.innerText;
        presenceData.smallImageText = "Visualizando";
        presenceData.smallImageKey = "visualizando";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/lista-de-animes-online")) {
        presenceData.details = 'Procurando Anime';
        presenceData.state = 'Lista de Animes';
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/tag/filmes")) {
        presenceData.details = 'Procurando Anime';
        presenceData.state = 'Lista de Filme de Animes';
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/tag/calendario")) {
        presenceData.details = 'Procurando Anime';
        presenceData.state = 'Calendário de Animes';
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/dmca")) {
        presenceData.details = 'DMCA';
        delete presenceData.startTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.includes("/wp-login.php")) {
        presenceData.details = 'Iniciando Seção';
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.includes("/wp-admin/profile.php")) {
        presenceData.details = 'Visualizando Perfil';
        presenceData.smallImageText = 'Perfil';
        presenceData.smallImageKey = 'perfil';
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.includes("/user.php")) {
        let pfName = document.querySelector("#home-content > h1")
        presenceData.details = 'Visualizando Perfil';
        presenceData.state = pfName.innerText.replace("Olá! ", "");
        presenceData.smallImageText = 'Perfil';
        presenceData.smallImageKey = 'perfil';
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path == "/video" + path.replace("/video", "")) {
        const video = document.querySelector("video");
        const title = document.querySelector("#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div.user-container.full.top20.bottom20 > div.pull-left.user-box > div > a:nth-child(1) > h3");
        const a = document.querySelector("#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div:nth-child(1) > div.row.vibe-interactions > h1").textContent;
        const b = a.replace("(Assistido)", "").replace(title.textContent, "").replace(" – ", "").replace("(HD)", "")
        presenceData.details = title.innerText;
        presenceData.state = b;
        if (video.paused === false) {
            const { duration, currentTime } = video;
            const timestamps = getTimestamps(currentTime, duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = 'play';
            presenceData.smallImageText = 'Assistindo';
            presence.setActivity(presenceData);
        }
        else if (video.currentTime > 0) {
            presenceData.smallImageKey = 'pause';
            presenceData.smallImageText = 'Pausado';
            presence.setActivity(presenceData);
        }
        presence.setActivity(presenceData);
    }
}));

function getTimestamps(videoTime, videoDuration) {
    var startTime = Math.floor(Date.now() / 1000);
    var endTime = Math.floor(startTime - videoTime + videoDuration);
    return [ startTime, endTime ];
}