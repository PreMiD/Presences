const presence = new Presence({
    clientId: "704006227276857385"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/") {
        if (document.title.includes("Você pesquisou por")) {
            presenceData.details = "Pesquisando";
            presenceData.smallImageKey = "pesquisa";
            presenceData.smallImageText = "Pesquisando";
            presenceData.state = document
                .querySelector("h1.loop-heading")
                .textContent.slice(20);
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Página inicial";
            presenceData.smallImageKey = "inicio";
            presenceData.smallImageText = "Início";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("ler")) {
        presenceData.details = document
            .querySelector("div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1")
            .textContent.slice(0, document
            .querySelector("div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1")
            .textContent.search("Capítulo") - 2);
        presenceData.state = document
            .querySelector("div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1")
            .textContent.slice(document
            .querySelector("div.video-under.col-md-8.col-xs-12 div.oboxed.odet.mtop10 div.row.vibe-interactions h1")
            .textContent.search("Capítulo"));
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "lendo";
        presenceData.smallImageText = "Lendo";
    }
    else if (document.location.pathname.includes("lista-de-mangas")) {
        presenceData.details = "Vendo a lista de mangás";
        presenceData.smallImageKey = "lista";
        presenceData.smallImageText = "Vendo a lista de obras";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("manga")) {
        presenceData.details = "Vendo página de obra";
        presenceData.state = document.querySelector("div.row div.left20.right20 h1").textContent;
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUTtpQkFDMUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDO2lCQUNoQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1NBQzdDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1lBQ3hDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1NBQzdDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyRCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7YUFDNUIsYUFBYSxDQUNaLHdGQUF3RixDQUN6RjthQUNBLFdBQVcsQ0FBQyxLQUFLLENBQ2hCLENBQUMsRUFDRCxRQUFRO2FBQ0wsYUFBYSxDQUNaLHdGQUF3RixDQUN6RjthQUNBLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUN0QyxDQUFDO1FBQ0osWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRO2FBQzFCLGFBQWEsQ0FDWix3RkFBd0YsQ0FDekY7YUFDQSxXQUFXLENBQUMsS0FBSyxDQUNoQixRQUFRO2FBQ0wsYUFBYSxDQUNaLHdGQUF3RixDQUN6RjthQUNBLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQ2xDLENBQUM7UUFDSixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztLQUN2QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDakUsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUNqRCxZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLCtCQUErQixDQUNoQyxDQUFDLFdBQVcsQ0FBQztRQUNkLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==