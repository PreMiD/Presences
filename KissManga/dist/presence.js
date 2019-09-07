var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "619416396337643531",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "kissmanga-logo"
    };
    if (document.location.pathname == ("/")) {
        data.details = "Viewing Homepage",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/MangaList")) {
        data.details = "Browsing Manga",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.includes("/Manga/")) {
        const mangacheck = document.querySelector("div.barContent .bigChar") ? true : false;
        if (mangacheck) {
            var manga = document.querySelector("div.barContent .bigChar").textContent;
            data.details = "Viewing a Manga",
                data.state = manga;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            var manga = document.querySelector("#headnav #navsubbar p a").textContent.split('Manga').pop().split('information')[0];
            var chapter = document.querySelector("select.selectChapter option").textContent;
            data.details = "Reading " + manga.trim(),
                data.state = chapter;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    ;
}));
