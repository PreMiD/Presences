const presence = new Presence({
    clientId: "613510331066482699"
}), startedBrowsing = Math.floor(Date.now() / 1000), path = window.location.pathname, strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    playing: "presence.playback.playing",
    paused: "presence.playback.paused"
}), presenceData = {
    largeImageKey: "yay_lg",
    startTimestamp: startedBrowsing
};
let playback, video, currentTime, duration, timestamps, videoTitle, episode, paused;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixlQUFlLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3ZELElBQUksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDdkMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDNUIsUUFBUSxFQUFFLDRCQUE0QjtJQUN0QyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLE1BQU0sRUFBRSwwQkFBMEI7Q0FDbkMsQ0FBQyxFQUNGLFlBQVksR0FBaUI7SUFDM0IsYUFBYSxFQUFFLFFBQVE7SUFDdkIsY0FBYyxFQUFFLGVBQWU7Q0FDaEMsQ0FBQztBQUNKLElBQUksUUFBaUIsRUFDbkIsS0FBdUIsRUFDdkIsV0FBbUIsRUFDbkIsUUFBZ0IsRUFDaEIsVUFBb0IsRUFDcEIsVUFBa0IsRUFDbEIsT0FBZSxFQUNmLE1BQWUsQ0FBQztBQU9sQixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxRQUFRO1FBQ04sUUFBUSxD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