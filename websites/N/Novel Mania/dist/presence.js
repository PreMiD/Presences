const presence = new Presence({
    clientId: "738522217221980222"
});
let time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "nm",
        startTimestamp: time
    }, porcent = document.querySelector("#settings-section > div > ul > li:nth-child(1) > div > div"), currentChapTitle = document.querySelector("body > div:nth-child(2) > main > section.landing.novel-single > div.novel-head.pt-3 > div > div > div:nth-child(2) > div > h1 > a.text-white.mr-2"), novelName = document.querySelector("body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > span.d-flex.flex-row.align-items-center > h1"), ChapNumber = document.querySelector("body > div:nth-child(2) > main > section.landing.novel-single > div.novel-head.pt-3 > div > div > div:nth-child(2) > div > h3"), Fav = document.querySelector("body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-8 > div > div.w-100 > a.btn.btn-orange.mb-2"), Notice = document.querySelector("body > div:nth-child(2) > main > section > div.novel-head.pt-3 > div > div > div.col-md-12.text-center > div > h1"), PagTitle = document.querySelector("body > div > main > section.navbar-novel > div > div > div > div > h2"), path = document.location.pathname;
    if (path == "/" || !path) {
        presenceData.details = "Na home.";
        presenceData.state = "Olhando a linda página inicial";
        presenceData.startTimestamp = time;
    }
    else if (path.indexOf("/noticias/") === 0) {
        presenceData.details =
            "Lendo notícia:";
        presenceData.state =
            Notice.innerText;
    }
    else if (path.indexOf("/novels/") === 0) {
        if (document.body.contains(Fav)) {
            presenceData.details =
                "No indice da novel:";
            presenceData.state = novelName.innerText;
            presenceData.startTimestamp = time;
        }
        else {
            presenceData.details =
                "Lendo " + currentChapTitle.innerText;
            presenceData.state =
                "Em " + porcent.innerText + " do " + ChapNumber.innerText;
            presenceData.startTimestamp = time;
        }
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
    else {
        presenceData.details =
            "Buscando uma Novel... ";
        presenceData.startTimestamp = time;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXpDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsSUFBSTtRQUNuQixjQUFjLEVBQUUsSUFBSTtLQUNyQixFQUNDLE9BQU8sR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDM0MsNERBQTRELENBQzdELEVBQ0QsZ0JBQWdCLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ3BELG1KQUFtSixDQUNwSixFQUNELFNBQVMsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDN0MsZ0pBQWdKLENBQ2pKLEVBQ0QsVUFBVSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUM5QywrSEFBK0gsQ0FDaEksRUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDMUIscUlBQXFJLENBQ3RJLEVBQ0QsTUFBTSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUMxQyxtSEFBbUgsQ0FDcEgsRUFDRCxRQUFRLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQzVDLHVFQUF1RSxDQUN4RSxFQUNELElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVsQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDeEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxnQ0FBZ0MsQ0FBQztRQUN0RCxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUNwQztTQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDM0MsWUFBWSxDQUFDLE9BQU87WUFDcEIsZ0JBQWdCLENBQUM7UUFDakIsWUFBWSxDQUFDLEtBQUs7WUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNsQjtTQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQztZQUM5QixZQUFZLENBQUMsT0FBTztnQkFDbEIscUJBQXFCLENBQUM7WUFDeEIsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTztnQkFDcEIsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUN0QyxZQUFZLENBQUMsS0FBSztnQkFDaEIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDN0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDcEM7S0FDSjtTQUFNLElBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDekI7UUFDQyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxLQUFLO1lBQ2xCLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDbkIsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7S0FDcEM7U0FBTTtRQUNMLFlBQVksQ0FBQyxPQUFPO1lBQ2xCLHdCQUF3QixDQUFDO1FBQzNCLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBQ3BDO0lBQ0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQyJ9