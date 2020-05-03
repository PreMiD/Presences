const presence = new Presence({
    clientId: "684627733145452555"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "logo"
    };
    var pathName = window.location.pathname;
    var notfound = pathName == "/404" ||
        document.getElementsByClassName("notfound").length != 0;
    if (pathName == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Início";
    }
    else if (pathName.startsWith("/lista-mangas") && !notfound) {
        const listCurrentPage = document.querySelector("#app > div.manga > div.alllc > ul.pagination > li.active");
        const qlistMaxPage = document.querySelectorAll("#app > div.manga > div.alllc > ul.pagination > li > a");
        let listPage = "";
        let listMaxPage = "";
        if (listCurrentPage != null && qlistMaxPage != null) {
            if (!qlistMaxPage[qlistMaxPage.length - 1].textContent.includes("Próximo"))
                listMaxPage = listCurrentPage.textContent;
            else
                listMaxPage = qlistMaxPage[qlistMaxPage.length - 2].textContent;
            listPage = " - Página " + listCurrentPage.textContent + "/" + listMaxPage;
        }
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Lista de Mangás" + listPage;
        const GenerosN = document.querySelector("#app > div.manga > div.alllc > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap");
        if (GenerosN != null && GenerosN.textContent.trim())
            presenceData.state =
                "Gêneros: " + GenerosN.textContent.split("\n").join(", ");
    }
    else if (pathName.startsWith("/equipe") && !notfound) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Equipe";
    }
    else if (pathName.startsWith("/perfil/") && !notfound) {
        var PerfilStatus = function (detail, state) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = detail;
            presenceData.state = state;
        };
        if (pathName.split("/").slice(-1)[0] != "editar")
            PerfilStatus("Olhando um Perfil:", document.querySelector("#capapl > b").textContent);
        else if (pathName.split("/").length == 4) {
            const user = document
                .querySelector("#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a")
                .getAttribute("href")
                .split("/")
                .slice(-1)[0];
            if (user == pathName.split("/").slice(-2)[0])
                PerfilStatus("Editando Perfil", user);
            else
                PerfilStatus("Olhando um Perfil:", pathName.split("/").slice(-2)[0]);
        }
    }
    else if (pathName.startsWith("/manga/") && !notfound) {
        const MangaDefaultName = document.querySelector("#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b");
        const qMangaAltNames = document.querySelector("#app > div.manga.mtopmanga > div.all > div.lef > div.altt");
        let MangaName = "...";
        let MangaAltNames = "";
        if (MangaDefaultName != null && MangaDefaultName.textContent.trim()) {
            if (qMangaAltNames != null && qMangaAltNames.textContent.trim())
                MangaAltNames = " (" + qMangaAltNames.textContent + ")";
            MangaName = MangaDefaultName.textContent + MangaAltNames;
        }
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Olhando um Mangá:";
        presenceData.state = MangaName;
    }
    else if (pathName.startsWith("/leitor/") && !notfound) {
        const manga = document.querySelector("b.f20").textContent;
        const chapter = document
            .querySelector("b.f14c")
            .textContent.replace(" - ", ": ");
        let page = document.querySelector("select.backgsla.frightrr")["value"];
        isNaN(page) ? (page = "Páginas abertas") : (page = "Página " + page);
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "reading";
        presenceData.details = manga;
        presenceData.state = chapter + " - " + page;
    }
    else if (pathName.startsWith("/scan/") &&
        pathName != "/scan/" &&
        !notfound) {
        const scanName = document.querySelector("#app > div.scan > div.contentscan > div > h2");
        const scanCurrentPage = document.querySelector("#app > div.scan > div.contentscan > div > ul.pagination > li.active > a");
        const qscanMaxPage = document.querySelectorAll("#app > div.scan > div.contentscan > div > ul.pagination > li > a");
        let scanMaxPage = "";
        let scanPage = "";
        if (scanCurrentPage != null && qscanMaxPage != null) {
            if (!qscanMaxPage[qscanMaxPage.length - 1].textContent.includes("Próximo"))
                scanMaxPage = scanCurrentPage.textContent;
            else
                scanMaxPage = qscanMaxPage[qscanMaxPage.length - 2].textContent;
            scanPage = " - Página " + scanCurrentPage.textContent + "/" + scanMaxPage;
        }
        const qscanMembers = document.querySelectorAll("#app > div.scan > div.contentscan > div > div.membrosscan > b").length;
        let scanMembers = "";
        if (qscanMembers != 0)
            scanMembers = " - " + scanMembers.toString() + " Membros";
        let state = "...";
        if (scanName != null && scanName.textContent.trim())
            state = `${scanName.textContent}${scanMembers}${scanPage}`;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Olhando um Scan Perfil:";
        presenceData.state = state;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUNGLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLElBQUksUUFBUSxHQUNWLFFBQVEsSUFBSSxNQUFNO1FBQ2xCLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQzFELElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNuQixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztLQUNqQztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUM1RCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QywwREFBMEQsQ0FDM0QsQ0FBQztRQUNGLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDNUMsdURBQXVELENBQ3hELENBQUM7UUFDRixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksZUFBZSxJQUFJLElBQUksSUFBSSxZQUFZLElBQUksSUFB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