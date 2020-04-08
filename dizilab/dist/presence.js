const presence = new Presence({
    clientId: "635199664290922512"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), pages = {
    "/": "Ana Sayfa",
    "/uyeler": "Üyeler",
    "/yabanci-dizi-takvimi": "Dizi Takvimi",
    "/forum": "Forum",
    "/basvuru": "Çevirmenlik",
    "/iletisim": "İletişim",
    "/sifre_sifirla": "Şifre Sıfırla",
    "/mesajlar": "Özel Mesajlar",
    "/oyuncular": "Oyuncular",
    "/pano": "Pano",
    "/pano/sosyal-akis": "Sosyal Akış",
    "/pano/takip-ettiklerim": "Takip Ettiklerim",
    "/pano/izleme-listesi": "İzleme Listesi",
    "/pano/son-izlediklerim": "Son İzlediklerim"
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
    const page = document.location.pathname, _video = document.querySelector("video"), isVideoData = Object.keys(video).length > 0 ? true : false, showTitle = document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-profile-head > div.tv-series-right-content > h1"), actorName = document.querySelector("#container > div.content > div.right > div.artist-right > div.artist-name > h1");
    if (!isVideoData && page.includes("/arsiv")) {
        const url = new URL(document.location.href), genre = url.searchParams.get("tur"), showName = url.searchParams.get("dizi_adi");
        if (!document.location.search ||
            document.location.search == "" ||
            (document.location.search != "" && !genre && !showName) ||
            (document.location.search != "" && genre == "" && showName == "")) {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: "Bir sayfaya göz atıyor:",
                state: "Arşiv",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if ((genre && genre != "" && !showName) ||
            (genre && genre != "" && showName == "")) {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: "Bir kategoriye göz atıyor:",
                state: genre,
                smallImageKey: "search",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (genre && genre != "" && showName && showName != "") {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: "Bir dizi arıyor:",
                state: `${showName} (${genre})`,
                smallImageKey: "search",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if ((!genre && showName) ||
            (genre == "" && showName && showName != "")) {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: "Bir dizi arıyor:",
                state: showName,
                smallImageKey: "search",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
    else if (!isVideoData && page.includes("/uye/")) {
        const user = document.querySelector("#container > div.content > div.right > div.dashboard-head > h1 > span");
        presence.setActivity({
            largeImageKey: "dl-logo",
            details: "Bir üyenin profiline bakıyor:",
            state: user && user.textContent ? user.textContent.trim() : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (!isVideoData && showTitle && showTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "dl-logo",
            details: "Bir diziyi inceliyor:",
            state: showTitle.textContent,
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (!isVideoData && actorName && actorName.textContent != "") {
        presence.setActivity({
            largeImageKey: "dl-logo",
            details: "Bir aktörü inceliyor:",
            state: actorName.textContent,
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (!isVideoData && page.includes("/forum")) {
        const postTitle = document.querySelector("#container > div.content > div.right > div.right-inner > h2 > span"), forumTitle = document.querySelector("#container > div.content > div.right > div.forum-head > h1");
        if (page.slice(page.indexOf("/forum") + 6).length <= 0) {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: `${forumTitle && forumTitle.textContent != ""
                    ? forumTitle.textContent.replace(" tartışma forumu", "")
                    : "Bilinmeyen"} dizisinin forumlarına bakıyor:`,
                state: "Ana Sayfa",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: `${forumTitle && forumTitle.textContent != ""
                    ? forumTitle.textContent.replace(" tartışma forumu", "")
                    : "Bilinmeyen"} dizisinin forumlarına bakıyor:`,
                state: postTitle && postTitle.textContent != ""
                    ? postTitle.textContent
                    : "Bilinmeyen",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "dl-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (_video && _video.currentTime) {
        const title = document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span") ||
            document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"), episodeX = document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div") &&
            document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div").textContent
            ? document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div").textContent
            : null ||
                (document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span") &&
                    document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"))
                ? `${document
                    .querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span")
                    .textContent.trim()}. Sezon ${document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)").textContent}. Bölüm`
                : "none found";
        const fixedEpisodeName = episodeX
            .replace(/\n/g, "")
            .replace(/-/g, "")
            .replace(title.textContent, "")
            .replace(" ", "")
            .trim(), timestamps = getTimestamps(Math.floor(_video.currentTime), Math.floor(_video.duration));
        const data = {
            largeImageKey: "dl-logo",
            details: title.textContent,
            state: fixedEpisodeName,
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
        presence.setTrayTitle(video.paused ? "" : `${title.textContent} - ${fixedEpisodeName}`);
        presence.setActivity(data);
    }
    else if (isVideoData) {
        const title = document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span") ||
            document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"), episodeX = document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div") &&
            document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div").textContent
            ? document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div").textContent
            : null ||
                (document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span") &&
                    document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"))
                ? `${document
                    .querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span")
                    .textContent.trim()}. Sezon ${document.querySelector("#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)").textContent}. Bölüm`
                : null;
        if (title && title.textContent != "" && episodeX) {
            const fixedEpisodeName = episodeX
                .replace(/\n/g, "")
                .replace(/-/g, "")
                .replace(title.textContent, "")
                .replace(" ", "")
                .trim(), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            const data = {
                largeImageKey: "dl-logo",
                details: title.textContent,
                state: fixedEpisodeName,
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
            presence.setTrayTitle(video.paused ? "" : `${title.textContent} - ${fixedEpisodeName}`);
            presence.setActivity(data);
        }
        else {
            presence.setActivity({
                largeImageKey: "dl-logo",
                details: "Bir sayfaya göz atıyor:",
                state: "Bilinmeyen Sayfa",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLHVCQUF1QixFQUFFLGNBQWM7SUFDdkMsUUFBUSxFQUFFLE9BQU87SUFDakIsVUFBVSxFQUFFLGFBQWE7SUFDekIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxXQUFXLEVBQUUsZUFBZTtJQUM1QixZQUFZLEVBQUUsV0FBVztJQUN6QixPQUFPLEVBQUUsTUFBTTtJQUNmLG1CQUFtQixFQUFFLGFBQWE7SUFDbEMsd0JBQXdCLEVBQUUsa0JBQWtCO0lBQzVDLHNCQUFzQixFQUFFLGdCQUFnQjtJQUN4Qyx3QkFBd0IsRUFBRSxrQkFBa0I7Q0FDN0MsQ0FBQztBQU9KLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELE1BQU0sS0FBSyxHQUF5QixFQUFFLENBQUM7QUFFdkMsUUFBUSxD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