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
            let data = {
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
            let data = {
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
            let data = {
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
            let data = {
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLFNBQVMsRUFBRSxRQUFRO0lBQ25CLDhCQUE4QixFQUFFLGVBQWU7SUFDL0MsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLGNBQWM7SUFDekIsWUFBWSxFQUFFLGFBQWE7SUFDM0IsUUFBUSxFQUFFLE9BQU87SUFDakIsYUFBYSxFQUFFLFlBQVk7SUFDM0IsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxpQkFBaUIsRUFBRSxnQkFBZ0I7Q0FDcEMsQ0FBQztBQUVKLElBQUksS0FBSyxHQUF5QixFQUFFLENBQUM7QUFFckMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDZixLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMzQixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUM1QjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMs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