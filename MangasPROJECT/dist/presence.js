var presence = new Presence({
    clientId: "683924512982433822"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFpQjtRQUN2QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7U0FHSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ2xFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUNoQyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNULGdCQUFnQjtvQkFDZixRQUFRLENBQUMsYUFBYSxDQUNyQixzQ0FBc0MsQ0FDdkIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMs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