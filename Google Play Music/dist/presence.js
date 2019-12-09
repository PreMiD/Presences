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
        clientId: "610850440266907648",
        mediaKeys: true
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    presence.on("MediaKeys", (key) => {
        if (location.pathname.startsWith("/music/listen")) {
            switch (key) {
                case "pause": {
                    const button = document.querySelector("#player-bar-play-pause");
                    if (button)
                        button.click();
                    break;
                }
                case "nextTrack": {
                    const button = document.querySelector("#player-bar-forward");
                    if (button)
                        button.click();
                    break;
                }
                case "previousTrack": {
                    const button = document.querySelector("#player-bar-rewind");
                    if (button)
                        button.click();
                    break;
                }
            }
        }
    });
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        if (location.pathname.startsWith("/music/listen") &&
            document.querySelector(".now-playing-info-wrapper")) {
            const title = document.querySelector("#currently-playing-title")
                .textContent;
            const artist = document.querySelector("#player-artist").textContent || document.querySelector("#music-content > div.g-content.view-transition > div > table > tbody > tr.song-row.currently-playing > td:nth-child(1) > span").textContent.split(" - ")[1];
            const album = document.querySelector(".player-album").textContent || document.querySelector("#music-content > div.g-content.view-transition > div > table > tbody > tr.song-row.currently-playing > td:nth-child(1) > span").textContent.split(" - ")[0];
            const isPlaying = !!document.querySelector("#player-bar-play-pause.playing");
            const presenceData = {
                details: title,
                state: `${artist} - ${album}`,
                largeImageKey: "gpm",
                smallImageKey: isPlaying ? "play" : "pause",
                smallImageText: isPlaying
                    ? (yield strings).play
                    : (yield strings).pause
            };
            if (!document.hidden) {
                const elapsed = document.querySelector("#time_container_current").textContent;
                presenceData.startTimestamp =
                    Math.floor(Date.now() / 1000) -
                        getTimesec(elapsed).elapsedSec;
            }
            if (isPlaying) {
                presence.setTrayTitle(title);
            }
            else {
                delete presenceData.startTimestamp;
            }
            presence.setActivity(presenceData);
        }
        else {
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
