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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
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
            .map((i) => i[0].toUpperCase() + i.slice(1).toLowerCase())
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
        const data = {
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
        const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLGNBQWMsRUFBRSxVQUFVO0lBQzFCLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFVBQVUsRUFBRSxVQUFVO0NBQ3ZCLENBQUM7QUFPSixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDckMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFxQixFQUMzRCxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsdUlBQXVJ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