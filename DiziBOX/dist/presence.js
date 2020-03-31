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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLGVBQWUsRUFBRSxjQUFjO0lBQy9CLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLGlCQUFpQixFQUFFLGdCQUFnQjtJQUNuQyxlQUFlLEVBQUUsY0FBYztJQUMvQixjQUFjLEVBQUUsYUFBYTtJQUM3QixlQUFlLEVBQUUsY0FBYztJQUMvQixpQkFBaUIsRUFBRSxnQkFBZ0I7SUFDbkMsYUFBYSxFQUFFLFlBQVk7SUFDM0IsaUJBQWlCLEVBQUUsZ0JBQWdCO0NBQ3BDLENBQUM7QUFFSixJQUFJLEtBQUssR0FBeUIsRUFBRSxDQUFDO0FBRXJDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ2YsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDNUI7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxF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