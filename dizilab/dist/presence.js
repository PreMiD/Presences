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
presence.on("UpdateData", () => async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNQLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLHVCQUF1QixFQUFFLGNBQWM7SUFDdkMsUUFBUSxFQUFFLE9BQU87SUFDakIsVUFBVSxFQUFFLGFBQWE7SUFDekIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxXQUFXLEVBQUUsZUFBZTtJQUM1QixZQUFZLEVBQUUsV0FBVztJQUN6QixPQUFPLEVBQUUsTUFBTTtJQUNmLG1CQUFtQixFQUFFLGFBQWE7SUFDbEMsd0JBQXdCLEVBQUUsa0JBQWtCO0lBQzVDLHNCQUFzQixFQUFFLGdCQUFnQjtJQUN4Qyx3QkFBd0IsRUFBRSxrQkFBa0I7Q0FDNUMsQ0FBQztBQUVILElBQUksS0FBSyxHQUF5QixFQUFFLENBQUM7QUFFckMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDaEIsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDM0I7QUFD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