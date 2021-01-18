var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var presence = new Presence({
    clientId: "799425115993407539"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var presenceData, tempo, path, titulo, result, nameAni, genrAni, AniN, AniEp, video, videoTitle, seasonepisode, timestamps;
    return __generator(this, function (_a) {
        presenceData = {
            largeImageKey: "at"
        };
        tempo = Math.floor(Date.now() / 1000), path = document.location.pathname, titulo = document.title;
        if (path == "/") {
            presenceData.details = "Página inicial";
            presenceData.startTimestamp = tempo;
        }
        if (document.title.includes("Resultados da pesquisa")) {
            result = document.querySelector("body > div.pagAniTitulo > div > h1").innerText;
            presenceData.details = "Página de Busca";
            presenceData.state = "Pesquisando: " + result.replace("Você pesquisou por:", "");
            presenceData.startTimestamp = tempo;
        }
        if (path == "/lista-de-animes-online/") {
            presenceData.details = "Animes Legendados";
            presenceData.startTimestamp = tempo;
        }
        if (path == "/lista-de-animes-dublados-online/") {
            presenceData.details = "Animes Dublados";
            presenceData.startTimestamp = tempo;
        }
        if (path == "/lista-de-generos-online/") {
            presenceData.details = "Gêneros";
            presenceData.startTimestamp = tempo;
        }
        if (path == "/calendario/") {
            presenceData.details = "Calendário de Animes";
            presenceData.startTimestamp = tempo;
        }
        if (document.title.includes("Todos os Epi")) {
            nameAni = document.querySelector("body > div.pagAniTitulo > div > h1").textContent;
            genrAni = document.querySelector("#anime > div.animeFlexContainer > div.right > div > div:nth-child(2)").textContent;
            presenceData.details = nameAni.replace(" – Todos os Episódios", "");
            presenceData.state = genrAni;
            presenceData.startTimestamp = tempo;
        }
        if (document.title.includes(" – Episód")) {
            AniN = document.querySelector("body > div.pagEpiTitulo > div > h1").innerText.split(" ")
                .join(" ")
                .replace(" HD", "")
                .slice(0, -2)
                .replace(" – Episódio", "");
            AniEp = document.querySelector("body > div.pagEpiTitulo > div > h1").innerText.replace(AniN, "");
            presenceData.details = AniN;
            presenceData.state = AniEp.replace(" – Episódio", "Episódio: ");
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Pausado";
            playback =
                (document.querySelector(".vjs-current-time-display") ||
                    document.querySelector(".jw-text-elapsed")) !== null
                    ? true
                    : false;
            video = document.querySelector(".jw-video");
            if (video !== null && !isNaN(video.duration)) {
                videoTitle = AniN;
                seasonepisode = AniEp.replace("– ", "");
                timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                presenceData.smallImageKey = video.paused ? "pause" : "play";
                presenceData.smallImageText = video.paused
                    ? "Pausado"
                    : "Assistindo";
                presenceData.startTimestamp = timestamps[0];
                presenceData.endTimestamp = timestamps[1];
                presence.setTrayTitle(video.paused ? "" : videoTitle);
                presenceData.details = videoTitle;
                presenceData.state = seasonepisode.replace(" HD", "");
                if (video.paused) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            }
        }
        presence.setActivity(presenceData);
        return [2 /*return*/];
    });
}); });
