const presence = new Presence({
    clientId: "704184471104126976"
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Math.floor(Date.now() / 1000);
    const endTime = Math.floor(startTime - videoTime + videoDuration);
    return [startTime, endTime];
}
function getCustomVideoTime(video, number) {
    const date = [
        new Date(Math.floor(video.currentTime * 1000)),
        new Date(Math.floor(video.duration * 1000))
    ];
    let videoData = date[number].getUTCHours() == 0
        ? ""
        : `0${date[number].getUTCHours()}`.substr(-2) + ":";
    videoData +=
        `0${date[number].getUTCMinutes()}`.substr(-2) +
            ":" +
            `0${date[number].getUTCSeconds()}`.substr(-2);
    return videoData;
}
function avaliableList(b) {
    const a = document
        .querySelectorAll("div.black>a")[b].textContent.match(/(?<= ).*$/g)[0];
    return a;
}
function allTrim(string) {
    return string.replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
}
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "dalogo"
    };
    const pathName = document.location.pathname;
    if (pathName == "/" || pathName == "/inicio") {
        presenceData.details = "Início";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/online")) {
        const video = document.querySelector("video");
        const audio = document
            .querySelector("h1.baseline")
            .textContent.split(" ")
            .slice(-1)[0];
        let player = "";
        const title = document.querySelector("a#anime_name").textContent;
        let type = location.pathname.split("/").slice(-3)[0];
        let typeNumber = location.pathname.split("/").slice(-2)[0];
        switch (type) {
            default:
                type = "Episódio ";
                break;
            case "ova":
                type = "OVA ";
                break;
            case "especial":
                type = "Especial ";
                break;
            case "filme":
                type = "Filme ";
                break;
        }
        if (video && !isNaN(video.duration)) {
            player = document.querySelector(".btn.blue.active").textContent;
            if (getCustomVideoTime(video, 0) != getCustomVideoTime(video, 1))
                typeNumber += ` - ${getCustomVideoTime(video, 0)}/${getCustomVideoTime(video, 1)}`;
            else
                typeNumber += " - Finalizado";
            const timestamps = getTimestamps(video.currentTime, video.duration);
            if (!video.paused && video.readyState >= 1) {
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presenceData.smallImageKey = "play";
                presenceData.smallImageText = `${audio} - ${player}`;
            }
            else if (!isNaN(video.duration)) {
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = `${audio} - ${player}`;
                presenceData.startTimestamp = browsingStamp;
            }
        }
        presenceData.details = title;
        presenceData.state = `${type}${typeNumber}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/perfil")) {
        let rpdetails = "Olhando um Perfil:";
        let username = document.querySelector("h1>b>font").textContent;
        const seguidores = avaliableList(1) != "Lista de Animes"
            ? avaliableList(4)
            : avaliableList(5);
        const seguindo = avaliableList(1) != "Lista de Animes"
            ? avaliableList(5)
            : avaliableList(6);
        if (pathName.endsWith(username.toLowerCase()))
            username += " - Publicações";
        else if (pathName.endsWith("/lista-de-animes")) {
            if (document.querySelector("#pcontent > div > a.active"))
                username +=
                    " - Lista de Animes: " +
                        document
                            .querySelector("#pcontent > div > a.active")
                            .textContent.match(/(?<= ).*$/g)[0];
        }
        else if (pathName.endsWith("/estatisticas"))
            username += " - Estatísticas";
        else if (pathName.endsWith("/resenhas"))
            username += " - Resenhas";
        else if (pathName.endsWith("/personagens-favoritos"))
            username += " - Personagens Favoritos";
        else if (pathName.endsWith("/seguidores"))
            username += ` - ${seguidores}`;
        else if (pathName.endsWith("/seguindo"))
            username += ` - ${seguindo}`;
        else if (pathName.endsWith("/editar") &&
            username ==
                document.querySelector("li>a>img").getAttribute("data-usuario"))
            rpdetails = "Editando Perfil";
        presenceData.details = rpdetails;
        presenceData.state = username;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/lista-completa")) {
        const Paginator = document.querySelectorAll("ul.pagination > li > a");
        let PaginatorT;
        let PaginatorCurrent = "";
        let PaginatorMax = "";
        if (Paginator.length <= 0)
            PaginatorT = "Página 1/1";
        else {
            PaginatorCurrent = document.getElementsByClassName("tpl-parse btn red")[0]
                .textContent;
            PaginatorMax = Paginator[Paginator.length - 1]
                .getAttribute("data-url")
                .match(/(?<=\/lista-completa\/).*(?=\?)/g)[0];
            PaginatorT = `Página ${PaginatorCurrent}/${PaginatorMax}`;
        }
        presenceData.details = "Lista Completa de Animes";
        presenceData.state = PaginatorT;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/lancamentos")) {
        let tipoDeLista;
        pathName.includes("calendario")
            ? (tipoDeLista = "Modo Calendário")
            : (tipoDeLista = "Lista lado a lado");
        presenceData.details = "Lançamentos";
        presenceData.state = tipoDeLista;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/temporadas")) {
        const args = window.location.search;
        let ano = ` - ${new Date().getFullYear()}`;
        let temporada = "";
        if (args.indexOf("&") != -1) {
            ano = args.match(/(?<=ano=).*$/g)[0];
            if (ano.length > 4)
                ano = "";
            else
                ano = ` - ${ano}`;
        }
        presenceData.details = "Temporadas";
        if (args != "") {
            if (args.includes("temporada")) {
                temporada = decodeURI(args.slice(1).split("&")[0].split("=")[1].replace("verao", "Verão"));
                temporada = temporada.charAt(0).toUpperCase() + temporada.slice(1);
            }
            else
                ano = ano.replace(" - ", "");
            presenceData.state = temporada + ano;
        }
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/rankings")) {
        presenceData.details = "Rankings";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/forum")) {
        let topicTag = document.getElementById("fTag").textContent;
        let topicTitle = document.getElementById("fTitulo").textContent;
        if (pathName.endsWith("novo-topico")) {
            const user = document
                .querySelector("li>a>img")
                .getAttribute("data-usuario");
            presenceData.details = "Fórum - " + topicTag;
            presenceData.state = `${user}: ${topicTitle}`;
            presenceData.smallImageKey = "writing";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            let section = null;
            let author = null;
            if (!topicTag && !topicTitle) {
                const q = document.querySelector("header>h1>b");
                let child = q.firstChild;
                while (child) {
                    if (child.nodeType === 3)
                        section += child.nodeValue;
                    child = child.nextSibling;
                }
                section = ` - ${allTrim(section)}`;
                topicTag = null;
                topicTitle = null;
            }
            else {
                topicTag = ` - ${topicTag}`;
                author = `${document
                    .getElementsByClassName("t-center truncate")[0]
                    .getAttribute("title")}: `;
            }
            presenceData.details = `Fórum${topicTag}${section}`;
            if (topicTitle !== null)
                presenceData.state = `${author}${topicTitle}`;
            presenceData.startTimestamp = browsingStamp;
            if (topicTag && topicTitle) {
                const date = document.querySelector("div.p1.black.col-12");
                const postID = pathName.split("/")[2];
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = `(${postID}) ${date.textContent.split("\n")[0]}`;
            }
        }
    }
    else if (pathName.startsWith("/equipe-membros")) {
        presenceData.details = "Equipe";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/conquistas")) {
        presenceData.details = "Lista de Conquistas";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/postagem")) {
        const validPost = document.querySelector("#main>div>div.col-12.user-posts");
        if (validPost &&
            validPost.getAttribute("data-id") == pathName.split("/").slice(-1)[0]) {
            presenceData.details = "Lendo Publicação";
            const user = document.querySelector("#content>#main>div>div>div.topline>a").textContent;
            const dateTime = document.querySelector("#content>#main>div>div>div.topline>small>time").textContent;
            presenceData.state = `${user} - ${dateTime}`;
            presenceData.smallImageKey = "reading";
            presenceData.smallImageText = `Post ID: ${validPost.getAttribute("data-id")}`;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (pathName.startsWith("/anime-info")) {
        const infoName = pathName.split("/");
        let infoNameT;
        const animeName = document.querySelector("h3.truncate").textContent;
        const altNames = document.querySelector("div>div>div>div>p>b").textContent;
        switch (infoName[infoName.length - 1]) {
            default:
                infoNameT = "Visão Geral";
                break;
            case "legendados":
                infoNameT = document.querySelectorAll("div>a.p1")[1].textContent;
                break;
            case "dublados":
                infoNameT = document.querySelectorAll("div>a.p1")[2].textContent;
                break;
            case "filmes":
                infoNameT = document.querySelectorAll("div>a.p1")[3].textContent;
                break;
            case "especiais":
                infoNameT = document.querySelectorAll("div>a.p1")[4].textContent;
                break;
            case "resenhas":
                infoNameT = document.querySelectorAll("div>a.p1")[5].textContent;
                break;
            case "personagens":
                infoNameT = document.querySelectorAll("div>a.p1")[6].textContent;
                break;
            case "relacionados":
                infoNameT = document.querySelectorAll("div>a.p1")[7].textContent;
                break;
        }
        if (pathName.split("/").slice(-2)[0] == "resenhas" &&
            document.querySelector("#pcontent>div.col-12>div.col-12")) {
            infoNameT = `Resenha ID: ${pathName.split("/").slice(-1)[0]}`;
        }
        presenceData.details = "Olhando Info do Anime:";
        presenceData.state = `${animeName} (${altNames})`;
        presenceData.smallImageKey = "search";
        const votado = document
            .querySelectorAll("#pcontent>div>div>span")[0]
            .textContent.split(" ")[1];
        const popular = document
            .querySelectorAll("#pcontent>div>div>span")[1]
            .textContent.split(" ")[1];
        presenceData.smallImageText = `${infoNameT} | Rank: ${votado}/${popular}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/historico")) {
        let sectionList = "";
        if (document.querySelector("div > div > a.active"))
            sectionList = ` - ${document
                .querySelector("div > div > a.active")
                .textContent.match(/(?<= ).*$/g)[0]}`;
        presenceData.details = "Histórico" + sectionList;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/assistir-mais-tarde")) {
        presenceData.details = "Assistir Mais Tarde";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/feed")) {
        presenceData.details = "Feed";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/loja")) {
        presenceData.details = "Loja";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/horas-assistidas")) {
        presenceData.details = "Gráfico de Horas Assistindo";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (pathName.startsWith("/caixa-da-sorte")) {
        presenceData.details = "Caixas da Sorte";
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNoRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUM7SUFDbEUsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxLQUF1QixFQUFFLE1BQWM7SUFDakUsTUFBTSxJQUFJLEdBQUc7UUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzVDLENBQUM7SUFDRixJQUFJLFNBQVMsR0FDWCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQztRQUM3QixDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN4RCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FB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