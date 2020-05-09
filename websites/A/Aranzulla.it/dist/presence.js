const presence = new Presence({
    clientId: "670047125656043536"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "aranzulla"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
        if (document.location.href.match("/?s=")) {
            const search1 = document.querySelector("head > title").textContent;
            presenceData.details = "In ricerca";
            presenceData.state =
                "Ha cercato:" +
                    search1.replace(": Risultati della ricerca | Salvatore Aranzulla", "");
        }
        else
            presenceData.details = "Nella Homepage";
    }
    else if (document.location.pathname.startsWith("/informazioni-generali-su-salvatore-aranzulla")) {
        presenceData.details = "Guarda le Info su";
        presenceData.state = "Salvatore Aranzulla";
    }
    else if (document.location.pathname.startsWith("/libri-di-salvatore-aranzulla")) {
        presenceData.details = "Guarda i libri scritti da";
        presenceData.state = "Salvatore Aranzulla";
    }
    else if (document.location.pathname.startsWith("/contatti")) {
        presenceData.details = "Vuole contattare";
        presenceData.state = "Salvatore Aranzulla";
    }
    else if (document.location.pathname.startsWith("/pubblicita")) {
        presenceData.details = "Vuole contattare";
        presenceData.state = "Salvatore Aranzulla";
    }
    else if (document.location.pathname.startsWith("/lavoro-aranzulla")) {
        presenceData.details = "Cerca lavoro presso";
        presenceData.state = "Aranzulla.it";
    }
    else if (document.location.pathname.startsWith("/computer")) {
        const computer = document.querySelector("head > title").textContent;
        presenceData.details = "Nelle guide sul Computer:";
        presenceData.state = computer.replace(" | Salvatore Aranzulla", "");
    }
    else if (document.location.pathname.startsWith("/telefonia")) {
        const telefonia = document.querySelector("head > title").textContent;
        presenceData.details = "Nelle guide sulla Telefonia:";
        presenceData.state = telefonia.replace(" | Salvatore Aranzulla", "");
    }
    else if (document.location.pathname.startsWith("/internet")) {
        const internet = document.querySelector("head > title").textContent;
        presenceData.details = "Nelle guide sull' Internet:";
        presenceData.state = internet.replace(" | Salvatore Aranzulla", "");
    }
    else if (document.location.pathname.startsWith("/page")) {
        const search2 = document.querySelector("head > title").textContent;
        presenceData.details = "In ricerca";
        presenceData.state =
            "Ha cercato:" +
                search2.replace(" Risultati della ricerca (", "").split("pagina")[0];
    }
    else {
        const guidename = document.querySelector("head > title").textContent;
        presenceData.details = "Guarda la guida:";
        presenceData.state = guidename.replace(" | Salvatore Aranzulla", "");
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ25FLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxLQUFLO2dCQUNoQixhQUFhO29CQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsaURBQWlELEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDMUU7O1lBQU0sWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUNoRDtTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUNuQywrQ0FBK0MsQ0FDaEQsRUFDRDtRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztLQUM1QztTQUFN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