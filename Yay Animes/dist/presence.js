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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixlQUFlLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3ZELFFBQWlCLEVBQ2pCLEtBQXVCLEVBQ3ZCLFdBQW1CLEVBQ25CLFFBQWdCLEVBQ2hCLFVBQW9CLEVBQ3BCLFVBQWtCLEVBQ2xCLE9BQWUsRUFDZixNQUFlLEVBQ2YsSUFBSSxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN2QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcEMsTUFBTSxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUM1QixhQUFhLEVBQUUsUUFBUTtJQUN2QixjQUFjLEVBQUUsZUFBZTtDQUMvQixDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsUUFBUTtRQUNQLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0NBQXdDLENBQUM7WUFDaEUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN2QyxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDVixJQUFJLFFBQVEsRUFBRTtRQUNiLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsS0FBSztZQUNKLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQztnQkFDckIsQ0FBQyxDQUFDLEtBQUs7Z0JBQ1AsQ0FBQyxDQUFDLFFBQVEsQ0FB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