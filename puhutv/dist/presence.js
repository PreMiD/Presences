var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
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
        clientId: "628341182581440531"
    }),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const category = document.querySelector("#widget_serie_contents_3 > section > div > div > div.category-main-content-right > header > h1 > strong");

    if (document.location.pathname == "/" || !document.location.pathname || category && category.innerHTML != "") {
        presence.setActivity({
            largeImageKey: "puhu-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Geziniyor...",
            state: category && category.innerHTML ? category.innerHTML : "Ana Sayfa"
        });
    } else {
        const video = document.querySelector("#dyg_player_dogusPlayer_html5_api");

        if (!video) return;
        else {
            const title = document.querySelector("#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1 > a"),
                episode = title && document.querySelector("#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1") ? document.querySelector("#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1").innerHTML.replace(title.outerHTML + " ", "") : null,
                timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));

            if (!title || title == "") return;

            let data = {
                largeImageKey: "puhu-logo",
                details: title.innerHTML,
                state: episode != "" ? episode : `${document.querySelector("#widget_serie_detail_tab_5 > section > div > div > div > div.kunye-content-left > div:nth-child(3)") ? document.querySelector("#widget_serie_detail_tab_5 > section > div > div > div > div.kunye-content-left > div:nth-child(3)").innerText.replace("\n", ": ") : null}`,
                smallImageKey: video.paused ? "paused" : "playing",
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

            presence.setActivity(data);
        }
    }
}));

function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now(),
        endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;

    return [Math.floor(startTime / 1000), endTime];
}