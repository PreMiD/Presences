const presence = new Presence({
    clientId: "684627733145452555"
});
let presenceData;
const browsingStamp = Math.floor(Date.now() / 1000);
function PerfilStatus(detail, state) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = detail;
    presenceData.state = state;
}
presence.on("UpdateData", () => {
    presenceData = {
        largeImageKey: "logo"
    };
    const pathName = window.location.pathname;
    const notfound = pathName == "/404" ||
        document.getElementsByClassName("notfound").length != 0;
    if (pathName == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Início";
    }
    else if (pathName.startsWith("/lista-mangas") && !notfound) {
        const listCurrentPage = document.querySelector("#app > div.manga > div.alllc > ul.pagination > li.active");
        let listMaxPage = document.querySelectorAll("#app > div.manga > div.alllc > ul.pagination > li > a");
        let listPage = "";
        if (listCurrentPage != null && listMaxPage != null) {
            if (!listMaxPage[listMaxPage.length - 1].textContent.includes("Próximo"))
                listMaxPage = listCurrentPage.textContent;
            else
                listMaxPage = listMaxPage[listMaxPage.length - 2].textContent;
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
        if (pathName.split("/").slice(-1)[0] != "editar")
            PerfilStatus("Olhando um Perfil:", document.querySelector("#capapl > b").textContent);
        else if (pathName.split("/").length == 4) {
            const user = document.querySelector("#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a").href
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
        let MangaAltNames = document.querySelector("#app > div.manga.mtopmanga > div.all > div.lef > div.altt");
        let MangaName = "...";
        if (MangaDefaultName != null && MangaDefaultName.textContent.trim()) {
            MangaAltNames == null || !MangaAltNames.textContent.trim()
                ? (MangaAltNames = "")
                : (MangaAltNames = " (" + MangaAltNames.textContent + ")");
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
        let page = document.querySelector("select.backgsla.frightrr").value;
        isNaN(parseInt(page))
            ? (page = "Páginas abertas")
            : (page = "Página " + page);
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
        let scanMaxPage = document.querySelectorAll("#app > div.scan > div.contentscan > div > ul.pagination > li > a");
        let scanPage = "";
        if (scanCurrentPage != null && scanMaxPage != null) {
            if (!scanMaxPage[scanMaxPage.length - 1].textContent.includes("Próximo"))
                scanMaxPage = scanCurrentPage.textContent;
            else
                scanMaxPage = scanMaxPage[scanMaxPage.length - 2].textContent;
            scanPage = " - Página " + scanCurrentPage.textContent + "/" + scanMaxPage;
        }
        let scanMembers = document.querySelectorAll("#app > div.scan > div.contentscan > div > div.membrosscan > b").length;
        scanMembers != 0
            ? (scanMembers = " - " + scanMembers.toString() + " Membros")
            : (scanMembers = "");
        if (scanName != null && scanName.textContent.trim()) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Olhando um Scan Perfil:";
            presenceData.state = scanName.textContent + scanMembers + scanPage;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksWUFBMEIsQ0FBQztBQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVwRCxTQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSztJQUNqQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM5QixZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUM3QixDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLFlBQVksR0FBRztRQUNiLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUMxQyxNQUFNLFFBQVEsR0FDWixRQUFRLElBQUksTUFBTTtRQUNsQixRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUMxRCxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDbkIsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7S0FDakM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDNUQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUMsMERBQTBELENBQzNELENB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