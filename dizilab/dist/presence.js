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
                : null;
        const fixedEpisodeName = episodeX
            .replace(/\n/g, "")
            .replace(/-/g, "")
            .replace(title.textContent, "")
            .replace(" ", "")
            .trim(), timestamps = getTimestamps(Math.floor(_video.currentTime), Math.floor(_video.duration));
        let data = {
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
            let data = {
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLHVCQUF1QixFQUFFLGNBQWM7SUFDdkMsUUFBUSxFQUFFLE9BQU87SUFDakIsVUFBVSxFQUFFLGFBQWE7SUFDekIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxXQUFXLEVBQUUsZUFBZTtJQUM1QixZQUFZLEVBQUUsV0FBVztJQUN6QixPQUFPLEVBQUUsTUFBTTtJQUNmLG1CQUFtQixFQUFFLGFBQWE7SUFDbEMsd0JBQXdCLEVBQUUsa0JBQWtCO0lBQzVDLHNCQUFzQixFQUFFLGdCQUFnQjtJQUN4Qyx3QkFBd0IsRUFBRSxrQkFBa0I7Q0FDN0MsQ0FBQztBQUVKLElBQUksS0FBSyxHQUF5QixFQUFFLENBQUM7QUFFckMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDZixLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMzQixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUM1QjtBQUNI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