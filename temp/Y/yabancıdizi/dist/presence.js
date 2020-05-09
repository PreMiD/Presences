const presence = new Presence({
    clientId: "643593006821408778"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), pages = {
    "/": "Ana Sayfa",
    "/vip": "Ana Sayfa",
    "/kesfet": "Keşfet",
    "/kesfet/eyJjb250ZW50IjoiMSJ9": "Keşfet (Film)",
    "/trend": "Trendler",
    "/takvim": "Dizi Takvimi",
    "/dizi-izle": "TV Dizileri",
    "/forum": "Forum",
    "/koleksiyon": "Koleksiyon",
    "/birlikte-izle": "Birlikte İzle",
    "/profil/ayarlar": "Hesap Ayarları"
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
    const page = document.location.pathname, _video = document.querySelector("video"), isVideoData = Object.keys(video).length > 0 ? true : false, categoryTitle = document.querySelector("#router-view > div.ui.grid.mb-0 > div.left.floated.sixteen.wide.tablet.twelve.wide.computer.column.pb-0 > h1"), categoryTitle2 = document.querySelector("#router-view > div.ui.grid.mb-0 > div.left.floated.sixteen.wide.tablet.ten.wide.computer.column.pb-0 > h1"), showName = document.querySelector("#router-view > div.bg-cover-faker > div.ui.grid > div.left.floated.sixteen.wide.tablet.nine.wide.computer.column > a > h1"), movieTitle = document.querySelector("#router-view > div.bg-cover-faker > div:nth-child(3) > div.left.floated.sixteen.wide.tablet.eight.wide.computer.column > a > h1"), userName = document.querySelector("#router-view > section > div.ui.grid > div.left.floated.sixteen.wide.tablet.four.wide.computer.column > div > section:nth-child(1) > h2 > a");
    if (!isVideoData && !_video) {
        if (page.includes("/kesfet")) {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir sayfaya göz atıyor:",
                state: "Keşfet",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/oyuncu/")) {
            const actorName = document.querySelector("#router-view > div > div.profile-header > div.heading-user-title > h1");
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir aktöre göz atıyor:",
                state: actorName ? actorName.textContent.trim() : "Belirsiz",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/film/tur/") &&
            categoryTitle &&
            categoryTitle.textContent != "") {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir kategoriye göz atıyor:",
                state: categoryTitle.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/dizi/tur") &&
            categoryTitle &&
            categoryTitle.textContent != "") {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir kategoriye göz atıyor:",
                state: categoryTitle.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/film-izle") &&
            categoryTitle2 &&
            categoryTitle2.textContent != "") {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir kategoriye göz atıyor:",
                state: categoryTitle2.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/dizi/") &&
            showName &&
            showName.textContent != "") {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir diziye göz atıyor:",
                state: showName.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (page.includes("/profil/") &&
            userName &&
            userName.textContent != "") {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir profile göz atıyor:",
                state: userName.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (pages[page] || pages[page.slice(0, -1)]) {
            presence.setActivity({
                largeImageKey: "yd-logo",
                details: "Bir sayfaya göz atıyor:",
                state: pages[page] || pages[page.slice(0, -1)],
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
    }
    else if (_video && !isNaN(_video.currentTime)) {
        const title = document.querySelector("#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > a"), episode = document.querySelector("#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > span");
        if (page.includes("/film") && movieTitle && movieTitle.textContent != "") {
            const timestamps = getTimestamps(Math.floor(_video.currentTime), Math.floor(_video.duration));
            const data = {
                largeImageKey: "yd-logo",
                details: "Bir film izliyor:",
                state: movieTitle.textContent,
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
            presence.setTrayTitle(video.paused ? "" : `${movieTitle.textContent}`);
            presence.setActivity(data);
        }
        else if (page.includes("/dizi/") &&
            title &&
            episode &&
            title.textContent != "" &&
            episode.textContent != "") {
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            const data = {
                largeImageKey: "yd-logo",
                details: "Bir film izliyor:",
                state: title.textContent,
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
            presence.setTrayTitle(video.paused ? "" : `${title.textContent} - ${episode.textContent}`);
            presence.setActivity(data);
        }
    }
    else if (isVideoData && video && !isNaN(video.duration)) {
        const showName2 = document.querySelector("#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > a"), episode = document.querySelector("#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > span");
        if (page.includes("/film/") && movieTitle && movieTitle.textContent != "") {
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            const data = {
                largeImageKey: "yd-logo",
                details: "Bir film izliyor:",
                state: movieTitle.textContent,
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
            presence.setTrayTitle(video.paused ? "" : `${movieTitle.textContent}`);
            presence.setActivity(data);
        }
        else if (page.includes("/dizi/") &&
            showName2 &&
            showName2.textContent != "" &&
            episode &&
            episode.textContent != "") {
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            const data = {
                largeImageKey: "yd-logo",
                details: showName2.textContent,
                state: episode.textContent,
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
            presence.setTrayTitle(video.paused ? "" : `${showName2.textContent} - ${episode.textContent}`);
            presence.setActivity(data);
        }
    }
    else {
        presence.setActivity({
            largeImageKey: "yd-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Bilinmeyen Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLFNBQVMsRUFBRSxRQUFRO0lBQ25CLDhCQUE4QixFQUFFLGVBQWU7SUFDL0MsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLGNBQWM7SUFDekIsWUFBWSxFQUFFLGFBQWE7SUFDM0IsUUFBUSxFQUFFLE9BQU87SUFDakIsYUFBYSxFQUFFLFlBQVk7SUFDM0IsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxpQkFBaUIsRUFBRSxnQkFBZ0I7Q0FDcEMsQ0FBQztBQU9KLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELE1BQU0sS0FBSyxHQUF5QixFQUFFLENBQUM7QUFFdkMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtB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