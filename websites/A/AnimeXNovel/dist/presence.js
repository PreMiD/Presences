const presence = new Presence({
    clientId: "700596580218175548"
});
const browsingStamp = Math.floor(Date.now() / 1000);
const titulo = document.title;
const pesquisaR = titulo.slice(77);
const tituloLength = titulo.length - 3;
const obraR = titulo.slice(0, tituloLength);
const capituloR = titulo.slice(tituloLength);
const removeanime = titulo.slice(7);
const obraanimeR = removeanime.slice(0, titulo.length - 18);
const listaR = titulo.slice(54);
const capitulo = document
    .querySelector("h2.post-title.entry-title")
    .textContent.match(/\d+/g) || null;
const obra = document.querySelector("h2.post-title.entry-title").textContent;
const noticia = document.querySelector("h2.post-title.entry-title").textContent;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "axn-logo"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.indexOf("anime") != -1) {
        presenceData.details = obraanimeR;
        presenceData.state = "Episódio " + capituloR;
    }
    else if (document.location.pathname.startsWith("/search")) {
        if (document.location.pathname.indexOf("/search/label/") != -1) {
            if (document.location.pathname.indexOf("/In%C3%ADcio") != -1) {
                presenceData.details = "Página inícial";
            }
            else {
                presenceData.details = "Vendo a lista de";
                presenceData.state = listaR;
            }
        }
        else {
            presenceData.details = "Pesquisando...";
            presenceData.state = pesquisaR;
        }
    }
    else if (document.location.pathname.match("/")) {
        if (capitulo === null &&
            document.querySelector("div.post-body.entry-content.cl div.ocultar") !=
                null) {
            presenceData.details = "Vendo página de obra";
            presenceData.state = obra;
        }
        else if (document.querySelector("div.post-body.entry-content.cl div.ocultar") ==
            null) {
            presenceData.details = "Vendo página";
            presenceData.state = noticia;
        }
        else {
            presenceData.details = obraR;
            presenceData.state = "Capítulo " + capituloR;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDOUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNuQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN2QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM1QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzdDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1RCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sUUFBUSxHQUNaLFFBQVE7S0FDTCxhQUFhLENBQUMsMkJBQTJCLENBQUM7S0FDMUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDdkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUM3RSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUMsV0FBVyxDQUFDO0FBRWhGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDckQsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsU0FBUyxDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDM0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM5RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQzthQUN6QztpQkFBTTtnQkFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUM3QjtTQUNGO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1lBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoRCxJQUNFLFFBQVEsS0FBSyxJQUFJO1lBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQUMsNENBQTRDLENBQUM7Z0JBQ2xFLElBQUksRUFDTjtZQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDM0I7YUFBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsNENBQTRDLENBQUM7WUFDcEUsSUFBSSxFQUNKO1lBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDOUI7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQzdCLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxHQUFHLFNBQVMsQ0FBQztTQUM5QztLQUNGO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==