var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
    clientId: "646716119289298984"
}),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    }),
    pages = {
        "/": "Ana Sayfa",
        "/login": "Giriş Yap",
        "/series": "Diziler",
        "/movies": "Filmler",
        "/register": "Kayıt Ol",
        "/collections": "Listeler",
        "/timeline": "Akış",
        "/profile": "Profilim"
    };

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        video = document.querySelector("video"),
        showTitle = document.querySelector("body > div.wrapper > div.fw.movieDetailAll > div.container > div > div > div.movieDetailRightCol > div > div.fw.movieDetailTitle > h1"),
        username = document.querySelector("#profile_fullname");

    if (page.includes("/show/") && showTitle && showTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir diziyi inceliyor:",
            state: showTitle.textContent || "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/user/") && username && username.textContent != "") {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir üyenin profiline bakıyor:",
            state: username.textContent.trim() || "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/search/")) {
        const searchingFor = decodeURI(page.replace("/search/", "")).split(" ").map(i => i[0].toUpperCase() + i.slice(1).toLowerCase()).join(" ");

        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir şey arıyor:",
            state: searchingFor || "Bilinmeyen",
            startTimestamp: Math.floor(Date.now() / 1000),
            smallImageKey: "search"
        });
    } else if (page.includes("/movie/") && video) {
        const title = document.querySelector("body > div.wrapper > div:nth-child(4) > div > div:nth-child(1) > div.col-md-9 > h2"),
            IMDb = document.querySelector("body > div.wrapper > div:nth-child(4) > div > div:nth-child(3) > div:nth-child(1) > button > span"),
            timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration))

        let data = {
            largeImageKey: "wh-logo",
            details: title && title.textContent != "" ? title.textContent : "Bilinmeyen",
            state: `IMDb: ${IMDb && IMDb.textContent != "" ? IMDb.textContent : "Bilinmiyor"}`,
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused ? (yield strings).pause : (yield strings).play,
        }

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
    } else if (page.includes("/watch/") && video) {
        const showName = document.querySelector("#mep_0 > div > div.mejs__layers > div.mejs__currentlayer-layer > div > h1") || document.querySelector("body > div.wrapper > div.fw.playBotAll > div > div > div.playTopInfo > ul > li.title"),
            episode = document.querySelector("#mep_0 > div > div.mejs__layers > div.mejs__currentlayer-layer > div > h3") || document.querySelector("body > div.wrapper > div.fw.playBotAll > div > div > div.playTopInfo > ul > li.desc"),
            timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration))

        let data = {
            largeImageKey: "wh-logo",
            details: showName && showName.textContent != "" ? showName.textContent.trim() : "Bilinmeyen",
            state: episode && episode.textContent != "" ? episode.textContent.trim() : "Bilinmeyen",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused ? (yield strings).pause : (yield strings).play,
        }

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
    } else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else {
        presence.setActivity({
            largeImageKey: "wh-logo",
            details: "Bir sayafaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
}));

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
};