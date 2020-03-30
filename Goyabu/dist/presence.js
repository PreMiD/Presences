var presence = new Presence({
    clientId: "629768767987122217"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "goyabu"
    };
    let path = document.location.pathname, host = document.location.hostname, browsingStamp = Math.floor(Date.now() / 1000);
    if (host == "goyabu.com" && path == "/") {
        let anSc2 = document.querySelector("#home-content > h1 > span");
        if (anSc2.innerText.includes("VOCÊ PESQUISOU POR:")) {
            let anSc = document.querySelector("#home-content > h1 > span");
            presenceData.details = "Pesquisando Animes";
            presenceData.state =
                "Pesquisou: " + anSc.textContent.replace("Você pesquisou por: ", "");
            presenceData.smallImageText = "Pesquisando";
            presenceData.smallImageKey = "search";
            presenceData.startTimestamp = browsingStamp;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Página Inicial";
            presenceData.startTimestamp = browsingStamp;
            presence.setActivity(presenceData);
        }
    }
    else if (host == "goyabu.com" &&
        path.startsWith("/anime/") &&
        path.replace("/anime/", "")) {
        let aniN = document.querySelector("#channel-content > div.row > div.left20.right20 > h1");
        presenceData.details = "Visualizando Anime";
        presenceData.state = aniN.innerText;
        presenceData.smallImageText = "Visualizando";
        presenceData.smallImageKey = "visualizando";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" &&
        path.startsWith("/lista-de-animes-online")) {
        presenceData.details = "Procurando Anime";
        presenceData.state = "Lista de Animes";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/tag/filmes")) {
        presenceData.details = "Procurando Anime";
        presenceData.state = "Lista de Filme de Animes";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/tag/calendario")) {
        presenceData.details = "Procurando Anime";
        presenceData.state = "Calendário de Animes";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.startsWith("/dmca")) {
        presenceData.details = "DMCA";
        delete presenceData.startTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.includes("/wp-login.php")) {
        presenceData.details = "Iniciando Seção";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.includes("/wp-admin/profile.php")) {
        presenceData.details = "Visualizando Perfil";
        presenceData.smallImageText = "Perfil";
        presenceData.smallImageKey = "perfil";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" && path.includes("/user.php")) {
        let pfName = document.querySelector("#home-content > h1");
        presenceData.details = "Visualizando Perfil";
        presenceData.state = pfName.innerText.replace("Olá! ", "");
        presenceData.smallImageText = "Perfil";
        presenceData.smallImageKey = "perfil";
        presenceData.startTimestamp = browsingStamp;
        presence.setActivity(presenceData);
    }
    else if (host == "goyabu.com" &&
        path == "/video" + path.replace("/video", "")) {
        const video = document.querySelector("video");
        const title = document.querySelector("#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div.user-container.full.top20.bottom20 > div.pull-left.user-box > div > a:nth-child(1) > h3");
        const a = document.querySelector("#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div:nth-child(1) > div.row.vibe-interactions > h1").textContent;
        const b = a
            .replace("(Assistido)", "")
            .replace(title.textContent, "")
            .replace(" – ", "")
            .replace("(HD)", "");
        presenceData.details = title.innerText;
        presenceData.state = b;
        if (video.paused === false) {
            const { duration, currentTime } = video;
            const timestamps = getTimestamps(currentTime, duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Assistindo";
            presence.setActivity(presenceData);
        }
        else if (video.currentTime > 0) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Pausado";
            presence.setActivity(presenceData);
        }
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Math.floor(Date.now() / 1000);
    var endTime = Math.floor(startTime - videoTime + videoDuration);
    return [startTime, endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxRQUFRO0tBQ3ZCLENBQUM7SUFFRixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDcEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNqQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFL0MsSUFBSSxJQUFJLElBQUksWUFBWSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDeEMsSUFBSSxLQUFLLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQ2xELDJCQUEyQixDQUMzQixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQ3BELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMvRCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1lBQzVDLFlBQVksQ0FBQyxLQUFLO2dCQUNqQixhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEUs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