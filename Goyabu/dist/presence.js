var presence = new Presence({
    clientId: "629768767987122217"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "goyabu"
    };
    const path = document.location.pathname, host = document.location.hostname, browsingStamp = Math.floor(Date.now() / 1000);
    if (host == "goyabu.com" && path == "/") {
        const anSc2 = document.querySelector("#home-content > h1 > span");
        if (anSc2.innerText.includes("VOCÊ PESQUISOU POR:")) {
            const anSc = document.querySelector("#home-content > h1 > span");
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
        const aniN = document.querySelector("#channel-content > div.row > div.left20.right20 > h1");
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
        const pfName = document.querySelector("#home-content > h1");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsUUFBUTtLQUN4QixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ3JDLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDakMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRWhELElBQUksSUFBSSxJQUFJLFlBQVksSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQ3ZDLE1BQU0sS0FBSyxHQUFvQixRQUFRLENBQUMsYUFBYSxDQUNuRCwyQkFBMkIsQ0FDNUIsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNuRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMs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