var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "631606479232827433"
});
let startedBrowsingTimestamp = Math.floor(Date.now() / 1000), path = document.location.pathname, host = document.location.hostname, mangaName, mangaPage, mangaChapter, presenceData = {
    largeImageKey: "neoxscan",
    startTimestamp: startedBrowsingTimestamp
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {

    if (host == "neoxscan.com" && path == "/") {
        presenceData.details = 'Página Inicial';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "neoxscan.com" && path.startsWith("/manga/") && path.replace("/manga/", "")) {
        let mgNam = document.querySelector("body > div.wrapper > div > div:nth-child(1) > div > h2")
        if(document.title.includes("- Capítulo", "")){
            mangaPage = document.querySelector("body > div.container-fluid > div:nth-child(1) > div > div > div > div > button > span.filter-option.pull-left")
            mangaName = document.querySelector("#navbar-collapse-1 > ul > li:nth-child(1) > a")
            mangaChapter = document.title            
            let a = mangaName.innerText.replace('Manga', "")
            let b = mangaChapter.replace(a, "").replace(" - Neox Scanlator", "")
            presenceData.details = 'Lendo ' + a;
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presence.setActivity(presenceData);
            if(!document.querySelector("body > div.container-fluid > div:nth-child(1) > div > div > div").getAttribute('style').split(';')[1].includes('none')){
                presenceData.state = 'Capítulo ' + b.replace("- Capítulo", "") + " - Página " + mangaPage.innerText
            } else {
                presenceData.state = 'Capítulo ' + b.replace("- Capítulo", "")
            }
        } else {
            presenceData.details = 'Visualizando Mangá';
            presenceData.state = document.title.replace(" - Neox Scanlator", "");
            presenceData.smallImageText = "Visualizando";
            presenceData.smallImageKey = "visualizando";
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presence.setActivity(presenceData);
        }
    }
    else if (host == "neoxscan.com" && path.startsWith("/manga-list")) {
        presenceData.details = 'Procurando Mangá';
        presenceData.state = 'Lista de Mangás';
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "neoxscan.com" && path.startsWith("/latest-release")) {
        presenceData.details = 'Procurando Mangá';
        presenceData.state = 'Mangás em Lançamentos';
        presenceData.smallImageKey = 'search';
        presenceData.smallImageText = 'Procurando'
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "neoxscan.com" && path.startsWith("/equipe-neox-scanlator")) {
        presenceData.details = 'Equipe Neox Scanlator';
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
}));
