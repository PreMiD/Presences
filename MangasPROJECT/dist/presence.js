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
                    document.querySelector("#menu-titulos > li.active > a > span")
                        .innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/lista-de-categorias")) {
        (data.details = "Lista de Categorias"),
            (data.state =
                "Ordenada por: " +
                    document.querySelector("#menu-categorias > li.active > a > span")
                        .innerText);
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/grupos")) {
        (data.details = "Lista de Grupos"),
            (data.state =
                "Ordenada por: " +
                    document.querySelector("#menu-grupos > li.active > a > span")
                        .innerText);
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
                    document.querySelector("head > title")
                        .innerText.replace("Mangás:", ""));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDdEMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7U0FHSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ25FLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUNqQyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNWLGdCQUFnQjtvQkFDZixRQUFRLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUFpQjt5QkFDN0UsU0FBUyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMs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