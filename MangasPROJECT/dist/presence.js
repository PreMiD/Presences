var presence = new Presence({
    clientId: "683924512982433822"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "icon"
    };
    if (document.location.pathname == "/") {
        (data.details = "Página principal"), (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/lista-de-mangas")) {
        (data.details = "Lista de mangás"),
            (data.state =
                "Ordenada por: " +
                    document.querySelector("#menu-titulos > li.active > a > span").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/lista-de-categorias")) {
        (data.details = "Lista de Categorias"),
            (data.state =
                "Ordenada por: " +
                    document.querySelector("#menu-categorias > li.active > a > span").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/grupos")) {
        (data.details = "Lista de Grupos"),
            (data.state =
                "Ordenada por: " +
                    document.querySelector("#menu-grupos > li.active > a > span").innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/destaques")) {
        (data.details = "Mangás em Destaque"),
            (data.startTimestamp = browsingStamp);
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/mangas")) {
        (data.details = "Lista de Mangás"),
            (data.state =
                "Ordenada por: " +
                    document.querySelector("head > title").innerText.replace("Mangás:", ""));
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/scanlator")) {
        data.details =
            "Scan " +
                document.querySelector("#wraper > div > div.content-wraper.scan-data > div > ul > li > div.series-info.touchcarousel > span.series-title").innerText;
        data.state = "Visualizando Principais Mangás da Scan";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga")) {
        if (document.querySelector("#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title") === null) {
            (data.details = "Visualizando Mangá"),
                (data.state = document.querySelector("#series-data > div.series-info.touchcarousel > span.series-title > h1").innerText);
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.details = document.querySelector("#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title").innerText;
            data.state =
                "Capítulo " +
                    document.querySelector("#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-selection > span.current-chapter > em").innerText;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7U0FHSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ2xFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUNoQyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNULGdCQUFnQjtvQkFFZCxRQUFRLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUU5RCxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxF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