const presence = new Presence({
    clientId: "646716119289298984"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), pages = {
    "/": "Ana Sayfa",
    "/login": "Giriş Yap",
    "/series": "Diziler",
    "/movies": "Filmler",
    "/register": "Kayıt Ol",
    "/collections": "Listeler",
    "/timeline": "Akış",
    "/profile": "Profilim"
};
presence.on("UpdateData", () => async () => {
    const page = document.location.pathname, video = document.querySelector("video"), showTitle = document.querySelector("body > div.wrapper > div.fw.movieDetailAll > div.container > div > div > div.movieDetailRightCol > div > div.fw.movieDetailTitle > h1"), username = document.querySelector("#profile_fullname");
    if (page.includes("/show/") && showTitle && showTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir diziyi inceliyor:",
            state: showTitle.textContent || "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/user/") &&
        username &&
        username.textContent != "") {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir üyenin profiline bakıyor:",
            state: username.textContent.trim() || "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/search/")) {
        const searchingFor = decodeURI(page.replace("/search/", ""))
            .split(" ")
            .map(i => i[0].toUpperCase() + i.slice(1).toLowerCase())
            .join(" ");
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir şey arıyor:",
            state: searchingFor || "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000),
            smallImageKey: "search"
        });
    }
    else if (page.includes("/category/")) {
        const categoryName = document.querySelector("body > div.wrapper > div.container.st > div > div.top_right_arsiv > h5");
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir kategoriye göz atıyor:",
            state: categoryName && categoryName.textContent != ""
                ? categoryName.textContent.replace("Dizileri", "")
                : "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/movie/") && video) {
        const title = document.querySelector("body > div.wrapper > div:nth-child(4) > div > div:nth-child(1) > div.col-md-9 > h2"), IMDb = document.querySelector("body > div.wrapper > div:nth-child(4) > div > div:nth-child(3) > div:nth-child(1) > button > span"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        let data = {
            largeImageKey: "wh-logo",
            details: title && title.textContent != "" ? title.textContent : "Bilinmeyen",
            state: `IMDb: ${IMDb && IMDb.textContent != "" ? IMDb.textContent : "Bilinmiyor"}`,
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
        presence.setTrayTitle(video.paused ? "" : `${title.textContent}`);
        presence.setActivity(data);
    }
    else if (page.includes("/watch/") && video) {
        const showName = document.querySelector("#mep_0 > div > div.mejs__layers > div.mejs__currentlayer-layer > div > h1") ||
            document.querySelector("body > div.wrapper > div.fw.playBotAll > div > div > div.playTopInfo > ul > li.title"), episode = document.querySelector("#mep_0 > div > div.mejs__layers > div.mejs__currentlayer-layer > div > h3") ||
            document.querySelector("body > div.wrapper > div.fw.playBotAll > div > div > div.playTopInfo > ul > li.desc"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        let data = {
            largeImageKey: "wh-logo",
            details: showName && showName.textContent != ""
                ? showName.textContent.trim()
                : "Bilinmeyen",
            state: episode && episode.textContent != ""
                ? episode.textContent.trim()
                : "Bilinmeyen",
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
        presence.setTrayTitle(video.paused ? "" : `${showName.textContent} - ${episode.textContent}`);
        presence.setActivity(data);
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir sayafaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNQLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLGNBQWMsRUFBRSxVQUFVO0lBQzFCLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFVBQVUsRUFBRSxVQUFVO0NBQ3RCLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUMxQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDdEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFxQixFQUMzRCxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsdUlBQXVJLENBQ3ZJLEVBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUV4RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQ3hFLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDcEIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFdB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