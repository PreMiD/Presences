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
        clientId: "611012705306017792",
        mediaKeys: true
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    presence.on("MediaKeys", (key) => {
        if (location.pathname.startsWith("/animestore/sc_d_pc") &&
            document.querySelector("#video")) {
            console.log(key);
            switch (key) {
                case "pause": {
                    const button = document.querySelector(".playButton");
                    if (button)
                        button.click();
                    break;
                }
                case "nextTrack": {
                    const button = document.querySelector(".skipButton");
                    if (button)
                        button.click();
                    break;
                }
                case "previousTrack": {
                    const button = document.querySelector(".backButton");
                    if (button)
                        button.click();
                    break;
                }
            }
        }
    });
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        if (location.pathname.startsWith("/animestore/sc_d_pc") &&
            document.querySelector("#video")) {
            const video = document.querySelector("#video");
            const title = document.querySelector(".backInfoTxt1").textContent;
            const episode = document.querySelector(".backInfoTxt2").textContent;
            const epName = document.querySelector(".backInfoTxt3").textContent;
            const isPlaying = !video.paused;
            const elapsedSec = Math.floor(video.currentTime);
            const presenceData = {
                details: `${title} - ${episode}`,
                state: epName,
                largeImageKey: "danime",
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
    }));
}
