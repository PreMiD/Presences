const presence = new Presence({
    clientId: "738522217221980222"
});
let time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "nm",
        startTimestamp: time
    }, porcent = document.querySelector("#settings-section > div > ul > li:nth-child(1) > div > div"), currentChapTitle = document.querySelector("body > div:nth-child(2) > main > section.landing.novel-single > div.novel-head.pt-3 > div > div > div:nth-child(2) > div > h1 > a"), novelName = document.querySelector("h1"), ChapNumber = document.querySelector("#chapter-content > h2"), favoritar = document.querySelector("body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > div.w-100 > a") || document.querySelector("body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > div.w-100 > a.btn.btn-dark.mb-2"), notice = document.querySelector("body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-12.text-center > div > h1"), PagTitle = document.querySelector("body > div > main > section.navbar-novel > div > div > div > div > h2"), path = document.location.pathname, trad_orig = document.querySelector("#translate-tab.active") || document.querySelector("#original-cap.active.show");
    if (path == "/" || !path) {
        if (document.body.contains(trad_orig)) {
            presenceData.details = "Na página inicial";
            presenceData.state = "Vendo as Novels " + trad_orig.innerText + " recentes";
            presenceData.startTimestamp = time;
            console.log("trad_orig");
        }
        else {
            presenceData.details = "Na página inicial";
            presenceData.state = "Só olhando... Que estranho!";
            presenceData.startTimestamp = time;
            console.log("home");
        }
    }
    else if (path.indexOf("/noticias/") === 0) {
        presenceData.details =
            "Lendo notícia:";
        presenceData.state =
            notice.innerText;
        console.log("noticias");
    }
    else if (path.indexOf("/novels/") === 0) {
        if (document.body.contains(favoritar)) {
            presenceData.details =
                "No indice da novel:";
            presenceData.state = novelName.innerText;
            presenceData.startTimestamp = time;
            console.log("indice");
        }
        else {
            presenceData.details =
                "Lendo " + currentChapTitle.innerText;
            presenceData.state =
                "Em " + porcent.innerText + " do " + ChapNumber.innerText;
            presenceData.startTimestamp = time;
            console.log("lendo");
        }
    }
    else if (path.indexOf("/u/") === 0) {
        const perf = document.querySelector("body > div > main > section.profile-top > div > div > div > div.col-sm-8.col-md-9.d-flex.align-items-center > div > ul > li.admin-name > h5"), lv = document.querySelector("body > div > main > section.profile-top > div > div > div > div.col-sm-8.col-md-9.d-flex.align-items-center > div > ul > li.admin-name > h5 > span");
        presenceData.details =
            "Vendo o perfil de:";
        presenceData.state = perf.innerText + " usuário " + lv.innerText;
        presenceData.startTimestamp = time;
        console.log("perfil");
    }
    else if (path.includes("/editoria") ||
        path.includes("/salao-da-contribuicao") ||
        path.includes("/regras-setorias") ||
        path.includes("/politica-de-privacidade") ||
        path.includes("contato")) {
        presenceData.details = "Lendo página: ";
        presenceData.state =
            PagTitle.innerText;
        presenceData.startTimestamp = time;
    }
    else if (path.indexOf("/genero/") === 0) {
        presenceData.details =
            "Procurando:";
        presenceData.state = PagTitle.innerText;
        presenceData.startTimestamp = time;
        console.log("genero");
    }
    else {
        presenceData.details =
            "Buscando... ";
        presenceData.state =
            PagTitle.innerText;
        presenceData.startTimestamp = time;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXpDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsSUFBSTtLQUNyQixFQUNDLE9BQU8sR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDM0MsNERBQTRELENBQzdELEVBQ0QsZ0JBQWdCLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ3BELG1JQUFtSSxDQUNwSSxFQUNELFNBQVMsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDN0MsSUFBSSxDQUNMLEVBQ0QsVUFBVSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUM5Qyx1QkFBdUIsQ0FDeEIsRUFDRCxTQUFTLEdBQU8sUUFBUSxDQUFDLGFBQWEsQ0FDcEMsaUhBQWlILENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG1JQUFtSSxDQUMvUSxFQUNILE1BQU0sR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDMUMsbUhBQW1ILENBQ3BILEVBQ0QsUUFBUSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUM1Qyx1RUFBdUUsQ0FDeEUsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ2pDLFNBQVMsR0FBUSxRQUFRLENBQUMsYUFBYSxDQUNyQyx1QkFBdUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQy9FLENBQUM7SUFFSixJ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