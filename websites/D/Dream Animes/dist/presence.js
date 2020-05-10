const presence = new Presence({
    clientId: "704184471104126976"
});
var getTimestamps = function (videoTime, videoDuration) {
    const startTime = Math.floor(Date.now() / 1000);
    const endTime = Math.floor(startTime - videoTime + videoDuration);
    return [startTime, endTime];
};
var getCustomVideoTime = function (video, number) {
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
};
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "dalogo",
        startTimestamp: browsingStamp
    };
    var pathName = document.location.pathname;
    if (pathName == "/" || pathName == "/inicio")
        presenceData.details = "Início";
    else if (pathName.startsWith("/online")) {
        const video = document.querySelector("video");
        const audio = document
            .querySelector("h1.baseline")
            .textContent.split(" ")
            .slice(-1)[0];
        let player = "";
        const title = document.querySelector("a#anime_name").textContent;
        let type = document
            .querySelectorAll(".btn.blue")[1]
            .getAttribute("href")
            .split("/")
            .slice(-3)[0];
        let typeNumber = document
            .querySelectorAll(".btn.blue")[1]
            .getAttribute("href")
            .split("/")
            .slice(-2)[0];
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
            }
        }
        presenceData.details = title;
        presenceData.state = `${type}${typeNumber}`;
    }
    else if (pathName.startsWith("/perfil")) {
        let rpdetails = "Olhando um Perfil:";
        let username = document.querySelector("h1>b>font").textContent;
        const avaliableList = function (b) {
            var a = document
                .querySelectorAll("div.black>a")[b].textContent.match(/(?<= ).*$/g)[0];
            return a;
        };
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
    }
    else if (pathName.startsWith("/lista-completa")) {
        const query = document.querySelectorAll("ul.pagination > li > a");
        let Paginator = "";
        let PaginatorCurrent = "";
        let PaginatorMax = "";
        if (query.length <= 0)
            Paginator = "Página 1/1";
        else {
            PaginatorCurrent = document.getElementsByClassName("tpl-parse btn red")[0]
                .textContent;
            PaginatorMax = query[query.length - 1]
                .getAttribute("data-url")
                .match(/(?<=\/lista-completa\/).*(?=\?)/g)[0];
            Paginator = `Página ${PaginatorCurrent}/${PaginatorMax}`;
        }
        presenceData.details = "Lista Completa de Animes";
        presenceData.state = Paginator;
    }
    else if (pathName.startsWith("/lancamentos")) {
        let tipoDeLista;
        pathName.includes("calendario")
            ? (tipoDeLista = "Modo Calendário")
            : (tipoDeLista = "Lista lado a lado");
        presenceData.details = "Lançamentos";
        presenceData.state = tipoDeLista;
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
    }
    else if (pathName.startsWith("/rankings")) {
        presenceData.details = "Rankings";
    }
    else if (pathName.startsWith("/forum")) {
        const qtopicTag = document.getElementById("fTag");
        const qtopicTitle = document.getElementById("fTitulo");
        let topicTag;
        let topicTitle;
        if (pathName.endsWith("novo-topico")) {
            const user = document
                .querySelector("li>a>img")
                .getAttribute("data-usuario");
            presenceData.details = "Fórum - " + qtopicTag.innerText;
            presenceData.state = `${user}: ${qtopicTitle.innerText}`;
            presenceData.smallImageKey = "writing";
        }
        else {
            let section = "";
            let author = "";
            if (!qtopicTag && !qtopicTitle) {
                const q = document.querySelector("header>h1>b");
                let child = q.firstChild;
                while (child) {
                    if (child.nodeType === 3)
                        section += child.nodeValue;
                    child = child.nextSibling;
                }
                section = ` - ${section.replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")}`;
                topicTag = "";
                topicTitle = "";
            }
            else {
                topicTag = ` - ${qtopicTag.innerText}`;
                topicTitle = qtopicTitle.innerText;
                author = `${document
                    .getElementsByClassName("t-center truncate")[0]
                    .getAttribute("title")}: `;
            }
            presenceData.details = `Fórum${topicTag}${section}`;
            if (topicTitle != "")
                presenceData.state = `${author}${topicTitle}`;
            if (qtopicTag && qtopicTitle) {
                const date = document.querySelector("div.p1.black.col-12");
                const postID = pathName.split("/")[2];
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = `(${postID}) ${date.textContent.split("\n")[0]}`;
            }
        }
    }
    else if (pathName.startsWith("/equipe-membros")) {
        presenceData.details = "Equipe";
    }
    else if (pathName.startsWith("/conquistas")) {
        presenceData.details = "Lista de Conquistas";
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
        }
    }
    else if (pathName.startsWith("/anime-info")) {
        const sinfoName = pathName.split("/");
        let infoName;
        const animeName = document.querySelector("h3.truncate").textContent;
        const altNames = document.querySelector("div>div>div>div>p>b").textContent;
        switch (sinfoName[sinfoName.length - 1]) {
            default:
                infoName = "Visão Geral";
                break;
            case "legendados":
                infoName = document.querySelectorAll("div>a.p1")[1].textContent;
                break;
            case "dublados":
                infoName = document.querySelectorAll("div>a.p1")[2].textContent;
                break;
            case "filmes":
                infoName = document.querySelectorAll("div>a.p1")[3].textContent;
                break;
            case "especiais":
                infoName = document.querySelectorAll("div>a.p1")[4].textContent;
                break;
            case "resenhas":
                infoName = document.querySelectorAll("div>a.p1")[5].textContent;
                break;
            case "personagens":
                infoName = document.querySelectorAll("div>a.p1")[6].textContent;
                break;
            case "relacionados":
                infoName = document.querySelectorAll("div>a.p1")[7].textContent;
                break;
        }
        if (pathName.split("/").slice(-2)[0] == "resenhas" &&
            document.querySelector("#pcontent>div.col-12>div.col-12"))
            infoName = `Resenha ID: ${pathName.split("/").slice(-1)[0]}`;
        presenceData.details = "Olhando Info do Anime:";
        presenceData.state = `${animeName} (${altNames})`;
        presenceData.smallImageKey = "search";
        const votado = document
            .querySelectorAll("#pcontent>div>div>span")[0]
            .textContent.split(" ")[1];
        const popular = document
            .querySelectorAll("#pcontent>div>div>span")[1]
            .textContent.split(" ")[1];
        presenceData.smallImageText = `${infoName} | Rank: ${votado}/${popular}`;
    }
    else if (pathName.startsWith("/historico")) {
        let sectionList = "";
        if (document.querySelector("div > div > a.active"))
            sectionList = ` - ${document
                .querySelector("div > div > a.active")
                .textContent.match(/(?<= ).*$/g)[0]}`;
        presenceData.details = "Histórico" + sectionList;
    }
    else if (pathName.startsWith("/assistir-mais-tarde"))
        presenceData.details = "Assistir Mais Tarde";
    else if (pathName.startsWith("/feed"))
        presenceData.details = "Feed";
    else if (pathName.startsWith("/loja"))
        presenceData.details = "Loja";
    else if (pathName.startsWith("/horas-assistidas"))
        presenceData.details = "Gráfico de Horas Assistindo";
    else if (pathName.startsWith("/caixa-da-sorte"))
        presenceData.details = "Caixas da Sorte";
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksYUFBYSxHQUFHLFVBQ2xCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUNsRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUNGLElBQUksa0JBQWtCLEdBQUcsVUFBVSxLQUFVLEVBQUUsTUFBYztJQUMzRCxNQUFNLElBQUksR0FBRztRQUNYLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDNUMsQ0FBQztJQUNGLElBQUksU0FBUyxHQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxFQUFFO1FBQ0osQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3hELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFh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