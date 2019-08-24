var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "609791567540256780"
});
let startedBrowsingTimestamp = Math.floor(Date.now() / 1000), mangaName, mangaPage, mangaChapter, element, presenceData = {
    largeImageKey: "union_lg",
    startTimestamp: startedBrowsingTimestamp
}, strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (window.location.pathname.includes("lista-mangas")) {
        presenceData.details = "Procurando um mangá";
    }
    else if (window.location.pathname.includes("manga")) {
        mangaName = document.querySelector("div.col-md-12 > h2").textContent;
        presenceData.details = "Olhando um mangá";
        presenceData.state = mangaName;
    }
    else if (window.location.pathname.includes("leitor")) {
        mangaName = document.querySelector(".titulo-leitura").textContent.split(' - ')[0];
        mangaChapter = document.querySelector(".titulo-leitura").textContent.split(' - ')[1];
        presenceData.details = "Lendo " + mangaName;
        if (!document.querySelector('#paginas').getAttribute('style').split(';')[1].includes('none')) {
            element = document.getElementById("paginas");
            mangaPage = element.options[element.selectedIndex].value;
            presenceData.state = mangaChapter + " - Página " + mangaPage;
        }
        else {
            presenceData.state = mangaChapter;
        }
        ;
    }
    else if (window.location.pathname.includes("scans")) {
        presenceData.details = "Procurando uma Scan";
    }
    else {
        presenceData.details = (yield strings).browsing;
    }
    presence.setActivity(presenceData, true);
}));
