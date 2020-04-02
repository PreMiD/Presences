const presence = new Presence({
    clientId: "609791567540256780"
});
const startTimestamp = Math.floor(Date.now() / 1000), { pathname } = window.location, strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "union_lg",
        startTimestamp
    };
    if (pathname.startsWith(`/lista-mangas`)) {
        presenceData.details = "Procurando um mangá";
        presenceData.smallImageKey = `search`;
        presenceData.smallImageText = `Procurando`;
    }
    else if (pathname.startsWith(`/manga`)) {
        const mangaName = document.querySelector("div.col-md-12 > h2").textContent;
        presenceData.details = `Olhando um mangá`;
        presenceData.state = mangaName;
    }
    else if (pathname.startsWith(`/leitor`)) {
        const title = document
            .querySelector(".titulo-leitura")
            .textContent.split(" - ");
        const mangaName = title[0];
        const mangaChapter = title[1];
        presenceData.details = mangaName;
        if (!document
            .querySelector("#paginas")
            .getAttribute("style")
            .match(/display:\Wnone/)) {
            const mangaPage = document.querySelector(`#paginas`).options
                .selectedIndex + 1;
            presenceData.state = `${mangaChapter} - Página ${mangaPage}`;
        }
        else {
            presenceData.state = mangaChapter;
        }
        presenceData.smallImageKey = `reading`;
        presenceData.smallImageText = `Lendo`;
    }
    else if (pathname.startsWith(`/scans`)) {
        presenceData.details = `Procurando uma Scan`;
        presenceData.smallImageKey = `search`;
        presenceData.smallImageText = `Procurando`;
    }
    else {
        presenceData.details = (await strings).browsing;
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNsRCxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQzlCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdkMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLGNBQWM7S0FDZixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3hDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDN0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMzRSxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0tBQ2hDO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLFFBQVE7YUFDbkIsYUFBYSxDQUFDLGlCQUFpQixDQUFDO2FBQ2hDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxJQUNFLENBQUMsUUFBUTthQUNOLGFBQWEsQ0FBQyxVQUFVLENBQUM7YUFDekIsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDMUI7WUFDQSxNQUFNLFNBQVMsR0FDWixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBdUIsQ0FBQyxPQUFPO2lCQUM5RCxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxZQUFZLGFBQWEsU0FBUyxFQUFFLENBQUM7U0FDOUQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1NBQ25DO1FBQ0QsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDdkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztLQUM1QztTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ2pEO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUMifQ==