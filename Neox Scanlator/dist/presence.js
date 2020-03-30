let presence = new Presence({
    clientId: "631606479232827433"
});
let startedBrowsingTimestamp = Math.floor(Date.now() / 1000), mangaName, mangaChapter, path, host, presenceData = {
    largeImageKey: "neoxscan",
    startTimestamp: startedBrowsingTimestamp
};
presence.on("UpdateData", async () => {
    if (host == "neoxscan.com" && path == "/") {
        presenceData.details = "Página Inicial";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "neoxscan.com" &&
        path.startsWith("/manga/") &&
        path.replace("/manga/", "")) {
        let mgNam = document.querySelector("body > div.wrapper > div > div:nth-child(1) > div > h2");
        if (document.title.includes("- Capítulo", "")) {
            mangaPage = document.querySelector("body > div.container-fluid > div:nth-child(1) > div > div > div > div > button > span.filter-option.pull-left");
            mangaName = document.querySelector("#navbar-collapse-1 > ul > li:nth-child(1) > a");
            mangaChapter = document.title;
            let a = mangaName.innerText.replace("Manga", "");
            let b = mangaChapter.replace(a, "").replace(" - Neox Scanlator", "");
            presenceData.details = "Lendo " + a;
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presence.setActivity(presenceData);
            if (!document
                .querySelector("body > div.container-fluid > div:nth-child(1) > div > div > div")
                .getAttribute("style")
                .split(";")[1]
                .includes("none")) {
                presenceData.state =
                    "Capítulo " +
                        b.replace("- Capítulo", "") +
                        " - Página " +
                        mangaPage.innerText;
            }
            else {
                presenceData.state = "Capítulo " + b.replace("- Capítulo", "");
            }
        }
        else {
            presenceData.details = "Visualizando Mangá";
            presenceData.state = document.title.replace(" - Neox Scanlator", "");
            presenceData.smallImageText = "Visualizando";
            presenceData.smallImageKey = "visualizando";
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presence.setActivity(presenceData);
        }
    }
    else if (host == "neoxscan.com" && path.startsWith("/manga-list")) {
        presenceData.details = "Procurando Mangá";
        presenceData.state = "Lista de Mangás";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "neoxscan.com" && path.startsWith("/latest-release")) {
        presenceData.details = "Procurando Mangá";
        presenceData.state = "Mangás em Lançamentos";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "neoxscan.com" &&
        path.startsWith("/equipe-neox-scanlator")) {
        presenceData.details = "Equipe Neox Scanlator";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksd0JBQXdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzNELFNBQWlCLEVBQ2pCLFlBQW9CLEVBQ3BCLElBQWdDLEVBQ2hDLElBQWdDLEVBQ2hDLFlBQVksR0FBaUI7SUFDNUIsYUFBYSxFQUFFLFVBQVU7SUFDekIsY0FBYyxFQUFFLHdCQUF3QjtDQUN4QyxDQUFDO0FBQ0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDMUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTSxJQUNOLElBQUksSUFBSSxjQUFjO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUMxQjtRQUNELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLHdEQUF3RCxDQUN4RCxDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDOUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLCtHQUErRyxDQUMvRyxDQUFDO1lBQ0YsU0FBUyxH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