const presence = new Presence({ clientId: "1028640811925114942" }), browsingTimestamp = Math.floor(Date.now() / 1000);
let video = {
    current: 0,
    duration: 0,
    paused: true,
};
presence.on("iFrameData", (data) => {
    video = data;
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: browsingTimestamp,
    }, pathnameArray = document.location.pathname.split("/"), [time, showCover, showButtons] = await Promise.all([
        presence.getSetting("time"),
        presence.getSetting("cover"),
        presence.getSetting("buttons"),
    ]);
    console.log(pathnameArray);
    switch (pathnameArray[1]) {
        case "":
        case "index":
            presenceData.details = "Parcours la page d'accueil";
            break;
        case "discover":
        case "search":
            presenceData.details = "Recherche de nouveaux animes";
            break;
        case "tags": {
            presenceData.details = "Recherche de nouveaux animes";
            const queryText = pathnameArray[2];
            if (queryText !== "All")
                presenceData.state = `Filtre : ${queryText}`;
            break;
        }
        case "categories":
            presenceData.details = "Parcours les catégories";
            break;
        case "anime":
            const AnimeName = document.querySelector("div.top h1").textContent.trim();
            presenceData.details = `Découvre ${AnimeName}`;
            presenceData.largeImageKey = document.querySelector("div.left img").getAttribute("src");
            presenceData.buttons = [
                {
                    label: "Voir l'animé",
                    url: document.location.href
                },
            ];
            break;
        case "video": {
            presenceData.details = `Regarde ${document.getElementById("anime_name").getAttribute("value")}`;
            presenceData.state = `${document.getElementById("anime_season").getAttribute("value")}, ${document.getElementById("anime_episode").getAttribute("value")}`;
            [presenceData.startTimestamp, presenceData.endTimestamp] =
                presence.getTimestamps(video.current, video.duration);
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Lecture en cours";
            if (video.paused) {
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = "En pause";
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            presenceData.largeImageKey = document.querySelector("div.left img").getAttribute("src");
            presenceData.buttons = [
                { label: "Voir l'épisode", url: document.location.href },
                {
                    label: "Voir l'animé",
                    url: "https://oneanime.fr/anime/" + pathnameArray[2]
                },
            ];
            break;
        }
    }
    if (!time) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
    }
    if (!showCover)
        presenceData.largeImageKey = "logo";
    if (!showButtons)
        delete presenceData.buttons;
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQ2pFLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRW5ELElBQUksS0FBSyxHQUFHO0lBQ1gsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsQ0FBQztJQUNYLE1BQU0sRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQ1YsWUFBWSxFQUNaLENBQUMsSUFBNEQsRUFBRSxFQUFFO0lBQ2hFLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQ0QsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sWUFBWSxHQUFpQjtRQUNsQyxhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsaUJBQWlCO0tBQ2pDLEVBQ0QsYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDckQsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNsRCxRQUFRLENBQUMsVUFBVSxDQUFVLE1BQU0sQ0FBQztRQUNwQyxRQUFRLENBQUMsVUFBVSxDQUFVLE9BQU8sQ0FBQztRQUNyQyxRQUFRLENBQUMsVUFBVSxDQUFVLFNBQVMsQ0FBQztLQUN2QyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNCLFFBQVEsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FB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