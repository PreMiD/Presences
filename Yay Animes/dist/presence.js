let presence = new Presence({
    clientId: "613510331066482699"
}), startedBrowsing = Math.floor(Date.now() / 1000), playback, video, currentTime, duration, timestamps, videoTitle, episode, paused, path = window.location.pathname, strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    playing: "presence.playback.playing",
    paused: "presence.playback.paused"
}), presenceData = {
    largeImageKey: "yay_lg",
    startTimestamp: startedBrowsing
};
presence.on("UpdateData", async () => {
    playback =
        document.querySelector("div#p1 > div > div > div > div > video") ||
            document.querySelector("div#p2 > video")
            ? true
            : false;
    if (playback) {
        video = document.querySelector("div#p2 > video");
        video =
            video.currentTime != 0
                ? video
                : document.querySelector("div#p1 > div > div > div > div > video");
    }
    if (playback && Math.floor(video.currentTime) != 0) {
        duration = Math.floor(document.querySelector("video").duration);
        videoTitle = document
            .querySelector(".color-change")
            .textContent.split("–")[0]
            .trim();
        episode = document
            .querySelector(".color-change")
            .textContent.split("–")[1]
            .trim();
        paused = video.paused;
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
            ? (await strings).paused
            : (await strings).playing;
        if (!paused) {
            currentTime = Math.floor(document.querySelector("video").currentTime);
            timestamps = getTimestamps(currentTime, duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        else {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        presenceData.details = videoTitle;
        presenceData.state = episode;
    }
    else if (path.includes("lista-de-animes")) {
        presenceData.details = "Procurando um anime";
    }
    else if (document.querySelector("#content > div.contentBox > div > h1 > div > b > p > span")) {
        presenceData.details =
            "Olhando o anime " +
                document.querySelector("#content > div.contentBox > div > h1 > div > b > p > span").textContent;
    }
    else if (path.includes("pedidos")) {
        presenceData.details = "Pedindo um anime";
    }
    else if (path.includes("calendario")) {
        presenceData.details = "Vendo o calendário de animes";
    }
    else if (path.includes("noticia")) {
        presenceData.details = "Lendo notícias";
    }
    else if (path.includes("perfil")) {
        presenceData.details =
            "Vendo o perfil de " +
                document.querySelector("div.um-name > a").textContent;
    }
    else {
        presenceData.details = (await strings).browsing;
    }
    presence.setActivity(presenceData, true);
});
function getTimestamps(curr, dura) {
    let startTime = Math.floor(Date.now() / 1000), duration = startTime - curr + dura;
    return [startTime, duration];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixlQUFlLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3ZELFFBQWlCLEVBQ2pCLEtBQXVCLEVBQ3ZCLFdBQW1CLEVBQ25CLFFBQWdCLEVBQ2hCLFVBQW9CLEVBQ3BCLFVBQWtCLEVBQ2xCLE9BQWUsRUFDZixNQUFlLEVBQ2YsSUFBSSxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN2QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcEMsTUFBTSxFQUFFLDBCQUEwQjtDQUNuQyxDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUMzQixhQUFhLEVBQUUsUUFBUTtJQUN2QixjQUFjLEVBQUUsZUFBZTtDQUNoQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsUUFBUTtRQUNOLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0NBQXdDLENBQUM7WUFDaEUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0QyxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDWixJQUFJLFFBQVEsRUFBRTtRQUNaLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsS0FBSztZQUNILEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLEtBQUs7Z0JBQ1AsQ0FBQyxDQUFDLFFBQVEsQ0FB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