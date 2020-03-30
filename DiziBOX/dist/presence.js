const presence = new Presence({
    clientId: "643788489871196161"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), pages = {
    "/": "Ana Sayfa",
    "/arsiv": "Dizi Arşivi",
    "/diziler": "Dizi Arşivi",
    "/dizi-takvimi": "Dizi Takvimi",
    "/iletisim": "İletişim",
    "/efsane-diziler": "Efsane Diziler",
    "/tum-bolumler": "Tüm Bölümler",
    "/favorilerim": "Favorilerim",
    "/izlediklerim": "İzlediklerim",
    "/izleyeceklerim": "İzleyeceklerim",
    "/yorumlarim": "Yorumlarım",
    "/hesap-ayarlari": "Hesap Ayarları"
};
let video = {};
presence.on("iFrameData", data => {
    if (!data.error) {
        video.dataAvailable = true;
        video.currentTime = data.currentTime;
        video.duration = data.duration;
        video.paused = data.paused;
    }
});
presence.on("UpdateData", () => async () => {
    const page = document.location.pathname, isVideoData = Object.keys(video).length > 0 ? true : false, _video = document.querySelector("video");
    if (!_video && !isVideoData) {
        if ((page.includes("/diziler/") &&
            document.location.pathname != "/diziler/") ||
            (page.includes("/diziler") && document.location.pathname != "/diziler")) {
            const showName = document.querySelector("#single-diziler > div.tv-overview.bg-dark > div.title-terms > h1 > a");
            presence.setActivity({
                largeImageKey: "db-logo",
                details: "Bir diziye göz atıyor:",
                state: showName && showName.textContent != ""
                    ? showName.textContent
                    : "Belirsiz",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (document.location.search.includes("?s=")) {
            const searchingFor = document.querySelector("#search > div.title > h1 > span.text-muted") &&
                document.querySelector("#search > div.title > h1 > span.text-muted")
                    .textContent
                ? document
                    .querySelector("#search > div.title > h1 > span.text-muted")
                    .textContent.replace("(", "")
                    .replace(")", "")
                : null;
            presence.setActivity({
                largeImageKey: "db-logo",
                details: "Bir dizi arıyor:",
                state: searchingFor || "Belirsiz",
                smallImageKey: "search",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/author/")) {
            const user = document.querySelector("#main-wrapper > div.content-wrapper > address > div.user-summary > strong");
            presence.setActivity({
                largeImageKey: "db-logo",
                details: "Bir üyenin profiline bakıyor:",
                state: user && user.textContent ? user.textContent : "Belirsiz",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (pages[page] || pages[page.slice(0, -1)]) {
            presence.setActivity({
                largeImageKey: "db-logo",
                details: "Bir sayfaya göz atıyor:",
                state: pages[page] || pages[page.slice(0, -1)],
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
    else {
        if (_video && _video.currentTime) {
            const title = document.querySelector("#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-archive > span"), episode = document.querySelector("#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-episode"), timestamps = getTimestamps(Math.floor(_video.currentTime), Math.floor(_video.duration));
            let data = {
                largeImageKey: "db-logo",
                details: title && title.textContent ? title.textContent : "Belirsiz",
                state: episode && episode.textContent ? episode.textContent : "Belirsiz",
                smallImageKey: _video.paused ? "pause" : "play",
                smallImageText: _video.paused
                    ? (await strings).pause
                    : (await strings).play
            };
            if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
                data.startTimestamp = timestamps[0];
                data.endTimestamp = timestamps[1];
            }
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            presence.setTrayTitle(_video.paused
                ? ""
                : `${title && title.textContent ? title.textContent : "Belirsiz"} - ${episode && episode.textContent ? episode.textContent : "Belirsiz"}`);
            presence.setActivity(data);
        }
        else if (isVideoData && video && video.currentTime) {
            const title = document.querySelector("#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-archive > span"), episode = document.querySelector("#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-episode"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            let data = {
                largeImageKey: "db-logo",
                details: title && title.textContent ? title.textContent : "Belirsiz",
                state: episode && episode.textContent ? episode.textContent : "Belirsiz",
                smallImageKey: video.paused ? "pause" : "play",
                smallImageText: video.paused
                    ? (await strings).pause
                    : (await strings).play
            };
            if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
                data.startTimestamp = timestamps[0];
                data.endTimestamp = timestamps[1];
            }
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            presence.setTrayTitle(video.paused
                ? ""
                : `${title && title.textContent ? title.textContent : "Belirsiz"} - ${episode && episode.textContent ? episode.textContent : "Belirsiz"}`);
            presence.setActivity(data);
        }
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNQLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLGVBQWUsRUFBRSxjQUFjO0lBQy9CLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLGlCQUFpQixFQUFFLGdCQUFnQjtJQUNuQyxlQUFlLEVBQUUsY0FBYztJQUMvQixjQUFjLEVBQUUsYUFBYTtJQUM3QixlQUFlLEVBQUUsY0FBYztJQUMvQixpQkFBaUIsRUFBRSxnQkFBZ0I7SUFDbkMsYUFBYSxFQUFFLFlBQVk7SUFDM0IsaUJBQWlCLEVBQUUsZ0JBQWdCO0NBQ25DLENBQUM7QUFFSCxJQUFJLEtBQUssR0FBeUIsRUFBRSxDQUFDO0FBRXJDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ2hCLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzNCLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVks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