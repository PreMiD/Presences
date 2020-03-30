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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNuRCxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQzlCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxZQUFZLEdBQWlCO1FBQ2xDLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLGNBQWM7S0FDZCxDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDN0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7S0FDM0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMzRSxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0tBQy9CO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVE7YUFDcEIsYUFBYSxDQUFDLGlCQUFpQixDQUFDO2FBQ2hDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxJQUNDLENBQUMsUUFBUTthQUNQLGFBQWEsQ0FBQyxVQUFVLENBQUM7YUFDekIsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDeEI7WUFDRCxNQUFNLFNBQVMsR0FDYixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBdUIsQ0FBQyxPQUFPO2lCQUMvRCxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxZQUFZLGFBQWEsU0FBUyxFQUFFLENBQUM7U0FDN0Q7YUFBTTtZQUNOLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1NBQ2xDO1FBQ0QsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDdEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztLQUMzQztTQUFNO1FBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ2hEO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUMifQ==