var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
{
    const presence = new Presence({
        clientId: "609220157910286346",
        mediaKeys: true
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused",
        live: "presence.activity.live"
    });
    presence.on("MediaKeys", (key) => {
        if (location.host === "www.nicovideo.jp" &&
            location.pathname.startsWith("/watch/")) {
            console.log(key);
            switch (key) {
                case "pause": {
                    const button = document.querySelector(".PlayerPauseButton") ||
                        document.querySelector(".PlayerPlayButton");
                    if (button)
                        button.click();
                    break;
                }
                case "nextTrack": {
                    const button = document.querySelector(".PlayerSkipNextButton");
                    if (button)
                        button.click();
                    break;
                }
                case "previousTrack": {
                    const button = document.querySelector(".SeekToHeadButton");
                    if (button)
                        button.click();
                    break;
                }
            }
        }
    });
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        switch (location.hostname) {
            case "www.nicovideo.jp": {
                if (location.pathname.startsWith("/watch/") &&
                    document.querySelector(".VideoPlayer video")) {
                    const title = document.querySelector(".VideoTitle")
                        .textContent;
                    const ownerElement = document.querySelector(".ChannelInfo-pageLink") ||
                        document.querySelector(".VideoOwnerInfo-pageLink") ||
                        null;
                    let owner;
                    if (ownerElement) {
                        [, owner] = ownerElement.textContent.match(/(.+) さん$/) || [, ownerElement.textContent];
                    }
                    else {
                        owner = "Deleted User";
                    }
                    const [videoId] = location.pathname.match(/..\d+$/);
                    const isPlaying = !!document.querySelector(".PlayerPauseButton");
                    const video = document.querySelector(".VideoPlayer video");
                    const elapsedSec = Math.floor(video.currentTime);
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${videoId}`,
                        largeImageKey: "niconico",
                        smallImageKey: isPlaying ? "play" : "pause",
                        smallImageText: isPlaying
                            ? (yield strings).play
                            : (yield strings).pause,
                        startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
                    };
                    if (isPlaying) {
                        presence.setTrayTitle(title);
                    }
                    else {
                        delete presenceData.startTimestamp;
                    }
                    presence.setActivity(presenceData);
                }
                break;
            }
            case "live.nicovideo.jp":
            case "live2.nicovideo.jp": {
                if (location.pathname.startsWith("/watch/lv")) {
                    const title = document.querySelector("[class^='___title___']").textContent;
                    const ownerElement = document.querySelector("[class^='___channel-name-anchor___']") ||
                        document.querySelector("[class^='___group-name-anchor___']");
                    const owner = ownerElement.textContent;
                    const [liveId] = location.pathname.match(/lv\d+/);
                    const elapsed = document.querySelector("span[class^='___elapsed-time___'] span").textContent;
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${liveId}`,
                        largeImageKey: "niconico",
                        smallImageKey: "live",
                        smallImageText: (yield strings).live,
                        startTimestamp: Math.floor(Date.now() / 1000) -
                            getTimesec(elapsed).elapsedSec
                    };
                    presence.setActivity(presenceData);
                }
                else {
                    presence.clearActivity();
                }
                break;
            }
            case "seiga.nicovideo.jp": {
                if (location.pathname.startsWith("/seiga/im")) {
                    const title = document.querySelector(".title").textContent;
                    const owner = document.querySelector("#ko_watchlist_header.user .user_name strong").textContent;
                    const [seigaId] = location.pathname.match(/im\d+/);
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${seigaId}`,
                        largeImageKey: "niconico"
                    };
                    presence.setActivity(presenceData);
                }
                else if (location.pathname.startsWith("/watch/mg")) {
                    const title = document.querySelector(".title").textContent;
                    const owner = document.querySelector(".author_name")
                        .textContent;
                    const [mangaId] = location.pathname.match(/mg\d+/);
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${mangaId}`,
                        largeImageKey: "niconico"
                    };
                    presence.setActivity(presenceData);
                }
                else {
                    presence.clearActivity();
                }
                break;
            }
            default:
                presence.clearActivity();
                break;
        }
    }));
    function getTimesec(elapsedString = "00:00", durationString = "00:00", separator = ":") {
        const elapsed = elapsedString.split(separator);
        const duration = durationString.split(separator);
        let elapsedSec, durationSec;
        switch (elapsed.length) {
            case 3: {
                elapsedSec =
                    parseInt(elapsed[0]) * 60 * 60 +
                        parseInt(elapsed[1]) * 60 +
                        parseInt(elapsed[2]);
                break;
            }
            case 2: {
                elapsedSec = parseInt(elapsed[0]) * 60 + parseInt(elapsed[1]);
                break;
            }
            case 1: {
                elapsedSec = parseInt(elapsed[0]);
                break;
            }
        }
        switch (duration.length) {
            case 3: {
                durationSec =
                    parseInt(duration[0]) * 60 * 60 +
                        parseInt(duration[1]) * 60 +
                        parseInt(duration[2]);
                break;
            }
            case 2: {
                durationSec =
                    parseInt(duration[0]) * 60 + parseInt(duration[1]);
                break;
            }
            case 1: {
                durationSec = parseInt(duration[0]);
                break;
            }
        }
        return { elapsedSec: elapsedSec, durationSec: durationSec };
    }
}
