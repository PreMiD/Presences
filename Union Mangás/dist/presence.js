var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "609791567540256780"
});
const startTimestamp = Math.floor(Date.now() / 1000), { pathname } = window.location, strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
        const title = document.querySelector(".titulo-leitura").textContent.split(' - ');
        const mangaName = title[0];
        const mangaChapter = title[1];
        presenceData.details = mangaName;
        if (!document.querySelector('#paginas').getAttribute('style').match(/display:\Wnone/)) {
            const mangaPage = document.querySelector(`#paginas`).options.selectedIndex + 1;
            presenceData.state = `${mangaChapter} - Página ${mangaPage}`;
        }
        else {
            presenceData.state = mangaChapter;
        }
        ;
        presenceData.smallImageKey = `reading`;
        presenceData.smallImageText = `Lendo`;
    }
    else if (pathname.startsWith(`/scans`)) {
        presenceData.details = `Procurando uma Scan`;
        presenceData.smallImageKey = `search`;
        presenceData.smallImageText = `Procurando`;
    }
    else {
        presenceData.details = (yield strings).browsing;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNwRCxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQzlCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzFCLFFBQVEsRUFBRSw0QkFBNEI7Q0FDekMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFrQjtRQUNoQyxhQUFhLEVBQUUsVUFBVTtRQUN6QixjQUFjO0tBQ2pCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztLQUM5QztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7S0FDbEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakYsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsTUFBTSxTQUFTLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQXVCLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdEcsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFlBQVksYUFBYSxTQUFTLEVBQUUsQ0FBQztTQUNoRTthQUFNO1lBQ0gsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDckM7UUFBQSxDQUFDO1FBQ0YsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztLQUM5QztTQUFNO1FBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ25EO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9