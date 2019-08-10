let presence = new Presence({
    clientId: "609791567540256780"
});

let startedBrowsingTimestamp = Math.floor(Date.now() / 1000),
mangaName : string,
mangaPage : string,
mangaChapter : string,
element : HTMLSelectElement,
presenceData : presenceData = {
    largeImageKey: "union_lg",
    startTimestamp: startedBrowsingTimestamp
};

presence.on("UpdateData", () => {
    if (window.location.pathname.includes("lista-mangas")) {
        presenceData.details = "Procurando um mangá";
    } else if (window.location.pathname.includes("manga")) {
        mangaName = document.querySelector("div.col-md-12 > h2").textContent;
        presenceData.details = "Olhando um mangá";
        presenceData.state = mangaName;
    } else if (window.location.pathname.includes("leitor")) {
        mangaName = document.querySelector(".titulo-leitura").textContent.split(' - ')[0];
        mangaChapter = document.querySelector(".titulo-leitura").textContent.split(' - ')[1];
        presenceData.details = "Lendo " + mangaName;
        element = document.getElementById("modo_leitura") as HTMLSelectElement;
        if (element.options[element.selectedIndex].value == "Passar páginas") {
            element = document.getElementById("paginas") as HTMLSelectElement;
            mangaPage = element.options[element.selectedIndex].value;
            presenceData.state = mangaChapter + " - Página " + mangaPage;
        } else {
            presenceData.state = mangaChapter;
        };
    } else if (window.location.pathname.includes("scans")) {
        presenceData.details = "Procurando uma Scan";
    } else {
        presenceData.details = "Navegando...";
    }
    presence.setActivity(presenceData, true);
})
