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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const video = {};
presence.on("iFrameData", (data) => {
    if (!data.error) {
        video.dataAvailable = true;
        video.currentTime = data.currentTime;
        video.duration = data.duration;
        video.paused = data.paused;
    }
});
presence.on("UpdateData", async () => {
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
            const data = {
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
            const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLGVBQWUsRUFBRSxjQUFjO0lBQy9CLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLGlCQUFpQixFQUFFLGdCQUFnQjtJQUNuQyxlQUFlLEVBQUUsY0FBYztJQUMvQixjQUFjLEVBQUUsYUFBYTtJQUM3QixlQUFlLEVBQUUsY0FBYztJQUMvQixpQkFBaUIsRUFBRSxnQkFBZ0I7SUFDbkMsYUFBYSxFQUFFLFlBQVk7SUFDM0IsaUJBQWlCLEVBQUUsZ0JBQWdCO0NBQ3BDLENBQUM7QUFPSixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLEtBQUssR0FBeUIsRUFBRSxDQUFDO0FBRXZDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFD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