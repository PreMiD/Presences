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
presence.on("UpdateData", () => async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNQLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLFNBQVMsRUFBRSxRQUFRO0lBQ25CLDhCQUE4QixFQUFFLGVBQWU7SUFDL0MsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLGNBQWM7SUFDekIsWUFBWSxFQUFFLGFBQWE7SUFDM0IsUUFBUSxFQUFFLE9BQU87SUFDakIsYUFBYSxFQUFFLFlBQVk7SUFDM0IsZ0JBQWdCLEVBQUUsZUFBZTtJQUNqQyxpQkFBaUIsRUFBRSxnQkFBZ0I7Q0FDbkMsQ0FBQztBQUVILElBQUksS0FBSyxHQUF5QixFQUFFLENBQUM7QUFFckMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDaEIsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDM0I7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUss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